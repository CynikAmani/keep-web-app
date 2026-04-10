import { create } from 'zustand';
import { Note } from '@/types/note.types';

interface NoteEditorState {
  activeNote: Note | null;
  isOpen: boolean;
  openNoteEditor: (note?: Note) => void;
  closeNoteEditor: () => void;
}

export const useNoteEditorStore = create<NoteEditorState>((set) => ({
  activeNote: null,
  isOpen: false,
  openNoteEditor: (note) => set({ 
    activeNote: note ?? null, 
    isOpen: true 
  }),
  closeNoteEditor: () => set({ 
    activeNote: null, 
    isOpen: false 
  }),
}));