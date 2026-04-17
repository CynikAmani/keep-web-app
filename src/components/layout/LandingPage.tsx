"use client"

import { useTheme } from "@/providers/ThemeProvider"
import { Sun, Moon, StickyNote, Grid, Search, Sparkles } from "lucide-react"
import { useAuthModal } from "@/hooks/auth/useAuthModal"
import { AuthModal } from "@/components/auth/AuthModal"

import {
  containerPage,
  stackResponsiveMd,
  stackResponsiveLg,
  btnBrandResponsiveLg,
  btnOutlineResponsiveLg,
  btnBrandResponsiveSm,
  btnOutlineResponsiveSm,
  textSecondary,
  fontSans,
  headingHero,
  textBrand,
  badgeBrand,
  btnGroupResponsiveCenter,
  headingMd,
  headingSm
} from "@/config/uiClasses"

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme()
  const { openModal } = useAuthModal()

  return (
    <main className={`${fontSans} bg-background text-foreground min-h-screen`}>

      {/* NAVBAR - Google-level responsive design */}
      <nav className={`flex justify-between items-center ${containerPage} py-3 sm:py-4 border-b border-border/40`}>
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <StickyNote size={24} className="text-brand" />
          <span className="text-xl sm:text-2xl font-bold tracking-tight hidden xs:inline">Keep</span>
          <span className={badgeBrand}>Beta</span>
        </div>

        {/* Action buttons - Stack on mobile, inline on desktop */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleTheme} 
            className={`${btnOutlineResponsiveSm} w-auto! justify-center px-2.5 sm:px-3`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} className="sm:hidden" /> : <Moon size={16} className="sm:hidden" />}
            <span className="hidden sm:flex items-center gap-1 text-xs sm:text-sm">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>

          <button 
            onClick={() => openModal("signin")} 
            className={`${btnOutlineResponsiveSm} w-auto!`}
          >
            <span className="text-xs sm:text-sm">Sign In</span>
          </button>

          <button 
            onClick={() => openModal("signup")} 
            className={`${btnBrandResponsiveSm} w-auto!`}
          >
            <span className="text-xs sm:text-sm">Sign Up</span>
          </button>
        </div>
      </nav>

      {/* HERO - Full mobile optimization */}
      <section className={`text-center mt-12 sm:mt-20 lg:mt-24 px-4 sm:px-6 ${stackResponsiveLg} max-w-4xl mx-auto`}>
        <h1 className={headingHero}>
          Capture ideas before they disappear
          <span className={`block mt-2 sm:mt-3 ${textBrand}`}>Think. Write. Keep.</span>
        </h1>

        <p className={`mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed ${textSecondary}`}>
          A modern note-taking workspace inspired by Google Keep.
          Instantly capture thoughts, organize ideas, and retrieve everything in seconds
          with a beautifully simple interface.
        </p>

        {/* CTA Buttons - Full width on mobile, auto on desktop */}
        <div className={`mt-6 sm:mt-8 ${btnGroupResponsiveCenter}`}>
          <button 
            onClick={() => openModal("signup")} 
            className={btnBrandResponsiveLg}
          >
            Get Started
          </button>
          <button 
            onClick={() => openModal("signin")} 
            className={btnOutlineResponsiveLg}
          >
            Sign In
          </button>
        </div>
      </section>

      {/* FEATURE CARDS - Optimized grid for mobile */}
      <section id="features" className={`mt-20 sm:mt-28 lg:mt-32 ${containerPage} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8`}>
        {/* Feature 1 */}
        <div className={`${stackResponsiveMd} bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-card/70 transition-colors duration-200`}>
          <Sparkles size={28} className="text-brand mx-auto sm:mx-0" />
          <h3 className={`${headingMd} text-left`}>Instant Capture</h3>
          <p className={`text-xs sm:text-sm ${textSecondary} text-left`}>Write down ideas the moment they appear. No delays, no distractions.</p>
        </div>

        {/* Feature 2 */}
        <div className={`${stackResponsiveMd} bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-card/70 transition-colors duration-200`}>
          <Grid size={28} className="text-brand mx-auto sm:mx-0" />
          <h3 className={`${headingMd} text-left`}>Organized Thinking</h3>
          <p className={`text-xs sm:text-sm ${textSecondary} text-left`}>Categorize and structure your notes so everything stays easy to find.</p>
        </div>

        {/* Feature 3 */}
        <div className={`col-span-1 sm:col-span-2 lg:col-span-1 ${stackResponsiveMd} bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-card/70 transition-colors duration-200`}>
          <Search size={28} className="text-brand mx-auto sm:mx-0" />
          <h3 className={`${headingMd} text-left`}>Fast Retrieval</h3>
          <p className={`text-xs sm:text-sm ${textSecondary} text-left`}>Powerful search lets you find any note in seconds.</p>
        </div>
      </section>

      {/* AUTH MODAL */}
      <AuthModal />
      
    </main>
  )
}