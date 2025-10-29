import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { TEAM_ROLES, ORGANIZATION_ROLES } from "@/lib/role";
import { FORBIDDEN, LOGIN } from "@/constents/router-links";
import HeaderShell from "@/features/jobs/components/hiring-shell";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string; teamId: string };
};

export default async function TeamLayout({ children, params }: Props) {
  const { teamId } = await params;

  return (
    <ProtectedClientShell
      allowedRoles={[
        ORGANIZATION_ROLES.SUPER_ADMIN,
        TEAM_ROLES.TEAM_ADMIN,
        TEAM_ROLES.TEAM_MEMBER,
      ]}
      requireTeamId={teamId}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      <HeaderShell breadCrumbPage="Jobs">{children}</HeaderShell>
    </ProtectedClientShell>
  );
}
