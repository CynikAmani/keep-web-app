"use client";

import { Loader2, Check, Save, Archive, Pin, PinOff, Trash2 } from "lucide-react";
import * as ui from "@/config/uiClasses";
import ColorPicker from "@/components/ui/ColorPicker";
import { ActionButton } from "@/components/ui/ActionButton";

interface EditorActionFooterProps {
  /** Controls */
  isSaving?: boolean;
  isEditing?: boolean;
  
  /** Color controls */
  selectedColor: string | null;
  onColorChange: (color: string) => void;
  
  /** State checks */
  isPinned?: boolean;
  isArchived?: boolean;
  
  /** Action handlers */
  onTogglePin?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onClose: () => void;
  onSave: (e: React.FormEvent) => Promise<void> | void;
  
  /** Labels and copy */
  saveLabel?: string;
  itemType?: "note" | "todo"; // For better icons/language
}

export default function EditorActionFooter({
  isSaving = false,
  isEditing = false,
  selectedColor,
  onColorChange,
  isPinned = false,
  isArchived = false,
  onTogglePin,
  onArchive,
  onDelete,
  onClose,
  onSave,
  saveLabel = "Save",
  itemType = "note",
}: EditorActionFooterProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-border/30 shrink-0">
      {/* Left side: Color picker + Action buttons */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        {/* Color Picker */}
        <ColorPicker
          selectedColor={selectedColor}
          onColorChange={onColorChange}
          disabled={isSaving}
        />

        {/* Action Buttons - Only show if editing */}
        {isEditing && (
          <>
            {/* Pin/Unpin */}
            <ActionButton
              permission={`${itemType}:pin`}
              variantClassName={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent ${
                isPinned ? "bg-brand/10 text-brand" : ""
              }`}
              onClick={onTogglePin}
              disabled={isSaving}
              type="button"
              title={isPinned ? "Unpin" : "Pin"}
            >
              {isPinned ? (
                <PinOff size={18} strokeWidth={2} />
              ) : (
                <Pin size={18} strokeWidth={2} />
              )}
            </ActionButton>

            {/* Archive/Restore */}
            <ActionButton
              permission={`${itemType}:archive`}
              variantClassName={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-accent`}
              onClick={onArchive}
              disabled={isSaving}
              type="button"
              title={isArchived ? "Restore" : "Archive"}
            >
              <Archive size={18} strokeWidth={2} />
            </ActionButton>

            {/* Delete */}
            <ActionButton
              permission={`${itemType}:delete`}
              variantClassName={`${ui.btnGhostSm} p-2.5 rounded-full transition-colors hover:bg-destructive/10 text-destructive`}
              onClick={onDelete}
              disabled={isSaving}
              type="button"
              title="Delete"
            >
              <Trash2 size={18} strokeWidth={2} />
            </ActionButton>
          </>
        )}
      </div>

      {/* Right side: Close + Save buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={onClose}
          className={`${ui.btnGhostMd} ${ui.textSecondary} px-4 font-medium flex-1 sm:flex-none`}
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
            flex items-center justify-center gap-2 flex-1 sm:flex-none
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
              <Save size={18} strokeWidth={2.5} />
              <span className="font-bold">{saveLabel}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
