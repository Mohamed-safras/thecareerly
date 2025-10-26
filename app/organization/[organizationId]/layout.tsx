import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { TEAM_ROLES, ORGANIZATION_ROLES } from "@/lib/role";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";
import HeaderShell from "@/features/jobs/components/hiring-shell";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string };
};

export default async function OrganizationLayout({ children, params }: Props) {
  const { organizationId } = await params;

  return (
    <ProtectedClientShell
      allowedRoles={[ORGANIZATION_ROLES.SUPER_ADMIN, TEAM_ROLES.TEAM_ADMIN]}
      requireOrgId={organizationId}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      <HeaderShell breadCrumpPage="Teams">{children}</HeaderShell>
    </ProtectedClientShell>
  );
}
