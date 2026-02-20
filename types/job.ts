import {
  ALLOWED_VIBES,
  ALLOWED_VIBES_TYPES,
  EDUCATION_LEVEL,
  EXPRIENCE_LEVEL,
  JOB_TYPES,
  PAY_PERIOD,
  WORK_PREFERENCE,
} from "@/const/basic-job-info-options-value";

export type JobStatus = "draft" | "published" | "paused" | "closed";

export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "remote";

export type ComplianceCheckStatus = "pass" | "fail" | "warning" | "pending";
export type ComplianceCheckCategory = "bias" | "legal" | "gdpr" | "inclusive";

export type MediaAttachmentStatus = "uploading" | "complete" | "error";

export type ExperienceLevel = "entry" | "mid" | "senior" | "lead" | "executive";

export type PayPeriod = "hourly" | "monthly" | "yearly";

export type ApprovalStatus = "none" | "pending" | "approved" | "rejected";

export type ScreeningQuestionType =
  | "text"
  | "yes_no"
  | "multiple_choice"
  | "file_upload";

export type SelectionProcess = {
  id: string;
  name: string;
  description: string;
};

export type Place = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

export type SelectFieldOptions = { value: string; label: string };
export type JobTypeOption = { value: JobType; label: string };
export type ExprerienceLevelOption = { value: ExperienceLevel; label: string };
export type PayPeriodOption = { value: PayPeriod; label: string };

export type payPeriodTypeValue = (typeof PAY_PERIOD)[number]["value"];
export type experienceLevelValue = (typeof EXPRIENCE_LEVEL)[number]["value"];
export type educationLevelTypeValue = (typeof EDUCATION_LEVEL)[number]["value"];
export type jobTypeValue = (typeof JOB_TYPES)[number]["value"];
export type workPreferenceTypeValue = (typeof WORK_PREFERENCE)[number]["value"];
export type allowedVibesTypeValue =
  (typeof ALLOWED_VIBES_TYPES)[number]["value"];
export type PosterVibe = (typeof ALLOWED_VIBES)[number];


export type DevicePreview = 'desktop' | 'tablet' | 'mobile';
