import {
  Home,
  FileText,
  CheckSquare,
  Settings,
  Users,
  PlusCircle,
  LucideIcon,
  Shield,
  UserCircle,
  Archive
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
  showInMain?: boolean;
}

export const APP_NAVIGATION: NavItem[] = [
  { 
    href: "/app/dashboard", 
    label: "Dashboard", 
    mobileLabel: "Home", 
    icon: Home,
    allowedRoles: "*",
    showInMain: true 
  },
  { 
    href: "/app/notes", 
    label: "Notes", 
    mobileLabel: "Notes", 
    icon: FileText,
    allowedRoles: "*",
    showInMain: true,
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
    showInMain: true,
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
    allowedRoles: ["admin", "super-admin", "super-user"],
    showInMain: false 
  },
  { 
    href: "/app/roles", 
    label: "Roles", 
    mobileLabel: "Roles", 
    icon: Shield, 
    allowedRoles: ["admin", "super-admin"],
    showInMain: false 
  },
  { 
    href: "/app/account", 
    label: "Account", 
    mobileLabel: "Account", 
    icon: UserCircle, 
    allowedRoles: "*",
    showInMain: false 
  },
  { 
    href: "/app/archives", 
    label: "Archives", 
    mobileLabel: "Archives", 
    icon: Archive,
    allowedRoles: "*",
    showInMain: false 
  },
  { 
    href: "/app/settings", 
    label: "Settings", 
    mobileLabel: "Settings", 
    icon: Settings,
    allowedRoles: "*",
    showInMain: false,
    dashboardShortcut: {
      title: "Settings",
      description: "App preferences",
      href: "/app/settings",
      icon: Settings,
      colorClass: "text-slate-500",
    },
  },
];