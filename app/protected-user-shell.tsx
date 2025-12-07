// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { Roles } from "@/lib/role";
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

  function getUserRoles(user: UserProfile | null) {
    return [...(user?.roles ?? [])];
  }

  let sidebarComponent: React.JSX.Element | null = null; // default

  const roles = getUserRoles(user);

  if (roles.includes(Roles.ORGANIZATION_ADMIN)) {
    sidebarComponent = <SuperAdminAppSideBar />;
  } else if (
    roles.includes(Roles.ORGANIZATION_ADMIN) &&
    roles.includes(Roles.RECRUITER)
  ) {
    sidebarComponent = <AppSideBar />;
  }

  return (
    <ProtectedClientShell
      allowedRoles={[Roles.ORGANIZATION_ADMIN, Roles.TEAM_MEMBER]}
      loginUrl={LOGIN}
      forbiddenUrl={FORBIDDEN}
      requireAll={false}
      requireTeamId={false}
      requireOrgId={false}
    >
      <SidebarProvider defaultOpen>
        <AppSidebar>{sidebarComponent}</AppSidebar>
        {children}
      </SidebarProvider>
    </ProtectedClientShell>
  );
}
