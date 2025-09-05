import { ImageSizes } from "@/types/gen-AI-types";

const JD_MODEL = "gpt-4o-mini";
const JD_MAX_TOKENS = 350; // concise JD
const JD_TEMP = 0.4;

const POSTER_MODEL = "gpt-image-1";

const POSTER_SIZE = "1024x1024" as ImageSizes;

export { POSTER_SIZE, JD_MODEL, JD_MAX_TOKENS, JD_TEMP, POSTER_MODEL };
