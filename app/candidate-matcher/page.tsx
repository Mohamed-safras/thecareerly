"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, Upload, Settings2, Briefcase, Sparkles } from "lucide-react";

import { MatchingConfigPanel } from "@/features/candidates/matching/matching-config-panel";
import { CVUploadZone } from "@/features/candidates/matching/cv-upload-zone";
import {
  mockJobs,
  mockMatchResults,
} from "@/features/candidates/data/candidate-maching-mock-data";
import { JobCandidatesView } from "@/features/candidates/matching/job-candidates-view";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Job,
  JobPostingCard,
} from "@/features/jobs/components/job-posting-card";

export default function CVMatching() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = mockJobs.filter((job) => {
    if (searchQuery) {
      return (
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const getMatchCountForJob = (jobId: string) => {
    return mockMatchResults.filter((r) => r.jobId === jobId).length;
  };

  const getStrongMatchCountForJob = (jobId: string) => {
    return mockMatchResults.filter(
      (rob) => rob.jobId === jobId && rob.recommendation === "strong"
    ).length;
  };

  const getMatchesForJob = (jobId: string) => {
    return mockMatchResults.filter((result) => result.jobId === jobId);
  };

  // Show candidates view when a job is selected
  if (selectedJob) {
    return (
      <div className="h-screen bg-background">
        <JobCandidatesView
          job={selectedJob}
          matches={getMatchesForJob(selectedJob.id)}
          onBack={() => setSelectedJob(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    CV Matching
                  </h1>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Automatically match candidates to your open positions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <Tabs defaultValue="jobs" className="space-y-3">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger
              value="jobs"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Briefcase className="h-4 w-4" />
              Job Positions
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Upload className="h-4 w-4" />
              Upload CVs
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Settings2 className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-3">
            {/* Search */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search job positions..."
                  className="pl-10 bg-background/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Hint Card */}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  className="text-sm text-muted-foreground *:hover:text-primary inline-flex items-center gap-1 p-0"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </Button>
              </TooltipTrigger>

              <TooltipContent
                side="top"
                align="center"
                sideOffset={8}
                className="max-w-sm p-4 border rounded-lg shadow-lg"
              >
                Click on any job card to view all matching candidates ranked by
                their match score. Candidates are categorized as Strong, Good,
                Consider, or Weak matches.
              </TooltipContent>
            </Tooltip>

            {/* Job List */}
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <JobPostingCard
                    key={index}
                    job={job}
                    onJobClick={() => setSelectedJob(job)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Briefcase className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    No jobs found
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : "Create a new job description to get started"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6 mt-6">
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upload CVs</h2>
                <Badge variant="outline">
                  {mockJobs.filter((job) => job.status === "OPEN").length}{" "}
                  active jobs
                </Badge>
              </div>

              <CVUploadZone />

              <Card className="mt-6 p-5">
                <h3 className="font-medium mb-3">Match Against Jobs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select which job descriptions to match uploaded CVs against
                </p>
                <div className="flex flex-wrap gap-2">
                  {mockJobs
                    .filter((job) => job.status === "OPEN")
                    .map((job) => (
                      <Badge
                        key={job.id}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1.5 px-3"
                      >
                        {job.title}
                      </Badge>
                    ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="max-w-xl">
              <MatchingConfigPanel />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
