import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

export interface ControlButtonProps {
  active?: boolean;
  danger?: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  badge?: number;
  hasDropdown?: boolean;
  selected?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  active,
  danger,
  onClick,
  icon: Icon,
  label,
  badge,
  hasDropdown,
  selected,
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="relative flex flex-col items-center">
        <Button
          size="icon"
          className={cn(
            "h-12 w-12 text-foreground rounded-md transition-all relative",
            danger && "bg-[#c4314b] hover:bg-[#a52a3f]",
            active && !danger && "bg-[#6264a7] hover:bg-[#5254a3]",
            !active && !danger && "bg-[#3d3d3d] hover:bg-[#4a4a4a]",
            selected &&
              "ring-2 ring-[#6264a7] ring-offset-2 ring-offset-[#1f1f1f]",
          )}
          onClick={onClick}
        >
          <Icon className="h-6 w-6 text-foreground" />
          {badge && badge > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#c4314b] text-xs flex items-center justify-center">
              {badge > 9 ? "9+" : badge}
            </span>
          )}
        </Button>
        {hasDropdown && (
          <ChevronUp className="h-3 w-3 text-foreground absolute -bottom-1" />
        )}
        {/* <span className="text-[10px] text-white/80 mt-1.5">{label}</span> */}
      </div>
    </TooltipTrigger>
    <TooltipContent side="top" className="border-[#3d3d3d] ">
      {label}
    </TooltipContent>
  </Tooltip>
);

export default ControlButton;
