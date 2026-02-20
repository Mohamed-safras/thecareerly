const baseJobPostingSteps: Readonly<{ id: number; title: string }[]> = [
  { id: 1, title: "Start" },
  { id: 2, title: "Details" },
  { id: 3, title: "Description" },
  { id: 4, title: "Review" },
  { id: 5, title: "Requirements" },
  { id: 6, title: "Media" },
  { id: 7, title: "Compliance" },
  { id: 8, title: "Preview" },
];

export const createJobPostingSteps: Readonly<{ id: number; title: string }[]> =
  [...baseJobPostingSteps, { id: 9, title: "Publish" }];

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
