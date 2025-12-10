import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { Roles } from "@/lib/role";
import ProtectedUserSideBar from "@/features/auth/components/protected-user-sidebar";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string };
};

export default async function OrganizationLayout({ children }: Props) {
  return (
    <ProtectedClientShell
      allowedRoles={[Roles.ORGANIZATION_ADMIN]}
      requireOrganizationId={true}
    >
      <ProtectedUserSideBar>{children}</ProtectedUserSideBar>
    </ProtectedClientShell>
  );
}
