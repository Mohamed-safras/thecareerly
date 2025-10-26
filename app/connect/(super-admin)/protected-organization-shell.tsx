// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { ORGANIZATION_ROLES } from "@/lib/role";
import SuperAdminAppSideBar from "@/features/users/components/sidebar/super-admin-app-site-bar";

export default function ProtectedOrganizationClientShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedClientShell
      allowedRoles={[ORGANIZATION_ROLES.SUPER_ADMIN]}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      <SidebarProvider defaultOpen>
        <AppSidebar>
          <SuperAdminAppSideBar />
        </AppSidebar>
        {children}
      </SidebarProvider>
    </ProtectedClientShell>
  );
}
