import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { ROLES } from "@/lib/role";
import {
  CONNECT_ORGANIZATION_LOGIN,
  FORBIDDEN,
} from "@/constents/router-links";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string; teamId: string };
};

export default async function TeamLayout({ children, params }: Props) {
  const { teamId } = await params;

  return (
    <ProtectedClientShell
      allowedRoles={[
        ROLES.ORGANIZATION_SUPER_ADMIN,
        ROLES.TEAM_ADMIN,
        ROLES.TEAM_MEMBER,
      ]}
      requireTeamId={teamId}
      loginUrl={CONNECT_ORGANIZATION_LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      {children}
    </ProtectedClientShell>
  );
}
