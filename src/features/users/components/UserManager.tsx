"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user.store";
import { useUserActions } from "../hooks/useUserActions";
import { UserFilters as FiltersComp } from "./UserFilters";
import { UserTable } from "./UserTable";
import { UserEditor } from "./UserEditor";
import { UserDetailsView } from "./UserDetailsView";
import { User } from "../types/user.types";
import * as ui from "@/config/uiClasses";

export function UserManager() {
  const { users, filteredUsers, filters, isLoading, setSelectedUser } = useUserStore();
  const { fetchUsers } = useUserActions();

  const [showEditor, setShowEditor] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [targetId, setTargetId] = useState<number | undefined>();

  useEffect(() => {
    fetchUsers(filters);
  }, [filters]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditor(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setShowEditor(true);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setTargetId(user.id);
    setShowDetails(true);
  };

  return (
    <div className={`${ui.containerPage} py-8 min-h-screen`}>
      <div className="flex flex-col mb-8">
        <h1 className={ui.headingHero}>User Management</h1>
        <p className={ui.textSecondary}>Control system access, roles, and account security.</p>
      </div>

      {/* 
        GRID FIX: Using 'grid grid-cols-1' forces the browser to treat this as 
        a container that cannot exceed its parent's width. 'min-w-0' allows 
        the internal table to overflow without pushing the container.
      */}
      <div className="grid grid-cols-1 gap-6 min-w-0">
        <FiltersComp onAddClick={handleAdd} />

        <div className="min-w-0 overflow-hidden">
          <UserTable 
            users={users} 
            filteredUsers={filteredUsers}
            isLoading={isLoading}
            onEdit={handleEdit} 
            onView={handleView} 
          />
        </div>
      </div>

      <UserEditor 
        isOpen={showEditor} 
        onClose={() => setShowEditor(false)} 
      />
      
      <UserDetailsView 
        isOpen={showDetails} 
        onClose={() => setShowDetails(false)} 
        userId={targetId}
      />
    </div>
  );
}