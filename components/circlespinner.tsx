const CircleSpinner = ({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <span
      className={`inline-block rounded-full border-4 border-muted-foreground/25 border-t-primary animate-spin ${className}`}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    />
  );
};

export default CircleSpinner;
