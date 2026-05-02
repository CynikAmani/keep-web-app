export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  is_verified: boolean;
  is_deleted: boolean;
  roles?: string[];
  permissions?: string[];
}

export type UserRole = string;


export interface UserFilters {
  search?: string;
  status?: 'active' | 'deactivated';
  role?: string;
  date_from?: string;
  date_to?: string;
  page?: number;
  per_page?: number;
}

export interface UserListResponse {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
}

export interface ResetPasswordPayload {
  password: string;
  password_confirmation: string;
}