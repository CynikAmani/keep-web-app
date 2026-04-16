"use client";

import { TodoGroup } from "@/types/todos.types";
import * as ui from "@/config/uiClasses";

interface TodoGroupCardProps {
  group: TodoGroup;
  onEdit: (group: TodoGroup) => void;
}

export default function TodoGroupCard({ group, onEdit }: TodoGroupCardProps) {
  return (
    <button
      onClick={() => onEdit(group)}
      className={`${ui.cardMd} text-left hover:shadow-md transition-shadow cursor-pointer group`}
    >
      <h3 className={`${ui.headingSm} truncate group-hover:text-brand transition-colors`}>
        {group.title}
      </h3>
      <p className={`text-sm ${ui.textSecondary} mt-2`}>
        {group.is_archived ? "Archived" : "Active"}
      </p>
    </button>
  );
}
