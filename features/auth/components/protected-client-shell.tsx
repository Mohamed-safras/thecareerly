"use client";

import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth } from "@/store/selectors/userSelectors";
import { Loader, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TeamRole } from "@prisma/client";

type Props = {
  children: ReactNode;
  loginUrl: string;
  forbiddenUrl: string;
  allowedRoles?: TeamRole[];
  requireTeamId?: string;
  requireOrgId?: string;
};

export default function ProtectedClientShell({
  children,
  loginUrl,
  forbiddenUrl,
  allowedRoles,
  requireTeamId,
  requireOrgId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  const { user, isAuthenticated, status } = useAppSelector(selectUserAuth);

  const loginHref = useMemo(
    () => `${loginUrl}?callbackUrl=${encodeURIComponent(pathname)}`,
    [loginUrl, pathname]
  );

  type TeamUser = {
    team?: {
      id?: string;
      organizationId?: string;
      organization?: { id?: string };
    };
    role?: string;
  };
  type UserWithTeams = {
    roles?: TeamRole[];
    teamUsers?: TeamUser[];
    organizationId?: string | null;
    teamId?: string | null;
  };

  const userWithTeams = useMemo(() => user as unknown as UserWithTeams, [user]);
  const userRoles = useMemo(
    () => (userWithTeams?.roles ?? []) as TeamRole[],
    [userWithTeams]
  );
  const teamUsers = useMemo(
    () => (userWithTeams?.teamUsers ?? []) as TeamUser[],
    [userWithTeams]
  );

  const hasRequiredRole = useMemo(
    () =>
      !allowedRoles || userRoles.some((role) => allowedRoles.includes(role)),
    [userRoles, allowedRoles]
  );

  const isTeamMember = useMemo(
    () =>
      !requireTeamId ||
      teamUsers.some((teamUser) => teamUser.team?.id === requireTeamId) ||
      !!(userWithTeams?.teamId && userWithTeams.teamId === requireTeamId),
    [teamUsers, requireTeamId, userWithTeams]
  );

  const isOrgMember = useMemo(
    () =>
      !requireOrgId ||
      teamUsers.some(
        (teamUser) =>
          teamUser.team?.organizationId === requireOrgId ||
          teamUser.team?.organization?.id === requireOrgId
      ) ||
      !!(
        userWithTeams?.organizationId &&
        userWithTeams.organizationId === requireOrgId
      ),
    [teamUsers, requireOrgId, userWithTeams]
  );

  useEffect(() => {
    if (redirectingRef.current) return;
    if (status === "idle" || status === "loading") return;

    if (!isAuthenticated) {
      redirectingRef.current = true;
      router.replace(loginHref);
      return;
    }

    if (!hasRequiredRole) {
      redirectingRef.current = true;
      router.replace(forbiddenUrl);
      return;
    }

    if (!isTeamMember) {
      redirectingRef.current = true;
      router.replace(forbiddenUrl);
      return;
    }

    if (!isOrgMember) {
      redirectingRef.current = true;
      router.replace(forbiddenUrl);
      return;
    }
  }, [
    status,
    isAuthenticated,
    hasRequiredRole,
    isTeamMember,
    isOrgMember,
    loginHref,
    forbiddenUrl,
    router,
  ]);

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md rounded-2xl border p-6 shadow-sm text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-semibold">Checking access</h2>
            <div
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              <Loader className="h-5 w-5 motion-safe:animate-spin" />
              <span>Verifying your session and permissions…</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated || !hasRequiredRole || !isTeamMember || !isOrgMember)
    return null;

  return <>{children}</>;
}
