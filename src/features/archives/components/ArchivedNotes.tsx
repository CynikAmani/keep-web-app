"use client";

import { useState } from "react";
import { ArchiveRestore, Trash2 } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { useArchivedNotes } from "@/features/archives/hooks/useArchivedNotes";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";
import { Note } from "@/features/notes/types/note.types";

export default function ArchivedNotes() {
  const {
    archivedNotes,
    isLoading,
    error,
    unarchiveNote,
    deleteNote,
    clearError,
  } = useArchivedNotes();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUnarchive = async (noteId: number) => {
    const success = await unarchiveNote(noteId);
    if (success) {
      toast.success("Note unarchived successfully");
    }
  };

  const handleDeleteClick = (noteId: number) => {
    setNoteToDelete(noteId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return;
    
    const success = await deleteNote(noteToDelete);
    if (success) {
      setShowDeleteDialog(false);
      setNoteToDelete(null);
      setIsDeleting(false);
      toast.success("Note deleted successfully");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`${ui.cardBase} h-32 animate-pulse bg-card/70`} />
        ))}
      </div>
    );
  }

  if (archivedNotes.length === 0) {
    return (
      <div className={`${ui.cardBase} text-center py-12`}>
        <ArchiveRestore size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No archived notes</h3>
        <p className={ui.textSecondary}>Notes you archive will appear here for easy access.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {archivedNotes.map((note) => (
          <div key={note.id} className={`${ui.cardBase} group hover:border-brand/30 transition-colors`}>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground line-clamp-1">{note.title || "Untitled"}</h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleUnarchive(note.id)}
                    className={`${ui.btnGhostSm} p-1.5 rounded-md text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20`}
                    title="Unarchive note"
                  >
                    <ArchiveRestore size={16} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(note.id)}
                    disabled={isDeleting}
                    className={`${ui.btnGhostSm} p-1.5 rounded-md text-destructive hover:bg-destructive/10`}
                    title="Delete note"
                  >
                    <Trash2 size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
              
              <p className={`text-sm ${ui.textSecondary} line-clamp-3`}>
                {note.content || "No content"}
              </p>
              
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>Archived {new Date(note.updated_at).toLocaleDateString()}</span>
                {note.is_pinned && (
                  <span className="bg-brand/10 text-brand px-2 py-1 rounded-full text-xs font-medium">
                    Pinned
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      {noteToDelete && (
        <ConfirmDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          title="Delete Archived Note"
          description="Are you sure you want to delete this note? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          isConfirming={isDeleting}
          variant="destructive"
        />
      )}
    </>
  );
}
