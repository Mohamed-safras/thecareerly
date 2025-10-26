"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      style={{ padding: "6px 10px", borderRadius: 6 }}
    >
      Sign out
    </button>
  );
}
