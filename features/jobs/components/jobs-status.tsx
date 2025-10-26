import { useFetchJobs } from "@/hooks/useFetchJobs";
import { cn } from "@/lib/utils";
import React from "react";

const JobsStatusBar = () => {
  const { jobStatusCount } = useFetchJobs();
  return (
    <div className="py-3 mb-4 flex flex-col sm:flex-row min-w-0">
      <div className="mt-1 flex flex-row flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <StatusChip
          colorClass="bg-primary"
          label="Open"
          count={jobStatusCount.OPEN}
        />
        <StatusChip
          colorClass="bg-amber-500"
          label="Hold"
          count={jobStatusCount.HOLD}
        />
        <StatusChip
          colorClass="bg-rose-500"
          label="Close"
          count={jobStatusCount.CLOSED}
        />
        <StatusChip
          colorClass="bg-slate-400"
          label="Draft"
          count={jobStatusCount.DRAFT}
        />
      </div>
    </div>
  );
};

export default JobsStatusBar;

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
