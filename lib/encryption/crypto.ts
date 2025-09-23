import crypto from "crypto";
import { BadRequestError } from "../error/http-error";

const key = Buffer.from(process.env.CRYPT_KEY_B64 || "", "base64");

if (key.length !== 32)
  throw new BadRequestError("CRYPT_KEY_B64 must be 32 bytes (base64)");

export function seal(plainText: string): string {
  const random = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, random);
  const encoding = Buffer.concat([
    cipher.update(plainText, "utf-8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();
  return Buffer.concat([random, tag, encoding]).toString("base64");
}

export function open(base64: string): string {
  const buffer = Buffer.from(base64, "base64");
  const random = buffer.subarray(0, 12);
  const tag = buffer.subarray(12, 28);
  const data = buffer.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, random);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  return dec.toString("utf-8");
}
