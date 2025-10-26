// components/jobs/JobSkeleton.tsx
"use client";

import { Card } from "@/components/ui/card";

export default function JobSkeleton() {
  return (
    <Card className="p-4 animate-pulse">
      <div className="h-4 w-2/3 bg-muted rounded mb-2" />
      <div className="h-3 w-full bg-muted rounded mb-1" />
      <div className="h-3 w-3/4 bg-muted rounded" />
    </Card>
  );
}
