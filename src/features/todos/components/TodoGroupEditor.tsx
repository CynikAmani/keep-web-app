"use client";

import { useState, useEffect } from "react";
import { Pin, PinOff, Archive, Trash2, Save, Check, Loader2 } from "lucide-react";
import { TodoGroup, CreateTodoGroupPayload, UpdateTodoGroupPayload, TodoItem } from "@/features/todos/types/todos.types";
import * as ui from "@/config/uiClasses";
import { PERMISSIONS } from "@/config/permissions.config";
import { useTodoGroupEditor } from "@/features/todos/hooks/useTodoGroupEditor";
import TodoGroupEditorHeader from "@/features/todos/components/TodoGroupEditorHeader";
import TodoGroupEditorItemInput from "@/features/todos/components/TodoGroupEditorItemInput";
import TodoEditorItemList from "@/features/todos/components/TodoEditorItemList";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isPinning, setIsPinning] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const isEditMode = !!initialData;
  const isAnyActionLoading = isSaving || isDeleting || isArchiving || isPinning;

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setLocalItems(
        initialItems.map((item) => ({
          id: item.id,
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
      id: String(Date.now() + Math.random()),
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
    if (!validateForm()) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave(formData, localItems, initialItems);
    } catch (err) {
      console.error("Save failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to save group");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData || !onDelete) return;
    if (!confirm(`Delete "${initialData.title}"? This action cannot be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(initialData.id);
    } catch (err) {
      console.error("Delete failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to delete group");
      setIsDeleting(false);
    }
  };

  const handleArchive = async () => {
    if (!initialData || !onArchive) return;
    setIsArchiving(true);
    try {
      await onArchive(initialData.id);
    } catch (err) {
      console.error("Archive failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to archive group");
      setIsArchiving(false);
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
    <div className={`${ui.cardLg} flex flex-col w-full shadow-2xl bg-card border-none animate-in fade-in zoom-in-95 duration-200 sm:max-w-2xl max-h-screen sm:max-h-[85vh]`}>
      {/* Header */}
      <form id="editor-form" onSubmit={handleSubmit} className="flex flex-col gap-3 shrink-0 px-4 sm:px-6 pt-4 sm:pt-6">
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
          isSaving={isAnyActionLoading}
        />
      </form>

      {/* Items List - Expands with content, scrolls only when needed */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-2">
        <TodoEditorItemList
          items={localItems}
          isLoading={isLoadingItems}
          onToggleCompletion={handleToggleItemCompletion}
          onChangeTask={handleUpdateItemTask}
          onDelete={handleDeleteItem}
        />
      </div>

      {/* Actions Footer - Requires PERMISSIONS.TODO.UPDATE_GROUP (pin/archive) and PERMISSIONS.TODO.DELETE_GROUP (delete) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 px-4 sm:px-6 pb-4 sm:pb-6 border-t border-border/30 shrink-0">
        {/* Left side: Action buttons */}
        <div className="flex items-center gap-1">
          {isEditMode && (
            <>
              {/* Pin/Unpin */}
              <button
                onClick={handleTogglePin}
                disabled={isAnyActionLoading}
                type="button"
                className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent ${
                  initialData?.is_pinned ? "bg-brand/10 text-brand" : ""
                }`}
                title={initialData?.is_pinned ? "Unpin group" : "Pin group"}
              >
                {initialData?.is_pinned ? (
                  <PinOff size={20} strokeWidth={2} />
                ) : (
                  <Pin size={20} strokeWidth={2} />
                )}
              </button>

              {/* Archive/Restore */}
              <button
                onClick={handleArchive}
                disabled={isAnyActionLoading}
                type="button"
                className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent`}
                title={initialData?.is_archived ? "Restore group" : "Archive group"}
              >
                <Archive size={20} strokeWidth={2} />
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                disabled={isAnyActionLoading}
                type="button"
                className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-destructive/10 text-destructive`}
                title="Delete group"
              >
                <Trash2 size={20} strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {/* Right side: Close + Save buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onClose}
            className={`${ui.btnGhostMd} ${ui.textSecondary} px-4 font-medium flex-1 sm:flex-none`}
            disabled={isAnyActionLoading}
          >
            Close
          </button>

          <button
            type="submit"
            form="editor-form"
            disabled={isAnyActionLoading}
            className={`
              ${ui.btnCreate} 
              min-w-12 h-11 px-6 rounded-full shadow-md hover:shadow-lg
              flex items-center justify-center gap-2 flex-1 sm:flex-none
            `}
          >
            {isAnyActionLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isEditMode ? (
              <>
                <Check size={18} strokeWidth={3} />
                <span className="font-bold">Update</span>
              </>
            ) : (
              <>
                <Save size={18} strokeWidth={2.5} />
                <span className="font-bold">Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
