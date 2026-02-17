import {
  ApprovalStatus,
  ComplianceCheckCategory,
  ComplianceCheckStatus,
  ExperienceLevel,
  JobType,
  MediaAttachmentStatus,
  PayPeriod,
  PosterVibe,
  ScreeningQuestionType,
} from "@/types/job";
import { SelectionProcess } from "@/types/job";

export interface JobFormData {
  title: string;
  department: string;
  description: string;
  requirements: string;
  responsibilities: string;
  niceToHave: string;
  skills: string[];
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  location: string;
  workPreference: string;
  salary: SalaryRange;
  benefits: string[];
  applicationDeadline?: Date;
  useTemplate: boolean;
  templateId?: string;
  educationLevel: string;
  certifications: string;
  screeningQuestions: ScreeningQuestion[];
  documentRequirements: DocumentRequirements;
  complianceChecks: ComplianceCheck[];
  approvalStatus: ApprovalStatus;
  approvalNotes: string;
  scheduledDate?: string;
  publishToCareerSite: boolean;
  enableApplicationPortal: boolean;
  mediaAttachments: MediaAttachment[];
  // aiPrompt?: string;
  includeMultimedia?: boolean;
  platforms: string[];
  posterVibe: PosterVibe;
  posterNotes: string;
  selectionProcess: SelectionProcess[];
  publishChannels: {
    companyWebsite: boolean;
    internalJobBoard: boolean;
    employeePortal: boolean;
  };
}

export interface PosterPayload {
  title: string;
  posterNotes?: string;
  posterVibe?: string;
  companyName?: string;
  brandColorHex?: string;
}
export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  payPeriod: PayPeriod;
  showOnPosting: boolean;
}

export interface ScreeningQuestion {
  id: string;
  question: string;
  type: ScreeningQuestionType;
  required: boolean;
  options?: string[];
  isKnockout?: boolean;
}

export interface JobBenefits {
  id: string;
  name: string;
  icon: string;
}

export interface DocumentRequirements {
  resume: boolean;
  coverLetter: boolean;
  portfolio: boolean;
  githubProfile: boolean;
}

export interface ComplianceCheck {
  id: string;
  label: string;
  description: string;
  status: ComplianceCheckStatus;
  category: ComplianceCheckCategory;
}
export interface MediaAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: MediaAttachmentStatus;
}
export interface JobTemplate {
  id: string;
  name: string;
  description: string;
  department: string;
  tags: string[];
  prefill: Partial<JobFormData>;
}

export interface InterviewQuestion {
  question: string;
  type: string;
}
