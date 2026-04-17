"use client";

import { Check } from "lucide-react";
import { TodoGroup } from "@/types/todos.types";
import * as ui from "@/config/uiClasses";
import { dateFormatter } from "@/utils/dateFormatter";

interface TodoGroupCardProps {
  group: TodoGroup;
  onEdit: (group: TodoGroup) => void;
}

export default function TodoGroupCard({ group, onEdit }: TodoGroupCardProps) {
  const completedCount = group.todo_items?.filter((item) => item.is_completed).length || 0;
  const totalCount = group.todo_items?.length || 0;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <button
      type="button"
      onClick={() => onEdit(group)}
      className={`${ui.cardMd} w-full border-none bg-card text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer group flex flex-col`}
    >
      <h3 className="font-semibold text-foreground group-hover:text-brand transition-colors truncate mb-3">
        {group.title}
      </h3>

      <div className="mb-3 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`${ui.textSecondary} text-xs`}>
            {completedCount} of {totalCount} done
          </span>
          <span className={`text-xs font-medium ${completionPercentage === 100 ? "text-emerald-600" : "text-foreground/70"}`}>
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`${ui.textSecondary} text-xs`}>
          {dateFormatter.cardDate(group.updated_at)}
        </span>
        <span className={`${ui.btnGhostSm} text-xs py-1 px-2 h-auto`}>
          Edit
        </span>
      </div>
    </button>
  );
}
