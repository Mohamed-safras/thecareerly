// components/auth/ProtectedRoleClientShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { UserType } from "@/types/user-type";
import { Loader2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { shallowEqual } from "react-redux";

type Props = {
  requiredRole: UserType;
  loginUrl: string;
  forbiddenUrl: string;
  children: ReactNode;
};

export default function ProtectedRoleClientShell({
  requiredRole,
  loginUrl,
  forbiddenUrl,
  children,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const redirectingRef = useRef(false);

  // select only what you need to avoid store re-renders

  const { userType, isAuthenticated, status } = useAppSelector(
    (s) => ({
      userType: s.user.user?.userType ?? null,
      isAuthenticated: s.user.isAuthenticated,
      status: s.user.status,
    }),
    shallowEqual
  );

  // memoize target urls to avoid dependency churn
  const loginHref = useMemo(
    () => `${loginUrl}?callbackUrl=${encodeURIComponent(pathname)}`,
    [loginUrl, pathname]
  );

  useEffect(() => {
    if (redirectingRef.current) return;
    if (status === "idle" || status === "loading") return;

    if (!isAuthenticated) {
      if (pathname !== loginUrl) {
        redirectingRef.current = true;
        router.replace(loginHref);
      }
      return;
    }

    if (userType !== requiredRole) {
      if (pathname !== forbiddenUrl) {
        redirectingRef.current = true;
        router.replace(forbiddenUrl);
      }
      return;
    }
  }, [
    status,
    isAuthenticated,
    userType,
    requiredRole,
    pathname,
    loginUrl,
    forbiddenUrl,
    loginHref,
    router,
  ]);

  // minimal, fast fallback UI while status resolves
  if (status === "idle" || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md rounded-2xl border p-6 shadow-sm text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-semibold">Checking access</h2>
            <div
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              <Loader2 className="h-5 w-5 motion-safe:animate-spin" />
              <span>Verifying your session and permissions…</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // avoid content flash if redirecting
  if (!isAuthenticated || userType !== requiredRole) return null;

  return <>{children}</>;
}
