// app/(employee)/layout.tsx
import { ReactNode } from "react";
import ProtectedEmployeeClientShell from "./protected-employee-shell";

export default function EmployeeProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedEmployeeClientShell>{children}</ProtectedEmployeeClientShell>
  );
}
