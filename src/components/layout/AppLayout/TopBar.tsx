"use client";

import { Menu, StickyNote, Sun, Moon, LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/hooks/auth/useAuth";
import { 
  btnGhostSm, 
  btnOutlineSm,
  badgeBrand, 
  textBrand
} from "@/config/uiClasses";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b border-border px-4">
      <div className="h-full flex items-center justify-between">
        
        {/* Left Side: Toggle & Branding Restored */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-accent lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
          
          <Link href="/dashboard" className="flex items-center gap-2">
            <StickyNote size={26} className={textBrand} />
            <span className="text-2xl font-bold tracking-tight">Keep</span>
            <span className={badgeBrand}>Beta</span>
          </Link>
        </div>

        {/* Right Side: Theme Switcher & Logout */}
        <div className="flex items-center gap-3">
          {/* Theme button identical to Landing Page logic */}
          <button onClick={toggleTheme} className={`${btnOutlineSm} flex items-center gap-2`}>
            {theme === "dark" ? (
              <>
                <Sun size={18} />
                <span className="text-sm">Light</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span className="text-sm">Dark</span>
              </>
            )}
          </button>
          
          <button 
            onClick={() => logout()} 
            className={`${btnGhostSm} text-destructive hover:bg-destructive/10 gap-2`}
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}