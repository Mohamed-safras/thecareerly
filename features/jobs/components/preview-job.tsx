"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import MarkdownEditor from "@uiw/react-md-editor";
import { Forward, Heart, SquareArrowOutUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { JobForm } from "@/types/job-form";

export interface PreviewPanelProps {
  compact?: boolean;
  jobForm: JobForm;
}

const PreviewPanel = ({ compact, jobForm }: PreviewPanelProps) => {
  return (
    <div className={`${compact ? "space-y-2" : "space-y-6"} p-4 border`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-2">
          <h3 className="truncate text-base font-semibold md:text-lg">
            {jobForm.title || "Untitled Role"}
          </h3>

          <div className="flex gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded border bg-background overflow-hidden">
              <Image
                src={`/data/assets/1moretime_logo.jpg`}
                alt="logo"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>

            {process.env.NEXT_PUBLIC_ORG_WEB_SITE && (
              <Link
                target="_blank"
                href={process.env.NEXT_PUBLIC_ORG_WEB_SITE! ?? ""}
                className="flex items-center gap-2 text-sm text-primary"
              >
                {process.env.NEXT_PUBLIC_APP_NAME}
                <SquareArrowOutUpRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <div className="flex flex-wrap flex-col mt-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {jobForm.location && jobForm.location?.length > 50
                  ? `${jobForm.location?.slice(0, 40)}...`
                  : jobForm.location || "Location TBD"}
              </Badge>
              <span className="text-muted-foreground">-</span>
              <Badge variant="secondary">
                {jobForm.workPreference || "Work Arrangement TDB"}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">
                Posted 3 days ago
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm  text-muted-foreground">
                34 Applicants
              </span>
            </div>
          </div>
        </div>

        <div className="h-fit col-span-1 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className=" cursor-pointer">
              <Heart className="h-4 w-4" /> Save
            </Button>
            <Button variant="outline" className="cursor-pointer">
              <Forward className="h-4 w-4" /> Share
            </Button>
          </div>

          <Button className="cursor-pointer" variant="default">
            Apply Now
          </Button>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        <SqureCard
          title="Education"
          value={jobForm.minimumQualificationLevel}
        />
        <SqureCard title="Work Level" value={jobForm.workPreference} />
        <SqureCard title="Employe Type" value={jobForm.employmentType} />
        {jobForm.salary.min && (
          <SqureCard
            title="Offer Salary"
            value={
              (jobForm.salary.min || jobForm.salary.max) &&
              `${jobForm.salary.currency} ${jobForm.salary.min} - ${jobForm.salary.currency} ${jobForm.salary.max}`
            }
          >
            <Badge>{jobForm.salary.payPeriod}</Badge>
          </SqureCard>
        )}
      </div>

      {jobForm.description ? (
        <MarkdownEditor.Markdown
          source={jobForm.description}
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
            background: "transparent",
          }}
          className="max-h-[30rem] overflow-y-auto"
        />
      ) : (
        <p className="text-sm">No description yet.</p>
      )}
    </div>
  );
};

export default PreviewPanel;

const SqureCard: React.FC<{
  title: string;
  value?: string;
  children?: React.ReactNode;
}> = ({ title, value, children }) => {
  return (
    <div className="p-4 border rounded-lg flex flex-col items-start gap-2">
      <span className="text-sm">{title}</span>
      <Badge
        variant="secondary"
        className="text-sm text-wrap text-accent-foreground"
      >
        {value || "N/A"}
      </Badge>
      {children}
    </div>
  );
};
