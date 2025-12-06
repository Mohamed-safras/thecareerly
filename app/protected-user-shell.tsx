// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { TeamRole, OrganizationRole } from "@/lib/role";
import { UserProfile } from "@/types/user-profile";
import SuperAdminAppSideBar from "@/components/sidebar/super-admin-app-site-bar";
import AppSideBar from "@/components/sidebar/app-site-bar";
import { useAuth } from "@/hooks/use-auth";

export default function ProtectedUserClientShell({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  console.log("ProtectedUserClientShell user:", user?.roles);
  function getUserRoles(user: UserProfile | null) {
    return [...(user?.roles ?? [])];
  }

  let SidebarComponent: React.JSX.Element | null = null; // default

  const roles = getUserRoles(user);
  console.log("ProtectedUserClientShell roles:", roles);

  if (roles.includes(OrganizationRole.ORGANIZATION_ADMIN)) {
    SidebarComponent = <SuperAdminAppSideBar />;
  } else if (
    roles.includes(OrganizationRole.ORGANIZATION_ADMIN) &&
    roles.includes(TeamRole.TEAM_ADMIN)
  ) {
    SidebarComponent = <AppSideBar />;
  }

  return (
    <ProtectedClientShell
      allowedRoles={[
        OrganizationRole.ORGANIZATION_ADMIN,
        TeamRole.TEAM_ADMIN,
        TeamRole.TEAM_MEMBER,
      ]}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      <SidebarProvider defaultOpen>
        <AppSidebar>{SidebarComponent}</AppSidebar>
        {children}
      </SidebarProvider>
    </ProtectedClientShell>
  );
}
