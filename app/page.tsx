// app/(public)/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CONNECT_CANDIDATE_lOGIN,
  CONNECT_CANDIDATE_SIGNUP,
  CONNECT_EMPLOYEE_LOGIN,
} from "@/constents/router-links";
import { Badge } from "@/components/ui/badge";

export default function PublicHomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-8 md:pt-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Badge variant="secondary" className="mb-3">
              We’re hiring
            </Badge>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              Build your career with teams that move fast
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Discover roles across engineering, product, design, operations and
              more. Track your applications and connect directly with hiring
              teams.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={CONNECT_CANDIDATE_lOGIN}>Browse & Sign in</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={CONNECT_CANDIDATE_SIGNUP}>
                  Create candidate profile
                </Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              No spam. You control your data.
            </p>
          </div>

          {/* Hero visual (optional image) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border bg-muted">
            <Image
              src="/images/hero-placeholder.jpg"
              alt="Careers hero"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick actions (Candidate / Employee) */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 pb-8 md:grid-cols-2">
        {/* Candidate block */}
        <Card className="h-full">
          <CardHeader className="pb-3">
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
          <CardHeader className="pb-3">
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
      </section>

      {/* Featured logos (optional) */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="rounded-xl border p-4 md:p-6">
          <p className="mb-4 text-center text-xs uppercase tracking-wider text-muted-foreground">
            Trusted by teams
          </p>
          <div className="grid grid-cols-2 items-center gap-6 opacity-80 md:grid-cols-5">
            {/* replace with your logos */}
            {["logo1", "logo2", "logo3", "logo4", "logo5"].map((k) => (
              <div key={k} className="relative mx-auto h-8 w-28">
                <Image
                  src={`/images/${k}.svg`}
                  alt={`${k} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video section (controls disabled) */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Life at our teams
            </h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Get a quick glimpse of our culture, projects, and what it’s like
              to work with us.
            </p>
            <ul className="mt-3 list-inside list-disc text-sm text-muted-foreground">
              <li>Real projects, real impact</li>
              <li>Growth-focused feedback</li>
              <li>Hybrid and remote options</li>
            </ul>
          </div>

          {/* Important: all controls disabled */}
          <div className="relative overflow-hidden rounded-xl border">
            <video
              className="block w-full select-none pointer-events-none" // disable interactions
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              preload="metadata"
              poster="/images/video-poster.jpg"
              // extra hardening (some browsers honor these)
              controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
              {/* Accessible fallback */}
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Note: Video playback is muted and non-interactive to keep the page
          distraction-free.
        </p>
      </section>
    </main>
  );
}
