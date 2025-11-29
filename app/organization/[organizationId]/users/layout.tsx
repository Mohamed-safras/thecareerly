import ProtectedOrganizationClientShell from "@/app/protected-user-shell";
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
