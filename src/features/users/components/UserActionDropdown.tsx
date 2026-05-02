"use client";

import React, { useState } from "react";
import { User } from "../types/user.types";
import { useUserActions } from "../hooks/useUserActions";
import { useUserStore } from "../store/user.store";
import { ActionButton } from "@/features/shared/components/ui/ActionButton";
import { getUserStatus } from "../utils/userHelpers";
import { toast } from "sonner";
import * as ui from "@/config/uiClasses";
import { 
  MoreHorizontal, 
  UserCog, 
  KeyRound, 
  UserMinus, 
  UserCheck, 
  History,
  Shield,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { RoleAssignmentWizard } from "./RoleAssignmentWizard";

interface UserActionDropdownProps {
  user: User;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
}

type LoadingAction = 'toggle' | 'revoke' | 'reset' | null;

export function UserActionDropdown({ user, onEdit, onView }: UserActionDropdownProps) {
  const { toggleUserStatus, revokeTokens, resetPassword } = useUserActions();
  const { isLoading } = useUserStore();
  const status = getUserStatus(user);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const [showRoleWizard, setShowRoleWizard] = useState(false);

  const handleToggleStatus = async () => {
    setLoadingAction('toggle');
    try {
      await toggleUserStatus(user.id, status);
      toast.success(status === 'active' ? 'User Deactivated' : 'User Activated', {
        description: `${user.name} has been ${status === 'active' ? 'deactivated' : 'activated'} successfully.`
      });
    } catch (error) {
      toast.error('Failed to Update Status', {
        description: `Unable to ${status === 'active' ? 'deactivate' : 'activate'} ${user.name}. Please try again.`
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRevokeTokens = async () => {
    setLoadingAction('revoke');
    try {
      await revokeTokens(user.id);
      toast.success('Tokens Revoked', {
        description: `All access tokens for ${user.name} have been revoked successfully.`
      });
    } catch (error) {
      toast.error('Failed to Revoke Tokens', {
        description: `Unable to revoke tokens for ${user.name}. Please try again.`
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleResetPassword = async () => {
    setLoadingAction('reset');
    try {
      await resetPassword(user.id, { password: '', password_confirmation: '' });
      toast.success('Password Reset Sent', {
        description: `Password reset email has been sent to ${user.email}.`
      });
    } catch (error) {
      toast.error('Failed to Reset Password', {
        description: `Unable to send password reset email to ${user.email}. Please try again.`
      });
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-2 hover:bg-accent rounded-full transition-all duration-200 outline-none group">
          <MoreHorizontal size={18} className="text-muted-foreground group-hover:text-foreground group-active:scale-95 transition-transform" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 p-1 shadow-lg border-border/50">
          {/* User Info Header */}
          <div className="px-3 py-2 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-brand">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Management Actions */}
          <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground px-3 py-2">
            Management
          </DropdownMenuLabel>
          
          <DropdownMenuItem 
            onClick={() => onView(user)} 
            className="cursor-pointer gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors items-start"
          >
            <History size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">View Profile</div>
              <div className="text-xs text-muted-foreground">See detailed information</div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => onEdit(user)} 
            className="cursor-pointer gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors items-start"
          >
            <UserCog size={16} className="text-muted-foreground mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Edit Details</div>
              <div className="text-xs text-muted-foreground">Update user information</div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors items-start"
            onClick={() => setShowRoleWizard(true)}
          >
            <Shield size={16} className="text-brand mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Configure Roles</div>
              <div className="text-xs text-muted-foreground">Manage access permissions</div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          {/* Security Actions */}
          <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground px-3 py-2">
            Security
          </DropdownMenuLabel>

          <DropdownMenuItem 
            onClick={handleResetPassword}
            disabled={loadingAction !== null}
            className="cursor-pointer gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors items-start"
          >
            {loadingAction === 'reset' ? (
              <Loader2 size={16} className="animate-spin text-muted-foreground mt-0.5 shrink-0" />
            ) : (
              <KeyRound size={16} className="text-muted-foreground mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Reset Password</div>
              <div className="text-xs text-muted-foreground">
                {loadingAction === 'reset' ? 'Sending reset email...' : 'Send password reset link'}
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={handleRevokeTokens}
            disabled={loadingAction !== null}
            className="cursor-pointer gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors items-start"
          >
            {loadingAction === 'revoke' ? (
              <Loader2 size={16} className="animate-spin text-muted-foreground mt-0.5 shrink-0" />
            ) : (
              <UserMinus size={16} className="text-muted-foreground mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Revoke All Tokens</div>
              <div className="text-xs text-muted-foreground">
                {loadingAction === 'revoke' ? 'Revoking access...' : 'Force logout from all devices'}
              </div>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          {/* Account Status */}
          <DropdownMenuLabel className="text-xs font-bold uppercase text-muted-foreground px-3 py-2">
            Account Status
          </DropdownMenuLabel>

          <DropdownMenuItem 
            onClick={handleToggleStatus}
            disabled={loadingAction !== null}
            className={`cursor-pointer gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors items-start ${
              status === 'active' ? 'hover:bg-red-50 dark:hover:bg-red-950/20' : 'hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
            }`}
          >
            {loadingAction === 'toggle' ? (
              <Loader2 size={16} className="animate-spin mt-0.5 shrink-0" />
            ) : status === 'active' ? (
              <UserMinus size={16} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
            ) : (
              <UserCheck size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">
                {status === 'active' ? 'Deactivate Account' : 'Activate Account'}
              </div>
              <div className="text-xs opacity-70">
                {loadingAction === 'toggle' 
                  ? 'Updating status...' 
                  : status === 'active' 
                    ? 'Suspend user access' 
                    : 'Restore user access'
                }
              </div>
            </div>
          </DropdownMenuItem>

          </DropdownMenuContent>
      </DropdownMenu>

      {/* Role Assignment Wizard */}
      <RoleAssignmentWizard 
        isOpen={showRoleWizard}
        onClose={() => setShowRoleWizard(false)}
        user={user}
      />
    </>
  );
}