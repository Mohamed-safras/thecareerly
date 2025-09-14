import { SocialAdapter, SocialPlatformKey } from "@/types/social-media";
import { websiteAdapter } from "@/server/services/third-party-social-media/adapters/website";
import { linkedInAdapter } from "@/server/services/third-party-social-media/adapters/linkedin";
import { xAdapter } from "@/server/services/third-party-social-media/adapters/x";
import { facebookAdapter } from "@/server/services/third-party-social-media/adapters/facebook";

const registry: Record<SocialPlatformKey, SocialAdapter> = {
  website: websiteAdapter,
  linkedin: linkedInAdapter,
  x: xAdapter,
  facebook: facebookAdapter,
};

export function getAdapter(key: SocialPlatformKey): SocialAdapter {
  return registry[key];
}
