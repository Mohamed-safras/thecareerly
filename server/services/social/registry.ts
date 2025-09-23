import { SocialAdapter, SocialPlatformKey } from "@/types/social-media";
import { websiteAdapter } from "@/server/services/social/adapters/website";
import { linkedInAdapter } from "@/server/services/social/adapters/linkedin";
import { xAdapter } from "@/server/services/social/adapters/x";
import { facebookAdapter } from "@/server/services/social/adapters/facebook";

const registry: Record<SocialPlatformKey, SocialAdapter> = {
  website: websiteAdapter,
  linkedin: linkedInAdapter,
  facebook: facebookAdapter,
  x: xAdapter,
};

export function getAdapter(key: SocialPlatformKey): SocialAdapter {
  return registry[key];
}
