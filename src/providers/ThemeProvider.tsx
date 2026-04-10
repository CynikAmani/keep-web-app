"use client"

import { useEffect, useState, createContext, useContext, ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const [theme, setTheme] = useState<Theme>("dark")

  /*
  ----------------------------------------------------------------
  | Read the already-applied theme from <html>
  ----------------------------------------------------------------
  */
  useEffect(() => {
    const root = document.documentElement

    if (root.classList.contains("light")) {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }, [])

  /*
  ----------------------------------------------------------------
  | Apply theme
  ----------------------------------------------------------------
  */
  useEffect(() => {
    const root = document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(theme)

    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)

  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return ctx
}