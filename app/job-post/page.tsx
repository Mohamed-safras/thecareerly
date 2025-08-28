"use client";

import React, { useCallback } from "react";
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
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import ComposePanel from "./ComposePanel";
import SchedulePanel from "./SchedulePanel";
import PreviewPanel from "./PreviewPanel";
import AIAssistPanel from "./AIAssistPanel";

import { useAppSelector } from "@/store/hooks";

export default function JobPost() {
  const form = useAppSelector((s) => s.jobForm);
  const logoPreview = useAppSelector((s) => s.ui.logoPreview);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-5"
      >
        {/* Left column: Controls */}
        <div className="md:col-span-3 space-y-6">
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="compose">Compose</TabsTrigger>
                  <TabsTrigger value="ai">AI Assist</TabsTrigger>
                  <TabsTrigger value="schedule">
                    Schedule &amp; Publish
                  </TabsTrigger>
                </TabsList>

                {/* Compose */}
                <ComposePanel />

                {/* AI Assist */}
                <AIAssistPanel />

                {/* Schedule */}
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
        <div className="md:col-span-2">
          <div className="md:sticky md:top-8 space-y-6">
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
    </div>
  );
}
