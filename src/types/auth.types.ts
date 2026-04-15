export interface User {
  id: number;
  name: string;
  email: string;
  roles?: string[];
  permissions?: string[];
  is_verified?: boolean;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthResourceResponse {
  data: AuthResponse;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
