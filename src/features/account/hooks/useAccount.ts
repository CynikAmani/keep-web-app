import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth.store';
import { AccountService } from '../services/account.service';
import { 
  UpdateAccountProfileRequest, 
  UpdateAccountPasswordRequest 
} from '../types/account.types';

export function useAccount() {
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  
  const { toast } = useToast();
  const updateUser = useAuthStore(state => state.updateUser);
  const clearAuth = useAuthStore(state => state.clearAuth);

  const updateProfile = async (payload: UpdateAccountProfileRequest) => {
    setIsUpdatingProfile(true);
    try {
      const response = await AccountService.updateProfile(payload);
      // Unwrap the response if Laravel wrapped it in a "data" object
      const updatedUser = (response && typeof response === 'object' && 'data' in response) 
        ? (response as any).data 
        : response;
      
      updateUser(updatedUser);
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "There was an error updating your profile.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const updatePassword = async (payload: UpdateAccountPasswordRequest) => {
    setIsUpdatingPassword(true);
    try {
      await AccountService.updatePassword(payload);
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.response?.data?.message || "There was an error updating your password.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const deleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      await AccountService.deleteAccount();
      toast({
        title: "Account deleted",
        description: "Your account has been successfully deleted.",
      });
      clearAuth();
      return true;
    } catch (error: any) {
      toast({
        title: "Deletion failed",
        description: error.response?.data?.message || "There was an error deleting your account.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return {
    isUpdatingProfile,
    isUpdatingPassword,
    isDeletingAccount,
    updateProfile,
    updatePassword,
    deleteAccount,
  };
}
