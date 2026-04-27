'use client';

import React, { useEffect } from "react";
import * as ui from "@/config/uiClasses";
import { useRoleStore } from "../store/role.store";
import { useRoleActions } from "../hooks/useRoleActions";
import { Role } from "../types/role.types";
import { RoleItem } from "./RoleItem";
import { PermissionGroup } from "./PermissionGroup";
import { RoleWizard } from "./RoleFormWizard";
import { ArrowLeft, Save, Loader2, ShieldCheck, Info } from "lucide-react";

export function RoleManager() {
  const { 
    roles, 
    availablePermissions, 
    activeRole, 
    clearSelection, 
    isLoading,
    isPermissionsLoading,
    startEditing,
    error
  } = useRoleStore();
  
  const { fetchInitialData, savePermissions, fetchRolePermissions } = useRoleActions();

  const handleStartEditing = async (role: Role) => {
    startEditing(role);
    await fetchRolePermissions(role.id);
  };

  useEffect(() => { 
    fetchInitialData(); 
  }, []);

  // --- VIEW 1: Role Selection & Global Actions ---
  if (!activeRole) {
    return (
      <div className={ui.stackLg + " animate-in fade-in duration-500 pb-10"}>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-card p-8 rounded-3xl border border-border shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand rounded-lg shadow-lg shadow-brand/20">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <h1 className={ui.headingLg}>Role Management</h1>
            </div>
            <p className={ui.textSecondary + " max-w-md"}>
              Assign granular access levels to users. Control exactly what each role can view, create, or modify across the system.
            </p>
          </div>
          <div className="relative z-10">
            <RoleWizard mode="create" onSuccess={fetchInitialData} />
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-brand/5 rounded-full blur-3xl" />
        </header>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-center gap-3 text-sm">
            <Info size={18} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            // Loading skeleton for roles
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={`${ui.cardBase} animate-pulse`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-secondary/50">
                      <div className="w-6 h-6 bg-muted rounded" />
                    </div>
                    <div className="flex-1">
                      <div className="h-5 bg-muted rounded w-32 mb-2" />
                      <div className="h-4 bg-muted rounded w-48" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="h-9 bg-muted rounded w-20" />
                    <div className="h-9 bg-muted rounded flex-1 sm:flex-none" />
                  </div>
                </div>
              </div>
            ))
          ) : roles.length === 0 ? (
            // Cool empty fallback component
            <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl bg-gradient-to-br from-card via-card to-secondary/20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-muted rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <ShieldCheck size={40} className="text-muted-foreground/50" />
                </div>
                <h3 className={ui.headingMd + " mb-3"}>No Roles Yet</h3>
                <p className={ui.textSecondary + " mb-6"}>
                  Create your first role to start managing user permissions and access control across your system.
                </p>
                <div className="inline-block">
                  <RoleWizard mode="create" onSuccess={fetchInitialData} />
                </div>
              </div>
            </div>
          ) : (
            // Actual roles list
            roles.map(role => (
              <RoleItem 
                key={role.id} 
                role={role} 
                onEditPermissions={handleStartEditing} 
                onRefresh={fetchInitialData}
              />
            ))
          )}
        </div>
      </div>
    );
  }

  // --- VIEW 2: Permission Configuration Workspace ---
  return (
    <div className={ui.stackLg + " animate-in fade-in slide-in-from-bottom-4 duration-300 pb-24"}>
      <nav className="bg-card/80 rounded-2xl border border-border sticky top-4 z-40 shadow-xl backdrop-blur-xl">
        {/* Mobile Layout */}
        <div className="flex flex-col sm:hidden p-4 gap-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={clearSelection} 
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
               <h2 className={"text-sm font-bold capitalize tracking-tight truncate max-w-32"}>{activeRole.name}</h2>
            </div>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-[9px] bg-brand/10 text-brand px-2 py-0.5 rounded font-bold uppercase tracking-widest text-center">
                Editing Access
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground italic text-center">
              Changes apply to all users with this role
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={clearSelection} 
              className={ui.btnGhostMd + " flex-1 text-xs py-2"}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              onClick={savePermissions} 
              disabled={isLoading}
              className={ui.btnBrandMd + " gap-1 shadow-lg shadow-brand/20 flex-1 text-xs py-2"}
            >
              {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Sync
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={clearSelection} 
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="h-10 w-px bg-border mx-1" />
            <div>
              <div className="flex items-center gap-2">
                 <h2 className={ui.headingMd + " capitalize tracking-tight"}>{activeRole.name}</h2>
                 <span className="text-[10px] bg-brand/10 text-brand px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                   Editing Access
                 </span>
              </div>
              <p className="text-[11px] text-muted-foreground italic">
                Changes will apply to all users assigned to this role.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={clearSelection} 
              className={ui.btnGhostMd}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              onClick={savePermissions} 
              disabled={isLoading}
              className={ui.btnBrandMd + " gap-2 shadow-lg shadow-brand/20 min-w-37.5"}
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Sync Permissions
            </button>
          </div>
        </div>
      </nav>

      <div className={ui.stackXl}>
        {isPermissionsLoading ? (
          // Loading skeleton for permissions
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={`${ui.cardBase} animate-pulse`}>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-border/50">
                  <div>
                    <div className="h-4 bg-muted rounded w-24 mb-2" />
                    <div className="h-3 bg-muted rounded w-16" />
                  </div>
                  <div className="h-8 bg-muted rounded w-20" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, permIndex) => (
                    <div key={permIndex} className="p-4 rounded-xl border-2 border-transparent bg-secondary/30">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-4 h-4 rounded border border-muted-foreground/50" />
                        <div className="flex-1">
                          <div className="h-4 bg-muted rounded w-full mb-2" />
                          <div className="h-3 bg-muted rounded w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          availablePermissions.map(group => (
            <PermissionGroup key={group.sectionName} group={group} />
          ))
        )}
      </div>
    </div>
  );
}