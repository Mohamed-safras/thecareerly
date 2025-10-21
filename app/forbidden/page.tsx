// app/403/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { HOME } from "@/constents/router-links";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-6 w-6 text-red-600" aria-hidden="true" />
          <h1 className="text-2xl font-bold leading-tight">403 — Forbidden</h1>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          You don’t have permission to access this page or perform this action.
          This could be because:
        </p>

        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            Your session expired or you’re signed in with the wrong account.
          </li>
          <li>
            You’re trying to access a resource from another organization/team.
          </li>
        </ul>

        <div className="mt-6 flex justify-between flex-wrap gap-3">
          <button
            className="relative z-10 overflow-hidden px-12 py-2 rounded-lg cursor-pointer text-base tracking-widest font-bold my-3 border border-border bg-background text-foreground group transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit"
            aria-label="Go to homepage"
          >
            <Link href={HOME}>
              <span className="absolute left-0 top-0 w-0 h-full z-[-1] transition-all duration-200 ease-in-out group-hover:w-full group-focus:w-full bg-muted"></span>
              <span className="relative z-10 transition-colors duration-200 group-hover:text-foreground group-focus:text-foreground">
                Go Home
              </span>
            </Link>
          </button>

          <button
            className="relative z-10 overflow-hidden px-12 py-2 rounded-lg cursor-pointer text-base tracking-widest font-bold my-3 border border-border bg-background text-foreground group transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit"
            aria-label="Go to support page"
          >
            <Link href="/support">
              <span className="absolute left-0 top-0 w-0 h-full z-[-1] transition-all duration-200 ease-in-out group-hover:w-full group-focus:w-full bg-muted"></span>
              <span className="relative z-10 transition-colors duration-200 group-hover:text-foreground group-focus:text-foreground">
                Contact Support
              </span>
            </Link>
          </button>
        </div>

        <div className="mt-6 rounded-lg bg-muted text-xs text-muted-foreground">
          <p className="font-medium">Request details</p>
          <p className="mt-1">
            If you contact support, include the time of the error and the page
            URL you tried to access.
          </p>
        </div>
      </div>
    </main>
  );
}
