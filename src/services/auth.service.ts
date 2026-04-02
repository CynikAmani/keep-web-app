import api from "@/lib/axios"
import { setStoredToken, getStoredToken } from "@/lib/axios"

export interface User {
  id: number
  name: string
  email: string
}

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: User
}


export class AuthService {

  /*
  -------------------------------------------------------------------------
  | Login
  -------------------------------------------------------------------------
  */
  async login(payload: LoginPayload): Promise<User> {

    try {
      const res = await api.post<LoginResponse>("/auth/login", payload)
      setStoredToken(res.data.token)
      return res.data.user

    } catch (error: any) {
      if (error.response) throw new Error(error.response.data?.message || "Authentication failed")
      throw new Error("Network error. Please try again.")
    }
  }


  /*
  -------------------------------------------------------------------------
  | Get current authenticated user
  -------------------------------------------------------------------------
  */
  async me(): Promise<User> {

    const token = getStoredToken()
    if (!token) throw new Error("No token")

    try {
      const res = await api.get<User>("/auth/me")
      return res.data

    } catch (error: any) {
      if (error.response) throw new Error(error.response.data?.message || "Failed to retrieve user")
      throw new Error("Network error. Please try again.")
    }
  }
}


export const authService = new AuthService()