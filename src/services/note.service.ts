import api from "@/lib/axios";
import { Note, NotePayload } from "@/types/note.types";

export const noteService = {
  getNotes: async (): Promise<Note[]> => {
    const { data } = await api.get("/notes");
    return data;
  },

  getArchivedNotes: async (): Promise<Note[]> => {
    const { data } = await api.get("/notes/archived");
    return data;
  },

  getNote: async (id: number): Promise<Note> => {
    const { data } = await api.get(`/notes/${id}`);
    return data;
  },

  saveNote: async (payload: NotePayload, id?: number): Promise<Note> => {
    if (id) {
      const { data } = await api.put(`/notes/${id}`, payload);
      return data;
    }
    const { data } = await api.post("/notes", payload);
    return data;
  },

  togglePin: async (id: number): Promise<Note> => {
    const { data } = await api.patch(`/notes/${id}/pin`);
    return data;
  },

  archive: async (id: number): Promise<Note> => {
    const { data } = await api.patch(`/notes/${id}/archive`);
    return data;
  },

  unarchive: async (id: number): Promise<Note> => {
    const { data } = await api.patch(`/notes/${id}/unarchive`);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};