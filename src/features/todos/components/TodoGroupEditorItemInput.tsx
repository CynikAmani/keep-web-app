"use client";

import * as ui from "@/config/uiClasses";
import { Plus } from "lucide-react";

interface TodoGroupEditorItemInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  isSaving?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function TodoGroupEditorItemInput({
  value,
  onChange,
  onAdd,
  isSaving,
  inputRef,
}: TodoGroupEditorItemInputProps) {
  return (
    <div className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add item..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onAdd();
          }
        }}
        className={`${ui.input} flex-1 h-10 text-sm`}
        disabled={isSaving}
      />
      <button
        type="button"
        onClick={onAdd}
        disabled={!value.trim() || isSaving}
        className={`${ui.btnCreate} p-2.5 h-10 w-10 shrink-0 rounded-lg`}
      >
        <Plus size={18} strokeWidth={2} />
      </button>
    </div>
  );
}
