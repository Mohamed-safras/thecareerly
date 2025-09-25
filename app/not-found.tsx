// app/not-found.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link2Off, ArrowLeft, Copy, Home, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  function copyCurrentUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).catch(() => {
      /* ignore clipboard failure */
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-lg rounded-xl border p-6 shadow-sm text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Link2Off className="h-8 w-8 text-destructive" aria-hidden="true" />
        </div>

        {/* Title & message */}
        <h1 className="text-xl font-semibold text-foreground">
          Sorry, the page was not found
        </h1>
        <p className="text-sm text-muted-foreground">
          The link looks broken or the page may have been moved.
        </p>

        {/* Helpful quick actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button asChild size="sm">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyCurrentUrl}
            className="col-span-2"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy this URL (share with support)
          </Button>
        </div>

        {/* Tips / context */}
        <div className="rounded-md bg-muted p-3 text-left text-xs text-muted-foreground">
          <p className="font-medium">What you tried to open</p>
          <p className="truncate" title={pathname}>
            <span className="font-mono text-foreground">{pathname}</span>
          </p>
          <ul className="mt-2 list-inside list-disc space-y-0.5">
            <li>Check the URL for typos.</li>
            <li>If a link brought you here, it may be outdated.</li>
          </ul>
        </div>
      </Card>
    </main>
  );
}
