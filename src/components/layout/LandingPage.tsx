"use client"

import Link from "next/link"
import { useTheme } from "@/providers/ThemeProvider"
import { Sun, Moon, StickyNote } from "lucide-react"

export default function LandingPage() {

  const { theme, toggleTheme } = useTheme()

  return (
    <main className="ui-surface-app">

      {/* NAVBAR */}
      <nav className="ui-navbar">
        <div className="ui-navbar-logo">
          <StickyNote size={24} />
          Keep
        </div>

        <div className="ui-navbar-items">
          <button
            onClick={toggleTheme}
            className="ui-btn-secondary flex items-center gap-1"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span className="ui-body-sm">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          <Link href="/login" className="ui-btn-secondary">
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto my-16 flex flex-col items-center gap-6 px-4">

        <h1 className="ui-heading-hero ui-text-primary">
          Capture your ideas instantly, anywhere
        </h1>

        <p className="ui-body-lg ui-text-secondary">
          Modern, fast, and organized note-taking inspired by Google Keep. Keep all your thoughts
          in one place, easily searchable and beautifully displayed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/login" className="ui-btn-primary">
            Start Taking Notes
          </Link>
          <Link href="#features" className="ui-btn-secondary">
            View Features
          </Link>
        </div>

      </section>

    </main>
  )
}