import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  iconClassName?: string;
}

export function ModeCard({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  iconClassName = "bg-primary/10 text-primary",
}: ModeCardProps) {
  const [bgClass, textClass] = iconClassName.split(" ");

  return (
    <Card
      className={cn(
        "p-3 cursor-pointer transition-all hover:shadow-md",
        selected && "ring-2 ring-primary",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center gap-3 py-3">
        <div className={cn("p-3 rounded-full", bgClass)}>
          <Icon className={cn("h-6 w-6", textClass)} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}
