// components/auth/ProtectedRoleClientShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/store/hooks";
import { UserType } from "@/types/user-type";

type Props = {
  requiredRole: UserType;
  loginUrl: string; // where to send unauthenticated users
  forbiddenUrl: string; // where to send wrong-role users
  children: ReactNode;
};

export default function ProtectedRoleClientShell({
  requiredRole,
  loginUrl,
  forbiddenUrl,
  children,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  const { user, isAuthenticated, status } = useAppSelector(({ user }) => user);
  const userType = useMemo(() => user?.userType ?? null, [user]);

  useEffect(() => {
    // wait until auth resolved
    if (status === "idle" || status === "loading") return;
    if (redirectingRef.current) return;

    // not logged in -> go to role-appropriate login (avoid self-redirect)
    if (!isAuthenticated) {
      if (pathname !== loginUrl) {
        redirectingRef.current = true;
        const url = `${loginUrl}?callbackUrl=${encodeURIComponent(pathname)}`;
        console.log(url);
        router.replace(url);
      }
      return;
    }

    // logged in but wrong role -> forbidden (avoid self-redirect)
    if (userType !== requiredRole) {
      if (pathname !== forbiddenUrl) {
        redirectingRef.current = true;
        router.replace(forbiddenUrl);
      }
      return;
    }
    // otherwise authorized
  }, [
    status,
    isAuthenticated,
    userType,
    pathname,
    router,
    loginUrl,
    forbiddenUrl,
    requiredRole,
  ]);

  // loading / resolving
  if (status === "idle" || status === "loading") {
    return (
      <div className="p-6 text-sm text-muted-foreground">Checking access…</div>
    );
  }

  // about to redirect → avoid content flash
  if (!isAuthenticated || userType !== requiredRole) {
    return null;
  }

  // authorized
  return <>{children}</>;
}
