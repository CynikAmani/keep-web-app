"use client";

import { useState, useCallback } from "react";
import { TodoGroup, UpdateTodoGroupPayload } from "@/features/todos/types/todos.types";

export const useTodoGroupEditor = (initialGroup?: TodoGroup) => {
  const [formData, setFormData] = useState<UpdateTodoGroupPayload>({
    title: initialGroup?.title || "",
    color: initialGroup?.color || "white",
    label_id: initialGroup?.label_id || undefined,
  });

  const [isValid, setIsValid] = useState(!!initialGroup);
  const [error, setError] = useState<string | null>(null);

  const validateForm = useCallback(() => {
    if (!formData.title?.trim()) {
      setError("Title is required.");
      setIsValid(false);
      return false;
    }

    setError(null);
    setIsValid(true);
    return true;
  }, [formData.title]);

  const updateField = useCallback(
    (field: keyof UpdateTodoGroupPayload, value: string | number | null | undefined) => {
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
      title: initialGroup?.title || "",
      color: initialGroup?.color || "white",
      label_id: initialGroup?.label_id || undefined,
    });
    setError(null);
    setIsValid(!!initialGroup);
  }, [initialGroup]);

  return {
    formData,
    isValid,
    error,
    validateForm,
    updateField,
    reset,
  };
};
