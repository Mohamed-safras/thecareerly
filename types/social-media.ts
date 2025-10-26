import { FilePayload } from "@/types/file-payload";

export type SocialPlatformKey = "website" | "LINKEDIN" | "X" | "FACEBOOK";

export type PublishPayload = {
  title: string;
  text: string;
  url: string; // public job URL on your site
  company: string;
  teamId: string;
  scheduleAt?: string; // ISO datetime string
  media?: FilePayload[]; // 👈 optional media files
};

export type SocialResult = {
  platform: SocialPlatformKey;
  ok: boolean;
  status?: number;
  statusText?: string;
  message?: string;
  externalId?: string;
  retryAfterSec?: number;
};

export type TokenBundle = {
  accountId: string;
  access: string;
  refresh?: string;
};

export interface SocialAdapter {
  readonly key: SocialPlatformKey;
  publish(data: PublishPayload, token: TokenBundle): Promise<SocialResult>;
}
