// hooks/use-auth.ts
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slice/auth-slice";
import { useRouter } from "next/navigation";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, isAuthenticated, status, error } = useAppSelector(
    (state) => state.auth
  );

  const logout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return {
    user,
    isAuthenticated,
    status,
    error,
    logout,
  };
}
