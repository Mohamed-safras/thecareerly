import { axiosClient } from "@/lib/axios/axios-client";
import {
  PublishPayload,
  SocialAdapter,
  SocialResult,
} from "@/types/social-media";

function getFacebookEnv() {
  const pageId = process.env.FB_PAGE_ID || "";
  const token = process.env.FB_PAGE_ACCESS_TOKEN || "";
  return { pageId, token };
}

export const facebookAdapter: SocialAdapter = {
  key: "facebook",
  async publish(data: PublishPayload): Promise<SocialResult> {
    const { pageId, token } = getFacebookEnv();
    if (!pageId) {
      return {
        platform: "facebook",
        ok: false,
        message: "FB_PAGE_ID is not set",
      };
    }
    if (!token) {
      return {
        platform: "facebook",
        ok: false,
        message: "FB_PAGE_ACCESS_TOKEN is not set",
      };
    }

    try {
      const url = `https://graph.facebook.com/${encodeURIComponent(
        pageId
      )}/feed`;
      const res = await axiosClient.post(
        url,
        { message: `${data.title}\n\n${data.text}\n\n${data.url}` },
        {
          params: { access_token: token },
          timeout: 15000,
        }
      );

      return {
        platform: "facebook",
        ok: true,
        status: res.status,
        statusText: res.statusText,
        message: "Posted to Facebook Page",
        externalId: (res.data as { id?: string })?.id,
      };
    } catch (error) {
      console.log(error);
      return {
        platform: "facebook",
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};
