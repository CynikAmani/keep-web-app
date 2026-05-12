import api from '@/lib/axios';
import { UserService } from '../../users/services/user.service';
import { 
  UpdateAccountProfileRequest, 
  UpdateAccountPasswordRequest 
} from '../types/account.types';
import { User } from '@/features/users/types/user.types';

export class AccountService {
  static async updateProfile(payload: UpdateAccountProfileRequest): Promise<User> {
    try {
      const userId = this.getRequiredUserId();
      return UserService.updateUser(userId, payload);
    } catch (error) {
      throw error;
    }
  }

  static async updatePassword(payload: UpdateAccountPasswordRequest): Promise<User> {
    try {
      const userId = this.getRequiredUserId();
      return UserService.updateUser(userId, payload);
    } catch (error) {
      throw error;
    }
  }

  static async deleteAccount(): Promise<void> {
    try {
      const userId = this.getRequiredUserId();
      return UserService.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }

  private static getRequiredUserId(): number {
    try {
      const id = UserService.getUserId();
      if (!id) {
        throw new Error("Action unauthorized: No active user session found.");
      }
      return id;
    } catch (error) {
      throw error;
    }
  }
}