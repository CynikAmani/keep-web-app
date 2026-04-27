import { AppPermission } from "@/types/permissions.types";

/**
 * Represents a single permission definition from the backend.
 */
export interface RoleManagementPermission {
  id: number;
  name: AppPermission; 
  displayName: string;
  module: string;
  description?: string;
}

/**
 * Used for the grouped checklist UI.
 */
export interface GroupedPermission {
  sectionName: string;
  items: RoleManagementPermission[];
}