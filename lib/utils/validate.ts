export const isObjectId = (s: string | undefined | null): s is string =>
  typeof s === "string" && /^[a-fA-F0-9]{24}$/.test(s);
