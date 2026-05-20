"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppNavigation } from "@/hooks/ui/app-navigation/useAppNavigation";
import { useScrollDirection } from "@/hooks/ui/useScrollDirection";
import { textBrand } from "@/config/uiClasses";
import { MoreVertical, X } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const navItems = useAppNavigation();
  const isVisible = useScrollDirection();
  const [isExpanded, setIsExpanded] = useState(false);

  const mainNavItems = navItems.filter(item => item.showInMain !== false);
  const moreNavItems = navItems.filter(item => item.showInMain === false);

  // Close expanded menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded]);

  // Close expanded menu when route changes
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  return (
    <>
      <nav 
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border px-6 py-3 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`flex flex-col items-center gap-1 ${isActive ? textBrand : "text-foreground/50"}`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {item.mobileLabel}
                </span>
              </Link>
            );
          })}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex flex-col items-center gap-1 ${isExpanded ? textBrand : "text-foreground/50"}`}
          >
            {isExpanded ? (
              <X size={22} strokeWidth={2.5} />
            ) : (
              <MoreVertical size={22} strokeWidth={2} />
            )}
            <span className="text-[10px] font-medium uppercase tracking-wider">
              {isExpanded ? "Close" : "More"}
            </span>
          </button>
        </div>
      </nav>

      {/* Expanded Menu Overlay */}
      {isExpanded && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="absolute bottom-20 left-4 right-4 bg-background/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl p-6 animate-in slide-in-from-bottom-8 duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-3 gap-4">
              {moreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 hover:bg-accent/50 ${
                      isActive ? "bg-accent" : ""
                    }`}
                  >
                    <div className={`p-3 rounded-full transition-all duration-200 ${
                      isActive ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <Icon 
                        size={24} 
                        strokeWidth={isActive ? 2.5 : 2}
                        className={isActive ? textBrand : "text-foreground/70"}
                      />
                    </div>
                    <span className="text-xs font-medium text-center text-foreground/80">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}