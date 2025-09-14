import type { PosterVibe } from "@/types/poster-vibe";
import { Question } from "@/types/question";
import { SelectionProcess } from "@/types/selection-process";

export type JobForm = {
  title: string;
  employmentType?: string;
  workPreference?: string;
  jobSeniority?: string;
  minimumQualificationLevel?: string;
  facilities: string[]; // array of facility keys
  description?: string;
  location?: string;
  salary: {
    min?: string;
    max?: string;
    currency?: string;
    payPeriod?: string;
  };
  schedule?: string; // datetime-local
  aiPrompt?: string;
  includeMultimedia?: boolean;
  platforms: string[];
  logoFileId?: string | null;
  logoPreview?: string | null;
  brandColorHex?: string;
  companyName?: string;
  companySite: string;
  posterVibe: PosterVibe;
  posterNotes: string;
  questions: Question[];
  selectionProcess: SelectionProcess[];
};

export type PosterPayload = {
  title: string;
  posterNotes?: string;
  posterVibe?: string;
  companyName?: string;
  brandColorHex?: string;
};
