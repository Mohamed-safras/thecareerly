"use client";

import { useState } from "react";

export default function SocialTestPage() {
  const [result, setResult] = useState(null);

  async function publish() {
    const r = await fetch("/api/linkedin/publish", { method: "POST" });
    setResult(await r.json());
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-3 rounded-lg border p-5">
        <h1 className="text-lg font-semibold">LinkedIn Org Test</h1>
        <a
          href="/api/social/linkedin/connect"
          className="block rounded bg-blue-600 px-3 py-2 text-center text-white"
        >
          Connect LinkedIn
        </a>
        <button
          onClick={publish}
          className="w-full rounded bg-green-600 px-3 py-2 text-white"
        >
          Publish sample post
        </button>

        {result && (
          <pre className="rounded bg-muted p-3 text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
