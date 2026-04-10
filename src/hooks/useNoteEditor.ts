import { useState, useEffect, useCallback } from "react";
import { noteService } from "@/services/note.service";
import { NotePayload } from "@/types/note.types";

export function useNoteEditor(noteId?: number, onSave?: () => void) {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<NotePayload>({
    title: "",
    content: null,
    label_id: null,
    color: "white",
    is_pinned: false,
  });

  const fetchNote = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const data = await noteService.getNote(id);
      setNote({
        title: data.title,
        content: data.content,
        label_id: data.label_id,
        color: data.color,
        is_pinned: data.is_pinned,
      });
    } catch (error) {
      console.error("Failed to fetch note:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (noteId) {
      fetchNote(noteId);
    }
  }, [noteId, fetchNote]);

  const updateField = <K extends keyof NotePayload>(
    field: K, 
    value: NotePayload[K]
  ) => {
    setNote((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await noteService.saveNote(note, noteId);
      if (onSave) onSave();
    } catch (error) {
      console.error("Save operation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    note,
    loading,
    updateField,
    handleSave,
  };
}