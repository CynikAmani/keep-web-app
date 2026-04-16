"use client";

import * as ui from "@/config/uiClasses";
import { Pin } from "lucide-react";
import { Note } from "@/types/note.types";

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
}

const formatUpdatedAt = (updatedAt: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(updatedAt));

export default function NoteCard({ note, onEdit }: NoteCardProps) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className={`${ui.cardLg} ${ui.stackMd} w-full border-none bg-card text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-bold text-foreground">
            {note.title || "Untitled note"}
          </h3>
        </div>

        {note.is_pinned ? (
          <span className="rounded-full bg-brand/10 p-2 text-brand">
            <Pin size={16} strokeWidth={2.5} />
          </span>
        ) : null}
      </div>

      <div className="h-px w-full bg-border/40" />

      <div className="min-h-36 rounded-xl bg-muted/30 p-4">
        <p className="line-clamp-5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
          {note.content?.trim() || "Open this note to start writing."}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 text-sm">
        <span className={ui.textSecondary}>Updated {formatUpdatedAt(note.updated_at)}</span>
        <span className={ui.btnGhostSm}>Open</span>
      </div>
    </button>
  );
}
