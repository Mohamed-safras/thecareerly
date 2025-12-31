export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  department: string;
  experience: string;
  location: string;
  salary: string;
  stage: string;
  rating: number;
  appliedDate: string;
  source: string;
  resume: string;
  skills: string[];
  education: string;
  status: "active" | "hired" | "rejected" | "withdrawn";
  notes: number;
  interviews: number;
}
