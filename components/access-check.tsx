import React from "react";
import { Card } from "./ui/card";
import { Loader, ShieldCheck } from "lucide-react";

const AccessCheck = () => {
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
            <Loader className="h-5 w-5 motion-safe:animate-spin" />
            <span>Verifying your session and permissions…</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccessCheck;
