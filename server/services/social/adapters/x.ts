import { axiosClient } from "@/lib/http/axios-client";
import {
  PublishPayload,
  SocialAdapter,
  SocialResult,
} from "@/types/social-media";

function getXEnv() {
  const bearer = process.env.X_BEARER_TOKEN || "";
  return { bearer };
}

export const xAdapter: SocialAdapter = {
  key: "x",
  async publish(data: PublishPayload): Promise<SocialResult> {
    const { bearer } = getXEnv();
    if (!bearer) {
      return { platform: "x", ok: false, message: "X_BEARER_TOKEN is not set" };
    }

    try {
      const res = await axiosClient.post(
        "https://api.twitter.com/2/tweets",
        { text: `${data.title}\n\n${data.url}` },
        { headers: { Authorization: `Bearer ${bearer}` }, timeout: 15000 }
      );

      const extId = (res.data as { data?: { id?: string } })?.data?.id;

      return {
        platform: "x",
        ok: true,
        status: res.status,
        statusText: res.statusText,
        message: "Posted to X",
        externalId: extId,
      };
    } catch (error) {
      console.log(error);
      return {
        platform: "x",
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};
