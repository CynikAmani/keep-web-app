// --- TodoItem Types ---
export interface TodoItem {
  id: number;
  todo_group_id: number;
  task: string;
  is_completed: boolean;
  position: number; // For drag-and-drop ordering
  created_at: string;
  updated_at: string;
}

// Payload for creating/updating individual TodoItems
export interface TodoItemPayload {
  todo_group_id?: number; // Required only for POST /todo-items
  task?: string;
  is_completed?: boolean;
  position?: number;
}

// Payload for batch creating TodoItems
export interface BatchCreateTodoItemPayload {
  task: string;
  is_completed?: boolean;
  position?: number;
}

// Payload for batch updating TodoItems
export interface BatchUpdateTodoItemPayload {
  id: number;
  task?: string;
  is_completed?: boolean;
  position?: number;
}

export interface TodoGroup {
  id: number;
  user_id: number;
  label_id: number | null;
  title: string;
  color: string | null;
  is_pinned: boolean;
  is_archived: boolean;
  is_empty: boolean;
  todo_items: TodoItem[]; // ALWAYS eager-loaded with group
  created_at: string;
  updated_at: string;
}

// Payload for creating TodoGroup (with optional initial items)
export interface CreateTodoGroupPayload {
  label_id?: number | null;
  title: string;
  color?: string;
  is_pinned?: boolean;
  todo_items?: Array<{
    task: string;
    position: number;
    is_completed?: boolean;
  }>;
}

// Payload for updating TodoGroup (group-level fields only)
export interface UpdateTodoGroupPayload {
  label_id?: number | null;
  title?: string;
  color?: string;
  is_pinned?: boolean;
}

// --- UI State Types ---
export interface TodosServiceState {
  todoGroups: TodoGroup[];
  activeTodoGroup: TodoGroup | null; // Contains todo_items within it
  isLoading: boolean;
  error: string | null;
}

export interface TodoManagerActionState {
  isEditorOpen: boolean;
  editorMode: 'create' | 'edit';
  editingGroupId: number | null;
}
