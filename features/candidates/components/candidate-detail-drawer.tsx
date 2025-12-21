import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  Star,
  Calendar,
  MessageSquare,
  ExternalLink,
  ClipboardList,
  FolderOpen,
  GitBranch,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Candidate } from "../data/mock-data";
import { EvaluationScorecard } from "./evaluation-scorecard";
import { InterviewScheduler } from "./interview-scheduler";
import { CommunicationHistory } from "./communication-history";
import { DocumentsManager } from "./documents-manager";
import { PipelineStageManager } from "./pipeline-stage-manager";
import CandidateDetailHeader from "./candidate-detail-header";

interface CandidateDetailDrawerProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateDetailDrawer = ({
  candidate,
  isOpen,
  onClose,
}: CandidateDetailDrawerProps) => {
  if (!candidate) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl  p-0 flex flex-col">
        {/* Fixed Header */}
        <CandidateDetailHeader candidate={candidate} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="flex-1 h-full">
            <div className="p-3">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-6 mb-3">
                  <TabsTrigger value="overview" className="text-xs gap-1">
                    <BarChart3 className="h-3 w-3" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="pipeline" className="text-xs gap-1">
                    <GitBranch className="h-3 w-3" />
                    Pipeline
                  </TabsTrigger>
                  <TabsTrigger value="evaluations" className="text-xs gap-1">
                    <ClipboardList className="h-3 w-3" />
                    Evaluations
                  </TabsTrigger>
                  <TabsTrigger value="interviews" className="text-xs gap-1">
                    <Calendar className="h-3 w-3" />
                    Interviews
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="text-xs gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="text-xs gap-1">
                    <FolderOpen className="h-3 w-3" />
                    Docs
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-3 mt-0">
                  {/* Match Score */}
                  <div className="rounded-lg border bg-card p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">AI Match Score</span>
                      <span className="text-2xl font-bold text-primary">
                        {candidate.matchScore}%
                      </span>
                    </div>
                    <Progress value={candidate.matchScore} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Based on skills, experience, and role requirements
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="rounded-lg border bg-card p-3 space-y-3">
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{candidate.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm col-span-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{candidate.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="rounded-lg border bg-card p-3 space-y-3">
                    <h4 className="font-medium">Professional Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Experience
                        </p>
                        <p className="text-sm font-medium">
                          {candidate.experience}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Expected Salary
                        </p>
                        <p className="text-sm font-medium">
                          {candidate.salary}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Source</p>
                        <p className="text-sm font-medium">
                          {candidate.source}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Applied</p>
                        <p className="text-sm font-medium">
                          {new Date(candidate.appliedDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="rounded-lg border bg-card p-3 space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Education
                    </h4>
                    <p className="text-sm">{candidate.education}</p>
                  </div>

                  {/* Skills */}
                  <div className="rounded-lg border bg-card p-3 space-y-3">
                    <h4 className="font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="rounded-lg border bg-card p-3 space-y-3">
                    <h4 className="font-medium">Overall Rating</h4>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < candidate.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        ({candidate.rating}/5)
                      </span>
                    </div>
                  </div>

                  {/* Resume */}
                  <Button variant="outline" className="w-full gap-2">
                    <FileText className="h-4 w-4" />
                    View Resume
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </Button>
                </TabsContent>

                {/* Pipeline Tab */}
                <TabsContent value="pipeline" className="mt-0">
                  <PipelineStageManager />
                </TabsContent>

                {/* Evaluations Tab */}
                <TabsContent value="evaluations" className="mt-0">
                  <EvaluationScorecard />
                </TabsContent>

                {/* Interviews Tab */}
                <TabsContent value="interviews" className="mt-0">
                  <InterviewScheduler />
                </TabsContent>

                {/* Messages Tab */}
                <TabsContent value="messages" className="mt-0">
                  <CommunicationHistory />
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="mt-0">
                  <DocumentsManager />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
