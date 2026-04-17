"use client";

import { useEffect, useState, useCallback } from "react";
import { todosService } from "@/services/todos.service";
import {
  TodoGroup,
  TodoItem,
  TodosServiceState,
  CreateTodoGroupPayload,
  UpdateTodoGroupPayload,
  BatchCreateTodoItemPayload,
  BatchUpdateTodoItemPayload,
} from "@/types/todos.types";

// Helper to update a TodoGroup in the list
const upsertTodoGroup = (groups: TodoGroup[], updatedGroup: TodoGroup) => {
  const remainingGroups = groups.filter((g) => g.id !== updatedGroup.id);
  // Pinned groups should appear first, then by creation date
  return remainingGroups.some((g) => g.is_pinned)
    ? [
        ...remainingGroups.filter((g) => g.is_pinned),
        updatedGroup,
        ...remainingGroups.filter((g) => !g.is_pinned),
      ]
    : [updatedGroup, ...remainingGroups];
};

// Helper to sort items by position
const sortItemsByPosition = (items: TodoItem[]): TodoItem[] => {
  return [...items].sort((a, b) => a.position - b.position);
};

export const useTodosService = () => {
  const [state, setState] = useState<TodosServiceState>({
    todoGroups: [],
    activeTodoGroup: null,
    isLoading: true,
    error: null,
  });

  // Load all todo groups on mount
  useEffect(() => {
    let isMounted = true;

    const loadTodoGroups = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const groups = await todosService.getTodoGroups();

        if (!isMounted) return;

        setState((prev) => ({
          ...prev,
          todoGroups: groups,
          error: null,
          isLoading: false,
        }));
      } catch (err) {
        console.error("Failed to load todo groups:", err);

        if (!isMounted) return;

        setState((prev) => ({
          ...prev,
          error: "Failed to load todo groups.",
          isLoading: false,
        }));
      }
    };

    loadTodoGroups();

    return () => {
      isMounted = false;
    };
  }, []);

  // --- Group Operations ---
  const createTodoGroup = useCallback(
    async (payload: CreateTodoGroupPayload): Promise<TodoGroup> => {
      try {
        const newGroup = await todosService.createTodoGroup(payload);

        setState((prev) => ({
          ...prev,
          todoGroups: [newGroup, ...prev.todoGroups],
        }));

        return newGroup;
      } catch (err) {
        console.error("Failed to create todo group:", err);
        setState((prev) => ({
          ...prev,
          error: "Failed to create group.",
        }));
        throw err;
      }
    },
    []
  );

  const updateTodoGroup = useCallback(
    async (id: number, payload: UpdateTodoGroupPayload): Promise<TodoGroup> => {
      try {
        const updatedGroup = await todosService.updateTodoGroup(id, payload);

        setState((prev) => ({
          ...prev,
          todoGroups: upsertTodoGroup(prev.todoGroups, updatedGroup),
          activeTodoGroup:
            prev.activeTodoGroup?.id === id ? updatedGroup : prev.activeTodoGroup,
        }));

        return updatedGroup;
      } catch (err) {
        console.error("Failed to update todo group:", err);
        setState((prev) => ({
          ...prev,
          error: "Failed to update group.",
        }));
        throw err;
      }
    },
    []
  );

  const deleteTodoGroup = useCallback(async (id: number): Promise<void> => {
    try {
      await todosService.deleteTodoGroup(id);

      setState((prev) => ({
        ...prev,
        todoGroups: prev.todoGroups.filter((g) => g.id !== id),
        activeTodoGroup:
          prev.activeTodoGroup?.id === id ? null : prev.activeTodoGroup,
      }));
    } catch (err) {
      console.error("Failed to delete todo group:", err);
      setState((prev) => ({
        ...prev,
        error: "Failed to delete group.",
      }));
      throw err;
    }
  }, []);

  const archiveTodoGroup = useCallback(
    async (id: number): Promise<TodoGroup> => {
      try {
        const archivedGroup = await todosService.archiveTodoGroup(id);

        setState((prev) => ({
          ...prev,
          todoGroups: upsertTodoGroup(prev.todoGroups, archivedGroup),
          activeTodoGroup:
            prev.activeTodoGroup?.id === id ? archivedGroup : prev.activeTodoGroup,
        }));

        return archivedGroup;
      } catch (err) {
        console.error("Failed to archive todo group:", err);
        setState((prev) => ({
          ...prev,
          error: "Failed to archive group.",
        }));
        throw err;
      }
    },
    []
  );

  const togglePinTodoGroup = useCallback(
    async (id: number): Promise<TodoGroup> => {
      try {
        const updatedGroup = await todosService.togglePinTodoGroup(id);

        setState((prev) => ({
          ...prev,
          todoGroups: upsertTodoGroup(prev.todoGroups, updatedGroup),
          activeTodoGroup:
            prev.activeTodoGroup?.id === id ? updatedGroup : prev.activeTodoGroup,
        }));

        return updatedGroup;
      } catch (err) {
        console.error("Failed to toggle pin:", err);
        setState((prev) => ({
          ...prev,
          error: "Failed to toggle pin.",
        }));
        throw err;
      }
    },
    []
  );

  // Set the active group (items are already loaded with it)
  const setActiveTodoGroup = useCallback(async (group: TodoGroup) => {
    try {
      const fullGroup = await todosService.getTodoGroup(group.id);

      setState((prev) => ({
        ...prev,
        activeTodoGroup: fullGroup,
      }));
    } catch (err) {
      console.error("Failed to set active group:", err);
      setState((prev) => ({
        ...prev,
        error: "Failed to load group details.",
      }));
    }
  }, []);

  // --- Batch Save (unified item operations) ---
  /**
   * Save all items for a todo group.
   * Batch creates new items, then updates/deletes existing.
   * Each batch operation returns the full TodoGroup with authoritative items state.
   * Updates both activeTodoGroup and todoGroups array directly from response.
   */
  const saveTodoGroupItems = useCallback(
    async (
      groupId: number,
      localItems: any[],
      deleteItemIds: number[] = []
    ): Promise<void> => {
      try {
        let updatedGroup: TodoGroup | null = null;

        // Separate new items (string IDs) from existing (number IDs)
        const newItems = localItems.filter((item) => typeof item.id === "string");
        const existingItems = localItems.filter((item) => typeof item.id === "number");

        // Step 1: Batch create new items if any
        if (newItems.length > 0) {
          const createPayload = newItems.map((item) => ({
            task: item.task,
            is_completed: item.is_completed ?? false,
            position: localItems.findIndex(i => i.id === item.id),
          }));

          updatedGroup = await todosService.batchCreateTodoItems(
            groupId,
            createPayload
          );
        }

        // Step 2: Batch update/delete if needed
        if (existingItems.length > 0 || deleteItemIds.length > 0) {
          const updatePayload = existingItems.map((item) => ({
            id: item.id as number,
            task: item.task,
            is_completed: item.is_completed ?? false,
            position: localItems.findIndex(i => i.id === item.id),
          }));

          updatedGroup = await todosService.batchUpdateTodoItems(
            groupId,
            updatePayload,
            deleteItemIds
          );
        }

        // Step 3: Update state with the authoritative TodoGroup from server
        if (updatedGroup) {
          setState((prev) => ({
            ...prev,
            activeTodoGroup: updatedGroup,
            todoGroups: prev.todoGroups.map((g) =>
              g.id === groupId ? updatedGroup : g
            ),
          }));
        }
      } catch (err) {
        console.error("Failed to save todo group items:", err);
        setState((prev) => ({
          ...prev,
          error: "Failed to save items.",
        }));
        throw err;
      }
    },
    []
  );

  return {
    // State
    todoGroups: state.todoGroups,
    activeTodoGroup: state.activeTodoGroup,
    isLoading: state.isLoading,
    error: state.error,

    // Group actions
    createTodoGroup,
    updateTodoGroup,
    deleteTodoGroup,
    archiveTodoGroup,
    togglePinTodoGroup,
    setActiveTodoGroup,

    // Batch save (unified item operations)
    saveTodoGroupItems,
  };
};
