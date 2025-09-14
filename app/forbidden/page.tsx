// app/403/page.tsx
export default function ForbiddenPage() {
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">403 – Forbidden</h1>
      <p className="text-muted-foreground mt-2">
        You don’t have access to this page.
      </p>
    </main>
  );
}
