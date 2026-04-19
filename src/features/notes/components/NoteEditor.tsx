"use client";

import { useState } from "react";
import { Pin, PinOff, Archive, Trash2, Save, Check, Loader2 } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { PERMISSIONS } from "@/config/permissions.config";
import { useNoteEditor } from "@/features/notes/hooks/useNoteEditor";
import { noteService } from "@/features/notes/services/note.service";
import { Note } from "@/features/notes/types/note.types";
import { toast } from "sonner";

interface NoteEditorProps {
  initialData: Note | null;
  onClose: () => void;
  onSave: (note?: Note) => void;
  onArchive?: (noteId: number) => Promise<void>;
  onDelete?: (noteId: number) => Promise<void>;
  onTogglePin?: (noteId: number) => Promise<void>;
}

export default function NoteEditor({
  initialData,
  onClose,
  onSave,
  onArchive,
  onDelete,
  onTogglePin,
}: NoteEditorProps) {
  const { note, loading, updateField, handleSave } = useNoteEditor(initialData, onSave);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isPinning, setIsPinning] = useState(false);
  const isEditMode = Boolean(initialData?.id);
  const isAnyActionLoading = loading || isDeleting || isArchiving || isPinning;

  const handleTogglePin = async () => {
    if (!initialData?.id || !onTogglePin) return;
    setIsPinning(true);
    try {
      await onTogglePin(initialData.id);
    } catch (err) {
      console.error("Toggle pin failed:", err);
      toast.error("Failed to toggle pin");
    } finally {
      setIsPinning(false);
    }
  };

  const handleArchive = async () => {
    if (!initialData?.id || !onArchive) return;
    setIsArchiving(true);
    try {
      await onArchive(initialData.id);
    } catch (err) {
      console.error("Archive failed:", err);
      toast.error("Failed to archive note");
    } finally {
      setIsArchiving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id || !onDelete) return;
    if (!confirm(`Delete "${initialData.title || "Untitled"}"? This action cannot be undone.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(initialData.id);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete note");
      setIsDeleting(false);
    }
  };

  return (
    <div className={`${ui.cardLg} flex flex-col w-full shadow-2xl bg-card border-none animate-in fade-in zoom-in-95 duration-200 sm:max-w-2xl max-h-screen sm:max-h-[85vh]`}>
      {/* Header */}
      <form id="editor-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="flex flex-col gap-3 shrink-0 px-4 sm:px-6 pt-4 sm:pt-6">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => updateField("title", e.target.value)}
          className={`${ui.fontSans} text-xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30`}
          disabled={isAnyActionLoading}
        />
        <div className="h-px w-full bg-border/40" />
      </form>

      {/* Content - Expands naturally with content up to max, then scrolls */}
      <textarea
        placeholder="Start typing..."
        value={note.content ?? ""}
        onChange={(e) => updateField("content", e.target.value || null)}
        disabled={isAnyActionLoading}
        className={`
          ${ui.fontSans} text-base leading-relaxed
          flex-1 min-h-64 max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 rounded-xl
          bg-muted/30 border-none outline-none resize-none
          placeholder:text-muted-foreground/30
          transition-colors focus:bg-muted/50 overflow-y-auto
        `}
      />

      {/* Actions Footer - Requires PERMISSIONS.NOTE.UPDATE (pin/archive) and PERMISSIONS.NOTE.DELETE (delete) */}
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
                title={initialData?.is_pinned ? "Unpin note" : "Pin note"}
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
                title={initialData?.is_archived ? "Restore note" : "Archive note"}
              >
                <Archive size={20} strokeWidth={2} />
              </button>

              {/* Delete */}
              <button
                onClick={handleDelete}
                disabled={isAnyActionLoading}
                type="button"
                className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-destructive/10 text-destructive`}
                title="Delete note"
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
