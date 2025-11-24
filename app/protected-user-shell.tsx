// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { TeamRole, OrganizationRole } from "@/lib/role";
import { useAppSelector } from "@/store/hooks";
import { UserProfile } from "@/types/user-profile";
import SuperAdminAppSideBar from "@/components/sidebar/super-admin-app-site-bar";
import AppSideBar from "@/components/sidebar/app-site-bar";

export default function ProtectedUserClientShell({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAppSelector(({ user }) => user);

  function getUserRoles(user: UserProfile | null) {
    return [
      ...(user?.teamUsers?.map((user) => user.role).filter(Boolean) ?? []),
      ...(user?.organizationUsers?.map((user) => user.role).filter(Boolean) ??
        []),
    ];
  }

  let SidebarComponent: React.JSX.Element | null = null; // default

  const roles = getUserRoles(user);

  if (roles.includes(OrganizationRole.ORG_ADMIN)) {
    SidebarComponent = <SuperAdminAppSideBar />;
  } else if (
    roles.includes(OrganizationRole.ORG_ADMIN) &&
    roles.includes(TeamRole.TEAM_ADMIN)
  ) {
    SidebarComponent = <AppSideBar />;
  }

  return (
    <ProtectedClientShell
      allowedRoles={[
        OrganizationRole.ORG_ADMIN,
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
