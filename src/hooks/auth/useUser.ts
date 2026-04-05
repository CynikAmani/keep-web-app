import { UserService } from "@/services/user.service";

export const useUser = () => {
  return {
    user: UserService.getUser(),
    userId: UserService.getUserId(),
    roles: UserService.getRoles(),
    permissions: UserService.getPermissions(),
  };
};