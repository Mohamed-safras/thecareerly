import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface PutToS3Options {
  bucket: string;
  keyPrefix: string; // e.g., teams/${teamId}/logos
  contentType: string; // e.g., image/png
  body: Buffer | Uint8Array | Blob | string;
}

export interface PutToS3Result {
  key: string;
  success: boolean;
  error?: string;
}

export async function putToS3(opts: PutToS3Options): Promise<PutToS3Result> {
  let key = `${opts.keyPrefix}/${randomUUID()}`;

  try {
    const headCmd = new HeadObjectCommand({
      Bucket: opts.bucket,
      Key: key,
    });

    try {
      await s3.send(headCmd as HeadObjectCommand);
      // if no error, object exists → regenerate key
      key = `${opts.keyPrefix}/${randomUUID()}`;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "name" in error &&
        (error as { name: string }).name !== "NotFound"
      ) {
        throw new Error(
          `S3 HeadObject check failed: ${
            (error as { message?: string }).message ?? "Unknown error"
          }`
        );
      }
    }

    const putCmd = new PutObjectCommand({
      Bucket: opts.bucket,
      Key: key,
      Body: opts.body,
      ContentType: opts.contentType,
      ACL: "private",
    });

    await s3.send(putCmd as PutObjectCommand);

    return { key, success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown S3 upload error";
    console.error("❌ S3 upload failed:", message);
    return { key, success: false, error: message };
  } finally {
    console.log(`S3 putToS3 attempt finished for key: ${key}`);
  }
}
