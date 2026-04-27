import { RoleManagementPermission } from "../permissions/types/permission.types";

/**
 * The Role entity.
 */
export interface Role {
  id: number;
  name: string;
  description: string | null;
  permissions?: RoleManagementPermission[]; // A role HAS permissions
  createdAt: string;
  updatedAt: string;
}

export interface CreateRolePayload {
  name: string;
  description?: string;
}

export interface UpdateRolePayload {
  name?: string;
  description?: string;
}