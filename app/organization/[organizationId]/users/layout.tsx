import ProtectedOrganizationClientShell from "@/app/protected-user-shell";
import HeaderShell from "@/features/jobs/components/hiring-shell";
import { ReactNode } from "react";

export default function UserManagmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedOrganizationClientShell>
      <HeaderShell
        breadCrumbPage="User management"
        breadCrumbsItems={[{ label: "Organization", link: "#" }]}
      >
        {children}
      </HeaderShell>
    </ProtectedOrganizationClientShell>
  );
}
