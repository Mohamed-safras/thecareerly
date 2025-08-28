"use client";

import React from "react";
import { useAppSelector } from "@/store/hooks";
import { platformMeta } from "@/components/platforms";
import { Badge } from "@/components/ui/badge";
import MarkdownEditor from "@uiw/react-md-editor";
import { ImageIcon } from "lucide-react";

export interface PreviewPanelProps {
  compact?: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ compact }) => {
  const form = useAppSelector((s) => s.jobForm);
  const logoPreview = useAppSelector((s) => s.ui.logoPreview);

  function prettyCurrency(code?: string) {
    if (!code) return "";
    return code.toUpperCase();
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border bg-background">
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
        <div className="min-w-0">
          <div className="flex flex-wrap  flex-col">
            <h3 className="truncate text-base font-semibold md:text-lg">
              {form.title || "Untitled Role"}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {form.location || "Location TBD"}
              </Badge>
              <Badge variant="secondary">
                {form.jobType || "Job Type TBD"}
              </Badge>
            </div>
          </div>
          {(form.salaryMin || form.salaryMax || form.currency) && (
            <div className="text-xs text-muted-foreground mt-2">
              {form.salaryMin && (
                <span>
                  {prettyCurrency(form.currency)} {form.salaryMin}
                </span>
              )}
              {form.salaryMin && form.salaryMax && <span> – </span>}
              {form.salaryMax && (
                <span>
                  {prettyCurrency(form.currency)} {form.salaryMax}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <MarkdownEditor.Markdown
        source={form.description || "No description yet."}
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: "14px",
          lineHeight: "1.6",
          padding: "0.75rem",
          borderRadius: "0.5rem",
        }}
      />

      <div className="flex flex-wrap gap-2">
        {form.platforms.map((p) => (
          <Badge key={p} variant="outline" className="gap-1">
            {platformMeta[p]?.icon}
            <span>{platformMeta[p]?.label}</span>
          </Badge>
        ))}
        {form.platforms.length === 0 && (
          <Badge variant="outline">No platforms selected</Badge>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
