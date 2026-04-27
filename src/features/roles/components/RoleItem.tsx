'use client';

import * as ui from "@/config/uiClasses";
import { Role } from "../types/role.types";
import { Shield, ShieldCheck, ChevronRight } from "lucide-react";
import { RoleWizard } from "./RoleFormWizard";

interface RoleItemProps {
  role: Role;
  onEditPermissions: (role: Role) => void;
  onRefresh: () => void;
}

export function RoleItem({ role, onEditPermissions, onRefresh }: RoleItemProps) {
  return (
    <div className={`${ui.cardBase} flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-brand/40 transition-all group gap-4`}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-secondary/50 text-foreground/50 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
          <Shield size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={ui.headingSm + " capitalize"}>{role.name}</h3>
            {role.permissions && role.permissions.length > 0 && (
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                Active
              </span>
            )}
          </div>
          <p className={ui.textSecondary + " text-sm leading-relaxed"}>
            {role.description || "No description provided for this role."}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0">
        <RoleWizard 
          mode="edit" 
          initialData={{ id: role.id, name: role.name, description: role.description }} 
          onSuccess={onRefresh} 
        />
        
        <button 
          onClick={() => onEditPermissions(role)}
          className={ui.btnBrandOutlineSm + " gap-2 flex-1 sm:flex-none shadow-sm"}
        >
          <ShieldCheck size={14} />
          Configure Access
          <ChevronRight size={14} className="ml-1 opacity-50" />
        </button>
      </div>
    </div>
  );
}