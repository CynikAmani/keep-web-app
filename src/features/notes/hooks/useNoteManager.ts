"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { noteService } from "@/features/notes/services/note.service";
import { Note } from "@/features/notes/types/note.types";

const upsertNote = (notes: Note[], savedNote: Note) => {
  const remainingNotes = notes.filter((note) => note.id !== savedNote.id);
  return [savedNote, ...remainingNotes];
};

export const useNoteManager = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadNotes = async () => {
      setIsLoading(true);

      try {
        const fetchedNotes = await noteService.getNotes();

        if (!isMounted) {
          return;
        }

        setNotes(fetchedNotes);
        setError(null);
      } catch (loadError) {
        console.error("Failed to load notes:", loadError);

        if (!isMounted) {
          return;
        }

        setError("Failed to load notes.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (searchParams?.get("action") !== "new") {
      return;
    }

    setActiveNote(null);
    setIsEditorOpen(true);
  }, [searchParams]);

  const clearNewAction = () => {
    if (searchParams?.get("action") === "new") {
      router.replace(pathname);
    }
  };

  const openCreateNote = () => {
    setActiveNote(null);
    setIsEditorOpen(true);
  };

  const openEditNote = (note: Note) => {
    setActiveNote(note);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setActiveNote(null);
    setIsEditorOpen(false);
    clearNewAction();
  };

  const handleSave = (savedNote?: Note) => {
    if (savedNote) {
      setNotes((currentNotes) => upsertNote(currentNotes, savedNote));
    }

    closeEditor();
  };

  return {
    notes,
    activeNote,
    isEditorOpen,
    isLoading,
    error,
    openCreateNote,
    openEditNote,
    closeEditor,
    handleSave,
  };
};
