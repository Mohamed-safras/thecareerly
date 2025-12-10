import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
import { ReactNode } from "react";

export default function TeamManagmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProtectedClientShell>{children}</ProtectedClientShell>;
}
