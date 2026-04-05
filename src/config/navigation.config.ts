import { Home, FileText, CheckSquare, Settings, Users, LucideIcon } from "lucide-react";

export type AllowedRoles = "*" | string[];

export interface NavItem {
  href: string;
  label: string;
  mobileLabel: string;
  icon: LucideIcon;
  allowedRoles: AllowedRoles;
}

export const APP_NAVIGATION: NavItem[] = [
  { 
    href: "/dashboard", 
    label: "Dashboard", 
    mobileLabel: "Home", 
    icon: Home,
    allowedRoles: "*" 
  },
  { 
    href: "/notes", 
    label: "Notes", 
    mobileLabel: "Notes", 
    icon: FileText,
    allowedRoles: "*" 
  },
  { 
    href: "/todos", 
    label: "Todos", 
    mobileLabel: "Tasks", 
    icon: CheckSquare,
    allowedRoles: "*" 
  },
  { 
    href: "/users", 
    label: "Users", 
    mobileLabel: "Users", 
    icon: Users, 
    allowedRoles: ["admin", "super-admin", "super-user"] 
  },
  { 
    href: "/settings", 
    label: "Settings", 
    mobileLabel: "Settings", 
    icon: Settings,
    allowedRoles: "*" 
  },
];