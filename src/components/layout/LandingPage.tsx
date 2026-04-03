"use client"

import { useTheme } from "@/providers/ThemeProvider"
import { Sun, Moon, StickyNote, Grid, Search, Sparkles } from "lucide-react"
import { useAuthModal } from "@/hooks/auth/useAuthModal"
import { AuthModal } from "@/components/auth/AuthModal"

import {
  containerPage,
  stackLg,
  stackMd,
  btnBrandLg,
  btnOutlineLg,
  btnBrandSm,
  btnOutlineSm,
  textSecondary,
  fontSans,
  headingHero,
  textBrand,
  badgeBrand
} from "@/config/uiClasses"

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const { openModal } = useAuthModal()

  return (
    <main className={`${fontSans} bg-background text-foreground min-h-screen`}>

      {/* NAVBAR */}
      <nav className={`flex justify-between items-center ${containerPage} py-4`}>
        <div className="flex items-center gap-2">
          <StickyNote size={26} className="text-brand" />
          <span className="text-2xl font-bold tracking-tight">Keep</span>
          <span className={badgeBrand}>Beta</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className={`${btnOutlineSm} flex items-center gap-2`}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          <button onClick={() => openModal("signin")} className={btnOutlineSm}>
            Sign In
          </button>
          <button onClick={() => openModal("signup")} className={btnBrandSm}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className={`text-center mt-24 px-6 ${stackLg} max-w-5xl mx-auto`}>
        <h1 className={headingHero}>
          Capture ideas before they disappear
          <span className={`block mt-2 ${textBrand}`}>Think. Write. Keep.</span>
        </h1>

        <p className={`mt-4 max-w-2xl mx-auto ${textSecondary}`}>
          A modern note-taking workspace inspired by Google Keep.
          Instantly capture thoughts, organize ideas, and retrieve everything in seconds
          with a beautifully simple interface.
        </p>

        <div className={`flex flex-col sm:flex-row justify-center mt-6 gap-4 ${stackMd}`}>
          <button onClick={() => openModal("signup")} className={btnBrandLg}>
            Get Started
          </button>
          <button onClick={() => openModal("signin")} className={btnOutlineLg}>
            Sign In
          </button>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section id="features" className={`mt-32 ${containerPage} grid md:grid-cols-3 gap-10 text-center`}>
        <div className={`${stackMd} bg-card/70 backdrop-blur-md rounded-xl p-6 shadow-md`}>
          <Sparkles size={32} className="text-brand mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Instant Capture</h3>
          <p className={textSecondary}>Write down ideas the moment they appear. No delays, no distractions.</p>
        </div>

        <div className={`${stackMd} bg-card/70 backdrop-blur-md rounded-xl p-6 shadow-md`}>
          <Grid size={32} className="text-brand mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Organized Thinking</h3>
          <p className={textSecondary}>Categorize and structure your notes so everything stays easy to find.</p>
        </div>

        <div className={`${stackMd} bg-card/70 backdrop-blur-md rounded-xl p-6 shadow-md`}>
          <Search size={32} className="text-brand mx-auto" />
          <h3 className="text-lg font-semibold mt-2">Fast Retrieval</h3>
          <p className={textSecondary}>Powerful search lets you find any note in seconds.</p>
        </div>
      </section>

      {/* AUTH MODAL */}
      <AuthModal />
      
    </main>
  )
}