export type JobDescriptionInput = {
  title: string;
  description?: string; // 1–3 lines max (optional)
  aiPrompt: string;
};

export type PosterInput = {
  jobTitle: string;
  brandColorHex?: string; // e.g. "#00A8E8"
  companyName?: string;
  mustUseLogo?: boolean; // if your UI will overlay logo itself, set false
  vibe?: "professional" | "modern" | "minimal" | "vibrant";
  notes?: string; // e.g., "white title text, subtle shapes"
};

export type ImageSizes =
  | "auto"
  | "512x512"
  | "1024x1024"
  | "1024x1536"
  | "1536x1024"
  | "1792x1024"
  | "1024x1792"
  | null;
