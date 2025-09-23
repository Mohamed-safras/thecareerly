import type { PosterVibe } from "@/types/poster-vibe";
import { Question } from "@/types/question";
import { SelectionProcess } from "@/types/selection-process";

export type JobForm = {
  title: string;
  location: string;
  employmentType?: string;
  workPreference?: string;
  jobSeniority?: string;
  minimumQualificationLevel?: string;
  facilities: string[]; // array of facility keys
  description?: string;

  salary: {
    min?: string;
    max?: string;
    currency?: string;
    payPeriod?: string;
  };
  scheduleDate?: string; // datetime-local
  aiPrompt?: string;
  includeMultimedia?: boolean;
  platforms: string[];
  brandColorHex?: string;
  posterVibe: PosterVibe;
  posterNotes: string;
  questions: Question[];
  selectionProcess: SelectionProcess[];
  skills: [];
};

export type PosterPayload = {
  title: string;
  posterNotes?: string;
  posterVibe?: string;
  companyName?: string;
  brandColorHex?: string;
};
