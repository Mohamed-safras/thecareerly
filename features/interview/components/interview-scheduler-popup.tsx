import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import InterviewForm from "./interview-form";
import { useState } from "react";
import InterviewLink from "./interview-link";
import {
  InterviewScheduleFormValues,
  interviewScheduleSchema,
} from "@/lib/form-validation/interview-scheduler-form-schema";
import axios from "axios";
import { toast } from "sonner";
import InterviewQuestions, { InterviewQuestion } from "./interview-questions";

export interface InterviewSchedulerPopupProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InterviewSchedulerPopup: React.FC<InterviewSchedulerPopupProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [step, setStep] = useState(1);

  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);

  const form = useForm<InterviewScheduleFormValues>({
    resolver: zodResolver(interviewScheduleSchema),
    defaultValues: {
      jobPosition: "",
      jobDescription: "",
      interviewType: "technical",
      duration: "30",
      format: "video",
      date: "",
      time: "",
      notes: "",
    },
  });

  const onSubmit = (data: InterviewScheduleFormValues) => {
    console.log(data);
    toast.success("Interview scheduled successfully");
    goNext();
    form.reset();
  };

  const goNext = () => {
    setStep((curr) => curr + 1);
  };

  const goPrev = () => {
    setStep((curr) => curr - 1);
  };

  const generateQuestionList = async () => {
    console.log(form.getValues());

    console.log(form.formState.isValid);

    if (!form.formState.isValid) {
      toast.warning("fill the required fileds");
      return;
    }

    try {
      setGenerating(true);

      goNext();

      const result = await axios.post("/api/interview", form.getValues());

      console.log("API Response:", result.data);

      let parsedContent;

      if (typeof result.data.content === "string") {
        const cleanedContent = result.data.content
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();

        parsedContent = JSON.parse(cleanedContent);
      } else {
        parsedContent = result.data.content;
      }

      const questionsList = parsedContent.interviewQuestions || parsedContent;
      setQuestions(questionsList);
      toast.success("Questions generated successfully!");
      setGenerating(false);
    } catch (err) {
      console.error("Error generating questions:", err);
      toast.error(`Failed to generate questions: ${err}`);
      setGenerating(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Schedule Interview</span>
          <span className="sm:hidden">Schedule</span>
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-md min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {step > 1 && (
              <Button
                variant="secondary"
                className="rounded-full"
                size="icon"
                onClick={goPrev}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <DialogTitle>Schedule New Interview</DialogTitle>
              <DialogDescription>
                AI-Driven Interviews, Hassle-Free-Hiring
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {step === 1 && <InterviewForm form={form} />}
        {step === 2 && (
          <InterviewQuestions questions={questions} generating={generating} />
        )}
        {step === 3 && (
          <InterviewLink
            interviewId={"2342cdsadxw3"}
            duration={"30"}
            questions={10}
            expiresDate={"Nov 20, 2025"}
            validDays={30}
          />
        )}

        <div className="flex items-center justify-between">
          <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>

          {/* {step === 3 && (
            <Button variant="secondary">Back to Interviews</Button>
          )} */}

          {step === 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={generateQuestionList}
              className="rounded-lg animate-pulse"
            >
              <Sparkles className="w-4 h-4" /> Generate Interview Questions
            </Button>
          )}
          {step === 2 && !generating && (
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Schedule Interview
            </Button>
          )}
          {step === 3 && (
            <Button type="submit">
              <Plus className="w-4 h-4" /> Schedule New Interview
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewSchedulerPopup;
