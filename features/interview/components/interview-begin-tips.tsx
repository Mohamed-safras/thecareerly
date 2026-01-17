import { Info } from "lucide-react";

interface Tip {
  text: string;
}

interface InterviewBeginTipsProps {
  tips?: Tip[];
  title?: string;
}

const defaultTips: Tip[] = [
  { text: "Ensure you have a stable internet connection" },
  { text: "Test your camera and microphone" },
  { text: "Find a quiet place for the interview" },
];

const InterviewBeginTips = ({
  tips = defaultTips,
  title = "Before you begin",
}: InterviewBeginTipsProps) => {
  return (
    <div className="rounded-lg p-3 text-left bg-muted/70">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <ul className="space-y-2 text-sm">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-muted-foreground" />
            {tip.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewBeginTips;
