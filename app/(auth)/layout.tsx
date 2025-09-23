// app/(public)/layout.tsx
"use client";
import { AnimatedIconButton } from "@/components/animatediconbutton";
import { HOME } from "@/constents/router-links";
import { Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Link className="fixed bottom-10 right-10 z-50" href={HOME}>
        <AnimatedIconButton animation="bounce" icon={<Home />} label="home" />
      </Link>
      {children}
    </>
  );
}
