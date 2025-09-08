import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function PillButton({
  icon: Icon,
  label,
  className,
  children,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className={cn(
            "h-8 rounded px-3 text-sm shadow-none",
            "bg-muted/60 hover:bg-muted",
            className
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
          <ChevronDown className="ml-2 h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="w-56">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
