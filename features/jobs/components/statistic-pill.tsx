export default function StatisticPill({
  value,
  label,
  className,
}: {
  value: number | string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex-1 rounded-xl border bg-muted/30 p-4 ${className}`}>
      <div className="text-2xl font-semibold leading-none tracking-tight">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
