"use client";

import AccessCheck from "@/components/access-check";
import { LOGIN } from "@/constents/router-links";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function Page() {
  const { user, isAuthenticated, status } = useAuth();

  if (status === "idle" || status === "loading") {
    return <AccessCheck />;
  }

  if (isAuthenticated && user) {
    redirect("/connect/dashboard");
  }

  redirect(LOGIN);
}
