"use client";

import React, { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { JobForm } from "@/types/jobform";
import ComposePanel from "./ComposePanel";
import SchedulePanel from "./SchedulePanel";
import PreviewPanel from "./PreviewPanel";
import AIAssistPanel from "./AIAssistPanel";

export default function JobPost() {
  const [form, setForm] = useState<JobForm>({
    title: "",
    description: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    currency: "",
    schedule: "",
    aiPrompt: "",
    includeMultimedia: true,
    platforms: [],
    logoFile: null,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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
                Create and optimize your JD, then schedule and publish.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="compose" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="compose">Compose</TabsTrigger>
                  <TabsTrigger value="ai">AI Assist</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule & Publish</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                {/* Compose */}
                <ComposePanel
                  form={form}
                  logoPreview={logoPreview}
                  setForm={setForm}
                  setLogoPreview={setLogoPreview}
                />

                {/* AI Assist */}
                <AIAssistPanel form={form} setForm={setForm} />
                {/* Schedule */}
                <SchedulePanel form={form} setForm={setForm} />

                {/* Preview */}
                <TabsContent value="preview" className="mt-4">
                  <PreviewPanel form={form} logoPreview={logoPreview} />
                </TabsContent>
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
                <PreviewPanel form={form} logoPreview={logoPreview} compact />
              </CardContent>
            </Card>

            {/* <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Tips</CardTitle>
                <CardDescription>
                  Quick checks before publishing
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div className="rounded-xl border p-3">
                  Keep title under 70 characters.
                </div>
                <div className="rounded-xl border p-3">
                  Use 3–6 bullet points for key requirements.
                </div>
                <div className="rounded-xl border p-3">
                  Add a logo or banner for better engagement.
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
