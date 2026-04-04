"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer"; 

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopBar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* The main scroll area */}
        <main className="flex-1 overflow-y-auto">
          {/* flex-col and min-h-full ensure the content fills the space 
            and pushes the footer to the bottom 
          */}
          <div className="flex flex-col min-h-full transition-all duration-200">
            <div className="flex-1 p-0 sm:p-4 md:p-6">
              {children}
            </div>
            
            {/* Footer is now part of the content flow */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}