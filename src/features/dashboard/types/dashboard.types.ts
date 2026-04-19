import { Note } from "../../notes/types/note.types";
import { TodoGroup } from "../../todos/types/todos.types";

export interface DashboardStats {
  notes: {
    active: number;
    archived: number;
  };
  todo_groups: {
    active: number;
    archived: number;
  };
}

export interface DashboardData {
  recent_notes: Note[];
  recent_todo_groups: TodoGroup[];
  stats: DashboardStats;
}

export type RecentItem = 
  | ({ type: 'note' } & Note) 
  | ({ type: 'todo' } & TodoGroup);