import api from "@/lib/axios";
import { Role, CreateRolePayload, UpdateRolePayload } from "../types/role.types";
import { RoleManagementPermission } from "../permissions/types/permission.types";

const unwrap = <T>(payload: any): T => {
  try {
    return (payload?.data ? payload.data : payload);
  } catch (error) {
    throw error;
  }
};

export const RolesService = {
  async getAllRoles(): Promise<Role[]> {
    try {
      const { data } = await api.get("/roles");
      return unwrap<Role[]>(data);
    } catch (error) {
      throw error;
    }
  },

  async getRole(id: number): Promise<Role> {
    try {
      const { data } = await api.get(`/roles/${id}`);
      return unwrap<Role>(data);
    } catch (error) {
      throw error;
    }
  },

  async createRole(roleData: CreateRolePayload): Promise<Role> {
    try {
      const { data } = await api.post("/roles", roleData);
      return unwrap<Role>(data);
    } catch (error) {
      throw error;
    }
  },

  async updateRole(id: number, roleData: UpdateRolePayload): Promise<Role> {
    try {
      const { data } = await api.put(`/roles/${id}`, roleData);
      return unwrap<Role>(data);
    } catch (error) {
      throw error;
    }
  },

  async getRolePermissions(roleId: number): Promise<RoleManagementPermission[]> {
    try {
      const { data } = await api.get(`/roles/${roleId}/permissions`);
      return unwrap<RoleManagementPermission[]>(data);
    } catch (error) {
      throw error;
    }
  },

  async syncPermissions(roleId: number, permissionIds: number[]): Promise<RoleManagementPermission[]> {
    try {
      const { data } = await api.put(`/roles/${roleId}/permissions`, { 
        permission_ids: permissionIds 
      });
      return unwrap<RoleManagementPermission[]>(data);
    } catch (error) {
      throw error;
    }
  },

  async deleteRole(id: number): Promise<void> {
    try {
      await api.delete(`/roles/${id}`);
    } catch (error) {
      throw error;
    }
  }
};