// app/dashboard/page.tsx
"use client";

import { useAuth } from "@/hooks/use-auth";
import { StatsCard } from "../../../features/dashboard/stats-card";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobPipelineCard } from "../../../features/dashboard/job-pipeline-card";
import { Badge } from "@/components/ui/badge";
import { CandidateCard } from "../../../features/dashboard/candidate-card";
import { UpcomingInterviews } from "../../../features/dashboard/upcoming-interviews";
import { SourceAnalytics } from "../../../features/dashboard/source-analytics";
import { ActivityFeed } from "../../../features/dashboard/activity-feed";

export const statsData = [
  {
    title: "Active Jobs",
    value: 24,
    change: "+3 this week",
    changeType: "positive" as const,
    iconColor: "text-primary",
    icon: Briefcase,
  },
  {
    title: "Interviews Scheduled",
    value: 38,
    change: "12 this week",
    changeType: "neutral" as const,
    iconColor: "text-status-active",
    icon: Calendar,
  },
  {
    title: "Total Candidates",
    value: 1847,
    change: "+127 this month",
    changeType: "positive" as const,
    iconColor: "text-status-new",
    icon: Users,
  },
  {
    title: "Offers Sent",
    value: 7,
    change: "+2 from last week",
    changeType: "positive" as const,
    iconColor: "text-status-hold",
    icon: Send,
  },
];

export const jobsData = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    applicants: 156,
    daysOpen: 12,
    isUrgent: true,
    stages: [
      { name: "Applied", count: 89, color: "bg-muted-foreground" },
      { name: "Screening", count: 34, color: "bg-primary" },
      { name: "Interview", count: 21, color: "bg-status-new" },
      { name: "Offer", count: 12, color: "bg-status-active" },
    ],
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    applicants: 89,
    daysOpen: 8,
    stages: [
      { name: "Applied", count: 45, color: "bg-muted-foreground" },
      { name: "Screening", count: 24, color: "bg-primary" },
      { name: "Interview", count: 15, color: "bg-status-new" },
      { name: "Offer", count: 5, color: "bg-status-active" },
    ],
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "San Francisco, CA",
    applicants: 67,
    daysOpen: 21,
    stages: [
      { name: "Applied", count: 32, color: "bg-muted-foreground" },
      { name: "Screening", count: 18, color: "bg-primary" },
      { name: "Interview", count: 12, color: "bg-status-new" },
      { name: "Offer", count: 5, color: "bg-status-active" },
    ],
  },
];

export const candidatesData = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    stage: "Final Interview",
    stageColor: "badge-new",
    appliedDate: "2 days ago",
    matchScore: 94,
  },
  {
    name: "Marcus Johnson",
    role: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4,
    stage: "Technical Screen",
    stageColor: "badge-hold",
    appliedDate: "5 days ago",
    matchScore: 87,
  },
  {
    name: "Emily Rodriguez",
    role: "DevOps Engineer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4,
    stage: "Offer Extended",
    stageColor: "badge-active",
    appliedDate: "1 week ago",
    matchScore: 91,
  },
  {
    name: "David Kim",
    role: "Senior Frontend Engineer",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 3,
    stage: "Phone Screen",
    stageColor: "badge-hold",
    appliedDate: "3 days ago",
    matchScore: 72,
  },
];

export const interviewsData = [
  {
    id: "1",
    candidate: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "Senior Frontend Engineer",
    time: "10:00 AM",
    duration: "1h",
    type: "video" as const,
    interviewers: [
      {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
      },
      {
        name: "Anna Lee",
        avatar:
          "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=573",
      },
      {
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
      },
    ],
  },
  {
    id: "2",
    candidate: "Marcus Johnson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "Product Designer",
    time: "2:30 PM",
    duration: "45m",
    type: "onsite" as const,
    interviewers: [
      {
        name: "Lisa Wang",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
      },
      {
        name: "Tom Davis",
        avatar:
          "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=573",
      },
    ],
  },
  {
    id: "3",
    candidate: "Alex Turner",
    role: "Backend Developer",
    time: "4:00 PM",
    duration: "1h",
    type: "video" as const,
    interviewers: [
      { name: "Chris Wong" },
      {
        name: "Sam Miller",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
      },
    ],
  },
];

export const sourcesData = [
  { name: "LinkedIn", candidates: 523, percentage: 30, color: "bg-primary" },
  {
    name: "Referrals",
    candidates: 298,
    percentage: 20,
    color: "bg-primary/75",
  },
  {
    name: "Company Website",
    candidates: 189,
    percentage: 23,
    color: "bg-primary/50",
  },
  {
    name: "Other",
    candidates: 89,
    percentage: 16,
    color: "bg-primary/25",
  },
];

export const activitiesData = [
  {
    id: "1",
    type: "hired" as const,
    candidate: "Emily Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    job: "DevOps Engineer",
    time: "2h ago",
  },
  {
    id: "2",
    type: "interview" as const,
    candidate: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    job: "Senior Frontend Engineer",
    time: "4h ago",
    description: "Final round with CTO scheduled for tomorrow",
  },
  {
    id: "3",
    type: "applied" as const,
    candidate: "James Wilson",
    job: "Product Manager",
    time: "5h ago",
  },
  {
    id: "4",
    type: "offer" as const,
    candidate: "Lisa Park",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    job: "UX Researcher",
    time: "1d ago",
  },
  {
    id: "5",
    type: "reviewed" as const,
    candidate: "Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    job: "Backend Developer",
    time: "1d ago",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <section className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hi, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your recruitment pipeline
              today.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {statsData.map(
            ({ title, value, change, changeType, icon, iconColor }) => (
              <StatsCard
                key={title}
                title={title}
                value={value}
                change={change}
                changeType={changeType}
                icon={icon}
                iconColor={iconColor}
              />
            )
          )}
        </section>

        {/* Active Jobs */}
        <section className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg font-semibold">Active Job Pipelines</h2>
              <p className="text-sm text-muted-foreground">
                Track candidate progress across roles
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {jobsData.map((job) => (
              <JobPipelineCard key={job.title} {...job} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Jobs & Candidates */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Candidates */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Top Candidates</h2>
                  <Badge variant="secondary" className="font-normal">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    AI Ranked
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {candidatesData.map((candidate) => (
                  <CandidateCard key={candidate.name} {...candidate} />
                ))}
              </div>
            </section>

            {/* Activity Feed */}
            <section className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Button variant="ghost" size="sm" className="text-xs">
                  See all
                </Button>
              </div>
              <ActivityFeed activities={activitiesData} />
            </section>
          </div>

          {/* Right Column - Activity & Interviews */}
          <div className="space-y-6">
            {/* Today's Interviews */}
            <section className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Today&apos;s Interviews
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {interviewsData.length} scheduled
                  </p>
                </div>
                <Badge variant="outline" className="font-normal">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date().toLocaleDateString("en-us", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Badge>
              </div>
              <UpcomingInterviews interviews={interviewsData} />
            </section>

            {/* Source Analytics */}
            <section className="rounded-xl border bg-card p-5">
              <h2 className="text-lg font-semibold mb-4">Candidate Sources</h2>
              <SourceAnalytics sources={sourcesData} totalCandidates={1486} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
