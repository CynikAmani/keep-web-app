import api from "@/lib/axios";
import { Role, CreateRolePayload, UpdateRolePayload } from "../types/role.types";
import { RoleManagementPermission } from "../permissions/types/permission.types";

const unwrap = <T>(payload: any): T => (payload?.data ? payload.data : payload);

export const RolesService = {
  async getAllRoles(): Promise<Role[]> {
    const { data } = await api.get("/roles");
    return unwrap<Role[]>(data);
  },

  async getRole(id: number): Promise<Role> {
    const { data } = await api.get(`/roles/${id}`);
    return unwrap<Role>(data);
  },

  async createRole(roleData: CreateRolePayload): Promise<Role> {
    const { data } = await api.post("/roles", roleData);
    return unwrap<Role>(data);
  },

  async updateRole(id: number, roleData: UpdateRolePayload): Promise<Role> {
    const { data } = await api.put(`/roles/${id}`, roleData);
    return unwrap<Role>(data);
  },

  async getRolePermissions(roleId: number): Promise<RoleManagementPermission[]> {
    const { data } = await api.get(`/roles/${roleId}/permissions`);
    return unwrap<RoleManagementPermission[]>(data);
  },

  async syncPermissions(roleId: number, permissionIds: number[]): Promise<RoleManagementPermission[]> {
    const { data } = await api.put(`/roles/${roleId}/permissions`, { 
      permission_ids: permissionIds 
    });
    return unwrap<RoleManagementPermission[]>(data);
  },

  async deleteRole(id: number): Promise<void> {
    await api.delete(`/roles/${id}`);
  }
};