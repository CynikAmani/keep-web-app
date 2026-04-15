import api from "@/lib/axios";
import { Note, NotePayload } from "@/types/note.types";

const unwrapResponse = <T>(payload: T | { data: T }): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload;
};

export const noteService = {
  getNotes: async (): Promise<Note[]> => {
    const { data } = await api.get("/notes");
    return unwrapResponse<Note[]>(data);
  },

  getArchivedNotes: async (): Promise<Note[]> => {
    const { data } = await api.get("/notes/archived");
    return unwrapResponse<Note[]>(data);
  },

  getNote: async (id: number): Promise<Note> => {
    const { data } = await api.get(`/notes/${id}`);
    return unwrapResponse<Note>(data);
  },

  saveNote: async (payload: NotePayload, id?: number): Promise<Note> => {
    if (id) {
      const { data } = await api.put(`/notes/${id}`, payload);
      return unwrapResponse<Note>(data);
    }
    const { data } = await api.post("/notes", payload);
    return unwrapResponse<Note>(data);
  },

  togglePin: async (id: number): Promise<Note> => {
    const { data } = await api.patch(`/notes/${id}/pin`);
    return unwrapResponse<Note>(data);
  },

  archive: async (id: number): Promise<Note> => {
    const { data } = await api.patch(`/notes/${id}/archive`);
    return unwrapResponse<Note>(data);
  },

  unarchive: async (id: number): Promise<Note> => {
    const { data } = await api.patch(`/notes/${id}/unarchive`);
    return unwrapResponse<Note>(data);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};
