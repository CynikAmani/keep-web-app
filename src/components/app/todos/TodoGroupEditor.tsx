"use client";

import { useState, useEffect } from "react";
import { TodoGroup, CreateTodoGroupPayload, UpdateTodoGroupPayload, TodoItem } from "@/types/todos.types";
import * as ui from "@/config/uiClasses";
import { useTodoGroupEditor } from "@/hooks/todos/useTodoGroupEditor";
import TodoGroupEditorHeader from "@/components/app/todos/TodoGroupEditorHeader";
import TodoGroupEditorItemInput from "@/components/app/todos/TodoGroupEditorItemInput";
import TodoEditorItemList from "@/components/app/todos/TodoEditorItemList";
import TodoGroupEditorFooter from "@/components/app/todos/TodoGroupEditorFooter";

interface TodoGroupEditorProps {
  initialData: TodoGroup | null;
  initialItems?: TodoItem[];
  isLoadingItems?: boolean;
  onClose: () => void;
  onSave: (
    payload: CreateTodoGroupPayload | UpdateTodoGroupPayload,
    localItems?: LocalTodoItem[],
    originalItems?: TodoItem[]
  ) => Promise<void>;
  onDelete?: (groupId: number) => Promise<void>;
  onArchive?: (groupId: number) => Promise<void>;
  onTogglePin?: (groupId: number) => Promise<void>;
}

interface LocalTodoItem {
  id: string | number;
  task: string;
  is_completed: boolean;
}

export default function TodoGroupEditor({
  initialData,
  initialItems = [],
  isLoadingItems = false,
  onClose,
  onSave,
  onDelete,
  onArchive,
  onTogglePin,
}: TodoGroupEditorProps) {
  const { formData, error, validateForm, updateField } =
    useTodoGroupEditor(initialData || undefined);
  
  const [localItems, setLocalItems] = useState<LocalTodoItem[]>([]);
  const [newItemInput, setNewItemInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Initialize local items from server data
  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setLocalItems(
        initialItems.map((item) => ({
          id: item.id, // Keep as number - don't convert
          task: item.task,
          is_completed: item.is_completed,
        }))
      );
    } else {
      setLocalItems([]);
    }
    setNewItemInput("");
  }, [initialItems]);

  const handleAddItem = () => {
    if (!newItemInput.trim()) return;

    const newItem: LocalTodoItem = {
      id: String(Date.now() + Math.random()), // Simple unique local ID
      task: newItemInput.trim(),
      is_completed: false,
    };

    setLocalItems((prev) => [...prev, newItem]);
    setNewItemInput("");
  };

  const handleToggleItemCompletion = (id: string | number) => {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_completed: !item.is_completed } : item
      )
    );
  };

  const handleUpdateItemTask = (id: string | number, task: string) => {
    setLocalItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task } : item))
    );
  };

  const handleDeleteItem = (id: string | number) => {
    setLocalItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave(formData, localItems, initialItems);
    } catch (err) {
      console.error("Save failed:", err);
      setSaveError(
        err instanceof Error ? err.message : "Failed to save group"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData || !onDelete) return;

    if (!confirm(`Delete "${initialData.title}"? This action cannot be undone.`)) {
      return;
    }

    setIsSaving(true);
    try {
      await onDelete(initialData.id);
    } catch (err) {
      console.error("Delete failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to delete group");
      setIsSaving(false);
    }
  };

  const handleArchive = async () => {
    if (!initialData || !onArchive) return;

    setIsSaving(true);
    try {
      await onArchive(initialData.id);
    } catch (err) {
      console.error("Archive failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to archive group");
      setIsSaving(false);
    }
  };

  const handleTogglePin = async () => {
    if (!initialData || !onTogglePin) return;

    try {
      await onTogglePin(initialData.id);
    } catch (err) {
      console.error("Toggle pin failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to toggle pin");
    }
  };

  return (
    <div className={`${ui.cardLg} flex flex-col w-full shadow-2xl bg-card border-none animate-in fade-in zoom-in-95 duration-200 max-h-[90vh]`}>
      <form id="editor-form" onSubmit={handleSubmit} className="flex flex-col gap-3 shrink-0">
        <TodoGroupEditorHeader
          formData={formData}
        updateField={(field: string, value: any) => {
          updateField(field as any, value);
        }}
        />

        <TodoGroupEditorItemInput
          value={newItemInput}
          onChange={setNewItemInput}
          onAdd={handleAddItem}
          isSaving={isSaving}
        />
      </form>

      <TodoEditorItemList
        items={localItems}
        isLoading={isLoadingItems}
        onToggleCompletion={handleToggleItemCompletion}
        onChangeTask={handleUpdateItemTask}
        onDelete={handleDeleteItem}
      />

      <TodoGroupEditorFooter
        color={formData.color || "white"}
        onColorChange={(color) => {
          updateField("color" as any, color);
        }}
        isSaving={isSaving}
        isEditing={!!initialData}
        isPinned={initialData?.is_pinned}
        isArchived={initialData?.is_archived}
        onTogglePin={handleTogglePin}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onClose={onClose}
        onSave={handleSubmit}
      />
    </div>
  );
}
