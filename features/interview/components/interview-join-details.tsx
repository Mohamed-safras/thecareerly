import { Building2, Clock } from "lucide-react";

interface InterviewDetailsProps {
  title: string;
  company: string;
  duration: string;
}

const InterviewDetails = ({
  title,
  company,
  duration,
}: InterviewDetailsProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-card-foreground mb-3">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Building2 className="w-4 h-4" />
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
