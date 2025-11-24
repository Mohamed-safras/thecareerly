import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { TeamRole, OrganizationRole } from "@/lib/role";
import { FORBIDDEN, LOGIN } from "@/constents/router-links";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string; teamId: string };
};

export default async function TeamLayout({ children, params }: Props) {
  const { teamId } = await params;

  return (
    <ProtectedClientShell
      allowedRoles={[
        OrganizationRole.ORG_ADMIN,
        TeamRole.TEAM_ADMIN,
        TeamRole.TEAM_MEMBER,
      ]}
      requireTeamId={teamId}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      {children}
    </ProtectedClientShell>
  );
}
