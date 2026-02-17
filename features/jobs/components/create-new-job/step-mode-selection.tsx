import { useState, useMemo } from "react";
import { FileText, Copy } from "lucide-react";
import { JobFormData } from "@/interfaces/job";
import { jobTemplates } from "../../data/mock-job-template";
import { ModeCard } from "../mode-card";
import { TemplateSearchBar } from "../template-search-bar";
import { TemplateCard } from "../template-card";
import { TemplatePreviewDialog } from "../template-preview-dialog";
import { useAppDispatch } from "@/store/hooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface StepModeSelectionProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
  onApplyTemplate: (prefill: Partial<JobFormData>) => void;
}

const StepModeSelection: React.FC<StepModeSelectionProps> = ({
  jobForm,
  setFormMerge,
  onApplyTemplate,
}) => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [previewTemplate, setPreviewTemplate] = useState<
    (typeof jobTemplates)[0] | null
  >(null);

  const departments = useMemo(() => {
    const depts = [
      ...new Set(jobTemplates.map((template) => template.department)),
    ];
    return depts.sort();
  }, []);

  const filteredTemplates = useMemo(() => {
    return jobTemplates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase());
      const matchesDept =
        deptFilter === "all" || template.department === deptFilter;
      return matchesSearch && matchesDept;
    });
  }, [search, deptFilter]);

  const selectTemplate = (id: string) => {
    const template = jobTemplates.find((template) => template.id === id);
    dispatch(setFormMerge({ useTemplate: true, templateId: id }));
    if (template?.prefill) {
      onApplyTemplate(template.prefill);
    }
    setPreviewTemplate(null);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <ModeCard
          icon={FileText}
          title="Start from Blank"
          description="Create from scratch"
          selected={!jobForm.useTemplate}
          onClick={() =>
            dispatch(
              setFormMerge({ useTemplate: false, templateId: undefined }),
            )
          }
          iconClassName="bg-primary/10 text-primary"
        />
        <ModeCard
          icon={Copy}
          title="Use Template"
          description="Pre-built job templates"
          selected={!!jobForm.useTemplate}
          onClick={() => dispatch(setFormMerge({ useTemplate: true }))}
          iconClassName="bg-accent text-accent-foreground"
        />
      </div>

      {jobForm.useTemplate && (
        <div className="space-y-3">
          <TemplateSearchBar
            search={search}
            onSearchChange={setSearch}
            departments={departments}
            deptFilter={deptFilter}
            onDeptFilterChange={setDeptFilter}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                selected={jobForm.templateId === template.id}
                onSelect={selectTemplate}
                onPreview={setPreviewTemplate}
              />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="rounded-lg border border-dashed p-3 text-center text-sm text-muted-foreground">
              No templates found. Try adjusting your search or filter.
            </div>
          )}
        </div>
      )}

      <TemplatePreviewDialog
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSelect={selectTemplate}
      />
    </div>
  );
};

export default StepModeSelection;
