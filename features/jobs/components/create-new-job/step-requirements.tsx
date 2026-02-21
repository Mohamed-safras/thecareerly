import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  FileText,
  Github,
  FolderOpen,
  Mail,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobFormData, ScreeningQuestion } from "@/interfaces/job";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { educationLevelTypeValue } from "@/types/job";
import { EDUCATION_LEVEL } from "@/const/basic-job-info-options-value";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StepRequirementsProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
  formErrorType: string;
}

const StepRequirements: React.FC<StepRequirementsProps> = ({
  jobForm,
  setFormMerge,
  formErrorType,
}) => {
  const dispatch = useAppDispatch();

  const { educationLevel } = jobForm;

  const { byForm } = useAppSelector(({ formErrors }) => formErrors);

  const addQuestion = () => {
    const newQ: ScreeningQuestion = {
      id: crypto.randomUUID(),
      question: "",
      type: "text",
      required: false,
      isKnockout: false,
    };
    dispatch(
      setFormMerge({
        screeningQuestions: [...jobForm.screeningQuestions, newQ],
      }),
    );
  };

  const updateQuestion = (id: string, updates: Partial<ScreeningQuestion>) => {
    dispatch(
      setFormMerge({
        screeningQuestions: jobForm.screeningQuestions.map((question) =>
          question.id === id ? { ...question, ...updates } : question,
        ),
      }),
    );
  };

  const removeQuestion = (id: string) => {
    dispatch(
      setFormMerge({
        screeningQuestions: jobForm.screeningQuestions.filter(
          (question) => question.id !== id,
        ),
      }),
    );
  };

  const toggleDocReq = (field: keyof typeof jobForm.documentRequirements) => {
    dispatch(
      setFormMerge({
        documentRequirements: {
          ...jobForm.documentRequirements,
          [field]: !jobForm.documentRequirements[field],
        },
      }),
    );
  };

  const docReqs = [
    {
      key: "resume" as const,
      label: "Resume / CV",
      icon: FileText,
      desc: "Candidate must upload their resume",
    },
    {
      key: "coverLetter" as const,
      label: "Cover Letter",
      icon: Mail,
      desc: "Optional cover letter submission",
    },
    {
      key: "portfolio" as const,
      label: "Portfolio",
      icon: FolderOpen,
      desc: "Link or upload portfolio/work samples",
    },
    {
      key: "githubProfile" as const,
      label: "GitHub Profile",
      icon: Github,
      desc: "Link to GitHub or code repository",
    },
  ];

  return (
    <div className="space-y-3 border max-h-[600px] overflow-y-auto p-3 rounded-lg">
      <div className="grid grid-cols-2 gap-3">
        {/* qualification level */}
        <div className="space-y-1.5">
          <Label htmlFor="qualification-level">Education Level</Label>
          <Select
            value={educationLevel as educationLevelTypeValue | undefined}
            onValueChange={(value) =>
              dispatch(
                setFormMerge({
                  educationLevel: value as educationLevelTypeValue,
                }),
              )
            }
          >
            <SelectTrigger id="qualification-level" className="w-full">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {EDUCATION_LEVEL.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {byForm?.[`${formErrorType}_job_details`]?.educationLevel && (
            <Alert variant="destructive" className="h-fit text-sm p-3">
              <AlertCircle className="h-4 w-4" />

              <AlertDescription>
                {byForm?.[`${formErrorType}_job_details`]?.educationLevel}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-3">
          <Label>Certifications</Label>
          <Input
            placeholder="e.g., PMP, AWS, CPA (comma separated)"
            value={jobForm.certifications}
            onChange={(event) =>
              dispatch(setFormMerge({ certifications: event.target.value }))
            }
          />
        </div>
      </div>

      <Separator />

      {/* Document Requirements */}
      <div className="space-y-3">
        <Label className="text-base">Document Requirements</Label>
        <div className="grid grid-cols-2 gap-3">
          {docReqs.map(({ key, label, icon: Icon, desc }) => (
            <Card
              key={key}
              className="p-3 cursor-pointer transition-all hover:shadow-sm"
              onClick={() => toggleDocReq(key)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={jobForm.documentRequirements[key]}
                  onCheckedChange={() => toggleDocReq(key)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{label}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Screening Questions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base">Screening Questions</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addQuestion}
            className="gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" /> Add Question
          </Button>
        </div>

        {jobForm.screeningQuestions.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No screening questions yet. Add questions to filter applicants.
          </div>
        )}

        {jobForm.screeningQuestions.map((screenQuestion, index) => (
          <div
            key={screenQuestion.id}
            className="rounded-lg border p-3 space-y-3"
          >
            <div className="flex items-start gap-2">
              <GripVertical className="h-4 w-4 mt-2.5 text-muted-foreground" />
              <div className="flex-1 space-y-3">
                <div className="flex gap-3">
                  <Input
                    placeholder={`Question ${index + 1}`}
                    value={screenQuestion.question}
                    onChange={(event) =>
                      updateQuestion(screenQuestion.id, {
                        question: event.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <Select
                    value={screenQuestion.type}
                    onValueChange={(value) =>
                      updateQuestion(screenQuestion.id, {
                        type: value as ScreeningQuestion["type"],
                      })
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Short Text</SelectItem>
                      <SelectItem value="yes_no">Yes / No</SelectItem>
                      <SelectItem value="multiple_choice">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="file_upload">File Upload</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeQuestion(screenQuestion.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {screenQuestion.type === "multiple_choice" && (
                  <Textarea
                    placeholder="Enter options, one per line"
                    value={screenQuestion.options?.join("\n") || ""}
                    onChange={(event) =>
                      updateQuestion(screenQuestion.id, {
                        options: event.target.value.split("\n"),
                      })
                    }
                    rows={3}
                  />
                )}

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={screenQuestion.required}
                      onCheckedChange={(value) =>
                        updateQuestion(screenQuestion.id, { required: value })
                      }
                    />
                    <Label className="font-normal text-sm">Required</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={screenQuestion.isKnockout}
                      onCheckedChange={(value) =>
                        updateQuestion(screenQuestion.id, { isKnockout: value })
                      }
                    />
                    <Label className="font-normal text-sm">
                      Knockout question
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepRequirements;
