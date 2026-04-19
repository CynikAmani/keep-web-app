"use client";

import * as ui from "@/config/uiClasses";
import { Plus } from "lucide-react";
import { Note } from "@/features/notes/types/note.types";
import NoteCard from "./NoteCard";

interface NoteDisplayProps {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  onCreate: () => void;
  onEdit: (note: Note) => void;
}

const sortNotes = (notes: Note[]) =>
  [...notes].sort(
    (firstNote, secondNote) =>
      new Date(secondNote.updated_at).getTime() - new Date(firstNote.updated_at).getTime()
  );

const renderSection = (title: string, notes: Note[], onEdit: (note: Note) => void) => {
  if (notes.length === 0) {
    return null;
  }

  return (
    <section className={ui.stackMd}>
      <div className="flex items-center justify-between gap-4">
        <h2 className={ui.headingMd}>{title}</h2>
        <span className={ui.textSecondary}>{notes.length}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onEdit={() => onEdit(note)} />
        ))}
      </div>
    </section>
  );
};

export default function NoteDisplay({
  notes,
  isLoading,
  error,
  onCreate,
  onEdit,
}: NoteDisplayProps) {
  const pinnedNotes = sortNotes(notes.filter((note) => note.is_pinned));
  const otherNotes = sortNotes(notes.filter((note) => !note.is_pinned));

  return (
    <div className={ui.stackXl}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className={ui.stackSm}>
          <h1 className={ui.headingHero}>Notes</h1>
          <p className={ui.textSecondary}>
            Open an existing note or start a new one from the same workspace.
          </p>
        </div>

        <button onClick={onCreate} className={ui.btnCreate}>
          <Plus size={18} />
          Create Note
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`${ui.cardLg} ${ui.stackMd} min-h-52 animate-pulse border-none bg-card/70 shadow-sm`}
            >
              <div className="h-6 w-2/5 rounded bg-muted" />
              <div className="h-px w-full bg-border/40" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-11/12 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className={`${ui.cardLg} ${ui.stackSm} border-none shadow-sm`}>
          <h2 className={ui.headingMd}>Unable to load notes</h2>
          <p className={ui.textSecondary}>{error}</p>
        </div>
      ) : null}

      {!isLoading && !error && notes.length === 0 ? (
        <div className={`${ui.cardLg} ${ui.stackMd} min-h-72 items-center justify-center border-none text-center shadow-sm`}>
          <h2 className={ui.headingLg}>No notes yet</h2>
          <p className={`${ui.textSecondary} max-w-md`}>
            Start with a new note and it will appear here ready for quick reopening and editing.
          </p>
          <button onClick={onCreate} className={ui.btnCreate}>
            <Plus size={18} />
            Create Your First Note
          </button>
        </div>
      ) : null}

      {!isLoading && !error && notes.length > 0 ? (
        <div className={ui.stackXl}>
          {renderSection("Pinned", pinnedNotes, onEdit)}
          {renderSection("All Notes", otherNotes, onEdit)}
        </div>
      ) : null}
    </div>
  );
}
