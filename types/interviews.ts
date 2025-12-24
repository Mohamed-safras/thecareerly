export type InterviewType =
  | "technical"
  | "phone-screen"
  | "final"
  | "hr"
  | "culture";

export interface InterviewEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  candidate: string;
  position: string;
  interviewer: string;
  interviewerAvatar?: string;
  location: string;
  type: InterviewType;
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  email: string;
  notes?: string;
}

export const typeConfig: Record<
  InterviewType,
  { label: string; color: string; bgColor: string }
> = {
  technical: {
    label: "Technical",
    color: "hsl(217, 91%, 50%)",
    bgColor: "hsl(217, 91%, 95%)",
  },
  "phone-screen": {
    label: "Phone Screen",
    color: "hsl(142, 76%, 36%)",
    bgColor: "hsl(142, 76%, 95%)",
  },
  final: {
    label: "Final Round",
    color: "hsl(262, 83%, 58%)",
    bgColor: "hsl(262, 83%, 95%)",
  },
  hr: {
    label: "HR Interview",
    color: "hsl(38, 92%, 50%)",
    bgColor: "hsl(38, 92%, 95%)",
  },
  culture: {
    label: "Culture Fit",
    color: "hsl(340, 82%, 52%)",
    bgColor: "hsl(340, 82%, 95%)",
  },
};
