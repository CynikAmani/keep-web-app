"use client";

import * as ui from "@/config/uiClasses";
import NoteEditor from "@/features/notes/components/NoteEditor";
import NoteDisplay from "@/features/notes/components/NoteDisplay";
import { useNoteManager } from "@/features/notes/hooks/useNoteManager";

export default function NoteManager() {
  const {
    notes,
    activeNote,
    isEditorOpen,
    isLoading,
    error,
    openCreateNote,
    openEditNote,
    closeEditor,
    handleSave,
  } = useNoteManager();

  return (
    <div className={`${ui.containerPage} py-10`}>
      <NoteDisplay
        notes={notes}
        isLoading={isLoading}
        error={error}
        onCreate={openCreateNote}
        onEdit={openEditNote}
      />

      {isEditorOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
            onClick={closeEditor}
          />

          <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-200">
            <NoteEditor
              initialData={activeNote}
              onClose={closeEditor}
              onSave={handleSave}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
