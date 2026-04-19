"use client";

import * as ui from "@/config/uiClasses";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, Check, Plus, Archive, Pin, PinOff, Trash2 } from "lucide-react";

interface TodoGroupEditorFooterProps {
  color?: string;
  onColorChange: (color: string) => void;
  isSaving?: boolean;
  isEditing?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  onTogglePin?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onClose: () => void;
  onSave: (e: React.FormEvent) => Promise<void>;
}

const COLOR_OPTIONS = [
  "white",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
];

export default function TodoGroupEditorFooter({
  color,
  onColorChange,
  isSaving,
  isEditing,
  isPinned,
  isArchived,
  onTogglePin,
  onArchive,
  onDelete,
  onClose,
  onSave,
}: TodoGroupEditorFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-2 pt-4 border-t border-border/30 shrink-0">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        {/* Color Picker Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent shrink-0`}
              title="Change color"
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-border"
                style={{ backgroundColor: color }}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-3">
            <div className="grid grid-cols-4 gap-2">
              {COLOR_OPTIONS.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => onColorChange(colorOption)}
                  className={`w-full h-8 rounded-md border-2 transition-all hover:scale-110 ${
                    color === colorOption
                      ? "border-foreground scale-110"
                      : "border-muted"
                  }`}
                  style={{ backgroundColor: colorOption }}
                  title={colorOption}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Action Buttons - Only show if editing existing group */}
        {isEditing && (
          <>
            <button
              type="button"
              onClick={onTogglePin}
              disabled={isSaving}
              className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent ${
                isPinned ? "bg-brand/10 text-brand" : ""
              }`}
              title={isPinned ? "Unpin" : "Pin"}
            >
              {isPinned ? (
                <PinOff size={18} strokeWidth={2} />
              ) : (
                <Pin size={18} strokeWidth={2} />
              )}
            </button>

            <button
              type="button"
              onClick={onArchive}
              disabled={isSaving}
              className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent`}
              title={isArchived ? "Restore" : "Archive"}
            >
              <Archive size={18} strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={onDelete}
              disabled={isSaving}
              className={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-destructive/10 text-destructive`}
              title="Delete"
            >
              <Trash2 size={18} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClose}
          className={`${ui.btnGhostMd} ${ui.textSecondary} px-4 font-medium`}
          disabled={isSaving}
        >
          Close
        </button>

        <button
          type="submit"
          form="editor-form"
          disabled={isSaving}
          className={`
            ${ui.btnCreate} 
            min-w-12 h-11 px-6 rounded-full shadow-md hover:shadow-lg
            flex items-center gap-2
          `}
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : isEditing ? (
            <>
              <Check size={18} strokeWidth={3} />
              <span className="font-bold">Update</span>
            </>
          ) : (
            <>
              <Plus size={18} strokeWidth={2.5} />
              <span className="font-bold">Create</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
