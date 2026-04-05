"use client";

import { StickyNote, Sun, Moon, LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/hooks/auth/useAuth";
import { useScrollDirection } from "@/hooks/ui/useScrollDirection";
import { btnGhostSm, btnOutlineSm, badgeBrand, textBrand } from "@/config/uiClasses";

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const isVisible = useScrollDirection();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b border-border px-4 transition-transform duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="h-full flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <StickyNote size={26} className={textBrand} />
          <span className="text-2xl font-bold tracking-tight">Keep</span>
          <span className={badgeBrand}>Beta</span>
        </Link>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className={`${btnOutlineSm} flex items-center gap-2`}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          
          <button onClick={() => logout()} className={`${btnGhostSm} text-destructive gap-2`}>
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}