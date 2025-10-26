"use client";

import AccessCheck from "@/components/access-check";
import { LOGIN } from "@/constents/router-links";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

export default function Page() {
  const { user, isAuthenticated, status } = useAppSelector(({ user }) => user);

  if (status === "idle" || status === "loading") {
    return <AccessCheck />;
  }

  if (isAuthenticated && user) {
    redirect("/connect");
  }

  redirect(LOGIN);
}
