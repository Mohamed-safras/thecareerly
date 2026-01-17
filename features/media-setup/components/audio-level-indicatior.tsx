import { Volume2 } from "lucide-react";
import React from "react";

export interface AudioLevelIndicatorProps {
  audioLevel: number;
}
const AudioLevelIndicator: React.FC<AudioLevelIndicatorProps> = ({
  audioLevel,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Volume2 className="w-4 h-4" />
        <span>Microphone Level</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-75 rounded-full"
          style={{
            width: `${audioLevel}%`,
            backgroundColor: "hsl(152 69% 45%)",
          }}
        />
      </div>
    </div>
  );
};

export default AudioLevelIndicator;
