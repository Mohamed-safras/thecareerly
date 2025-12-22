import {
  Calendar,
  MessageSquare,
  ClipboardList,
  FolderOpen,
  GitBranch,
  BarChart3,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Candidate } from "../../features/candidates/data/mock-data";
import { EvaluationScorecard } from "../../features/candidates/components/evaluation-scorecard";
import { InterviewScheduler } from "../../features/candidates/components/interview-scheduler";
import { CommunicationHistory } from "../../features/candidates/components/communication-history";
import { DocumentsManager } from "../../features/candidates/components/documents-manager";
import { PipelineStageManager } from "../../features/candidates/components/pipeline-stage-manager";
import CandidateDetailHeader from "../../features/candidates/components/candidate-detail-header";
import CandidateBasicInfo from "@/features/candidates/components/candidate-basic-info";

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
                  <CandidateBasicInfo candidate={candidate} />
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
