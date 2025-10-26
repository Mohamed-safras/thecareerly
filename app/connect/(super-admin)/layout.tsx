import { ReactNode } from "react";
import ProtectedOrganizationClientShell from "./protected-organization-shell";

export default function EmployeeProtectedLayout({
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
