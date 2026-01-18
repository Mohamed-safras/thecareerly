import CircleSpinner from "@/components/circlespinner";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface InterviewActionsProps {
  onJoin: () => void;
  joining: boolean;
  joinLabel?: string;
}

const InterviewActions = ({
  onJoin,
  joining,
  joinLabel = "Join now",
}: InterviewActionsProps) => {
  return (
    <div className="space-y-3 w-60 flex justify-end gap-3">
      <Button
        onClick={onJoin}
        className="h-12 w-full text-base font-medium gap-3 rounded-full"
      >
        {joining ? (
          <>
            <CircleSpinner className="border-secondary" size={16} />
            {"joining..."}
          </>
        ) : (
          <>
            <Video className="w-5 h-5" />
            {joinLabel}
          </>
        )}
      </Button>
    </div>
  );
};

export default InterviewActions;
