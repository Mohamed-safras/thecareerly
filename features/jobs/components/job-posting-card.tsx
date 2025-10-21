import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Share2,
  MoreHorizontal,
  Building,
  BriefcaseBusiness,
  PauseCircleIcon,
  CircleDot,
  CircleCheck,
  Pencil,
  ChevronDown,
} from "lucide-react";

import KV from "@/features/jobs/components/kv";
import { jobStatus } from "@/constents/job-form";
import StatisticPill from "@/features/jobs/components/statistic-pill";
import { JobForm } from "@/types/job-form";

export interface Job extends JobForm {
  id: string;
  status: "OPEN" | "HOLD" | "CLOSED" | "DRAFT";

  candidatesApplied: number;
  completedInterviews: number;
  createdAt: string;
  closedAt: string;
  createdBy: { name: string; image?: string };
}

export function JobPostingCard({
  job,
  onJobClick,
}: {
  job: Job;
  onJobClick: (job: Job) => void;
}) {
  return (
    <Card className="relative overflow-hidden max-h-[500px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={`${
                jobStatus[job.status] || ""
              } text-white font-bold text-sm flex items-center gap-1`}
            >
              {job.status === "OPEN" && <CircleDot className="h-3 w-3" />}
              {job.status === "HOLD" && <PauseCircleIcon className="h-3 w-3" />}
              {job.status === "DRAFT" && <Pencil className="h-3 w-3" />}
              {job.status === "CLOSED" && <CircleCheck className="h-3 w-3" />}

              <span className="capitalize">{job.status}</span>

              {!["OPEN", "HOLD", "CLOSED", "DRAFT"].includes(job.status) && (
                <ChevronDown className="h-3 w-3 cursor-pointer" />
              )}
            </Badge>

            {job?.department && (
              <Badge className="text-sm font-semibold">{job.department}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
              aria-label="More options"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardTitle className="text-lg sm:text-xl">
          {job.title.length > 25 ? `${job.title.slice(0, 25)}...` : job.title}
        </CardTitle>

        {job.description && (
          <CardDescription>
            {job.description.length > 75
              ? `${job.description.slice(0, 75)}...`
              : job.description}
          </CardDescription>
        )}

        <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
          <KV icon={BriefcaseBusiness}>{job.employmentType}</KV>
          <KV icon={MapPin}>
            {job.location.length > 10
              ? `${job.location.slice(0, 10)}...`
              : job.location}
          </KV>
          <KV icon={Building}>{job.workPreference}</KV>
        </div>
      </CardHeader>

      <Separator />

      <div className="grid grid-cols-2 gap-2 sm:gap-2 px-6">
        <StatisticPill
          value={job.candidatesApplied || 0}
          label="Candidates Applied"
        />

        <StatisticPill
          value={job.completedInterviews || 0}
          label={`Completed interview${job.completedInterviews > 1 ? "s" : ""}`}
        />
      </div>

      <Separator />
      <CardFooter className="flex flex-col lg:flex-row lg:items-center items-start justify-between gap-2">
        {job.createdBy && (
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              {job.createdBy.image ? (
                <AvatarImage
                  src={job.createdBy.image}
                  alt={job.createdBy.name}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="rounded-full bg-background font-bold">
                  {job.createdBy.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Created by{" "}
              <span className="font-bold">
                {job.createdBy.name.length > 15
                  ? `${job.createdBy.name.slice(0, 15)}...`
                  : job.createdBy.name}
              </span>
            </span>
          </div>
        )}

        <Button
          variant="outline"
          className="text-sm lg:w-fit w-full font-semibold cursor-pointer"
          onClick={() => onJobClick(job)}
        >
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
