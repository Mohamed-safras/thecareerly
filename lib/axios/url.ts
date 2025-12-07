export function buildUrl(base: string, params?: Record<string, string>) {
  const url = new URL(base);
  if (params)
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  return url.toString();
}
