"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { input } from "@/config/uiClasses"

interface PasswordInputProps {
  id?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  disabled?: boolean
  className?: string
}

export function PasswordInput({
  id,
  placeholder = "Enter password",
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="relative">
      <input
        id={id}
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        className={`${input} ${className} pr-10`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded-md p-1"
        aria-label={isVisible ? "Hide password" : "Show password"}
        tabIndex={0}
        disabled={disabled}
      >
        {isVisible ? (
          <EyeOff size={20} className="stroke-2" />
        ) : (
          <Eye size={20} className="stroke-2" />
        )}
      </button>
    </div>
  )
}
