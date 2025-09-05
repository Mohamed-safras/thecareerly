"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, Toaster } from "sonner";
import { Sparkles } from "lucide-react";
import ComposePanel from "@/features/jobs/components/compose-job";
import SchedulePanel from "@/features/jobs/components/schedule-job";
import PreviewPanel from "@/features/jobs/components/preview-job";
import HiringShell from "@/features/jobs/components/hiring-shell";

export default function JobPost() {
  return (
    <HiringShell
      breadCrumpPage="Create"
      breadCrumbsItems={[
        { label: "Hiring", link: "/hiring" },
        { label: "Jobs", link: "/hiring/jobs" },
      ]}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto grid max-w-8xl grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-9 p-4"
      >
        {/* Left column: Controls */}
        <div className="sm:col-span-1 lg:col-span-5 space-y-6">
          <Card className="shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-5 w-5" /> Job Posting
              </CardTitle>
              <CardDescription>
                Create and optimize your Job Description, then schedule and
                publish.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="compose" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="compose">Compose</TabsTrigger>
                  {/* <TabsTrigger value="ai">AI Assist</TabsTrigger> */}
                  <TabsTrigger value="schedule">
                    Schedule &amp; Publish
                  </TabsTrigger>
                </TabsList>

                <ComposePanel />

                {/* <AIAssistPanel /> */}

                <SchedulePanel />
              </Tabs>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => toast("Draft saved (demo)")}
              >
                Save Draft
              </Button>
              <Button
                onClick={() =>
                  toast.success("JD submitted for approval (demo)")
                }
              >
                Submit for Approval
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right column: Live Preview (sticky) */}
        <div className="sm:col-span-1 lg:col-span-4">
          <div className="md:sticky md:top-15 space-y-6">
            <Card className="shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
                <CardDescription>How your post may appear.</CardDescription>
              </CardHeader>
              <CardContent>
                <PreviewPanel compact />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </HiringShell>
  );
}
