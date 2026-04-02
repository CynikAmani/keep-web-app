"use client"

import { useEffect, useState, useMemo, createContext, useContext, ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light")

  /*
   -----------------------------------------------------------------------
   | Load saved theme from localStorage
   -----------------------------------------------------------------------
  */
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme
    if (saved) setTheme(saved)
  }, []);


  /*
  ------------------------------------------------------------------------
  | Apply theme class to <html>
  ------------------------------------------------------------------------
  */
  useEffect(() => {
    const opposite = theme === "light" ? "dark" : "light"
    document.documentElement.classList.remove(opposite)
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"))

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}



/*
 -------------------------------------------------------------------------
 | Custom hook with type safety
 -------------------------------------------------------------------------
*/
export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider")
  return ctx
}