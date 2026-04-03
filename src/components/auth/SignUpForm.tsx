"use client"

import { useState } from "react"
import { useAuthModal } from "@/hooks/auth/useAuthModal"
import { Label } from "@/components/ui/label"
import { 
  btnBrandMd, 
  textBrand, 
  textSecondary, 
  textDestructive,
  input
} from "@/config/uiClasses"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { closeModal, openModal } = useAuthModal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    
    // TODO: Add signup logic here when available
    try {
      // await signup(email, password)
      console.log("Sign up:", { email, password })
      setTimeout(() => {
        setIsLoading(false)
        closeModal()
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to create account")
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
        <p className={`text-xs ${textSecondary}`}>Must be at least 6 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <input
          id="confirmPassword"
          type="password"
          className={input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className={btnBrandMd}
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </button>

      <p className={`text-center text-sm ${textSecondary} mt-4`}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => openModal("signin")}
          className={textBrand}
          disabled={isLoading}
        >
          Sign in
        </button>
      </p>
    </form>
  )
}