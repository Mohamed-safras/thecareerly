import {
  PublishPayload,
  SocialAdapter,
  SocialResult,
} from "@/types/social-media";

export const websiteAdapter: SocialAdapter = {
  key: "website",
  async publish(data: PublishPayload): Promise<SocialResult> {
    // DB save already “publishes” to your own site.
    return {
      platform: "website",
      ok: true,
      status: 200,
      statusText: "OK",
      message: "Published on site",
      externalId: data.url,
    };
  },
};
