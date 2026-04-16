"use client";

import { useState, useCallback } from "react";
import { TodoItem, TodoItemPayload } from "@/types/todos.types";

export const useTodoItemEditor = (initialItem?: TodoItem) => {
  const [formData, setFormData] = useState<TodoItemPayload>({
    task: initialItem?.task || "",
    position: initialItem?.position || 0,
    is_completed: initialItem?.is_completed || false,
  });

  const [isValid, setIsValid] = useState(!!initialItem);
  const [error, setError] = useState<string | null>(null);

  const validateForm = useCallback(() => {
    if (!formData.task?.trim()) {
      setError("Task is required.");
      setIsValid(false);
      return false;
    }

    setError(null);
    setIsValid(true);
    return true;
  }, [formData.task]);

  const updateField = useCallback(
    (field: keyof TodoItemPayload, value: string | number | boolean | null | undefined) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setError(null);
    },
    []
  );

  const reset = useCallback(() => {
    setFormData({
      task: initialItem?.task || "",
      position: initialItem?.position || 0,
      is_completed: initialItem?.is_completed || false,
    });
    setError(null);
    setIsValid(!!initialItem);
  }, [initialItem]);

  return {
    formData,
    isValid,
    error,
    validateForm,
    updateField,
    reset,
  };
};
