import { Pin, PinOff, Save, Check, Loader2 } from "lucide-react";
import * as ui from "@/config/uiClasses";
import { useNoteEditor } from "@/hooks/useNoteEditor";
import { Note } from "@/types/note.types";

interface NoteEditorProps {
  initialData: Note | null;
  onSave: () => void;
}

export default function NoteEditor({ initialData, onSave }: NoteEditorProps) {
  const { note, loading, updateField, handleSave } = useNoteEditor(initialData, onSave);
  const isEditMode = Boolean(initialData?.id);

  return (
    <div className={`${ui.cardLg} ${ui.stackMd} w-full shadow-2xl bg-card border-none animate-in fade-in zoom-in-95 duration-200`}>
      <div className="flex flex-col gap-3">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => updateField("title", e.target.value)}
          className={`${ui.fontSans} text-xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/30 px-1`}
        />

        {/* Separator Line */}
        <div className="h-px w-full bg-border/40" />

        {/* Noticable Textarea Area */}
        <textarea
          placeholder="Note"
          value={note.content ?? ""}
          onChange={(e) => updateField("content", e.target.value || null)}
          className={`
            ${ui.fontSans} text-base leading-relaxed
            w-full min-h-64 p-3 rounded-xl
            bg-muted/30 border-none outline-none resize-none
            placeholder:text-muted-foreground/30
            transition-colors focus:bg-muted/50
          `}
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1">
          {isEditMode && (
            <button 
              onClick={() => updateField("is_pinned", !note.is_pinned)}
              className={`
                ${ui.btnGhostSm} p-2.5 rounded-full transition-colors
                ${note.is_pinned ? "bg-brand/10 text-brand" : ui.textTertiary}
              `}
              title={note.is_pinned ? "Unpin note" : "Pin note"}
            >
              {note.is_pinned ? (
                <PinOff size={20} strokeWidth={2.5} />
              ) : (
                <Pin size={20} strokeWidth={2.5} />
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onSave} 
            className={`${ui.btnGhostMd} ${ui.textSecondary} px-4 font-medium`}
          >
            Close
          </button>
          
          <button 
            onClick={handleSave} 
            disabled={loading}
            className={`
              ${ui.btnCreate} 
              min-w-12 h-11 px-6 rounded-full shadow-md hover:shadow-lg
              flex items-center gap-2
            `}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isEditMode ? (
              <>
                <Check size={18} strokeWidth={3} />
                <span className="font-bold">Update</span>
              </>
            ) : (
              <>
                <Save size={18} strokeWidth={2.5} />
                <span className="font-bold">Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}