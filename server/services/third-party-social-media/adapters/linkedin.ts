import {
  PublishPayload,
  SocialAdapter,
  SocialResult,
} from "@/types/social-media";
import { axiosClient } from "@/lib/axios/axios-client";

function getLinkedInEnv() {
  const token = process.env.LINKEDIN_ACCESS_TOKEN || "";
  const orgId = process.env.LINKEDIN_ORG_ID || "";
  return { token, orgId };
}

// If you later add media, you’ll first call LinkedIn’s media upload API,
// get a media URN, and include it in the UGC post body.

export const linkedInAdapter: SocialAdapter = {
  key: "linkedin",
  async publish(data: PublishPayload): Promise<SocialResult> {
    const { token, orgId } = getLinkedInEnv();

    if (!token) {
      return {
        platform: "linkedin",
        ok: false,
        message: "LINKEDIN_ACCESS_TOKEN is not set",
      };
    }

    if (!orgId) {
      return {
        platform: "linkedin",
        ok: false,
        message: "LINKEDIN_ORG_ID is not set",
      };
    }

    try {
      const body = {
        author: `urn:li:organization:${orgId}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: `${data.title}\n\n${data.text}\n${data.url}`,
            },
            shareMediaCategory: "NONE", // change to "IMAGE" when you implement media
            media: [] as unknown[],
          },
        },
        visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
      };

      const res = await axiosClient.post(
        "https://api.linkedin.com/v2/ugcPosts",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Restli-Protocol-Version": "2.0.0",
          },
          timeout: 15000,
        }
      );

      return {
        platform: "linkedin",
        ok: true,
        status: res.status,
        statusText: res.statusText,
        message: "Posted to LinkedIn",
        externalId: (res.data as { id?: string })?.id,
      };
    } catch (error) {
      console.log(error);
      return {
        platform: "linkedin",
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};
