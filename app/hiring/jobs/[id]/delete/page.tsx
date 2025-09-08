"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  GripVertical,
  CheckCircle2,
  Circle,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import HorizontalStepper from "@/components/horizontal-stepper";

// Minimal step item component (kept for accessibility but not used in horizontal view)
function Step({
  index,
  title,
  active,
  done,
  onClick,
}: {
  index: number;
  title: string;
  active?: boolean;
  done?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="text-left w-full">
      <div
        className={`flex items-start gap-3 p-3 rounded-xl border bg-background transition-colors ${
          active ? "border-emerald-600/40" : ""
        }`}
      >
        <div className="pt-0.5">
          {done ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : (
            <Circle
              className={`h-5 w-5 ${
                active ? "text-emerald-600" : "text-muted-foreground"
              }`}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="text-xs text-muted-foreground">Step {index}</div>
        </div>
      </div>
    </button>
  );
}

// Horizontal stepper with link-like connectors

// Single question row
function QuestionRow({
  label,
  placeholder,
  defaultType,
}: {
  label: string;
  placeholder?: string;
  defaultType?: string;
}) {
  return (
    <div className="rounded-xl border p-3 sm:p-4 bg-card">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,220px] gap-3 md:gap-6 items-center">
        <div className="flex items-center gap-3">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
          <div className="w-full">
            <Label className="text-[13px] text-muted-foreground">{label}</Label>
            <Input placeholder={placeholder} className="mt-1" />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-[13px] text-muted-foreground">
            Types of Answers
          </Label>
          <Select defaultValue={defaultType ?? "short"}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short Answer</SelectItem>
              <SelectItem value="long">Long Answer</SelectItem>
              <SelectItem value="yesno">Yes / No</SelectItem>
              <SelectItem value="multi">Multiple Option</SelectItem>
              <SelectItem value="single">Single Option</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

export default function ScreeningQuestionsPanel() {
  const steps = [
    { title: "Basic Information" },
    { title: "Job Description" },
    { title: "Applicable Questions" },
    { title: "Hiring Process" },
    { title: "Confirmation" },
  ];

  const [currentStep, setCurrentStep] = React.useState(3); // 1-indexed like the mock (currently step 3)
  const total = steps.length;
  const pct = (currentStep / total) * 100;

  const goPrev = () => setCurrentStep((s) => Math.max(1, s - 1));
  const goNext = () => setCurrentStep((s) => Math.min(total, s + 1));
  const goTo = (i: number) => setCurrentStep(i);

  return (
    <div className="w-full mx-auto max-w-[1250px] p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Steps & horizontal links */}
        <Card className="shadow-sm col-span-1 h-fit">
          <CardHeader className="pb-2 space-y-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Job Setup</CardTitle>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Step {currentStep} of {total}
              </Badge>
            </div>
            <HorizontalStepper
              steps={steps}
              currentStep={currentStep}
              onGoTo={goTo}
            />
            <Progress value={pct} className="h-2" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-xs text-muted-foreground">
              Click a stage to jump.
            </div>
          </CardContent>
        </Card>

        {/* Right column: Scrollable card with controls here */}
        <Card
          className="shadow-sm col-span-2 h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
          data-testid="right-column"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Screening Questions</CardTitle>
              <Badge variant="secondary" className="rounded-full px-3 py-1">
                Step {currentStep} of {total}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              You can create screening questions. Candidates who provide an
              incorrect answer will automatically be moved to the Unsuitable
              folder within Applicant Manager.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 overflow-auto pr-2">
            <QuestionRow
              label="Question 1"
              placeholder="Can you describe yourself in three words?"
              defaultType="short"
            />
            <QuestionRow
              label="Question 2"
              placeholder="What do you know about our organisation?"
              defaultType="multi"
            />
            <QuestionRow
              label="Question 3"
              placeholder="Where do you see yourself in three years?"
              defaultType="short"
            />
            <QuestionRow
              label="Question 4"
              placeholder="How did you find this job opening?"
              defaultType="multi"
            />
            <QuestionRow
              label="Question 5"
              placeholder="Can you provide us with a sample of your work?"
              defaultType="yesno"
            />
            <QuestionRow
              label="Question 6"
              placeholder="What’s your ideal work environment?"
              defaultType="short"
            />
            <div className="pt-1">
              <Button variant="ghost" className="h-8 px-2">
                <Plus className="mr-2 h-4 w-4" /> Add Questions
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2 py-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={goPrev}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {total}
            </div>
            <Button
              className="min-w-24"
              onClick={goNext}
              disabled={currentStep === total}
            >
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
