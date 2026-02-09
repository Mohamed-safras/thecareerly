"use client";

import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

import AccessCheck from "@/components/access-check";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useAppDispatch } from "@/store/hooks";
import { checkAuthStatus } from "@/store/slice/auth-slice";
import { FORBIDDEN, LOGIN } from "@/const/router-links";

type ProtectedClientShellProps = {
  children: ReactNode;
  loginUrl?: string;
  forbiddenUrl?: string;
  allowedRoles?: string[];
  requireTeamId?: boolean;
  requireOrganizationId?: boolean;
  requireAll?: boolean; // If true, user must have ALL allowedRoles
};

// function getSafeCallbackUrl(url: string): string {
//   if (
//     url.startsWith("/") &&
//     !url.startsWith("//") &&
//     !url.startsWith("/\\") &&
//     !url.includes("://")
//   ) {
//     return url;
//   }
//   return "/";
// }

export default function ProtectedClientShell({
  children,
  loginUrl = LOGIN,
  forbiddenUrl = FORBIDDEN,
  allowedRoles,
  requireTeamId = false,
  requireOrganizationId = false,
  requireAll = false,
}: ProtectedClientShellProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const redirectingRef = useRef(false);

  const { user, isAuthenticated, status } = useAuth();

  useEffect(() => {
    if (status === "idle") {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, status]);

  // Extract all user roles as strings
  const userRoles = useMemo(() => user?.roles ?? [], [user?.roles]);

  // Check if user has any allowed role
  const userHasAllowedRole = useMemo(() => {
    if (!allowedRoles || allowedRoles.length === 0) return true;

    if (requireAll) {
      return allowedRoles.every((role) => userRoles.includes(role));
    } else {
      return userRoles.some((role) => allowedRoles.includes(role));
    }
  }, [userRoles, allowedRoles, requireAll]);

  console.log("has user role", userHasAllowedRole);

  const hasRequiredTeamId = useMemo(() => {
    if (!requireTeamId) return true;
    return !!user?.teamId;
  }, [requireTeamId, user?.teamId]);

  console.log("has required team id", hasRequiredTeamId);

  const hasRequiredOrgId = useMemo(() => {
    if (!requireOrganizationId) return true;
    return !!user?.organizationId;
  }, [requireOrganizationId, user?.organizationId]);

  console.log("has required organization id", hasRequiredOrgId);

  // Combined access check
  const hasAccess = useMemo(() => {
    return (
      isAuthenticated &&
      userHasAllowedRole &&
      hasRequiredTeamId &&
      hasRequiredOrgId
    );
  }, [
    isAuthenticated,
    userHasAllowedRole,
    hasRequiredTeamId,
    hasRequiredOrgId,
  ]);

  useEffect(() => {
    if (redirectingRef.current) return;
    if (status === "idle" || status === "loading") return;

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      redirectingRef.current = true;
      router.replace(loginUrl);
      return;
    }

    // Authenticated but lacks required access - redirect to forbidden
    if (!hasAccess) {
      console.log("User lacks required access, redirecting to forbidden");
      redirectingRef.current = true;
      router.replace(forbiddenUrl);
      return;
    }
  }, [status, isAuthenticated, hasAccess, loginUrl, forbiddenUrl, router]);

  if (status === "idle" || status === "loading") {
    return <AccessCheck />;
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
}
