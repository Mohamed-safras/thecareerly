// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import RectruiterAppSideBar from "@/features/users/components/sidebar/app-site-bar";
import { TEAM_ROLES, ORGANIZATION_ROLES } from "@/lib/role";
import { useAppSelector } from "@/store/hooks";
import { UserProfile } from "@/types/user-profile";
import SuperAdminAppSideBar from "@/features/users/components/sidebar/super-admin-app-site-bar";

export default function ProtectedOrganizationClientShell({
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

  let SidebarComponent: () => React.JSX.Element = () => <></>; // default

  const roles = getUserRoles(user);

  if (roles.includes(ORGANIZATION_ROLES.SUPER_ADMIN)) {
    SidebarComponent = SuperAdminAppSideBar;
  } else if (
    roles.includes(ORGANIZATION_ROLES.SUPER_ADMIN) &&
    roles.includes(TEAM_ROLES.TEAM_ADMIN)
  ) {
    SidebarComponent = RectruiterAppSideBar;
  }

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
      <SidebarProvider defaultOpen>
        <AppSidebar>
          <SidebarComponent />
        </AppSidebar>
        {children}
      </SidebarProvider>
    </ProtectedClientShell>
  );
}
