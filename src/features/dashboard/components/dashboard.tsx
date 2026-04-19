"use client";

import Link from "next/link";
import { useCallback } from "react";
import { History } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { useAppNavigation } from "@/hooks/ui/app-navigation/useAppNavigation";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useDashboardEditor } from "@/features/dashboard/hooks/useDashboardEditor";
import DashboardStats from "@/features/dashboard/components/DashboardStats";
import DashboardRecentItems from "@/features/dashboard/components/DashboardRecentItems";
import NoteEditor from "@/features/notes/components/NoteEditor";
import TodoGroupEditor from "@/features/todos/components/TodoGroupEditor";
import { Note } from "@/features/notes/types/note.types";
import { useTodosService } from "@/features/todos/hooks/useTodosService";
import { noteService } from "@/features/notes/services/note.service";

export default function Dashboard() {
  const navItems = useAppNavigation();
  const shortcuts = navItems
    .filter((item) => item.dashboardShortcut)
    .map((item) => item.dashboardShortcut!);

  const {
    stats,
    recentNotes,
    recentTodos,
    isLoading,
    refreshAfterEdit,
  } = useDashboard();

  const {
    isOpen,
    editorType,
    noteData,
    todoData,
    openNoteEditor,
    openTodoEditor,
    closeEditor,
  } = useDashboardEditor();

  const todosService = useTodosService();

  const handleNoteEditorSave = useCallback(
    async (savedNote?: Note) => {
      closeEditor();
      await refreshAfterEdit();
    },
    [closeEditor, refreshAfterEdit]
  );

  const handleTodoEditorClose = useCallback(() => {
    closeEditor();
  }, [closeEditor]);

  return (
    <div className={`${ui.stackLg} py-8`}>
      {/* Header */}
      <header className="px-4">
        <h1 className={ui.headingHero}>Welcome back</h1>
        <p className={ui.textSecondary}>What would you like to do today?</p>
      </header>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {shortcuts.map((item) => (
          <Link 
            key={item.title} 
            href={item.href}
            className={`${ui.cardBase} group hover:border-brand transition-all duration-200 border border-transparent flex flex-col gap-3`}
          >
            <div className={`p-3 rounded-lg bg-accent w-fit group-hover:bg-brand/10 transition-colors`}>
              <item.icon size={24} className={item.colorClass} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs text-foreground/60">{item.description}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Stats Section */}
      <section className={`${ui.stackMd} px-4`}>
        <h2 className={ui.headingMd}>Overview</h2>
        <DashboardStats stats={stats} isLoading={isLoading} />
      </section>

      {/* Recent Items Section */}
      <section className="px-4">
        <DashboardRecentItems
          recentNotes={recentNotes}
          recentTodos={recentTodos}
          isLoading={isLoading}
          onEditNote={openNoteEditor}
          onEditTodo={openTodoEditor}
        />
      </section>

      {/* Editors Modal */}
      {isOpen && editorType === "note" && noteData ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
            onClick={closeEditor}
          />

          <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-200">
            <NoteEditor
              initialData={noteData}
              onClose={closeEditor}
              onSave={handleNoteEditorSave}
              onArchive={async (noteId) => {
                try {
                  await noteService.archive(noteId);
                  closeEditor();
                  await refreshAfterEdit();
                } catch (err) {
                  console.error("Failed to archive note:", err);
                  throw err;
                }
              }}
              onDelete={async (noteId) => {
                try {
                  await noteService.delete(noteId);
                  closeEditor();
                  await refreshAfterEdit();
                } catch (err) {
                  console.error("Failed to delete note:", err);
                  throw err;
                }
              }}
              onTogglePin={async (noteId) => {
                try {
                  await noteService.togglePin(noteId);
                  await refreshAfterEdit();
                } catch (err) {
                  console.error("Failed to toggle pin:", err);
                  throw err;
                }
              }}
            />
          </div>
        </div>
      ) : null}

      {isOpen && editorType === "todo" && todoData ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
            onClick={handleTodoEditorClose}
          />

          <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-200">
            <TodoGroupEditor
              initialData={todoData}
              initialItems={todoData.todo_items}
              isLoadingItems={false}
              onClose={handleTodoEditorClose}
              onSave={async (payload, localItems, originalItems) => {
                try {
                  await todosService.updateTodoGroup(todoData.id, payload);

                  // Handle items updates
                  if ((localItems && localItems.length > 0) || (originalItems && originalItems.length > 0)) {
                    const localIds = new Set((localItems || []).map((item) => String(item.id)));
                    const deletedIds = (originalItems || [])
                      .filter((item) => !localIds.has(String(item.id)))
                      .map((item) => item.id);

                    await todosService.saveTodoGroupItems(
                      todoData.id,
                      localItems || [],
                      deletedIds
                    );
                  }

                  handleTodoEditorClose();
                  await refreshAfterEdit();
                } catch (err) {
                  console.error("Failed to update todo group:", err);
                  throw err;
                }
              }}
              onArchive={async (groupId) => {
                try {
                  await todosService.archiveTodoGroup(groupId);
                  handleTodoEditorClose();
                  await refreshAfterEdit();
                } catch (err) {
                  console.error("Failed to archive todo group:", err);
                  throw err;
                }
              }}
              onDelete={async (groupId) => {
                try {
                  await todosService.deleteTodoGroup(groupId);
                  handleTodoEditorClose();
                  await refreshAfterEdit();
                } catch (err) {
                  console.error("Failed to delete todo group:", err);
                  throw err;
                }
              }}
              onTogglePin={async (groupId) => {
                try {
                  await todosService.togglePinTodoGroup(groupId);
                  handleTodoEditorClose();
                  await refreshAfterEdit();
                } catch (err) {
                  console.error("Failed to toggle pin:", err);
                  throw err;
                }
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
