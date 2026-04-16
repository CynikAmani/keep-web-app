"use client";

import * as ui from "@/config/uiClasses";
import TodoGroupEditor from "@/components/app/todos/TodoGroupEditor";
import TodoGroupDisplay from "@/components/app/todos/TodoGroupDisplay";
import { useTodosManager } from "@/hooks/todos/useTodosManager";

export default function TodosManager() {
  const {
    todoGroups,
    isLoading,
    error,
    isEditorOpen,
    activeGroup,
    activeTodoItems,
    isLoadingItems,
    openCreateGroup,
    openEditGroup,
    closeEditor,
    handleSaveGroup,
    handleDeleteGroup,
    handleArchiveGroup,
    handleTogglePinGroup,
  } = useTodosManager();

  return (
    <div className={`${ui.containerPage} py-10`}>
      <TodoGroupDisplay
        groups={todoGroups}
        isLoading={isLoading}
        error={error}
        onCreate={openCreateGroup}
        onEdit={openEditGroup}
      />

      {isEditorOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity"
            onClick={closeEditor}
          />

          <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-200">
            <TodoGroupEditor
              initialData={activeGroup}
              initialItems={activeTodoItems}
              isLoadingItems={isLoadingItems}
              onClose={closeEditor}
              onSave={handleSaveGroup}
              onDelete={handleDeleteGroup}
              onArchive={handleArchiveGroup}
              onTogglePin={handleTogglePinGroup}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
