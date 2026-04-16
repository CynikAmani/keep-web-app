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
      <div className="text-center py-12">
        <p className={ui.textSecondary}>Loading your todo groups...</p>
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
