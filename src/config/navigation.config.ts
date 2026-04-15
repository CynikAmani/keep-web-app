import {
  Home,
  FileText,
  CheckSquare,
  Settings,
  Users,
  PlusCircle,
  LucideIcon,
} from "lucide-react";

export type AllowedRoles = "*" | string[];

export interface DashboardShortcut {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  colorClass: string;
}

export interface NavItem {
  href: string;
  label: string;
  mobileLabel: string;
  icon: LucideIcon;
  allowedRoles: AllowedRoles;
  dashboardShortcut?: DashboardShortcut;
}

export const APP_NAVIGATION: NavItem[] = [
  { 
    href: "/app/dashboard", 
    label: "Dashboard", 
    mobileLabel: "Home", 
    icon: Home,
    allowedRoles: "*" 
  },
  { 
    href: "/app/notes", 
    label: "Notes", 
    mobileLabel: "Notes", 
    icon: FileText,
    allowedRoles: "*",
    dashboardShortcut: {
      title: "New Note",
      description: "Capture a quick thought",
      href: "/app/notes?action=new",
      icon: PlusCircle,
      colorClass: "text-blue-500",
    },
  },
  { 
    href: "/app/todos", 
    label: "Todos", 
    mobileLabel: "Tasks", 
    icon: CheckSquare,
    allowedRoles: "*",
    dashboardShortcut: {
      title: "New Todo",
      description: "Check off your list",
      href: "/app/todos?action=new",
      icon: CheckSquare,
      colorClass: "text-emerald-500",
    },
  },
  { 
    href: "/app/users", 
    label: "Users", 
    mobileLabel: "Users", 
    icon: Users, 
    allowedRoles: ["admin", "super-admin", "super-user"] 
  },
  { 
    href: "/app/settings", 
    label: "Settings", 
    mobileLabel: "Settings", 
    icon: Settings,
    allowedRoles: "*",
    dashboardShortcut: {
      title: "Settings",
      description: "App preferences",
      href: "/app/settings",
      icon: Settings,
      colorClass: "text-slate-500",
    },
  },
];
