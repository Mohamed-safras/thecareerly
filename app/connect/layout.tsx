import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { ReactNode } from "react";
import ProtectedUserSideBar from "../../features/auth/components/protected-user-sidebar";

export default function ProfileManagmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedClientShell>
      <ProtectedUserSideBar>{children}</ProtectedUserSideBar>
    </ProtectedClientShell>
  );
}
