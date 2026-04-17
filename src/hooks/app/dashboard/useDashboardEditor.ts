"use client";

import { useState, useCallback } from "react";
import { Note } from "@/types/note.types";
import { TodoGroup } from "@/types/todos.types";

export type EditingItemType = "note" | "todo" | null;

interface DashboardEditorState {
  isOpen: boolean;
  type: EditingItemType;
  noteData: Note | null;
  todoData: TodoGroup | null;
}

export const useDashboardEditor = () => {
  const [editorState, setEditorState] = useState<DashboardEditorState>({
    isOpen: false,
    type: null,
    noteData: null,
    todoData: null,
  });

  const openNoteEditor = useCallback((note: Note) => {
    setEditorState({
      isOpen: true,
      type: "note",
      noteData: note,
      todoData: null,
    });
  }, []);

  const openTodoEditor = useCallback((todo: TodoGroup) => {
    setEditorState({
      isOpen: true,
      type: "todo",
      noteData: null,
      todoData: todo,
    });
  }, []);

  const closeEditor = useCallback(() => {
    setEditorState({
      isOpen: false,
      type: null,
      noteData: null,
      todoData: null,
    });
  }, []);

  return {
    isOpen: editorState.isOpen,
    editorType: editorState.type,
    noteData: editorState.noteData,
    todoData: editorState.todoData,
    openNoteEditor,
    openTodoEditor,
    closeEditor,
  };
};
