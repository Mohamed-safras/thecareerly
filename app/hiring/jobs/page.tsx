import {
  JobPosting,
  JobPostingCard,
} from "@/features/jobs/components/job-posting-card";
import React from "react";
import JobFiltersBar from "../../../features/jobs/components/job-filters-bar";
import JobsOpeningHeader from "../../../features/jobs/components/jobs-header";
import HiringShell from "@/features/jobs/components/hiring-shell";

export const sampleJobs: JobPosting[] = [
  {
    status: "Open",
    department: "Dev",
    role: "Full Stack Developer",
    employmentType: "Fulltime",
    location: "Colombo",
    workplace: "Hybrid",
    candidatesApplied: 34,
    interviewsCompleted: 15,
    postedAt: "12 Aug 2025",
    closeAt: "20 Sep 2025",
    daysToGo: 19,
    createdBy: {
      name: "Safras",
      avatarUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=389&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    progress: 60,
  },
  {
    status: "Hold",
    department: "Dev",
    role: "Backend Engineer (Java/Spring Boot)",
    employmentType: "Fulltime",
    location: "Remote",
    workplace: "Remote",
    candidatesApplied: 58,
    interviewsCompleted: 22,
    postedAt: "01 Aug 2025",
    closeAt: "10 Sep 2025",
    daysToGo: 8,
    createdBy: {
      name: "Admin",
      avatarUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    progress: 85,
  },
  {
    status: "Closed",
    department: "Devops",
    role: "DevOps Engineer",
    employmentType: "Contract",
    location: "Dubai",
    workplace: "Onsite",
    candidatesApplied: 41,
    interviewsCompleted: 17,
    postedAt: "05 Aug 2025",
    closeAt: "25 Sep 2025",
    daysToGo: 24,
    createdBy: {
      name: "Team HR",
      avatarUrl:
        "https://plus.unsplash.com/premium_photo-1690587673708-d6ba8a1579a5?q=80&w=379&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    progress: 50,
  },
  {
    status: "Draft",
    department: "Dev",
    role: "Frontend Developer (React/Next.js)",
    employmentType: "Fulltime",
    location: "Singapore",
    workplace: "Onsite",
    candidatesApplied: 72,
    interviewsCompleted: 30,
    postedAt: "10 Jul 2025",
    closeAt: "20 Aug 2025",
    createdBy: {
      name: "HR Manager",
      avatarUrl:
        "https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    progress: 66,
  },
  {
    status: "Closed",
    department: "Dev",
    role: "Frontend Developer (React/Next.js)",
    employmentType: "Fulltime",
    location: "Singapore",
    workplace: "Onsite",
    candidatesApplied: 72,
    interviewsCompleted: 30,
    postedAt: "10 Jul 2025",
    closeAt: "20 Aug 2025",
    createdBy: {
      name: "HR Manager",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    progress: 66,
  },
  {
    status: "Closed",
    department: "PM",
    role: "Project Manager",
    employmentType: "Full time",
    location: "Singapore",
    workplace: "Onsite",
    candidatesApplied: 72,
    interviewsCompleted: 30,
    postedAt: "10 Jul 2025",
    closeAt: "20 Aug 2025",
    createdBy: {
      name: "HR Manager",
      avatarUrl:
        "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    progress: 66,
  },
];
const JobOpenings = () => {
  return (
    <HiringShell
      breadCrumpPage="Jobs"
      breadCrumbsItems={[{ label: "Hiring", link: "/hiring" }]}
    >
      <div className="mx-auto max-w-8xl p-4">
        <JobsOpeningHeader
          openCount={2}
          holdCount={2}
          closeCount={1}
          draftCount={1}
        />
        <JobFiltersBar />
        <div className="mx-auto grid grid-cols-1 max-w-8xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sampleJobs.map((job, i) => (
            <JobPostingCard key={i} job={job} />
          ))}
        </div>
      </div>
    </HiringShell>
  );
};

export default JobOpenings;
