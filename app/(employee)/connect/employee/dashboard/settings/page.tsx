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

        {linkedinStatus === "connected" && (
          <p className="text-green-600 font-medium">
            ✅ LinkedIn account connected successfully!
          </p>
        )}

        {linkedinStatus === "error" && (
          <div className="space-y-2">
            <p className="text-red-600 font-medium">
              ❌ Failed to connect LinkedIn.
            </p>
            {reason && (
              <p className="text-sm text-muted-foreground">
                Reason: {decodeURIComponent(reason)}
              </p>
            )}
            {detail && (
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-muted p-2 rounded">
                {decodeURIComponent(detail)}
              </pre>
            )}
          </div>
        )}

        {!linkedinStatus && (
          <p className="text-muted-foreground text-sm">
            Manage your LinkedIn and other integrations here.
          </p>
        )}
      </div>
    </main>
  );
}
