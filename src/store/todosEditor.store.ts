import { create } from 'zustand';
import { TodoGroup } from '@/types/todos.types';

interface TodosEditorState {
  activeGroup: TodoGroup | null;
  isGroupEditorOpen: boolean;
  openGroupEditor: (group?: TodoGroup) => void;
  closeGroupEditor: () => void;
}

export const useTodosEditorStore = create<TodosEditorState>((set) => ({
  activeGroup: null,
  isGroupEditorOpen: false,
  openGroupEditor: (group) => set({
    activeGroup: group ?? null,
    isGroupEditorOpen: true
  }),
  closeGroupEditor: () => set({
    activeGroup: null,
    isGroupEditorOpen: false
  }),
}));
