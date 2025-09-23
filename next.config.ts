import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `www.${process.env.NEXT_PUBLIC_ORG_DOMAIN!}`,
      },
    ],
  },
};

export default nextConfig;
