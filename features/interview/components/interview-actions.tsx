import { Button } from "@/components/ui/button";
import { Video, Settings } from "lucide-react";

interface InterviewActionsProps {
  onJoin: () => void;
  onTestDevices: () => void;
  devicesChecked?: boolean;
  joinLabel?: string;
  testLabel?: string;
}

const InterviewActions = ({
  onJoin,
  onTestDevices,
  devicesChecked = false,
  joinLabel = "Join Interview",
  testLabel = "Test Audio & Video",
}: InterviewActionsProps) => {
  return (
    <div className="space-y-3 flex justify-center gap-3">
      <Button
        onClick={onJoin}
        className="flex-1 h-12 text-base font-medium gap-2"
        style={{ backgroundColor: "hsl(217 91% 60%)" }}
      >
        <Video className="w-5 h-5" />
        {joinLabel}
      </Button>

      <Button
        variant="outline"
        onClick={onTestDevices}
        className="flex-1 h-12 text-base font-medium gap-2"
      >
        <Settings className="w-5 h-5" />
        {testLabel}
        {devicesChecked && (
          <span
            className="ml-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: "hsl(152 69% 45%)" }}
          />
        )}
      </Button>
    </div>
  );
};

export default InterviewActions;
