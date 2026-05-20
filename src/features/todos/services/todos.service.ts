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
    try {
      if (payload && typeof payload === "object" && "data" in payload) {
        return payload.data;
      }
      return payload;
    } catch (error) {
      throw error;
    }
  };

  async getTodoGroups(): Promise<TodoGroup[]> {
    try {
      const { data } = await api.get("/todo-groups");
      return this.unwrapResponse<TodoGroup[]>(data);
    } catch (error) {
      throw error;
    }
  }

  async getTodoGroup(id: number): Promise<TodoGroup> {
    try {
      const { data } = await api.get(`/todo-groups/${id}`);
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }

  async createTodoGroup(payload: CreateTodoGroupPayload): Promise<TodoGroup> {
    try {
      const { data } = await api.post("/todo-groups", payload);
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTodoGroup(
    id: number,
    payload: UpdateTodoGroupPayload
  ): Promise<TodoGroup> {
    try {
      const { data } = await api.put(`/todo-groups/${id}`, payload);
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }

  async deleteTodoGroup(id: number): Promise<void> {
    try {
      await api.delete(`/todo-groups/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async archiveTodoGroup(id: number): Promise<TodoGroup> {
    try {
      const { data } = await api.patch(`/todo-groups/${id}/archive`);
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }

  async togglePinTodoGroup(id: number): Promise<TodoGroup> {
    try {
      const { data } = await api.patch(`/todo-groups/${id}/toggle-pin`);
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }

  async getArchivedTodoGroups(): Promise<TodoGroup[]> {
    try {
      const { data } = await api.get('/todo-groups/archived');
      return this.unwrapResponse<TodoGroup[]>(data);
    } catch (error) {
      console.log('Error fetching archived todo groups:', error);
      throw error;
    }
  }

  async unarchiveTodoGroup(id: number): Promise<TodoGroup> {
    try {
      const { data } = await api.patch(`/todo-groups/${id}/unarchive`);
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }

  async createTodoItem(payload: TodoItemPayload): Promise<TodoItem> {
    try {
      const { data } = await api.post("/todo-items", payload);
      return this.unwrapResponse<TodoItem>(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTodoItem(
    id: number,
    payload: Partial<TodoItemPayload>
  ): Promise<TodoItem> {
    try {
      const { data } = await api.patch(`/todo-items/${id}`, payload);
      return this.unwrapResponse<TodoItem>(data);
    } catch (error) {
      throw error;
    }
  }

  async deleteTodoItem(id: number): Promise<void> {
    try {
      await api.delete(`/todo-items/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async toggleTodoItemCompletion(id: number): Promise<TodoItem> {
    try {
      const { data } = await api.patch(`/todo-items/${id}/toggle`);
      return this.unwrapResponse<TodoItem>(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTodoItemPosition(
    id: number,
    position: number
  ): Promise<TodoItem> {
    try {
      const { data } = await api.patch(`/todo-items/${id}/position`, {
        position,
      });
      return this.unwrapResponse<TodoItem>(data);
    } catch (error) {
      throw error;
    }
  }

  async batchCreateTodoItems(
    groupId: number,
    items: BatchCreateTodoItemPayload[]
  ): Promise<TodoGroup> {
    try {
      const { data } = await api.post(`/todo-groups/${groupId}/items/batch`, {
        todo_items: items,
      });
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }

  async batchUpdateTodoItems(
    groupId: number,
    updateItems: BatchUpdateTodoItemPayload[] = [],
    deleteItemIds: number[] = []
  ): Promise<TodoGroup> {
    try {
      const { data } = await api.patch(`/todo-groups/${groupId}/items/batch`, {
        update_items: updateItems,
        delete_item_ids: deleteItemIds,
      });
      return this.unwrapResponse<TodoGroup>(data);
    } catch (error) {
      throw error;
    }
  }
}

export const todosService = new TodosService();