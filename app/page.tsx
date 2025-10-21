// app/(public)/page.tsx
"use client";

import { AboutSection } from "@/features/home/chat-card";
import CTABanner from "@/features/home/cta-banner-section";
import { HeroSection } from "@/features/home/hero";
import ValuePropositionBlockSection from "@/features/home/value-proposition-block-section";

export default function PublicHomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValuePropositionBlockSection />
      <AboutSection />
      <CTABanner />
    </main>
  );
}
