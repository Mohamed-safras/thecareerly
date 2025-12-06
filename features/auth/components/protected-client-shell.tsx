"use client";

import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import AccessCheck from "@/components/access-check";
import { useAuth } from "@/hooks/use-auth";

type ProtectedClientShellProps = {
  children: ReactNode;
  loginUrl: string;
  forbiddenUrl: string;
  allowedRoles?: string[];
  requireTeamId?: string;
  requireOrgId?: string;
};

function getSafeCallbackUrl(url: string): string {
  if (
    url.startsWith("/") &&
    !url.startsWith("//") &&
    !url.startsWith("/\\") &&
    !url.includes("://")
  ) {
    return url;
  }
  return "/";
}

export default function ProtectedClientShell({
  children,
  loginUrl,
  forbiddenUrl,
  allowedRoles,
}: ProtectedClientShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  const { user, isAuthenticated, status } = useAuth();
  console.log("isAuthenticated:", isAuthenticated);
  console.log("ProtectedClientShell user:", user);
  const safeCallbackUrl = useMemo(
    () => getSafeCallbackUrl(pathname),
    [pathname]
  );
  const loginHref = useMemo(
    () => `${loginUrl}?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`,
    [loginUrl, safeCallbackUrl]
  );

  // Extract all user roles as strings
  const getUserRoles: string[] = useMemo(() => [...(user?.roles ?? [])], []);

  // Check if user has any allowed role
  const userHasAllowedRole = useMemo(
    () =>
      !allowedRoles || getUserRoles.some((role) => allowedRoles.includes(role)),
    [getUserRoles, allowedRoles]
  );

  useEffect(() => {
    if (redirectingRef.current) return;
    if (status === "idle" || status === "loading") return;

    if (!isAuthenticated) {
      redirectingRef.current = true;
      router.replace(loginHref);
      return;
    }

    if (!userHasAllowedRole) {
      redirectingRef.current = true;
      router.replace(forbiddenUrl);
      return;
    }
  }, [
    status,
    isAuthenticated,
    userHasAllowedRole,
    loginHref,
    forbiddenUrl,
    router,
  ]);

  if (status === "idle" || status === "loading") {
    return <AccessCheck />;
  }

  if (!isAuthenticated || !userHasAllowedRole) return null;

  return <>{children}</>;
}
