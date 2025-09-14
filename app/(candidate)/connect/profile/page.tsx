"use client";
import SignOutButton from "@/components/sign-out-button";
import { useAppSelector } from "@/store/hooks";

export default function CandidateProfilePage() {
  const { user } = useAppSelector(({ user }) => user);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">My Profile</h1>
      <h1>{user?.name}</h1>

      <SignOutButton />
    </main>
  );
}
