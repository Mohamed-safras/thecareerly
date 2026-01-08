"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn, getJobsPath } from "@/lib/utils";
import { CirclePlus, Import } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

type Props = {
  onImport?: () => void;
  className?: string;
};

export default function JobsOpeningHeader({ onImport, className }: Props) {
  const { user } = useAppSelector(({ auth }) => auth);

  const jobsPath = getJobsPath(user?.organizationId, user?.teamId);

  return (
    <div className={cn("w-full py-3", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Buttons: stack on xs, row on sm+ */}
        <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center justify-end gap-2">
          <Button
            className="relative inline-flex w-full sm:w-fit overflow-hidden rounded-lg p-[1px] focus:outline-none bg-transparent border-1 hover:bg-transparent"
            onClick={onImport}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#272A3C_0%,#6971A2_50%,#272A3C_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg light:bg-[#161A31] dark:bg-background px-7 py-2 text-sm font-semibold text-white backdrop-blur-3xl gap-2">
              <Import className="h-4 w-4" />
              Import
            </span>
          </Button>
          <Link href={jobsPath ? `${jobsPath}/create` : "#"}>
            <Button className="relative inline-flex w-full sm:w-fit overflow-hidden rounded-lg p-[1px] focus:outline-none bg-transparent border-0 hover:bg-transparent">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#272A3C_0%,#6971A2_50%,#272A3C_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#161A31] px-7 py-2 text-sm font-semibold text-white backdrop-blur-3xl gap-2">
                <CirclePlus className="h-4 w-4" />
                Create New Job
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
