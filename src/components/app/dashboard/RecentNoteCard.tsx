"use client";

import { Pin } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { dateFormatter } from "@/utils/dateFormatter";
import { Note } from "@/types/note.types";

interface RecentNoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
}

export default function RecentNoteCard({ note, onEdit }: RecentNoteCardProps) {
  return (
    <button
      type="button"
      onClick={() => onEdit(note)}
      className={`${ui.cardMd} w-full border-none bg-card text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer group flex flex-col`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="truncate font-semibold text-foreground group-hover:text-brand transition-colors">
          {note.title || "Untitled"}
        </h3>
        {note.is_pinned && (
          <span className="rounded-full bg-brand/10 p-1.5 shrink-0">
            <Pin size={12} strokeWidth={2.5} className="text-brand" />
          </span>
        )}
      </div>

      <div className="min-h-20 rounded-lg bg-muted/30 p-3 mb-3 flex-1">
        <p className="line-clamp-3 text-xs leading-relaxed text-foreground/70">
          {note.content?.trim() || "No content yet"}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className={`${ui.textSecondary} text-xs`}>
          {dateFormatter.cardDate(note.updated_at)}
        </span>
        <span className={`${ui.btnGhostSm} text-xs py-1 px-2 h-auto`}>
          Edit
        </span>
      </div>
    </button>
  );
}
