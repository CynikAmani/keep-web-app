import * as ui from "@/config/uiClasses";
import { useNoteEditor } from "@/hooks/useNoteEditor";

interface NoteEditorProps {
  noteId?: number;
  onClose?: () => void;
}

export default function NoteEditor({ noteId, onClose }: NoteEditorProps) {
  const { note, loading, updateField, handleSave } = useNoteEditor(noteId, onClose);

  if (loading && noteId) {
    return (
      <div className={`${ui.cardMd} flex justify-center py-10`}>
        <span className={ui.textSecondary}>Loading note...</span>
      </div>
    );
  }

  return (
    <div 
      className={`
        ${ui.cardLg} 
        ${ui.stackMd} 
        w-full max-w-2xl mx-auto 
        transition-shadow duration-300 ease-in-out
        hover:shadow-md border-border/60
      `}
    >
      {/* Input Area */}
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => updateField("title", e.target.value)}
          className={`
            ${ui.fontSans} 
            text-xl font-semibold 
            bg-transparent border-none outline-none 
            placeholder:text-muted-foreground/40
          `}
        />
        
        <textarea
          placeholder="Take a note..."
          value={note.content ?? ""}
          onChange={(e) => updateField("content", e.target.value || null)}
          className={`
            ${ui.fontSans} 
            text-base leading-relaxed
            bg-transparent border-none outline-none 
            resize-none min-h-35
            placeholder:text-muted-foreground/40
          `}
        />
      </div>

      {/* Footer Divider */}
      <div className={ui.divider} />

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Pin Toggle */}
          <button 
            onClick={() => updateField("is_pinned", !note.is_pinned)}
            className={`
              ${ui.btnGhostSm} 
              rounded-full p-2 
              ${note.is_pinned ? ui.textBrand : ui.textTertiary}
            `}
            title={note.is_pinned ? "Unpin note" : "Pin note"}
          >
            {/* Using text labels for now as per your request, but easily swappable for icons */}
            {note.is_pinned ? "Pinned" : "Pin"}
          </button>

          {/* Color/Label triggers can be added here in the future */}
        </div>

        <div className="flex items-center gap-3">
          {onClose && (
            <button 
              onClick={onClose} 
              className={`${ui.btnGhostMd} ${ui.textSecondary}`}
            >
              Cancel
            </button>
          )}
          
          <button 
            onClick={handleSave} 
            disabled={loading}
            className={`
              ${noteId ? ui.btnEdit : ui.btnCreate}
              min-w-20
            `}
          >
            {loading ? "..." : noteId ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}