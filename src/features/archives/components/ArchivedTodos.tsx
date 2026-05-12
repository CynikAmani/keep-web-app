"use client";

import { useState } from "react";
import { ArchiveRestore, Trash2, CheckCircle } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { useArchivedTodos } from "@/features/archives/hooks/useArchivedTodos";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";
import { TodoGroup } from "@/features/todos/types/todos.types";

export default function ArchivedTodos() {
  const {
    archivedTodos,
    isLoading,
    error,
    unarchiveTodo,
    deleteTodo,
    clearError,
  } = useArchivedTodos();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUnarchive = async (todoId: number) => {
    const success = await unarchiveTodo(todoId);
    if (success) {
      toast.success("Todo group unarchived successfully");
    }
  };

  const handleDeleteClick = (todo: TodoGroup) => {
    setTodoToDelete(todo.id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    
    const success = await deleteTodo(todoToDelete);
    if (success) {
      setShowDeleteDialog(false);
      setTodoToDelete(null);
      setIsDeleting(false);
      toast.success("Todo group deleted successfully");
    }
  };

  const getCompletedCount = (todo: TodoGroup) => {
    if (!todo.todo_items) return 0;
    return todo.todo_items.filter(item => item.is_completed).length;
  };

  const getTotalCount = (todo: TodoGroup) => {
    return todo.todo_items?.length || 0;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`${ui.cardBase} h-32 animate-pulse bg-card/70`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${ui.cardBase} text-center py-12`}>
        <p className="text-destructive">{error}</p>
        <button 
          onClick={clearError}
          className={`${ui.btnCreate} mt-4`}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (archivedTodos.length === 0) {
    return (
      <div className={`${ui.cardBase} text-center py-12`}>
        <ArchiveRestore size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No archived todos</h3>
        <p className={ui.textSecondary}>Todo groups you archive will appear here for easy access.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {archivedTodos.map((todo) => {
          const completedCount = getCompletedCount(todo);
          const totalCount = getTotalCount(todo);
          
          return (
            <div key={todo.id} className={`${ui.cardBase} group hover:border-brand/30 transition-colors`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground line-clamp-1">{todo.title || "Untitled"}</h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleUnarchive(todo.id)}
                      disabled={isDeleting}
                      className={`${ui.btnGhostSm} p-1.5 rounded-md text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20`}
                      title="Unarchive todo group"
                    >
                      <ArchiveRestore size={16} strokeWidth={2} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(todo)}
                      disabled={isDeleting}
                      className={`${ui.btnGhostSm} p-1.5 rounded-md text-destructive hover:bg-destructive/10`}
                      title="Delete todo group"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
                
                {/* Progress indicator */}
                {totalCount > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-brand h-full transition-all duration-300"
                        style={{ width: `${(completedCount / totalCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium min-w-12 text-right">
                      {completedCount}/{totalCount}
                    </span>
                  </div>
                )}
                
                {/* Items preview */}
                {todo.todo_items && todo.todo_items.length > 0 && (
                  <div className="space-y-1">
                    {todo.todo_items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-4 h-4 rounded border-2 shrink-0 ${
                          item.is_completed 
                            ? 'bg-brand border-brand' 
                            : 'border-muted-foreground/30'
                        }`}>
                          {item.is_completed && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <span className="line-clamp-1">{item.task}</span>
                      </div>
                    ))}
                    {todo.todo_items.length > 3 && (
                      <div className="text-xs text-muted-foreground italic">
                        +{todo.todo_items.length - 3} more items...
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>Archived {new Date(todo.updated_at).toLocaleDateString()}</span>
                  {todo.is_pinned && (
                    <span className="bg-brand/10 text-brand px-2 py-1 rounded-full text-xs font-medium">
                      Pinned
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      {todoToDelete && (
        <ConfirmDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          title="Delete Archived Todo Group"
          description="Are you sure you want to delete this todo group? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          isConfirming={isDeleting}
          variant="destructive"
        />
      )}
    </>
  );
}
