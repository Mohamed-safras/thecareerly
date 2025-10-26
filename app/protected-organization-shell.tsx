// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import RectruiterAppSideBar from "@/features/users/components/sidebar/app-site-bar";
import { TEAM_ROLES, ORGANIZATION_ROLES } from "@/lib/role";

export default function ProtectedOrganizationClientShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedClientShell
      allowedRoles={[
        ORGANIZATION_ROLES.SUPER_ADMIN,
        TEAM_ROLES.TEAM_ADMIN,
        TEAM_ROLES.TEAM_MEMBER,
      ]}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      {children}
    </ProtectedClientShell>
  );
}
