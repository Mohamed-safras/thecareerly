import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FeedbackData, FeedbackForm } from "./feedback-form";
import { toast } from "sonner";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName?: string;
  interviewType: string;
}

export function FeedbackDialog({
  open,
  onOpenChange,
  candidateName,
  interviewType,
}: FeedbackDialogProps) {
  const handleSubmit = (feedback: FeedbackData) => {
    console.log("Submitted feedback:", feedback);
    toast.success(
      `Your feedback for ${candidateName} has been submitted successfully.`
    );
    onOpenChange(false);
  };

  const handleSaveDraft = (feedback: FeedbackData) => {
    console.log("Saved draft:", feedback);
    toast.info("Your feedback draft has been saved.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle>Interview Feedback Form</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-80px)] px-6 pb-6">
          <FeedbackForm
            candidateName={candidateName}
            interviewType={interviewType}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
