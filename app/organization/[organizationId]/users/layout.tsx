import ProtectedOrganizationClientShell from "@/features/auth/components/protected-user-sidebar";
import { ReactNode } from "react";

export default function UserManagmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedOrganizationClientShell>
      {children}
    </ProtectedOrganizationClientShell>
  );
}
