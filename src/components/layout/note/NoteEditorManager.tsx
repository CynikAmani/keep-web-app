"use client";

import { useNoteEditorStore } from "@/store/noteEditor.store";
import NoteEditor from "@/components/app/notes/NoteEditor";

export default function NoteEditorManager() {
  const { isOpen, activeNote, closeNoteEditor } = useNoteEditorStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent backdrop */}
      <div 
        className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity" 
        onClick={closeNoteEditor} 
      />
      
      {/* Editor Container */}
      <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-200">
        <NoteEditor 
          initialData={activeNote} 
          onSave={closeNoteEditor} 
        />
      </div>
    </div>
  );
}