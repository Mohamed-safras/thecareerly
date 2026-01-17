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
    <div className="space-y-3 flex justify-end gap-3">
      <Button
        variant="outline"
        size={"lg"}
        onClick={onTestDevices}
        className="text-base font-medium gap-2"
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
      <Button
        onClick={onJoin}
        size={"lg"}
        className="text-base font-medium gap-2"
      >
        <Video className="w-5 h-5" />
        {joinLabel}
      </Button>
    </div>
  );
};

export default InterviewActions;
