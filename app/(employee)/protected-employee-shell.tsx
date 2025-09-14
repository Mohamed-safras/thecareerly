// app/(employee)/protected-employee-shell.tsx
"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CONNECT_EMPLOYEE_LOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedRoleClientShell from "@/features/auth/components/protected-role-client-shell";

export default function ProtectedEmployeeClientShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoleClientShell
      requiredRole="Employee"
      loginUrl={CONNECT_EMPLOYEE_LOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      <SidebarProvider defaultOpen>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </ProtectedRoleClientShell>
  );
}
