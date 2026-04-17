import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "@/services/dashboard.service";
import { DashboardData } from "@/types/dashboard.types";
import { toast } from "sonner";

export const useDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await dashboardService.getDashboardData();
      setData(result);
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data");
      toast.error("Could not sync dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const refreshAfterEdit = useCallback(async () => {
    await fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats: data?.stats,
    recentNotes: data?.recent_notes || [],
    recentTodos: data?.recent_todo_groups || [],
    isLoading,
    error,
    refresh: fetchDashboard, // Call this after any editor 'save' action
    refreshAfterEdit, // Call this from editors when item is saved
    setData,
  };
};