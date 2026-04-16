"use client";

import * as ui from "@/config/uiClasses";
import { useTodoGroupEditor } from "@/hooks/todos/useTodoGroupEditor";

interface TodoGroupEditorHeaderProps {
  formData: ReturnType<typeof useTodoGroupEditor>["formData"];
  updateField: (field: string, value: any) => void;
  error?: string | null;
  isSaving?: boolean;
}

export default function TodoGroupEditorHeader({
  formData,
  updateField,
  error,
  isSaving,
}: TodoGroupEditorHeaderProps) {
  return (
    <div className="flex flex-col gap-3 shrink-0">
      {/* Title Input */}
      <input
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
