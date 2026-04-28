import { RolesService } from "../services/roles.service";
import { PermissionsService } from "../permissions/services/permissions.service";
import { useRoleStore } from "../store/role.store";

export function useRoleActions() {
  const store = useRoleStore();

  const fetchInitialData = async () => {
    store.setLoading(true);
    try {
      const [roles, permissions] = await Promise.all([
        RolesService.getAllRoles(),
        PermissionsService.getGroupedPermissions(),
      ]);
      store.setRoles(roles);
      store.setAvailablePermissions(permissions);
    } catch (err) {
      store.setError("Failed to sync with server");
    } finally {
      store.setLoading(false);
    }
  };

  const savePermissions = async () => {
    if (!store.activeRole) return;
    store.setLoading(true);
    store.setError(null);
    
    try {
      await RolesService.syncPermissions(
        store.activeRole.id, 
        store.selectedPermissionIds
      );
      
      // Get fresh roles list to update the main view
      const updatedRoles = await RolesService.getAllRoles();
      store.setRoles(updatedRoles);
      
      // Clear the session after successful save
      store.resetDraftState();
    } catch (err) {
      store.setError("Failed to update permissions");
    } finally {
      store.setLoading(false);
    }
  };

  const fetchRolePermissions = async (roleId: number) => {
    store.setPermissionsLoading(true);
    try {
      const permissions = await RolesService.getRolePermissions(roleId);
      store.setSelectedPermissionIds(permissions.map(p => p.id));
    } catch (err) {
      store.setError("Failed to fetch role permissions");
    } finally {
      store.setPermissionsLoading(false);
    }
  };

  return { fetchInitialData, savePermissions, fetchRolePermissions };
}