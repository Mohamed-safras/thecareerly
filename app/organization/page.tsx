import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <main style={{ padding: 24 }}></main>;
  }
  console.log("Session in organization page:", session);
  return (
    <main style={{ padding: 24 }}>
      <p>Welcome, {session.user?.name ?? session.user?.email}!</p>
    </main>
  );
};

export default page;
