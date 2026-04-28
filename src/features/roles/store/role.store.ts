import { create } from 'zustand';
import { Role } from '../types/role.types';
import { GroupedPermission } from '../permissions/types/permission.types';

interface RoleState {
  roles: Role[];
  availablePermissions: GroupedPermission[];
  activeRole: Role | null;
  selectedPermissionIds: number[];
  isLoading: boolean;
  isPermissionsLoading: boolean;
  error: string | null;
  
  setRoles: (roles: Role[]) => void;
  setAvailablePermissions: (permissions: GroupedPermission[]) => void;
  setLoading: (status: boolean) => void;
  setPermissionsLoading: (status: boolean) => void;
  setError: (message: string | null) => void;
  setSelectedPermissionIds: (permissionIds: number[]) => void;
  
  startEditing: (role: Role) => void;
  togglePermission: (id: number) => void;
  toggleModulePermissions: (permissionIds: number[], allSelected: boolean) => void;
  clearSelection: () => void;
  resetDraftState: () => void;
}

export const useRoleStore = create<RoleState>()((set) => ({
  roles: [],
  availablePermissions: [],
  activeRole: null,
  selectedPermissionIds: [],
  isLoading: false,
  isPermissionsLoading: false,
  error: null,

  setRoles: (roles) => set({ roles }),
  setAvailablePermissions: (availablePermissions) => set({ availablePermissions }),
  setLoading: (isLoading) => set({ isLoading }),
  setPermissionsLoading: (isPermissionsLoading: boolean) => set({ isPermissionsLoading }),
  setError: (error) => set({ error }),
  setSelectedPermissionIds: (permissionIds: number[]) => set({ selectedPermissionIds: permissionIds }),

  startEditing: (role) => set((state) => {
    // If we are already editing this role, don't reset the checkbox state
    if (state.activeRole?.id === role.id) return state;
    return {
      activeRole: role,
      selectedPermissionIds: [] // Will be populated by API call
    };
  }),

  togglePermission: (id) => set((state) => ({
    selectedPermissionIds: state.selectedPermissionIds.includes(id)
      ? state.selectedPermissionIds.filter(pid => pid !== id)
      : [...state.selectedPermissionIds, id]
  })),

  toggleModulePermissions: (ids, allSelected) => set((state) => ({
    selectedPermissionIds: allSelected 
      ? state.selectedPermissionIds.filter(id => !ids.includes(id))
      : Array.from(new Set([...state.selectedPermissionIds, ...ids]))
  })),

  clearSelection: () => set({ activeRole: null, selectedPermissionIds: [] }),
  
  resetDraftState: () => set({ 
    activeRole: null, 
    selectedPermissionIds: [], 
    error: null,
    isPermissionsLoading: false 
  }),
}));