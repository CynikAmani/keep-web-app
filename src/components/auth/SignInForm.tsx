"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/auth/useAuth"
import { useAuthModal } from "@/hooks/auth/useAuthModal"
import { Label } from "@/components/ui/label"
import { 
  btnBrandMd, 
  textBrand, 
  textSecondary, 
  textDestructive,
  input
} from "@/config/uiClasses"

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { signin } = useAuth()
  const { openModal, closeModal } = useAuthModal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await signin({ email, password })
      closeModal()
      
      setEmail("")
      setPassword("") 
      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className={`p-3 rounded-md bg-destructive/10 border border-destructive ${textDestructive} text-sm`}>
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          placeholder="m@example.com"
          className={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          type="password"
          className={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className={`${btnBrandMd} w-full`}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>

      <p className={`text-center text-sm ${textSecondary} mt-4`}>
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => openModal("signup")} 
          className={textBrand}
          disabled={isLoading}
        >
          Sign up
        </button>
      </p>
    </form>
  )
}