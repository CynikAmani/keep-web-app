import { useAuthStore } from "@/store/auth.store";
import api from '@/lib/axios';
import {
  User,
  UserFilters,
  UserListResponse,
  CreateUserPayload,
  UpdateUserPayload,
  ResetPasswordPayload,
  UserRole,
} from '../types/user.types';

export class UserService {
  // Existing methods
  static getUser() {
    try {
      return useAuthStore.getState().user;
    } catch (error) {
      throw error;
    }
  }

  static getUserId() {
    try {
      return useAuthStore.getState().user?.id || null;
    } catch (error) {
      throw error;
    }
  }

  static getRoles() {
    try {
      return useAuthStore.getState().user?.roles || [];
    } catch (error) {
      throw error;
    }
  }

  static getPermissions() {
    try {
      return useAuthStore.getState().user?.permissions || [];
    } catch (error) {
      throw error;
    }
  }

  // New: Core operations
  static async getUsers(filters?: UserFilters): Promise<UserListResponse> {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.role) params.append('role', String(filters.role));
      if (filters?.date_from) params.append('date_from', filters.date_from);
      if (filters?.date_to) params.append('date_to', filters.date_to);
      if (filters?.page) params.append('page', String(filters.page));
      if (filters?.per_page) params.append('per_page', String(filters.per_page));

      const response = await api.get<UserListResponse>(`/users?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id: number): Promise<User> {
    try {
      const response = await api.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(payload: CreateUserPayload): Promise<User> {
    try {
      const response = await api.post<User>('/users', payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
    try {
      const response = await api.put<User>(`/users/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Account state management
  static async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      throw error;
    }
  }

  static async restoreUser(id: number): Promise<User> {
    try {
      const response = await api.post<User>(`/users/${id}/restore`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Security & access
  static async resetPassword(id: number, payload: ResetPasswordPayload): Promise<void> {
    try {
      await api.post(`/users/${id}/reset-password`, payload);
    } catch (error) {
      throw error;
    }
  }

  static async revokeTokens(id: number): Promise<void> {
    try {
      await api.post(`/users/${id}/revoke-tokens`);
    } catch (error) {
      throw error;
    }
  }

  // Role management
  static async getUserRoles(id: number): Promise<UserRole[]> {
    try {
      const response = await api.get<UserRole[]>(`/users/${id}/roles`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async syncUserRoles(id: number, roleIds: number[]): Promise<User> {    
    try {
      const response = await api.put(`/users/${id}/roles`, { roles: roleIds });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
}