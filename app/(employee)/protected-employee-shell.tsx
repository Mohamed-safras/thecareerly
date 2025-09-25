// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CONNECT_EMPLOYEE_LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedRoleClientShell from "@/features/auth/components/protected-role-client-shell";
import RectruiterAppSideBar from "@/features/users/components/employee-app-site-bar";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function ProtectedEmployeeClientShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <ProtectedRoleClientShell
      requiredRole="Employee"
      loginUrl={CONNECT_EMPLOYEE_LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      <SidebarProvider defaultOpen>
        <AppSidebar>
          <RectruiterAppSideBar />
        </AppSidebar>
        {children}
      </SidebarProvider>
    </ProtectedRoleClientShell>
  );
}
