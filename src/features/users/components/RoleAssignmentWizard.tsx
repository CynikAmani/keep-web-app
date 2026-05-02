"use client";

import React, { useState, useEffect } from "react";
import { useUserActions } from "../hooks/useUserActions";
import { RolesService } from "@/features/roles/services/roles.service";
import { User } from "../types/user.types";
import { Role } from "@/features/roles/types/role.types";
import { toast } from "sonner";
import * as ui from "@/config/uiClasses";
import { 
  X, 
  Shield, 
  Users, 
  Check, 
  Loader2,
  Settings,
  UserPlus
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface RoleAssignmentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function RoleAssignmentWizard({ isOpen, onClose, user }: RoleAssignmentWizardProps) {
  const { syncRoles } = useUserActions();
  
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available roles when dialog opens
  useEffect(() => {
    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  
  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const roles = await RolesService.getAllRoles();
      setAvailableRoles(roles);
      
      // Set initial selected roles after roles are fetched
      if (user?.roles) {
        const userRoleIds = roles
          .filter(role => user.roles?.includes(role.name))
          .map(role => role.id);
        setSelectedRoleIds(userRoleIds);
      } else {
        setSelectedRoleIds([]);
      }
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleToggle = (roleId: number, checked: boolean) => {
    if (checked) {
      setSelectedRoleIds(prev => [...prev, roleId]);
    } else {
      setSelectedRoleIds(prev => prev.filter(id => id !== roleId));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await syncRoles(user.id, selectedRoleIds);
      
      // Show success feedback
      const addedRoles = selectedRoleIds.filter(id => 
        !user.roles?.includes(availableRoles.find(r => r.id === id)?.name || '')
      );
      const removedRoles = user.roles?.filter(roleName =>
        !selectedRoleIds.includes(availableRoles.find(r => r.name === roleName)?.id || 0)
      ) || [];

      if (addedRoles.length > 0 || removedRoles.length > 0) {
        toast.success('Roles Updated Successfully', {
          description: `${user.name}'s roles have been updated.`
        });
      }
      
      onClose();
    } catch (error) {
      console.error("Failed to sync roles:", error);
      toast.error('Failed to Update Roles', {
        description: `Unable to update roles for ${user.name}. Please try again.`
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    // Reset to original user roles
    if (user?.roles && availableRoles.length > 0) {
      const userRoleIds = availableRoles
        .filter(role => user.roles?.includes(role.name))
        .map(role => role.id);
      setSelectedRoleIds(userRoleIds);
    } else {
      setSelectedRoleIds([]);
    }
    onClose();
  };

  const selectedRolesCount = selectedRoleIds.length;
  const hasChanges = JSON.stringify(selectedRoleIds.sort()) !== 
    JSON.stringify(availableRoles
      .filter(role => user.roles?.includes(role.name))
      .map(role => role.id)
      .sort()
    );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <DialogHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand/10 rounded-lg">
                <Shield className="w-5 h-5 text-brand" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">Configure User Roles</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  Manage access permissions for {user.name}
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* User Info */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-brand">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Current Roles</p>
              <p className="text-sm font-medium">{user.roles?.length || 0} assigned</p>
            </div>
          </div>
        </div>

        {/* Roles List */}
        <div className="flex-1 overflow-y-auto mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading roles...</span>
            </div>
          ) : availableRoles.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No roles available</p>
              <p className="text-xs text-muted-foreground mt-1">
                Contact your administrator to create roles
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {availableRoles.map((role) => {
                const isSelected = selectedRoleIds.includes(role.id);
                const isCurrentlyAssigned = user.roles?.includes(role.name);
                
                return (
                  <div
                    key={role.id}
                    className={`
                      flex items-center justify-between p-3 rounded-lg border transition-all
                      ${isSelected 
                        ? 'bg-brand/5 border-brand/30 shadow-sm' 
                        : 'bg-card border-border hover:bg-muted/30'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        id={`role-${role.id}`}
                        checked={isSelected}
                        onCheckedChange={(checked) => handleRoleToggle(role.id, checked as boolean)}
                        className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={`role-${role.id}`}
                          className="font-medium text-sm cursor-pointer flex items-center gap-2"
                        >
                          {role.name}
                          {isCurrentlyAssigned && !isSelected && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                              Currently assigned
                            </Badge>
                          )}
                          {isSelected && !isCurrentlyAssigned && (
                            <Badge className="bg-brand text-white text-xs px-1.5 py-0.5">
                              New
                            </Badge>
                          )}
                        </label>
                        {role.description && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {role.description}
                          </p>
                        )}
                        {role.permissions && role.permissions.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {role.permissions.length} permissions
                          </p>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-brand" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border mt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedRolesCount > 0 ? (
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {selectedRolesCount} role{selectedRolesCount !== 1 ? 's' : ''} selected
                </span>
              ) : (
                <span className="flex items-center gap-2 text-amber-600">
                  <UserPlus className="w-4 h-4" />
                  No roles selected
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSaving}
                className="h-9"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving || selectedRolesCount === 0}
                className={ui.btnBrandMd + " h-9 gap-2"}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
