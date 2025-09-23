"use client";

import { CandidateSignupForm } from "@/components/candidate-signup-form";

export default function CandidateSignUpPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 gap-2 md:p-10">
      <div className="w-full max-w-sm lg:max-w-7xl">
        <CandidateSignupForm />
      </div>
    </div>
  );
}
