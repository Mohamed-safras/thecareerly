"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { platformMeta } from "@/components/platforms";
import { Badge } from "@/components/ui/badge";
import MarkdownEditor from "@uiw/react-md-editor";
import { ImageIcon } from "lucide-react";
import { employmentTypeValue } from "@/types/employment-types";

export interface PreviewPanelProps {
  compact?: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ compact }) => {
  const {
    title,
    companyName,
    location,
    employmentType,
    workArragement,
    salaryMin,
    salaryMax,
    currency,
    description,
    platforms,
    logoPreview,
  } = useAppSelector((selector) => selector.jobForm);

  function prettyCurrency(code?: string) {
    if (!code) return "";
    return code.toUpperCase();
  }

  return (
    <div className={compact ? "space-y-2" : "space-y-6"}>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl border bg-background overflow-hidden">
          {logoPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoPreview}
              alt="logo"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
        <h1 className="text-base font-medium md:text-xl">{companyName}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap flex-col">
            <h3 className="truncate text-base font-semibold md:text-lg">
              {title || "Untitled Role"}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{location || "Location TBD"}</Badge>

              <Badge variant="secondary">
                {workArragement || "Work Arrangement TDB"}
              </Badge>

              <Badge variant="secondary">
                {(employmentType as employmentTypeValue) || "Job Type TBD"}
              </Badge>
            </div>
          </div>

          {(salaryMin || salaryMax || currency) && (
            <div className="text-xs text-muted-foreground mt-2">
              {salaryMin && (
                <span>
                  {prettyCurrency(currency)} {salaryMin}
                </span>
              )}
              {salaryMin && salaryMax && <span> – </span>}
              {salaryMax && (
                <span>
                  {prettyCurrency(currency)} {salaryMax}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {description ? (
        <MarkdownEditor.Markdown
          source={description}
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
            borderRadius: "0.5rem",
            background: "transparent",
          }}
          className="max-h-[30rem] overflow-y-auto"
        />
      ) : (
        <p className="text-sm">No description yet.</p>
      )}

      <div className="flex flex-wrap gap-2">
        {platforms?.map((p) => (
          <Badge key={p} variant="outline" className="gap-1">
            {platformMeta[p]?.icon}
            <span>{platformMeta[p]?.label}</span>
          </Badge>
        ))}
        {platforms?.length === 0 && (
          <Badge variant="outline">No platforms selected</Badge>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
