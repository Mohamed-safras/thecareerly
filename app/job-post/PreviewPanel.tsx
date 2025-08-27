import { platformMeta } from "@/components/Platforms";
import { Badge } from "@/components/ui/badge";
import { JobForm } from "@/types/jobform";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { ImageIcon } from "lucide-react";
import React from "react";
export interface PreviewPanelProps {
  form: JobForm;
  logoPreview: string | null;
  compact?: boolean;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  form,
  logoPreview,
  compact,
}) => {
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
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold md:text-lg">
              {form.title || "Untitled Role"}
            </h3>
            <Badge variant="secondary">{form.location || "Location TBD"}</Badge>
          </div>
          {(form.salaryMin || form.salaryMax || form.currency) && (
            <div className="text-xs text-muted-foreground">
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
