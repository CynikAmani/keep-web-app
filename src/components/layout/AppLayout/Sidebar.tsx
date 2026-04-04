"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings, Users, X, CheckSquare } from "lucide-react";
import { useRBAC } from "@/hooks/auth/useRBAC";
import { stackSm, textBrand, btnGhostSm } from "@/config/uiClasses";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { hasRole } = useRBAC();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/notes", label: "Notes", icon: FileText },
    { href: "/todos", label: "Todos", icon: CheckSquare },
    { href: "/settings", label: "Settings", icon: Settings },
    ...(hasRole("admin") ? [{ href: "/users", label: "Users", icon: Users }] : []),
  ];

  return (
    <>
      {/* Mobile Overlay - Only visible when isOpen is true */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="font-bold text-brand">Menu</span>
            <button onClick={onClose} className={btnGhostSm}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4">
            {/* Using stackSm (gap-2) instead of stackMd (gap-4) to fix the gap issue */}
            <div className={stackSm}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150
                      ${isActive 
                        ? `bg-brand/10 ${textBrand} font-semibold` 
                        : "text-foreground/70 hover:bg-accent hover:text-foreground"
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}