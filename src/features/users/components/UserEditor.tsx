"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user.store";
import { useUserActions } from "../hooks/useUserActions";
import { CreateUserPayload, UpdateUserPayload } from "../types/user.types";
import * as ui from "@/config/uiClasses";
import { X } from "lucide-react";

interface UserEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserEditor({ isOpen, onClose }: UserEditorProps) {
  const { selectedUser, isLoading } = useUserStore();
  const { createUser, updateUser } = useUserActions();

  const [formData, setFormData] = useState<CreateUserPayload>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const isEditMode = !!selectedUser;

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        password_confirmation: "",
      });
    } else {
      setFormData({ name: "", email: "", password: "", password_confirmation: "" });
    }
  }, [selectedUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && selectedUser) {
      await updateUser(selectedUser.id, formData as UpdateUserPayload);
    } else {
      await createUser(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Slide-over Panel */}
      <div className="relative h-full w-full max-w-md bg-card shadow-xl border-l border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className={ui.headingMd}>
              {isEditMode ? "Edit User" : "New User"}
            </h2>
            <p className={ui.textSecondary + " text-sm"}>
              {isEditMode ? "Update account information" : "Create a new platform user"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form id="user-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className={ui.stackLg}>
            <div className={ui.stackSm}>
              <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
              <input
                type="text"
                required
                className={ui.input}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className={ui.stackSm}>
              <label className="text-xs font-bold uppercase text-muted-foreground">Email Address</label>
              <input
                type="email"
                required
                disabled={isEditMode}
                className={`${ui.input} ${isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className={ui.divider} />

            <div className={ui.stackSm}>
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {isEditMode ? "Change Password (Optional)" : "Password"}
              </label>
              <input
                type="password"
                required={!isEditMode}
                className={ui.input}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className={ui.stackSm}>
              <label className="text-xs font-bold uppercase text-muted-foreground">Confirm Password</label>
              <input
                type="password"
                required={!isEditMode}
                className={ui.input}
                value={formData.password_confirmation}
                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20">
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className={ui.btnCancel + " flex-1"}>
              Cancel
            </button>
            <button 
              type="submit" 
              form="user-form"
              disabled={isLoading}
              className={ui.btnBrandMd + " flex-1"}
            >
              {isLoading ? "Saving..." : isEditMode ? "Update User" : "Create User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}