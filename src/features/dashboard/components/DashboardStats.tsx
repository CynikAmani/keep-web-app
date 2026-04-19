"use client";

import { BarChart3, ListTodo } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { DashboardStats as DashboardStatsType } from "@/features/dashboard/types/dashboard.types";

interface DashboardStatsProps {
  stats: DashboardStatsType | undefined;
  isLoading: boolean;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  variant: "notes" | "todos";
}

const StatCard = ({ label, value, icon, variant }: StatCardProps) => {
  const accentClass = variant === "notes" ? "text-blue-500" : "text-purple-500";
  const bgClass = variant === "notes" ? "bg-blue-50 dark:bg-blue-950/20" : "bg-purple-50 dark:bg-purple-950/20";

  return (
    <div className={`${ui.cardMd} ${bgClass} border-none flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <h3 className={`${ui.textSecondary} text-sm font-medium`}>{label}</h3>
        <div className={`p-2 rounded-lg ${bgClass}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
};

export default function DashboardStats({ stats, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`${ui.cardMd} border-none animate-pulse bg-card/70 h-24`} />
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard
        label="Active Notes"
        value={stats.notes.active}
        icon={<BarChart3 size={20} className="text-blue-500" />}
        variant="notes"
      />
      <StatCard
        label="Archived Notes"
        value={stats.notes.archived}
        icon={<BarChart3 size={20} className="text-blue-500/50" />}
        variant="notes"
      />
      <StatCard
        label="Active Todos"
        value={stats.todo_groups.active}
        icon={<ListTodo size={20} className="text-purple-500" />}
        variant="todos"
      />
      <StatCard
        label="Archived Todos"
        value={stats.todo_groups.archived}
        icon={<ListTodo size={20} className="text-purple-500/50" />}
        variant="todos"
      />
    </div>
  );
}
