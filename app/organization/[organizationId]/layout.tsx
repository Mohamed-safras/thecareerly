import React from "react";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import ProtectedUserSideBar from "@/features/auth/components/protected-user-sidebar";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string };
};

export default async function OrganizationLayout({ children }: Props) {
  return (
    <ProtectedClientShell>
      <ProtectedUserSideBar>{children}</ProtectedUserSideBar>
    </ProtectedClientShell>
  );
}
