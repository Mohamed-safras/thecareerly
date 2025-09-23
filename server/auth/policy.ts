export function getEmailDomain(email?: string | null): string {
  if (!email) return "";
  const at = email.indexOf("@");
  return at === -1 ? "" : email.slice(at + 1).toLowerCase();
}

export function getOrgAllowlist(): string[] {
  return (process.env.NEXT_PUBLIC_ORG_DOMAIN ?? "")
    .split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);
}

export function isOrgEmail(email?: string | null): boolean {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return getOrgAllowlist().includes(domain);
}
