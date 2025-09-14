import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.acentura.com"], // allow remote images
  },
};

export default nextConfig;
