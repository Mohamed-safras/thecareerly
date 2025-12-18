"use client";

import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityFeedWrapper from "./activity-feed-wrapper";
import StatusWrapper from "./status-wrapper";
import ActiveJobWrapper from "./active-job-wrapper";
import TopCandidatesWrapper from "./top-candidates-wrapper";
import UpcomingInterviewsWrapper from "./upcoming-interview-wrapper";
import QuickStatusWrapper from "./quick-status-wrapper";
import OpenPositionsWrapper from "./open-position-wrapper";
import SourceAnalyticsWrapper from "./source-analytics-wrapper";
import DiversityMetricsWrapper from "./diversity-metrics-wrapper";
import RecruiterLeaderboardWrapper from "./recruiter-leaderboard-wrapper";
import WeeklyTrendsWrapper from "./weekly-trends-wrapper";
import HiringFunnelWrapper from "./hiring-funnel-wrapper";
import TimeToHireWrapper from "./time-to-hire-wrapper";
import { OfferAnalytics } from "@/features/dashboard/offer-analytics";
import { InterviewMetricsWrapper } from "./interview-matrics-wrapper";
import DepartmentAnalyticWrapper from "./department-analytics-wrapper";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <div className="p-3">
        <section className="mb-3 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Hi, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your recruitment pipeline
              today.
            </p>
          </div>
        </section>

        <StatusWrapper />

        <Tabs defaultValue="overview">
          <TabsList className="mb-3">
            <TabsTrigger value="overview" className="gap-3">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-3">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-3">
            {/* Active Jobs */}
            <ActiveJobWrapper />

            <div className="grid gap-3 lg:grid-cols-7">
              {/* Left Column - Jobs & Candidates */}
              <div className="lg:col-span-4 space-y-3">
                {/* Top Candidates */}
                <TopCandidatesWrapper />

                {/* Activity Feed */}
                <ActivityFeedWrapper />
              </div>

              {/* Right Column - Activity & Interviews */}
              <div className="space-y-3 lg:col-span-3">
                <UpcomingInterviewsWrapper />

                <OpenPositionsWrapper />
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-3">
            <div className="grid gap-3 lg:grid-cols-3">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-3">
                {/* Hiring Funnel & Time to Hire */}
                <div className="grid gap-3 md:grid-cols-2">
                  <HiringFunnelWrapper />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <TimeToHireWrapper />
                  <OfferAnalytics />
                </div>

                <InterviewMetricsWrapper />
                <SourceAnalyticsWrapper />
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <RecruiterLeaderboardWrapper />
                <DepartmentAnalyticWrapper />

                <WeeklyTrendsWrapper />
                <DiversityMetricsWrapper />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
