"use client";

import * as ui from "@/config/uiClasses";
import { Check, Trash2, Loader2 } from "lucide-react";

interface TodoItem {
  id: string | number;
  task: string;
  is_completed: boolean;
}

interface TodoEditorItemListProps {
  items: TodoItem[];
  isLoading?: boolean;
  onToggleCompletion: (id: string | number) => void;
  onChangeTask: (id: string | number, task: string) => void;
  onDelete: (id: string | number) => void;
}

export default function TodoEditorItemList({
  items,
  isLoading,
  onToggleCompletion,
  onChangeTask,
  onDelete,
}: TodoEditorItemListProps) {
  const activeItems = items.filter((item) => !item.is_completed);
  const completedItems = items.filter((item) => item.is_completed);

  return (
    <div className="flex-1 overflow-y-auto my-4 space-y-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <Loader2 size={24} className="animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading items...</p>
        </div>
      ) : (
        <>
          {/* Active Items */}
          {activeItems.length > 0 && (
            <div className="space-y-2">
              <h3 className={`text-sm font-semibold ${ui.textSecondary} px-1`}>
                To Do
              </h3>
              <div className="space-y-1">
                {activeItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 group hover:bg-accent/30 px-2 py-1.5 rounded-md transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => onToggleCompletion(item.id)}
                      className="shrink-0 w-6 h-6 rounded border-2 border-border hover:border-foreground transition-colors flex items-center justify-center cursor-pointer"
                      title="Mark as completed"
                    >
                      <div className="w-full h-full" />
                    </button>
                    <input
                      type="text"
                      value={item.task}
                      onChange={(e) => onChangeTask(item.id, e.target.value)}
                      className="flex-1 text-sm bg-transparent border-none outline-none focus:ring-0 px-2 py-1"
                      placeholder="Task"
                    />
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="shrink-0 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/10 rounded cursor-pointer"
                      title="Delete item"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Items */}
          {completedItems.length > 0 && (
            <div className="space-y-2">
              <h3 className={`text-sm font-semibold ${ui.textSecondary} px-1 mt-4`}>
                Completed
              </h3>
              <div className="space-y-1">
                {completedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 group hover:bg-accent/30 px-2 py-1.5 rounded-md transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => onToggleCompletion(item.id)}
                      className="shrink-0 w-6 h-6 rounded border-2 border-foreground bg-foreground flex items-center justify-center cursor-pointer"
                      title="Mark as incomplete"
                    >
                      <Check size={16} className="text-background" strokeWidth={3} />
                    </button>
                    <input
                      type="text"
                      value={item.task}
                      onChange={(e) => onChangeTask(item.id, e.target.value)}
                      className="flex-1 text-sm line-through text-muted-foreground bg-transparent border-none outline-none focus:ring-0 px-2 py-1"
                      placeholder="Task"
                    />
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="shrink-0 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity p-2 hover:bg-destructive/10 rounded cursor-pointer"
                      title="Delete item"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {items.length === 0 && (
            <div className="text-center py-8 text-muted-foreground/50">
              <p className="text-sm">No items yet. Add one to get started!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
