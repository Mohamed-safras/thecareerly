import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  InterviewScheduleFormValues,
  interviewScheduleSchema,
} from "@/lib/form-validation/interview-scheduler-form-schema";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import CircleSpinner from "@/components/circlespinner";

interface InterviewQuestion {
  question: string;
  type: string;
}

export interface InterviewSchedulerPopupProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InterviewSchedulerPopup: React.FC<InterviewSchedulerPopupProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
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
    setIsDialogOpen(false);
    form.reset();
  };

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const generateQuestionList = async () => {
    setLoading(true);
    console.log(form.getValues());
    try {
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
      setLoading(false);
    } catch (err) {
      console.error("Error generating questions:", err);
      toast.error(`Failed to generate questions: ${err}`);
      setLoading(false);
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
          <DialogTitle>Schedule New Interview</DialogTitle>
          <DialogDescription>
            AI-Driven Interviews, Hassle-Free-Hiring
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 py-3"
          >
            <FormField
              control={form.control}
              name="jobPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior Frontend Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none space-y-3 max-h-60 overflow-y-auto border rounded-lg"
                      placeholder="e.g. Senior Frontend Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="interviewType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="problem-solving">
                          Problem Solving
                        </SelectItem>
                        <SelectItem value="hr">HR Screening</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="final">Final Round</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Format</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add your additional notes</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Add any notes or agenda items to generate interview questions..."
                      className="resize-none space-y-3 max-h-60 overflow-y-auto border rounded-lg"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="outline"
              onClick={generateQuestionList}
              disabled={loading}
              className="rounded-lg animate-pulse"
            >
              {loading ? (
                <>
                  <CircleSpinner size={20} className="rounded-full" />{" "}
                  Generating
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate Interview Questions
                </>
              )}
            </Button>

            {questions.length > 0 && (
              <div className="space-y-3 mt-3">
                <h3 className="font-semibold text-sm">Generated Questions:</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto border rounded-lg p-3">
                  {questions.map((question, index) => (
                    <div key={index} className="p-2 bg-muted rounded-md">
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-sm">
                          {index + 1}.
                        </span>

                        <div className="flex-1">
                          <p className="text-sm">{question.question}</p>

                          <span className="text-xs text-muted-foreground">
                            {question.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button variant="secondary">Cancel</Button>

              <Button type="submit" disabled={questions.length < 1}>
                Schedule Interview
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewSchedulerPopup;
