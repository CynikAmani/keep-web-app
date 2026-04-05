"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppNavigation } from "@/hooks/ui/app-navigation/useAppNavigation";
import { stackSm, textBrand } from "@/config/uiClasses";

export function Sidebar() {
  const pathname = usePathname();
  const navItems = useAppNavigation();

  return (
    <aside className="hidden lg:block w-64 bg-background border-r border-border h-[calc(100vh-64px)] sticky top-16">
      <nav className="p-4">
        <div className={stackSm}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150
                  ${isActive 
                    ? `bg-brand/10 ${textBrand} font-semibold` 
                    : "text-foreground/70 hover:bg-accent"
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
    </aside>
  );
}