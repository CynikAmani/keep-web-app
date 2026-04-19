import { UserService } from "@/features/users/services/user.service";

export const useUser = () => {
  return {
    user: UserService.getUser(),
    userId: UserService.getUserId(),
    roles: UserService.getRoles(),
    permissions: UserService.getPermissions(),
  };
};