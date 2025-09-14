import { CreateJobSchema } from "@/server/db/schema/validation/job";
import { FilePayload } from "./file-payload";

export type ParsedJob = {
  parsed: ReturnType<(typeof CreateJobSchema)["parse"]>;
  files: { logoFile?: FilePayload; posterFile?: FilePayload };
};
