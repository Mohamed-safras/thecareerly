export type JobForm = {
  title: string;
  employmentType: string;
  workArragement: string;
  description: string;
  location: string;
  salaryMin?: string;
  salaryMax?: string;
  currency?: string;
  schedule?: string; // datetime-local
  aiPrompt?: string;
  includeMultimedia: boolean;
  platforms: string[];
  logoFileId: string | null;
  logoPreview: string | null;
};

export interface JobPosting {
  status: "Open" | "Hold" | "Closed" | "Draft";
  role: string;
  department: string;
  employmentType: string;
  location: string;
  workplace: string;
  candidatesApplied: number;
  interviewsCompleted: number;
  postedAt: string;
  closeAt: string;
  daysToGo?: number;
  createdBy: { name: string; avatarUrl?: string };
  progress?: number;
}
