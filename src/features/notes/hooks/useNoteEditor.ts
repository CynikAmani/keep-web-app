import { useState, useEffect } from "react";
import { noteService } from "@/features/notes/services/note.service";
import { Note, NotePayload } from "@/features/notes/types/note.types";

export function useNoteEditor(initialData: Note | null, onSave?: (note?: Note) => void) {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<NotePayload>({
    title: "",
    content: null,
    label_id: null,
    color: "white",
    is_pinned: false,
  });

  useEffect(() => {
    if (initialData) {
      setNote({
        title: initialData.title,
        content: initialData.content,
        label_id: initialData.label_id,
        color: initialData.color,
        is_pinned: initialData.is_pinned,
      });
    } else {
      setNote({ title: "", content: null, label_id: null, color: "white", is_pinned: false });
    }
  }, [initialData]);

  const updateField = <K extends keyof NotePayload>(field: K, value: NotePayload[K]) => {
    setNote((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!note.title?.trim() && !note.content?.trim()) {
      if (onSave) onSave();
      return;
    }

    setLoading(true);
    try {
      const savedNote = await noteService.saveNote(note, initialData?.id);
      if (onSave) onSave(savedNote);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { note, loading, updateField, handleSave };
}
