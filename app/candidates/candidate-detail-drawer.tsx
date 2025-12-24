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

// Tab item component for reusability
const TabItem = ({
  value,
  icon: Icon,
  label,
}: {
  value: string;
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex-col sm:flex-row text-xs gap-1 px-2 sm:px-3 py-2"
    >
      <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden text-[10px] leading-tight">{label}</span>
    </TabsTrigger>
  );
};

export const CandidateDetailDrawer = ({
  candidate,
  isOpen,
  onClose,
}: CandidateDetailDrawerProps) => {
  if (!candidate) return null;

  const tabs = [
    { value: "overview", icon: BarChart3, label: "Overview" },
    { value: "pipeline", icon: GitBranch, label: "Pipeline" },
    { value: "evaluations", icon: ClipboardList, label: "Evaluations" },
    { value: "interviews", icon: Calendar, label: "Interviews" },
    { value: "messages", icon: MessageSquare, label: "Messages" },
    { value: "documents", icon: FolderOpen, label: "Docs" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
        {/* Fixed Header */}
        <CandidateDetailHeader candidate={candidate} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="flex-1 h-full">
            <div className="p-3">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 mb-3 h-auto gap-1">
                  {tabs.map((tab) => (
                    <TabItem
                      key={tab.value}
                      value={tab.value}
                      icon={tab.icon}
                      label={tab.label}
                    />
                  ))}
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
                  <InterviewScheduler candidateName={candidate.name} />
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
