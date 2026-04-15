"use client";

import Link from "next/link";
import { History } from "lucide-react";
import { useAppNavigation } from "@/hooks/ui/app-navigation/useAppNavigation";
import { headingHero, headingMd, textSecondary, stackLg, cardBase, textBrand } from "@/config/uiClasses";

export default function Dashboard() {
  const navItems = useAppNavigation();
  const shortcuts = navItems
    .filter((item) => item.dashboardShortcut)
    .map((item) => item.dashboardShortcut!);

  return (
    <div className={`${stackLg} py-8`}>
      <header className="px-4">
        <h1 className={headingHero}>Welcome back</h1>
        <p className={textSecondary}>What would you like to do today?</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {shortcuts.map((item) => (
          <Link 
            key={item.title} 
            href={item.href}
            className={`${cardBase} group hover:border-brand transition-all duration-200 border border-transparent flex flex-col gap-3`}
          >
            <div className={`p-3 rounded-lg bg-accent w-fit group-hover:bg-brand/10 transition-colors`}>
              <item.icon size={24} className={item.colorClass} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs text-foreground/60">{item.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="px-4 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <History size={20} className={textBrand} />
          <h2 className={headingMd}>Recent Workspace</h2>
        </div>
        <div className={`${cardBase} flex items-center justify-center py-20 border-dashed border-2 bg-transparent`}>
          <p className={textSecondary}>Your recent notes and tasks will appear here.</p>
        </div>
      </section>
    </div>
  );
}
