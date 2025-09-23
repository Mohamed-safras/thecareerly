// app/(candidate)/protected-candidate-client-shell.tsx
"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { CONNECT_CANDIDATE_lOGIN, FORBIDDEN } from "@/constents/router-links";
import ProtectedRoleClientShell from "@/features/auth/components/protected-role-client-shell";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import CandidateAppSideBar from "@/features/users/components/candidate-app-site-bar";

export default function ProtectedCandidateClientShell({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated, status } = useAppSelector(({ user }) => user);

  const userType = useMemo(() => user?.userType ?? null, [user]);

  useEffect(() => {
    // Wait until auth is resolved to avoid flicker
    if (status === "loading" || status === "idle") return;

    // Not logged in → candidate login
    if (!isAuthenticated) {
      router.replace(CONNECT_CANDIDATE_lOGIN);
      return;
    }

    // Logged in but wrong role → forbidden
    if (userType !== "Candidate") {
      router.replace(FORBIDDEN);
      return;
    }
  }, [status, isAuthenticated, userType, router]);

  // While resolving auth, show a tiny placeholder
  if (status === "loading" || status === "idle") {
    return (
      <div className="p-6 text-sm text-muted-foreground">Checking access…</div>
    );
  }

  // If redirecting away, render nothing to prevent content flash
  if (!isAuthenticated || userType !== "Candidate") {
    return null;
  }

  // Authorized candidate
  return (
    <ProtectedRoleClientShell
      requiredRole="Candidate"
      loginUrl={CONNECT_CANDIDATE_lOGIN}
      forbiddenUrl={FORBIDDEN}
    >
      {/* Add candidate header/nav if you have one */}
      <SidebarProvider>
        <AppSidebar>
          <CandidateAppSideBar />
        </AppSidebar>
      </SidebarProvider>
      {children}
    </ProtectedRoleClientShell>
  );
}
