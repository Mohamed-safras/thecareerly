// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Roles } from "@/lib/role";
import SuperAdminAppSideBar from "@/components/sidebar/super-admin-app-site-bar";
import AppSideBar from "@/components/sidebar/app-site-bar";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function ProtectedUserSideBar({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  let sidebarComponent: React.JSX.Element | null = null;

  const userRoles = useMemo(() => user?.roles ?? [], [user?.roles]);

  if (userRoles.includes(Roles.ORGANIZATION_ADMIN)) {
    console.log("Rendering Organization Admin Sidebar");
    sidebarComponent = <SuperAdminAppSideBar />;
  } else if (
    userRoles.includes(Roles.ORGANIZATION_ADMIN) &&
    userRoles.includes(Roles.RECRUITER)
  ) {
    sidebarComponent = <AppSideBar />;
  }

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar>{sidebarComponent}</AppSidebar>
      {children}
    </SidebarProvider>
  );
}
