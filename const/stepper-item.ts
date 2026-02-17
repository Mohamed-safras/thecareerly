const baseJobPostingSteps: Readonly<{ id: number; title: string }[]> = [
  { id: 1, title: "Start" },
  { id: 2, title: "Details" },
  { id: 3, title: "Description & Poster Generation" },
  { id: 4, title: "Applicable Questions" },
  { id: 5, title: "Hiring Process" },
  { id: 6, title: "Preview" },
];

export const createJobPostingSteps: Readonly<{ id: number; title: string }[]> =
  [...baseJobPostingSteps, { id: 6, title: "Schedule & Publish" }];

export const editJobPostingSteps: Readonly<{ id: number; title: string }[]> = [
  ...baseJobPostingSteps,
  { id: 6, title: "Update & Publish" },
];

export const createUserSteps: Readonly<{ id: number; title: string }[]> = [
  { id: 1, title: "User Information" },
  { id: 2, title: "Roles & Permissions" },
  { id: 3, title: "Onboarding & Invite" },
  { id: 4, title: "Review & Confirm" },
];
