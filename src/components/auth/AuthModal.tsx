"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useAuthModal } from "@/hooks/auth/useAuthModal"
import { SignInForm } from "./SignInForm"
import { SignUpForm } from "./SignUpForm"
import { headingMd, textSecondary } from "@/config/uiClasses"

export function AuthModal() {
  const { isOpen, closeModal, mode } = useAuthModal()

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={headingMd}>
            {mode === "signin" ? "Welcome Back" : "Create an Account"}
          </DialogTitle>
          <DialogDescription className={textSecondary}>
            {mode === "signin"
              ? "Sign in to access your notes"
              : "Get started with Keep - it's free"}
          </DialogDescription>
        </DialogHeader>
        
        {mode === "signin" ? <SignInForm /> : <SignUpForm />}
      </DialogContent>
    </Dialog>
  )
}