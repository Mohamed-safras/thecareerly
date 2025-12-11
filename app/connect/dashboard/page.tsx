// app/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto p-8">
          <div className="rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>

            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id}
              </p>
              <p>
                <strong>Organization:</strong> {user?.organizationName} (
                {user?.organizationId})
              </p>

              {user?.roles && (
                <div>
                  <strong>Roles:</strong> {user.roles.join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
