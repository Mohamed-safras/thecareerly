// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  CONNECT_ORGANIZATION_LOGIN,
  FORBIDDEN,
} from "@/constents/router-links";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import RectruiterAppSideBar from "@/features/users/components/app-site-bar";
import { ROLES } from "@/lib/role";

export default function ProtectedOrganizationClientShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedClientShell
      allowedRoles={[
        ROLES.ORGANIZATION_SUPER_ADMIN,
        ROLES.TEAM_ADMIN,
        ROLES.TEAM_MEMBER,
      ]}
      loginUrl={CONNECT_ORGANIZATION_LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      <SidebarProvider defaultOpen>
        <AppSidebar>
          <RectruiterAppSideBar />
        </AppSidebar>
        {children}
      </SidebarProvider>
    </ProtectedClientShell>
  );
}
