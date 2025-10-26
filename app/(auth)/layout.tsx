// app/(public)/layout.tsx
"use client";

import { ReactNode } from "react";

export default function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
