// hooks/use-auth.ts
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slice/auth-slice";
import { redirect } from "next/navigation";

export function useAuth() {
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, status, error } = useAppSelector(
    (state) => state.auth
  );

  const logout = async () => {
    // Set a flag to prevent hydration after logout
    localStorage.setItem("hasLoggedOut", "true");
    await dispatch(logoutUser());
    redirect("/login");
  };

  // Remove the flag after successful login
  const clearLogoutFlag = () => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("hasLoggedOut") === "true"
    ) {
      localStorage.removeItem("hasLoggedOut");
    }
  };

  // Call clearLogoutFlag when authenticated
  if (
    typeof window !== "undefined" &&
    isAuthenticated &&
    status === "authenticated"
  ) {
    clearLogoutFlag();
  }

  return {
    user,
    isAuthenticated,
    status,
    error,
    logout,
  };
}
