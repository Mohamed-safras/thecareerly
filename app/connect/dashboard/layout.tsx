import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import HeaderShell from "@/features/jobs/components/hiring-shell";
import { Roles } from "@/lib/role";
import { ReactNode } from "react";

export default function DashBoardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedClientShell allowedRoles={[Roles.ORGANIZATION_ADMIN]}>
      <HeaderShell breadCrumbPage="Dashboard">{children}</HeaderShell>
    </ProtectedClientShell>
  );
}
