// app/(candidate)/layout.tsx
import { ReactNode } from "react";
import ProtectedCandidateClientShell from "./protected-candidate-shell";

export default function CandidateLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedCandidateClientShell>{children}</ProtectedCandidateClientShell>
  );
}
