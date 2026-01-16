interface InterviewHeaderProps {
  title?: string;
  subtitle?: string;
}

const InterviewHeader = ({
  title = "The Careerly",
  subtitle = "AI-Driven Hiring platform",
}: InterviewHeaderProps) => {
  return (
    <div className="text-center">
      <h1
        className="text-2xl font-bold mb-1"
        style={{ color: "hsl(217 91% 60%)" }}
      >
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default InterviewHeader;
