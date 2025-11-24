import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { OrganizationRole } from "@/lib/role";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string };
};

export default async function OrganizationLayout({ children, params }: Props) {
  const { organizationId } = await params;

  return (
    <ProtectedClientShell
      allowedRoles={[OrganizationRole.ORG_ADMIN]}
      requireOrgId={organizationId}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      {children}
    </ProtectedClientShell>
  );
}
