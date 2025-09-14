// app/(public)/page.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CONNECT_CANDIDATE_lOGIN,
  CONNECT_CANDIDATE_SIGNUP,
  CONNECT_EMPLOYEE_LOGIN,
} from "@/constents/router-links";

export default function PublicHomePage() {
  return (
    <main className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 p-6 md:grid-cols-2">
      {/* Candidate block */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Candidate</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Apply to roles, track your applications, and manage your profile.
          </p>
          <div className="flex items-center gap-3">
            <Button asChild className="flex-1">
              <Link href={CONNECT_CANDIDATE_lOGIN}>Sign in</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={CONNECT_CANDIDATE_SIGNUP}>Sign up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee block */}
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Employee</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Manage jobs, teams, and candidate pipelines. Organization login
            required.
          </p>
          <div className="flex items-center gap-3">
            <Button asChild className="flex-1">
              <Link href={CONNECT_EMPLOYEE_LOGIN}>Sign in</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
