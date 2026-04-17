"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTodosService } from "@/hooks/app/todos/useTodosService";
import { TodoGroup, TodoItem, CreateTodoGroupPayload, UpdateTodoGroupPayload } from "@/types/todos.types";

interface LocalTodoItem {
  id: string | number;
  task: string;
  is_completed: boolean;
}

export const useTodosManager = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const todosService = useTodosService();

  // Editor state
  const [activeGroup, setActiveGroup] = useState<TodoGroup | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  // Handle ?action=new from route
  useEffect(() => {
    if (searchParams?.get("action") !== "new") {
      return;
    }

    setActiveGroup(null);
    setIsEditorOpen(true);
  }, [searchParams]);

  // No need to load items - they come eager-loaded with the group from the backend
  useEffect(() => {
    if (!activeGroup || !isEditorOpen) {
      return;
    }

    // Items are already loaded with the group, just update loading state
    setIsLoadingItems(false);
  }, [activeGroup, isEditorOpen]);

  const clearNewAction = () => {
    if (searchParams?.get("action") === "new") {
      router.replace(pathname);
    }
  };

  const openCreateGroup = useCallback(() => {
    setActiveGroup(null);
    setIsEditorOpen(true);
  }, []);

  const openEditGroup = useCallback((group: TodoGroup) => {
    setActiveGroup(group);
    setIsEditorOpen(true);
  }, []);

  const closeEditor = useCallback(() => {
    setActiveGroup(null);
    setIsEditorOpen(false);
    clearNewAction();
  }, [pathname, searchParams]);

  // Save TodoGroup with unified batch operations for items
  const handleSaveGroup = useCallback(
    async (
      payload: CreateTodoGroupPayload | UpdateTodoGroupPayload,
      localItems?: LocalTodoItem[],
      originalItems?: TodoItem[]
    ) => {
      try {
        let savedGroup: TodoGroup;
        
        if (activeGroup) {
          // Update existing group
          savedGroup = await todosService.updateTodoGroup(
            activeGroup.id,
            payload as UpdateTodoGroupPayload
          );

          // Find deleted items (in originals but not in local)
          const localIds = new Set((localItems || []).map((item) => String(item.id)));
          const deletedIds = (originalItems || [])
            .filter((item) => !localIds.has(String(item.id)))
            .map((item) => item.id);

          // Save items changes
          if ((localItems && localItems.length > 0) || deletedIds.length > 0) {
            await todosService.saveTodoGroupItems(
              savedGroup.id,
              localItems || [],
              deletedIds
            );
          }
        } else {
          // Create new group: map items directly into creation payload
          const createPayload = { ...payload } as CreateTodoGroupPayload;
          if (localItems && localItems.length > 0) {
            createPayload.todo_items = localItems.map((item, index) => ({
              task: item.task,
              is_completed: item.is_completed,
              position: index,
            }));
          }
          savedGroup = await todosService.createTodoGroup(createPayload);
        }

        closeEditor();
      } catch (err) {
        console.error("Failed to save group:", err);
        throw err;
      }
    },
    [activeGroup, todosService, closeEditor]
  );

  const handleDeleteGroup = useCallback(
    async (groupId: number) => {
      try {
        await todosService.deleteTodoGroup(groupId);
        closeEditor();
      } catch (err) {
        console.error("Failed to delete group:", err);
        throw err;
      }
    },
    [todosService, closeEditor]
  );

  const handleArchiveGroup = useCallback(
    async (groupId: number) => {
      try {
        await todosService.archiveTodoGroup(groupId);
        closeEditor();
      } catch (err) {
        console.error("Failed to archive group:", err);
        throw err;
      }
    },
    [todosService, closeEditor]
  );

  const handleTogglePinGroup = useCallback(
    async (groupId: number) => {
      try {
        const updatedGroup = await todosService.togglePinTodoGroup(groupId);
        if (activeGroup?.id === groupId) {
          setActiveGroup(updatedGroup);
        }
      } catch (err) {
        console.error("Failed to toggle pin:", err);
        throw err;
      }
    },
    [activeGroup, todosService]
  );

  return {
    // Service state
    todoGroups: todosService.todoGroups,
    isLoading: todosService.isLoading,
    error: todosService.error,

    // Editor state
    isEditorOpen,
    activeGroup,
    // Items are now part of activeGroup.todo_items
    activeTodoItems: activeGroup?.todo_items || [],
    isLoadingItems,

    // Actions
    openCreateGroup,
    openEditGroup,
    closeEditor,
    handleSaveGroup,
    handleDeleteGroup,
    handleArchiveGroup,
    handleTogglePinGroup,
  };
};
