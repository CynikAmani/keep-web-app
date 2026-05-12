"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FileText, ListTodo, Archive } from "lucide-react";
import * as ui from "@/config/uiClasses";
import ArchivedNotes from "./ArchivedNotes";
import ArchivedTodos from "./ArchivedTodos";

type TabType = "notes" | "todos";

export default function ArchivesManager() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("notes");

  useEffect(() => {
    const tab = searchParams.get("tab") as TabType;
    if (tab === "notes" || tab === "todos") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className={`${ui.stackLg} py-8`}>
      {/* Header */}
      <header className="px-4">
        <div className="flex items-center gap-3 mb-6">
          <Archive size={32} className="text-brand" />
          <h1 className={ui.headingHero}>Archives</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "notes"
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText size={16} />
              Notes
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab("todos")}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "todos"
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2">
              <ListTodo size={16} />
              Todos
            </div>
          </button>
        </div>
      </header>

      {/* Tab Content */}
      <main className="px-4 mt-6">
        {activeTab === "notes" && <ArchivedNotes />}
        {activeTab === "todos" && <ArchivedTodos />}
      </main>
    </div>
  );
}
