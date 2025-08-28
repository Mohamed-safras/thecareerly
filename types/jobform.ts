export type JobForm = {
  title: string;
  jobType: string;
  description: string;
  location: string;
  salaryMin?: string;
  salaryMax?: string;
  currency?: string;
  schedule?: string; // datetime-local
  aiPrompt?: string;
  includeMultimedia: boolean;
  platforms: string[]; // ["linkedin","twitter","instagram","facebook"]
  logoFileId: string | null;
};
