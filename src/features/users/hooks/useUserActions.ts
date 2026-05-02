import { useUserStore } from "../store/user.store";
import { UserService } from "../services/user.service";
import { 
  UserFilters, 
  CreateUserPayload, 
  UpdateUserPayload, 
  ResetPasswordPayload 
} from "../types/user.types";

export const useUserActions = () => {
  const { 
    setLoading, 
    setError, 
    setUsersFromResponse, 
    setSelectedUser,
    updateUserInList,
    patchUserStatus,
    updateFilters: updateStoreFilters 
  } = useUserStore();

  /**
   * Updates filters in the store. 
   */
  const updateFilters = (newFilters: Partial<UserFilters>) => {
    updateStoreFilters(newFilters);
  };

  /**
   * Core: Fetch user list
   */
  const fetchUsers = async (filters?: UserFilters) => {
    setLoading(true);
    try {
      const response = await UserService.getUsers(filters);
      setUsersFromResponse(response);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Core: Fetch single user details
   */
  const fetchUserById = async (id: number) => {
    setLoading(true);
    try {
      const user = await UserService.getUserById(id);
      updateUserInList(user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Core: Create User
   */
  const createUser = async (payload: CreateUserPayload) => {
    setLoading(true);
    try {
      await UserService.createUser(payload);
      await fetchUsers(); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create user");
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  /**
   * Core: Update User
   */
  const updateUser = async (id: number, payload: UpdateUserPayload) => {
    setLoading(true);
    try {
      const updatedUser = await UserService.updateUser(id, payload);

      setSelectedUser(updatedUser);
      updateUserInList(updatedUser);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Account: Toggle Deactivation
   */
  const toggleUserStatus = async (userId: number, currentStatus: 'active' | 'deactivated') => {
    setLoading(true);
    try {
      if (currentStatus === 'active') {
        await UserService.deleteUser(userId);
        patchUserStatus(userId, true);
      } else {
        await UserService.restoreUser(userId);
        patchUserStatus(userId, false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Status update failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Security: Reset Password (admin-initiated)
   */
  const resetPassword = async (id: number, payload?: ResetPasswordPayload) => {
    setLoading(true);
    try {
      // For admin-initiated reset, we might not need to provide password
      // The backend will generate a new password or send reset link
      await UserService.resetPassword(id, payload || { password: '', password_confirmation: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Security: Force Logout
   */
  const revokeTokens = async (id: number) => {
    setLoading(true);
    try {
      await UserService.revokeTokens(id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to revoke tokens");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Roles: Sync permissions/roles
   */
  const syncRoles = async (userId: number, roleIds: number[]) => {
    setLoading(true);
    try {
      // Sync roles and get updated user data from response
      const updatedUser = await UserService.syncUserRoles(userId, roleIds);
      
      // Update both selectedUser and the main users list
      setSelectedUser(updatedUser);
      updateUserInList(updatedUser);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to sync roles");
    } finally {
      setLoading(false);
    }
  };

  return {
    updateFilters,
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    toggleUserStatus,
    resetPassword,
    revokeTokens,
    syncRoles
  };
};