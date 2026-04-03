"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  ReactNode
} from "react"

import { getStoredToken } from "@/lib/axios"
import { authService, User } from "@/services/auth.service"


/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
interface AuthProviderProps { children: ReactNode }


/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/
export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const initialized = useRef(false)


  /*
  -------------------------------------------------------------------------
  | Restore session if token exists
  -------------------------------------------------------------------------
  */
  useEffect(() => {

    if (initialized.current) return
    initialized.current = true

    const initializeAuth = async () => {
     
      if (!getStoredToken()) {
        setIsLoading(false)
        return
      }

      try {
        const user = await authService.me()
        setUser(user)
      } catch (error) {
        console.error("Failed to restore session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

  }, [])


  /*
  -------------------------------------------------------------------------
  | Login
  -------------------------------------------------------------------------
  */
  const login = async (email: string, password: string): Promise<User> => {

    const loggedInUser = await authService.login({ email, password })
    setUser(loggedInUser)

    return loggedInUser
  }


  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login }}>
      {children}
    </AuthContext.Provider>
  )
}


/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/
export const useAuth = (): AuthContextType => {

  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")

  return ctx
}