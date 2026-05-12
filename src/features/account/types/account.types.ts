import type { 
  User, 
  UpdateProfilePayload, 
  UpdatePasswordPayload, 
  DeleteAccountPayload 
} from '@/features/users/types/user.types';

/**
 * Profile Tab Types
 */
export type AccountProfile = User;
export type UpdateAccountProfileRequest = UpdateProfilePayload;

/**
 * Security Tab Types
 */
export type UpdateAccountPasswordRequest = UpdatePasswordPayload;

/**
 * Account Deletion Types
 */
export type CloseAccountRequest = DeleteAccountPayload;

/**
 * Grouped Account State (Optional - useful for Redux/Zustand)
 */
export interface AccountState {
  data: AccountProfile | null;
  isLoading: boolean;
  error: string | null;
}