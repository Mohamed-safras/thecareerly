import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { Roles } from "@/lib/role";
import { ReactNode } from "react";

export default function TeamManagmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedClientShell
      allowedRoles={[Roles.ORGANIZATION_ADMIN]}
      requireOrganizationId={true}
    >
      {children}
    </ProtectedClientShell>
  );
}
