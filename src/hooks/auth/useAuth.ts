import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { SigninPayload, SignupPayload } from "@/types/auth.types";

export const useAuth = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  const signin = (payload: SigninPayload) => {
    return authService.signin(payload);
  };

  const signup = (payload: SignupPayload) => {
    return authService.signup(payload);
  };

  const logout = () => {
    return authService.logout();
  };

  return {
    isAuthenticated,
    isLoading,
    signin,
    signup,
    logout,
  };
};