"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, CheckSquare, Settings } from "lucide-react";
import { useScrollDirection } from "@/hooks/ui/useScrollDirection";
import { textBrand } from "@/config/uiClasses";

export function MobileNav() {
  const pathname = usePathname();
  const isVisible = useScrollDirection();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/notes", label: "Notes", icon: FileText },
    { href: "/todos", label: "Todos", icon: CheckSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav 
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border px-6 py-3 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center gap-1 ${isActive ? textBrand : "text-foreground/50"}`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}