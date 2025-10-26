export default function KV({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="h-4 w-4" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
