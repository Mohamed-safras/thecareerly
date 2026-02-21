import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { JobFormData } from "@/interfaces/job";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CheckboxGroup from "@/components/check-box-group";
import { BENIFITS_OPTIONS } from "@/const/basic-job-info-options-value";
import MarkdownEditor from "@/components/mark-down-editor";

interface StepContentReviewProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
}

const StepContentReview: React.FC<StepContentReviewProps> = ({
  jobForm,
  setFormMerge,
}) =>{
  const dispatch = useDispatch();

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto border p-3 rounded-lg">
      <div className="space-y-3">
        <Label>Description</Label>
        <MarkdownEditor
          placeholder="One per line..."
          value={jobForm.description}
          onChange={(value) => dispatch(setFormMerge({ description: value }))}
        />
      </div>

      <div className="space-y-3">
        <Label>Requirements</Label>
        <MarkdownEditor
          placeholder="One per line..."
          value={jobForm.requirements}
          onChange={(value) => dispatch(setFormMerge({ requirements: value }))}
        />
      </div>

      <div className="space-y-3">
        <Label>Responsibilities</Label>
        <MarkdownEditor
          placeholder="One per line..."
          value={jobForm.responsibilities}
          onChange={(value) =>
            dispatch(setFormMerge({ responsibilities: value }))
          }
        />
      </div>

      <div className="space-y-3">
        <Label>Nice to Have</Label>
        <MarkdownEditor
          placeholder="One per line..."
          value={jobForm.niceToHave}
          onChange={(value) => dispatch(setFormMerge({ niceToHave: value }))}
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

export default StepContentReview;