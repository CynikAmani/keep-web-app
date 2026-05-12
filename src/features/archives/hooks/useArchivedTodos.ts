import { useState, useEffect } from "react";
import { todosService } from "@/features/todos/services/todos.service";
import { TodoGroup } from "@/features/todos/types/todos.types";

export function useArchivedTodos() {
  const [archivedTodos, setArchivedTodos] = useState<TodoGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArchivedTodos();
  }, []);

  const loadArchivedTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const todos = await todosService.getArchivedTodoGroups();
      setArchivedTodos(todos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load archived todos");
    } finally {
      setIsLoading(false);
    }
  };

  const unarchiveTodo = async (todoId: number) => {
    try {
      await todosService.unarchiveTodoGroup(todoId);
      setArchivedTodos(prev => prev.filter(todo => todo.id !== todoId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unarchive todo group");
      return false;
    }
  };

  const deleteTodo = async (todoId: number) => {
    try {
      await todosService.deleteTodoGroup(todoId);
      setArchivedTodos(prev => prev.filter(todo => todo.id !== todoId));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo group");
      return false;
    }
  };

  const clearError = () => setError(null);

  return {
    archivedTodos,
    isLoading,
    error,
    unarchiveTodo,
    deleteTodo,
    clearError,
    refetch: loadArchivedTodos,
  };
}
