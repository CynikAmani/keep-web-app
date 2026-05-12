"use client";

import { useState, useEffect, useRef } from "react";
import { Pin, PinOff, Archive, ArchiveRestore, Trash2, Save, Check, Loader2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
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
  onUnarchive?: (groupId: number) => Promise<void>;
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
  onUnarchive,
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isEditMode = !!initialData;
  const isAnyActionLoading = isSaving || isDeleting || isArchiving || isPinning;

  // Refs for auto-focus
  const titleInputRef = useRef<HTMLInputElement>(null);
  const todoItemInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus logic
  useEffect(() => {
    if (isEditMode) {
      // For existing groups: check if title is empty, otherwise focus on todo item input
      if (!formData.title?.trim()) {
        titleInputRef.current?.focus();
      } else {
        todoItemInputRef.current?.focus();
      }
    } else {
      // For new groups: always focus on title
      titleInputRef.current?.focus();
    }
  }, [isEditMode, formData.title]);

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
    setIsDeleting(true);
    try {
      await onDelete(initialData.id);
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Delete failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to delete group");
      setIsDeleting(false);
    }
  };

  const handleArchive = async () => {
    if (!initialData) return;
    setIsArchiving(true);
    try {
      if (initialData.is_archived && onUnarchive) {
        await onUnarchive(initialData.id);
      } else if (!initialData.is_archived && onArchive) {
        await onArchive(initialData.id);
      }
    } catch (err) {
      console.error("Archive/Unarchive failed:", err);
      setSaveError(err instanceof Error ? err.message : "Failed to toggle archive status");
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
          titleInputRef={titleInputRef}
        />

        <TodoGroupEditorItemInput
          value={newItemInput}
          onChange={setNewItemInput}
          onAdd={handleAddItem}
          isSaving={isAnyActionLoading}
          inputRef={todoItemInputRef}
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
                className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent ${
                  initialData?.is_archived ? "bg-green-10 text-green-600" : ""
                }`}
                title={initialData?.is_archived ? "Unarchive group" : "Archive group"}
              >
                {initialData?.is_archived ? (
                  <ArchiveRestore size={20} strokeWidth={2} />
                ) : (
                  <Archive size={20} strokeWidth={2} />
                )}
              </button>

              {/* More Options Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    disabled={isAnyActionLoading}
                    type="button"
                    className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent`}
                    title="More options"
                  >
                    <MoreHorizontal size={20} strokeWidth={2} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isAnyActionLoading}
                  >
                    <Trash2 size={16} strokeWidth={2} className="mr-2" />
                    Delete Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

      {/* Delete Confirmation Dialog */}
      {initialData && (
        <ConfirmDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          title="Delete Todo Group"
          description={`Are you sure you want to delete "${initialData.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          isConfirming={isDeleting}
          variant="destructive"
        />
      )}
    </div>
  );
}
