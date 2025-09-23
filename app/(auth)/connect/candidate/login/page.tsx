"use client";
import { CandidateLoginForm } from "@/components/login-form-candidate";
import { CONNECT_CANDIDATE_DASHBOARD } from "@/constents/router-links";
import { useAppSelector } from "@/store/hooks";
import { GalleryVerticalEnd } from "lucide-react";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function CandidateLoginPage() {
  const { user, isAuthenticated, status } = useAppSelector(({ user }) => user);

  if (user && isAuthenticated && status === "authenticated") {
    redirect(CONNECT_CANDIDATE_DASHBOARD);
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 gap-4 md:p-10">
      <Link
        href={process.env.NEXT_PUBLIC_ORG_WEB_SITE!}
        target="_blank"
        className="flex items-center gap-2 self-center font-medium"
      >
        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-4" />
        </div>
        {process.env.NEXT_PUBLIC_ORG_NAME}
      </Link>
      <div className="w-full max-w-sm md:max-w-3xl">
        <CandidateLoginForm />
      </div>
    </div>
  );
}
