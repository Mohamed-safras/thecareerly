"use client";

import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth } from "@/store/selectors/userSelectors";

import AccessCheck from "@/components/access-check";
import { OrganizationUserType, TeamUserType } from "@/types/user-profile";

type AllowedRole = string;

type ProtectedClientShellProps = {
  children: ReactNode;
  loginUrl: string;
  forbiddenUrl: string;
  allowedRoles?: AllowedRole[];
  requireTeamId?: string;
  requireOrgId?: string;
};

type UserWithSchemaType = {
  teamUsers?: TeamUserType[];
  organizationUsers?: OrganizationUserType[];
  organizationId?: string | null;
  teamId?: string | null;
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
  requireTeamId,
  requireOrgId,
}: ProtectedClientShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  const { user, isAuthenticated, status } = useAppSelector(selectUserAuth);

  const safeCallbackUrl = useMemo(
    () => getSafeCallbackUrl(pathname),
    [pathname]
  );
  const loginHref = useMemo(
    () => `${loginUrl}?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`,
    [loginUrl, safeCallbackUrl]
  );

  const userWithSchema: UserWithSchemaType = useMemo(
    () =>
      user
        ? (user as UserWithSchemaType)
        : { teamUsers: [], organizationUsers: [] },
    [user]
  );

  const teamUserList = useMemo(
    () => userWithSchema?.teamUsers ?? [],
    [userWithSchema]
  );

  const organizationUserList = useMemo(
    () => userWithSchema?.organizationUsers ?? [],
    [userWithSchema]
  );

  // Extract all user roles as strings
  const allUserRoles: string[] = useMemo(
    () => [
      ...teamUserList
        .map((teamUser) => teamUser.role)
        .filter((role): role is string => typeof role === "string"),
      ...organizationUserList
        .map((organizationUser) => organizationUser.role)
        .filter((role): role is string => typeof role === "string"),
    ],
    [teamUserList, organizationUserList]
  );

  // // Debug logs for troubleshooting
  // React.useEffect(() => {
  //   console.log("ProtectedClientShell - user:", user);
  //   console.log("ProtectedClientShell - teamUserList:", teamUserList);
  //   console.log(
  //     "ProtectedClientShell - organizationUserList:",
  //     organizationUserList
  //   );
  //   console.log("ProtectedClientShell - allUserRoles:", allUserRoles);
  //   console.log("ProtectedClientShell - allowedRoles:", allowedRoles);
  // }, [user, teamUserList, organizationUserList, allUserRoles, allowedRoles]);

  // Check if user has any allowed role
  const userHasAllowedRole = useMemo(
    () =>
      !allowedRoles || allUserRoles.some((role) => allowedRoles.includes(role)),
    [allUserRoles, allowedRoles]
  );

  // Check team membership
  const userIsTeamMember = useMemo(
    () =>
      !requireTeamId ||
      teamUserList.some((teamUser) => teamUser.team?.id === requireTeamId) ||
      !!(userWithSchema?.teamId && userWithSchema.teamId === requireTeamId),
    [teamUserList, requireTeamId, userWithSchema]
  );

  // Check organization membership
  const userIsOrganizationMember = useMemo(
    () =>
      !requireOrgId ||
      teamUserList.some(
        (teamUser) =>
          teamUser.team?.organizationId === requireOrgId ||
          teamUser.team?.organization?.id === requireOrgId
      ) ||
      organizationUserList.some(
        (organizationUser) => organizationUser.organization?.id === requireOrgId
      ) ||
      !!(
        userWithSchema?.organizationId &&
        userWithSchema.organizationId === requireOrgId
      ),
    [teamUserList, organizationUserList, requireOrgId, userWithSchema]
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

    if (!userIsTeamMember) {
      redirectingRef.current = true;
      router.replace(forbiddenUrl);
      return;
    }

    if (!userIsOrganizationMember) {
      redirectingRef.current = true;
      router.replace(forbiddenUrl);
      return;
    }
  }, [
    status,
    isAuthenticated,
    userHasAllowedRole,
    userIsTeamMember,
    userIsOrganizationMember,
    loginHref,
    forbiddenUrl,
    router,
  ]);

  if (status === "idle" || status === "loading") {
    return <AccessCheck />;
  }

  if (
    !isAuthenticated ||
    !userHasAllowedRole ||
    !userIsTeamMember ||
    !userIsOrganizationMember
  )
    return null;

  return <>{children}</>;
}
