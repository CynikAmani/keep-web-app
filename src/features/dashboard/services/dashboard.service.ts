import api from "@/lib/axios";
import { DashboardData } from "@/features/dashboard/types/dashboard.types";

const unwrapResponse = <T>(payload: T | { data: T }): T => {
  try {
    if (payload && typeof payload === "object" && "data" in payload) {
      return payload.data;
    }
    return payload;
  } catch (error) {
    throw error;
  }
};

export const dashboardService = {
  /**
   * Fetches the dashboard overview including stats and recent items.
   * Efficiency: One call to rule them all.
   */
  getDashboardData: async (limit: number = 3): Promise<DashboardData> => {
    try {
      const { data } = await api.get("/dashboard", { params: { limit } });
      return unwrapResponse<DashboardData>(data);
    } catch (error) {
      throw error;
    }
  },
};