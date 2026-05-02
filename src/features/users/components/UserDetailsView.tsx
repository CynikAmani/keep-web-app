"use client";

import React, { useEffect } from "react";
import { useUserStore } from "../store/user.store";
import { useUserActions } from "../hooks/useUserActions";
import { getStatusBadgeProps, formatUserRoles } from "../utils/userHelpers";
import { dateFormatter } from "@/utils/dateFormatter";
import * as ui from "@/config/uiClasses";
import { X, Mail, Calendar, ShieldCheck, User as UserIcon, Key, FileText, CheckSquare, Tag, Settings } from "lucide-react";
import { UserDetailsSkeleton } from "./UserDetailsSkeleton";

interface UserDetailsViewProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
}

// Helper function to categorize permissions
const categorizePermissions = (permissions: string[] | undefined) => {
  if (!permissions || permissions.length === 0) return {};

  const categories = {
    notes: { icon: FileText, label: 'Notes', permissions: [] as string[] },
    todos: { icon: CheckSquare, label: 'Todo Lists', permissions: [] as string[] },
    labels: { icon: Tag, label: 'Labels', permissions: [] as string[] },
    system: { icon: Settings, label: 'System', permissions: [] as string[] }
  };

  permissions.forEach(permission => {
    if (permission.includes('note')) {
      categories.notes.permissions.push(permission);
    } else if (permission.includes('todo')) {
      categories.todos.permissions.push(permission);
    } else if (permission.includes('label')) {
      categories.labels.permissions.push(permission);
    } else {
      categories.system.permissions.push(permission);
    }
  });

  return categories;
};

export function UserDetailsView({ isOpen, onClose, userId }: UserDetailsViewProps) {
  const { selectedUser, isLoading } = useUserStore();
  const { fetchUserById } = useUserActions();

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserById(userId);
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  const status = selectedUser ? getStatusBadgeProps(selectedUser.deleted_at ? 'deactivated' : 'active') : null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Side Panel */}
      <div className="relative h-full w-full max-w-md bg-card shadow-2xl border-l border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/10">
          <h2 className={ui.headingMd}>User Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {isLoading ? (
          <UserDetailsSkeleton />
        ) : selectedUser ? (
          <div className="flex-1 overflow-y-auto">
            {/* Profile Hero */}
            <div className="p-8 flex flex-col items-center border-b border-border bg-linear-to-b from-muted/20 to-transparent">
              <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand/20 flex items-center justify-center mb-4">
                <UserIcon size={32} className="text-brand" />
              </div>
              <h3 className={ui.headingLg}>{selectedUser.name}</h3>
              <div className={`mt-2 ${status?.className}`}>
                {status?.label}
              </div>
            </div>

            {/* Detailed Info */}
            <div className="p-6 space-y-8">
              {/* Email Block */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg"><Mail size={18} className="text-muted-foreground" /></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Email Address</span>
                  <span className="text-sm font-medium mt-1">{selectedUser.email}</span>
                </div>
              </div>

              {/* Roles Block */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg"><ShieldCheck size={18} className="text-muted-foreground" /></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Assigned Roles</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedUser.roles?.length ? (
                      selectedUser.roles.map((role, index) => {
                        const roleText = typeof role === 'string' ? role : role.name;
                        const roleKey = typeof role === 'string' ? role : role.id || index;
                        return (
                          <span key={roleKey} className={ui.badgeBrand + " border border-brand/20"}>
                            {roleText}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-sm text-muted-foreground italic">No roles assigned</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Permissions Block */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg"><Key size={18} className="text-muted-foreground" /></div>
                <div className="flex flex-col flex-1">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">System Permissions</span>
                  {selectedUser.permissions?.length ? (
                    <div className="mt-3 space-y-3">
                      {Object.entries(categorizePermissions(selectedUser.permissions)).map(([categoryKey, category]) => {
                        if (category.permissions.length === 0) return null;
                        const Icon = category.icon;
                        return (
                          <div key={categoryKey} className="bg-muted/30 rounded-lg p-3 border border-border/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon size={14} className="text-muted-foreground" />
                              <span className="text-xs font-semibold text-muted-foreground">{category.label}</span>
                              <span className="text-xs text-muted-foreground">({category.permissions.length})</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {category.permissions.map(permission => (
                                <span 
                                  key={permission} 
                                  className="text-xs px-2 py-1 bg-background border border-border/50 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {permission.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-muted-foreground italic">
                      No permissions assigned
                    </div>
                  )}
                </div>
              </div>

              {/* Account Dates */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg"><Calendar size={18} className="text-muted-foreground" /></div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Account History</span>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Joined:</span> {selectedUser.created_at ? dateFormatter.fullDate(selectedUser.created_at) : 'Unknown'}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Last Update:</span> {selectedUser.updated_at ? dateFormatter.fullDate(selectedUser.updated_at) : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className={ui.textSecondary}>User not found or error loading data.</p>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20">
          <button onClick={onClose} className={ui.btnOutlineMd + " w-full"}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}