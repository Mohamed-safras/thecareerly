import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { ORGANIZATION_ROLES } from "@/lib/role";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string };
};

export default async function OrganizationLayout({ children, params }: Props) {
  const { organizationId } = await params;

  return (
    <ProtectedClientShell
      allowedRoles={[ORGANIZATION_ROLES.SUPER_ADMIN]}
      requireOrgId={organizationId}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      {children}
    </ProtectedClientShell>
  );
}
