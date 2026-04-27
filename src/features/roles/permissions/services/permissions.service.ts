import api from "@/lib/axios";
import { GroupedPermission } from "../types/permission.types";

const unwrapResponse = <T>(payload: T | { data: T }): T => {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
};

export const PermissionsService = {
  /**
   * Fetch all system permissions grouped by module
   */
  async getGroupedPermissions(): Promise<GroupedPermission[]> {
    const { data } = await api.get<GroupedPermission[] | { data: GroupedPermission[] }>("/permissions");
    return unwrapResponse(data);
  }
};