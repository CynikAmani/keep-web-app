import api from "@/lib/axios";
import { Note, NotePayload } from "@/features/notes/types/note.types";

const unwrapResponse = <T>(payload: T | { data: T }): T => {
  try {
    if (payload && typeof payload === "object" && "data" in payload) {
      return payload.data;
    }

    return payload;
  } catch (error) {
    throw error;
  }
};

export const noteService = {
  getNotes: async (): Promise<Note[]> => {
    try {
      const { data } = await api.get("/notes");
      return unwrapResponse<Note[]>(data);
    } catch (error) {
      throw error;
    }
  },

  getArchivedNotes: async (): Promise<Note[]> => {
    try {
      const { data } = await api.get("/notes/archived");
      return unwrapResponse<Note[]>(data);
    } catch (error) {
      throw error;
    }
  },

  getNote: async (id: number): Promise<Note> => {
    try {
      const { data } = await api.get(`/notes/${id}`);
      return unwrapResponse<Note>(data);
    } catch (error) {
      throw error;
    }
  },

  saveNote: async (payload: NotePayload, id?: number): Promise<Note> => {
    try {
      if (id) {
        const { data } = await api.put(`/notes/${id}`, payload);
        return unwrapResponse<Note>(data);
      }
      const { data } = await api.post("/notes", payload);
      return unwrapResponse<Note>(data);
    } catch (error) {
      throw error;
    }
  },

  togglePin: async (id: number): Promise<Note> => {
    try {
      const { data } = await api.patch(`/notes/${id}/pin`);
      return unwrapResponse<Note>(data);
    } catch (error) {
      throw error;
    }
  },

  archive: async (id: number): Promise<Note> => {
    try {
      const { data } = await api.patch(`/notes/${id}/archive`);
      return unwrapResponse<Note>(data);
    } catch (error) {
      throw error;
    }
  },

  unarchive: async (id: number): Promise<Note> => {
    try {
      const { data } = await api.patch(`/notes/${id}/unarchive`);
      return unwrapResponse<Note>(data);
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/notes/${id}`);
    } catch (error) {
      throw error;
    }
  },
};