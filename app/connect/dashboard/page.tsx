// app/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </nav>

        <div className="container mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>

            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id}
              </p>
              {/* <p>
                <strong>Organization ID:</strong> {user?.organizationId}
              </p>
              <p>
                <strong>Team ID:</strong> {user?.teamId}
              </p> */}
              {/* 
              {user?.organizationUsers && user.organizationUsers.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold">Organization Roles:</h3>
                  <ul className="list-disc list-inside">
                    {user.organizationUsers.map((ou, idx) => (
                      <li key={idx}>{ou.role}</li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* {user?.teamUsers && user.teamUsers.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold">Team Roles:</h3>
                  <ul className="list-disc list-inside">
                    {user.teamUsers.map((tu, idx) => (
                      <li key={idx}>{tu.role}</li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
