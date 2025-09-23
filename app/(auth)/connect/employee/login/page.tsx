"use client";
import { EmployeeLoginForm } from "@/components/login-form-employee";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function EmployeeLoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 gap-4 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
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
        <EmployeeLoginForm />
      </div>
    </div>
  );
}
