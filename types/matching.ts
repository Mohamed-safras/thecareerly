export interface JobDescription {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  skills: string[];
  experience: string;
  location: string;
  salaryRange: string;
  createdAt: string;
  status: "active" | "paused" | "closed";
}

export interface ParsedCV {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  fileName: string;
  uploadedAt: string;
  skills: string[];
  experience: string;
  education: string;
  summary: string;
  rawText?: string;
}

export interface MatchResult {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  overallScore: number;
  skillsMatch: {
    matched: string[];
    missing: string[];
    extra: string[];
    score: number;
  };
  experienceMatch: {
    required: string;
    candidate: string;
    score: number;
  };
  educationMatch: {
    score: number;
    notes: string;
  };
  highlights: string[];
  concerns: string[];
  recommendation: "strong" | "good" | "consider" | "weak";
  analyzedAt: string;
}

export interface MatchingConfig {
  skillsWeight: number;
  experienceWeight: number;
  educationWeight: number;
  minimumScore: number;
  autoReject: boolean;
  autoAdvance: boolean;
  advanceThreshold: number;
}

export const defaultMatchingConfig: MatchingConfig = {
  skillsWeight: 50,
  experienceWeight: 30,
  educationWeight: 20,
  minimumScore: 60,
  autoReject: false,
  autoAdvance: false,
  advanceThreshold: 85,
};
