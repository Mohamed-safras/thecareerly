"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";
import MarkdownEditor from "@uiw/react-md-editor";
import { Forward, Heart, ImageIcon, SquareArrowOutUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface PreviewPanelProps {
  compact?: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ compact }) => {
  const {
    title,
    companyName,
    location,
    minimumQualificationLevel,
    employmentType,
    workPreference,
    salary,
    description,
    companySite,
    logoPreview,
  } = useAppSelector((selector) => selector.jobForm);

  return (
    <div className={`${compact ? "space-y-2" : "space-y-6"} p-4 border`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-2">
          <h3 className="truncate text-base font-semibold md:text-lg">
            {title || "Untitled Role"}
          </h3>

          <div className="flex gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded border bg-background overflow-hidden">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {companyName && (
              <Link
                target="_blank"
                href={companySite}
                className="flex items-center gap-2 text-sm text-primary"
              >
                {companyName}
                <SquareArrowOutUpRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <div className="flex flex-wrap flex-col mt-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {location && location?.length > 50
                  ? `${location?.slice(0, 40)}...`
                  : location || "Location TBD"}
              </Badge>
              <span className="text-muted-foreground">-</span>
              <Badge variant="secondary">
                {workPreference || "Work Arrangement TDB"}
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
        <SqureCard title="Education" value={minimumQualificationLevel} />
        <SqureCard title="Work Level" value={workPreference} />
        <SqureCard title="Employe Type" value={employmentType} />
        {salary.min && (
          <SqureCard
            title="Offer Salary"
            value={
              (salary.min || salary.max) &&
              `${salary.currency} ${salary.min} - ${salary.currency} ${salary.max}`
            }
          >
            <Badge>{salary.payPeriod}</Badge>
          </SqureCard>
        )}
      </div>

      {description ? (
        <MarkdownEditor.Markdown
          source={description}
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

      {/* <div className="flex flex-wrap gap-2">
        {platforms?.map((p) => (
          <Badge key={p} variant="outline" className="gap-1">
            {platformMeta[p]?.icon}
            <span>{platformMeta[p]?.label}</span>
          </Badge>
        ))}
        {platforms?.length === 0 && (
          <Badge variant="outline">No platforms selected</Badge>
        )}
      </div> */}
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
