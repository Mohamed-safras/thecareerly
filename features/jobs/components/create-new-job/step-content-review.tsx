import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { JobFormData } from "@/interfaces/job";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CheckboxGroup from "@/components/check-box-group";
import { BENIFITS_OPTIONS } from "@/const/basic-job-info-options-value";

interface StepContentReviewProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
}

export function StepContentReview({
  jobForm,
  setFormMerge,
}: StepContentReviewProps) {
  const dispatch = useDispatch();

  //need to change with markdown editor
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Description</Label>
        <Textarea
          className="text-sm"
          value={jobForm.description}
          onChange={(event) =>
            dispatch(setFormMerge({ description: event.target.value }))
          }
          rows={4}
        />
      </div>

      <div className="space-y-3">
        <Label>Requirements</Label>
        <Textarea
          className="text-sm"
          value={jobForm.requirements}
          onChange={(event) =>
            dispatch(setFormMerge({ requirements: event.target.value }))
          }
          rows={4}
          placeholder="One per line..."
        />
      </div>

      <div className="space-y-3">
        <Label>Responsibilities</Label>
        <Textarea
          className="text-sm"
          value={jobForm.responsibilities}
          onChange={(event) =>
            dispatch(setFormMerge({ responsibilities: event.target.value }))
          }
          rows={4}
          placeholder="One per line..."
        />
      </div>

      <div className="space-y-3">
        <Label>Nice to Have</Label>
        <Textarea
          className="text-sm"
          value={jobForm.niceToHave}
          onChange={(event) =>
            dispatch(setFormMerge({ niceToHave: event.target.value }))
          }
          rows={3}
          placeholder="Optional qualifications..."
        />
      </div>

      <div className="space-y-3">
        <Label>Skills</Label>
        <Input
          className="text-sm"
          value={jobForm.skills}
          onChange={(event) =>
            dispatch(setFormMerge({ skills: event.target.value.split(",") }))
          }
          placeholder="Comma separated..."
        />
      </div>

      <div className="space-y-3">
        {/* facilites */}
        <fieldset className="space-y-3 md:col-span-2 mt-3" id="facilities">
          <Label>Benefits & Perks</Label>
          <CheckboxGroup
            options={BENIFITS_OPTIONS}
            values={jobForm.benefits ?? []}
            onChange={(next) => dispatch(setFormMerge({ benefits: next }))}
            columns={2}
          />
        </fieldset>
      </div>
    </div>
  );
}
