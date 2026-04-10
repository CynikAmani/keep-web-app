import { Label } from "./label.types";

export interface Note {
  id: number;
  title: string;
  content: string | null;
  color: string;
  is_pinned: boolean;
  is_archived: boolean;
  label_id: number | null;
  label?: Label | null;
  updated_at: string;
}

export interface NotePayload {
  title: string;
  content?: string | null;
  label_id?: number | null;
  color?: string;
  is_pinned?: boolean;
}