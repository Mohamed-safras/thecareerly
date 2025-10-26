import { ReactNode } from "react";
import ProtectedOrganizationClientShell from "./protected-organization-shell";

export default function OrganizationLayout({
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
