import ProtectedUserClientShell from "@/app/protected-user-shell";
import { ReactNode } from "react";

export default function ProfileManagmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProtectedUserClientShell>{children}</ProtectedUserClientShell>;
}
