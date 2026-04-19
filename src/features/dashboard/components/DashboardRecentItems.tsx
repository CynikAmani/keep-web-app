"use client";

import { History } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { Note } from "@/features/notes/types/note.types";
import { TodoGroup } from "@/features/todos/types/todos.types";
import RecentNoteCard from "@/features/dashboard/components/RecentNoteCard";
import TodoGroupCard from "@/features/todos/components/TodoGroupCard";

interface DashboardRecentItemsProps {
  recentNotes: Note[];
  recentTodos: TodoGroup[];
  isLoading: boolean;
  onEditNote: (note: Note) => void;
  onEditTodo: (todo: TodoGroup) => void;
}

export default function DashboardRecentItems({
  recentNotes,
  recentTodos,
  isLoading,
  onEditNote,
  onEditTodo,
}: DashboardRecentItemsProps) {
  const hasItems = recentNotes.length > 0 || recentTodos.length > 0;

  return (
    <section className={ui.stackMd}>
      <div className="flex items-center gap-2">
        <History size={20} className={ui.textBrand} />
        <h2 className={ui.headingMd}>Recent Items</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`${ui.cardMd} border-none animate-pulse bg-card/70 min-h-40`}
            />
          ))}
        </div>
      ) : !hasItems ? (
        <div className={`${ui.cardLg} border-dashed border-2 bg-transparent ${ui.stackMd} items-center justify-center py-12 text-center`}>
          <History size={32} className={`${ui.textBrand} opacity-50`} />
          <p className={`${ui.textSecondary} max-w-sm`}>
            Your recent notes and todo groups will appear here. Start by creating or editing content.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentNotes.map((note) => (
            <RecentNoteCard key={`note-${note.id}`} note={note} onEdit={onEditNote} />
          ))}
          {recentTodos.map((todo) => (
            <TodoGroupCard key={`todo-${todo.id}`} group={todo} onEdit={onEditTodo} />
          ))}
        </div>
      )}
    </section>
  );
}
