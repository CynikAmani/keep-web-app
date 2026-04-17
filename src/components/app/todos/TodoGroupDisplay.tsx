"use client";

import * as ui from "@/config/uiClasses";
import { TodoGroup } from "@/types/todos.types";
import TodoGroupCard from "@/components/app/todos/TodoGroupCard";

interface TodoGroupDisplayProps {
  groups: TodoGroup[];
  isLoading: boolean;
  error: string | null;
  onCreate: () => void;
  onEdit: (group: TodoGroup) => void;
}

export default function TodoGroupDisplay({
  groups,
  isLoading,
  error,
  onCreate,
  onEdit,
}: TodoGroupDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className={ui.headingHero}>Todos</h1>
          <button
            onClick={onCreate}
            className={ui.btnCreate}
            disabled
          >
            New Group
          </button>
        </div>

        <section>
          <h2 className={`${ui.headingSm} text-muted-foreground mb-4`}>
            Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`${ui.cardMd} w-full border-none bg-card/70 text-left shadow-sm animate-pulse flex flex-col p-4 rounded-lg`}
              >
                <div className="h-6 w-3/5 rounded bg-muted mb-3" />

                <div className="mb-3 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-1/3 rounded bg-muted" />
                    <div className="h-4 w-1/4 rounded bg-muted" />
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="h-4 w-2/5 rounded bg-muted" />
                  <div className="h-8 w-12 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className={ui.textDestructive}>{error}</p>
      </div>
    );
  }

  const pinnedGroups = groups.filter((g) => g.is_pinned && !g.is_archived);
  const unpinnedGroups = groups.filter((g) => !g.is_pinned && !g.is_archived);
  const archivedGroups = groups.filter((g) => g.is_archived);

  return (
    <div className="space-y-8">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={ui.headingHero}>Todos</h1>
        <button
          onClick={onCreate}
          className={ui.btnCreate}
        >
          New Group
        </button>
      </div>

      {/* Pinned Groups */}
      {pinnedGroups.length > 0 && (
        <section>
          <h2 className={`${ui.headingSm} text-muted-foreground mb-4`}>
            Pinned
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedGroups.map((group) => (
              <TodoGroupCard
                key={group.id}
                group={group}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}

      {/* Unpinned Groups */}
      {unpinnedGroups.length > 0 && (
        <section>
          <h2 className={`${ui.headingSm} text-muted-foreground mb-4`}>
            Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unpinnedGroups.map((group) => (
              <TodoGroupCard
                key={group.id}
                group={group}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {groups.length === 0 && (
        <div className="text-center py-12">
          <p className={`${ui.textSecondary} mb-4`}>No todo groups yet</p>
          <button
            onClick={onCreate}
            className={ui.btnCreate}
          >
            Create Your First Group
          </button>
        </div>
      )}

      {/* Archived Groups */}
      {archivedGroups.length > 0 && (
        <section>
          <h2 className={`${ui.headingSm} text-muted-foreground mb-4`}>
            Archived
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {archivedGroups.map((group) => (
              <TodoGroupCard
                key={group.id}
                group={group}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
