import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import { Link } from "lucide-react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Unauthorized</h1>
        <p>
          Please <Link href="/login">sign in</Link> to continue.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name ?? session.user?.email}!</p>
    </main>
  );
};

export default page;
