"use client";

import { forwardRef } from "react";
import * as ui from "@/config/uiClasses";
import { useTodoGroupEditor } from "@/features/todos/hooks/useTodoGroupEditor";

interface TodoGroupEditorHeaderProps {
  formData: ReturnType<typeof useTodoGroupEditor>["formData"];
  updateField: (field: string, value: any) => void;
  error?: string | null;
  isSaving?: boolean;
  titleInputRef?: React.RefObject<HTMLInputElement>;
}

const TodoGroupEditorHeader = forwardRef<HTMLInputElement | null, TodoGroupEditorHeaderProps>(
  function TodoGroupEditorHeader({
    formData,
    updateField,
    error,
    isSaving,
    titleInputRef,
  }: TodoGroupEditorHeaderProps, ref) {
  return (
    <div className="flex flex-col gap-3 shrink-0">
      {/* Title Input */}
      <input
        ref={titleInputRef || ref}
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => updateField("title", e.target.value)}
        className={`${ui.fontSans} text-xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 px-1`}
        disabled={isSaving}
      />

      {/* Separator Line */}
      <div className="h-px w-full bg-border/40" />

      {/* Error Message */}
      {error ? (
        <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
          {error}
        </div>
      ) : null}
    </div>
  );
  }
);

export default TodoGroupEditorHeader;
