const baseJobPostingSteps: Readonly<{ id: number; title: string }[]> = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Job Description & Poster Generation" },
  { id: 3, title: "Applicable Questions" },
  { id: 4, title: "Hiring Process" },
  { id: 5, title: "Preview" },
];

export const createJobPostingSteps: Readonly<{ id: number; title: string }[]> =
  [...baseJobPostingSteps, { id: 6, title: "Schedule & Publish" }];

export const editJobPostingSteps: Readonly<{ id: number; title: string }[]> = [
  ...baseJobPostingSteps,
  { id: 6, title: "Update & Publish" },
];
