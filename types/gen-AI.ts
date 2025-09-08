export type ImageSizes =
  | "auto"
  | "512x512"
  | "1024x1024"
  | "1024x1536"
  | "1536x1024";

export type AIPromptInput = {
  title: string; // e.g. "Senior Software Engineer"
  description?: string; // raw notes / source text from user
  location?: string; // optional context
  salary?: string; // optional context
  benefits?: string[]; // used for "What We Offer" (only if provided)
  applyUrl?: string; // used for "How to Apply" (only if provided)
  sourceUrl?: string; // optional: shown under "Source" if provided
  extras?: string[]; // extra requests (model should honor if relevant)
};
