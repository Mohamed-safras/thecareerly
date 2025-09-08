// app/components/jobs-opening-header.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileDown, FolderPlus } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  openCount: number;
  holdCount: number;
  closeCount: number;
  draftCount: number;
  onImport?: () => void;
  className?: string;
};

export default function JobsOpeningHeader({
  title = "Jobs Opening",
  openCount,
  holdCount,
  closeCount,
  draftCount,
  onImport,
  className,
}: Props) {
  const router = useRouter();
  return (
    <div className={cn("w-full px-4 py-3 mb-4", "", className)}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap flex-col min-w-0">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>

          <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <StatusChip
              colorClass="bg-emerald-500"
              label="Open"
              count={openCount}
            />
            <StatusChip
              colorClass="bg-amber-500"
              label="Hold"
              count={holdCount}
            />
            <StatusChip
              colorClass="bg-rose-500"
              label="Close"
              count={closeCount}
            />
            <StatusChip
              colorClass="bg-slate-400"
              label="Draft"
              count={draftCount}
            />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 flex-wrap">
          <Button
            variant="secondary"
            className="h-8 rounded-lg bg-slate-400 shadow-sm hover:bg-slate-500 transition-all"
            onClick={onImport}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Import
          </Button>

          <Button
            className="h-8 rounded-lg bg-emerald-700 text-white hover:bg-emerald-700/90"
            onClick={() => router.push("/hiring/jobs/create")}
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatusChip({
  colorClass,
  label,
  count,
}: {
  colorClass: string;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-1.5 w-1.5 rounded-full", colorClass)} />
      <span className="whitespace-nowrap">
        {label} <span className="font-medium text-foreground">{count}</span>
      </span>
    </div>
  );
}
