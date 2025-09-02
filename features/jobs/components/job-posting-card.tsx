import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
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

import { JobPosting } from "@/types/job";

import { jobStatus } from "../../../constents/job";

function StatPill({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex-1 rounded-xl border bg-muted/30 p-4">
      <div className="text-2xl font-semibold leading-none tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function KV({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" aria-hidden />
      <span>{children}</span>
    </div>
  );
}

export function JobPostingCard({ job }: { job: JobPosting }) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant={"secondary"}
              className={`${
                jobStatus[job.status]
              } text-white font-bold text-sm`}
            >
              {job.status === "Open" && <CircleDot />}
              {job.status === "Hold" && <PauseCircleIcon />}
              {job.status === "Draft" && <Pencil />}
              {job.status === "Closed" && <CircleCheck />}

              {job.status}

              {!(
                job.status === "Open" ||
                job.status === "Hold" ||
                job.status === "Closed"
              ) && <ChevronDown className="cursor-copy" />}
            </Badge>
            <Badge className="text-sm font-semibold">{job.department}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
              aria-label="Share or actions"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
              aria-label="Share or actions"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardTitle className="text-lg sm:text-xl">
          {job.role.length > 25 ? `${job.role.slice(0, 25)}...` : job.role}
        </CardTitle>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <KV icon={BriefcaseBusiness}>{job.employmentType}</KV>
          <KV icon={MapPin}>{job.location}</KV>
          <KV icon={Building}>{job.workplace}</KV>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:gap-2">
          <StatPill value={job.candidatesApplied} label="Candidates Applied" />
          <StatPill
            value={job.interviewsCompleted}
            label="Completed interview"
          />
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs md:text-sm">
                Posted at <span className="font-semibold">{job.postedAt}</span>
                <span className="mx-1">•</span> Close at{" "}
                <span className="font-semibold">{job.closeAt}</span>
              </span>
            </div>
          </div>
          {job?.daysToGo && (
            <span className="text-xs font-medium text-muted-foreground">
              {job.daysToGo} Days to go
            </span>
          )}
          {typeof job.progress === "number" && (
            <Progress value={job.progress} />
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            {job.createdBy.avatarUrl ? (
              <AvatarImage
                src={job.createdBy.avatarUrl}
                alt={job.createdBy.name}
                className="object-cover"
              />
            ) : (
              <AvatarFallback>
                {job.createdBy.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Created by <span className="font-bold">{job.createdBy.name}</span>
          </span>
        </div>
        <Button
          variant="outline"
          className="text-sm font-semibold cursor-pointer"
        >
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
