import { useState, useEffect } from "react";
import { noteService } from "@/features/notes/services/note.service";
import { Note } from "@/features/notes/types/note.types";

export function useArchivedNotes() {
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArchivedNotes();
  }, []);

  const loadArchivedNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const notes = await noteService.getArchivedNotes();
      setArchivedNotes(notes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load archived notes");
    } finally {
      setIsLoading(false);
    }
  };

  const unarchiveNote = async (noteId: number) => {
    try {
      await noteService.unarchive(noteId);
      setArchivedNotes(prev => prev.filter(note => note.id !== noteId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unarchive note");
      return false;
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      await noteService.delete(noteId);
      setArchivedNotes(prev => prev.filter(note => note.id !== noteId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete note");
      return false;
    }
  };

  const clearError = () => setError(null);

  return {
    archivedNotes,
    isLoading,
    error,
    unarchiveNote,
    deleteNote,
    clearError,
    refetch: loadArchivedNotes,
  };
}
