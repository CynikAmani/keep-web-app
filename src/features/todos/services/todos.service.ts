import api from "@/lib/axios";
import {
  TodoGroup,
  TodoItem,
  TodoItemPayload,
  CreateTodoGroupPayload,
  UpdateTodoGroupPayload,
  BatchCreateTodoItemPayload,
  BatchUpdateTodoItemPayload,
} from "@/features/todos/types/todos.types";

class TodosService {
  private unwrapResponse = <T>(payload: T | { data: T }): T => {
    if (payload && typeof payload === "object" && "data" in payload) {
      return payload.data;
    }
    return payload;
  };

  // --- TodoGroup Operations ---
  // Returns all TodoGroups with their todo_items eager-loaded
  async getTodoGroups(): Promise<TodoGroup[]> {
    const { data } = await api.get("/todo-groups");
    return this.unwrapResponse<TodoGroup[]>(data);
  }

  // Returns a single TodoGroup with its todo_items eager-loaded
  async getTodoGroup(id: number): Promise<TodoGroup> {
    const { data } = await api.get(`/todo-groups/${id}`);
    return this.unwrapResponse<TodoGroup>(data);
  }

  // Create a new TodoGroup. If todo_items provided, they are created atomically.
  // Response includes the created items within todo_items array.
  async createTodoGroup(payload: CreateTodoGroupPayload): Promise<TodoGroup> {
    const { data } = await api.post("/todo-groups", payload);
    return this.unwrapResponse<TodoGroup>(data);
  }

  // Update TodoGroup fields (title, color, label_id, is_pinned)
  // Response includes all todo_items within the group
  async updateTodoGroup(
    id: number,
    payload: UpdateTodoGroupPayload
  ): Promise<TodoGroup> {
    const { data } = await api.put(`/todo-groups/${id}`, payload);
    return this.unwrapResponse<TodoGroup>(data);
  }

  // Delete a TodoGroup (and its items)
  async deleteTodoGroup(id: number): Promise<void> {
    await api.delete(`/todo-groups/${id}`);
  }

  // Archive a TodoGroup
  // Response includes all todo_items within the group
  async archiveTodoGroup(id: number): Promise<TodoGroup> {
    const { data } = await api.patch(`/todo-groups/${id}/archive`);
    return this.unwrapResponse<TodoGroup>(data);
  }

  // Toggle pin state of a TodoGroup
  // Response includes all todo_items within the group
  async togglePinTodoGroup(id: number): Promise<TodoGroup> {
    const { data } = await api.patch(`/todo-groups/${id}/toggle-pin`);
    return this.unwrapResponse<TodoGroup>(data);
  }

  // --- TodoItem Operations (Single) ---
  // Create a single TodoItem. Must include todo_group_id.
  async createTodoItem(payload: TodoItemPayload): Promise<TodoItem> {
    const { data } = await api.post("/todo-items", payload);
    return this.unwrapResponse<TodoItem>(data);
  }

  // Update a single TodoItem (task or is_completed)
  async updateTodoItem(
    id: number,
    payload: Partial<TodoItemPayload>
  ): Promise<TodoItem> {
    const { data } = await api.patch(`/todo-items/${id}`, payload);
    return this.unwrapResponse<TodoItem>(data);
  }

  // Delete a single TodoItem
  async deleteTodoItem(id: number): Promise<void> {
    await api.delete(`/todo-items/${id}`);
  }

  // Toggle completion status of a TodoItem
  async toggleTodoItemCompletion(id: number): Promise<TodoItem> {
    const { data } = await api.patch(`/todo-items/${id}/toggle`);
    return this.unwrapResponse<TodoItem>(data);
  }

  // Update position of a TodoItem (for drag-and-drop ordering)
  async updateTodoItemPosition(
    id: number,
    position: number
  ): Promise<TodoItem> {
    const { data } = await api.patch(`/todo-items/${id}/position`, {
      position,
    });
    return this.unwrapResponse<TodoItem>(data);
  }

  // --- Batch TodoItem Operations ---
  // Batch create multiple TodoItems in a group
  // Returns full TodoGroup with all items (including newly created)
  async batchCreateTodoItems(
    groupId: number,
    items: BatchCreateTodoItemPayload[]
  ): Promise<TodoGroup> {
    const { data } = await api.post(`/todo-groups/${groupId}/items/batch`, {
      todo_items: items,
    });
    return this.unwrapResponse<TodoGroup>(data);
  }

  // Batch update and delete TodoItems in a group
  // Returns full TodoGroup with all items after updates/deletions applied
  async batchUpdateTodoItems(
    groupId: number,
    updateItems: BatchUpdateTodoItemPayload[] = [],
    deleteItemIds: number[] = []
  ): Promise<TodoGroup> {
    const { data } = await api.patch(`/todo-groups/${groupId}/items/batch`, {
      update_items: updateItems,
      delete_item_ids: deleteItemIds,
    });
    return this.unwrapResponse<TodoGroup>(data);
  }
}

export const todosService = new TodosService();
