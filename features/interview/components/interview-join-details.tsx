import { Clock } from "lucide-react";

interface InterviewDetailsProps {
  title: string;
  userName: string;
  date: string;
  duration: string;
}

const InterviewDetails = ({
  title,
  userName,
  date,
  duration,
}: InterviewDetailsProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-card-foreground mb-3">
        {title} - {userName}
      </h2>

      <div className="flex items-center flex-row justify-center gap-3 text-sm text-muted-foreground">
        <span className="font-medium text-card-foreground">{date}</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
