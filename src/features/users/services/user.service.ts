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
    return useAuthStore.getState().user;
  }

  static getUserId() {
    return useAuthStore.getState().user?.id || null;
  }

  static getRoles() {
    return useAuthStore.getState().user?.roles || [];
  }

  static getPermissions() {
    return useAuthStore.getState().user?.permissions || [];
  }

  // New: Core operations
  static async getUsers(filters?: UserFilters): Promise<UserListResponse> {
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
  }

  static async getUserById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  }

  static async createUser(payload: CreateUserPayload): Promise<User> {
    const response = await api.post<User>('/users', payload);
    return response.data;
  }

  static async updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, payload);
    return response.data;
  }

  // Account state management
  static async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  }

  static async restoreUser(id: number): Promise<User> {
    const response = await api.post<User>(`/users/${id}/restore`);
    return response.data;
  }

  // Security & access
  static async resetPassword(id: number, payload: ResetPasswordPayload): Promise<void> {
    await api.post(`/users/${id}/reset-password`, payload);
  }

  static async revokeTokens(id: number): Promise<void> {
    await api.post(`/users/${id}/revoke-tokens`);
  }

  // Role management
  static async getUserRoles(id: number): Promise<UserRole[]> {
    const response = await api.get<UserRole[]>(`/users/${id}/roles`);
    return response.data;
  }

  static async syncUserRoles(id: number, roleIds: number[]): Promise<User> {    
    const response = await api.put(`/users/${id}/roles`, { roles: roleIds });
    return response.data.data;
  }
}