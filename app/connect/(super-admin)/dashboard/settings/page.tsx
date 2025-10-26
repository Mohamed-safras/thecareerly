// app/dashboard/settings/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function SettingsPage() {
  const params = useSearchParams();
  const error = params.get("error");
  const linkedinStatus = params.get("linkedin");
  const reason = params.get("reason");
  const detail = params.get("detail");
  console.log(linkedinStatus, reason);

  console.log(error);
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-md w-full rounded-lg border p-6 shadow bg-card text-card-foreground">
        <h1 className="text-xl font-bold mb-4">Integration Settings</h1>
      </div>
    </main>
  );
}
