"use client";

import React from "react";
import { User } from "../types/user.types";
import { getStatusBadgeProps, formatUserJoinDate } from "../utils/userHelpers";
import { UserActionDropdown } from "./UserActionDropdown";
import { UserTableSkeleton } from "./UserTableSkeleton";
import * as ui from "@/config/uiClasses";


interface UserTableProps {
  users: User[];
  filteredUsers?: User[];
  isLoading?: boolean;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

export function UserTable({ users, filteredUsers, isLoading = false, onEdit, onView }: UserTableProps) {
  const displayUsers = filteredUsers || users;
  const hasUsers = users.length > 0;
  const hasFilteredResults = displayUsers.length > 0;

  console.log(users)

  if (isLoading) {
    return <UserTableSkeleton />;
  }

  if (!hasUsers) {
    return (
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-muted-foreground">👥</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Get started by adding your first user to the system.
          </p>
        </div>
      </div>
    );
  }

  if (!hasFilteredResults) {
    return (
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-muted-foreground">🔍</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No matching users</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/30 border-b border-border">
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Identity</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Access Roles</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Member Since</th>
              <th className="p-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {displayUsers.map((user) => {
              const status = getStatusBadgeProps(user.deleted_at ? 'deactivated' : 'active');
              return (
                <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </td>
                  <td className={`p-4 flex items-center gap-2`}>
                    {user?.roles?.map( (role, index) => {
                       return <span key={role || index} className="text-xs font-medium px-2 py-1 bg-brand/5 text-brand rounded border border-brand/10">
                        {role}
                        </span>
                    })}
                  </td>
                  <td className="p-4">
                    <span className={status.className}>{status.label}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-muted-foreground">{formatUserJoinDate(user.created_at)}</span>
                  </td>
                  <td className="p-4 text-right">
                    <UserActionDropdown user={user} onEdit={onEdit} onView={onView} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}