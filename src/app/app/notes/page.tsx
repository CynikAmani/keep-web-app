'use client'

import * as ui from "@/config/uiClasses";
import { Plus, Edit3 } from "lucide-react";
import NoteEditorManager from "@/components/layout/note/NoteEditorManager";
import { useNoteEditorStore } from "@/store/noteEditor.store";

export default function NotesPage() {
  const { openNoteEditor } = useNoteEditorStore();

  const sampleNote = {
    id: 101,
    title: "Project Research",
    content: "Looking into Next.js 16 features and Turbopack performance.",
    color: "white",
    is_pinned: true,
    is_archived: false,
    label_id: null,
    updated_at: new Date().toISOString()
  };

  return (
    <div className={`${ui.containerPage} py-10`}>
      <h1 className={`${ui.headingHero} mb-8`}>Notes</h1>

      <div className="flex gap-4">
        {/* Trigger for New Note */}
        <button 
          onClick={() => openNoteEditor()} 
          className={ui.btnCreate}
        >
          <Plus size={20} />
          Create New Note
        </button>

        {/* Trigger for Existing Note */}
        <button 
          onClick={() => openNoteEditor(sampleNote)} 
          className={ui.btnEdit}
        >
          <Edit3 size={20} />
          Edit Sample Note
        </button>
      </div>

      {/* The Global Manager (Always listening) */}
      <NoteEditorManager />
    </div>
  );
}