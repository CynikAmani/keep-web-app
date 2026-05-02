"use client";

import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav"; // New
import { Footer } from "./Footer";
import { Toaster } from "sonner"; 

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-0 sm:p-4 md:p-6 pb-24 lg:pb-6">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      <MobileNav />
      <Toaster />
    </div>
  );
}