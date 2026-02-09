import z from "zod";

export const interviewScheduleSchema = z.object({
  jobPosition: z.string().min(2, "Job position is required"),
  jobDescription: z.string().min(2, "Job Description is required"),
  interviewType: z.enum(
    ["technical", "behavioral", "problem-solving", "hr", "leadership", "final"],
    {
      required_error: "Please select an interview type",
    }
  ),
  duration: z.enum(["30", "45", "60", "90"], {
    required_error: "Please select a duration",
  }),
  format: z.enum(["video", "phone", "in-person"], {
    required_error: "Please select a format",
  }),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

export type InterviewScheduleFormValues = z.infer<
  typeof interviewScheduleSchema
>;
