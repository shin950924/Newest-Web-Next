// next.config.js 또는 next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 호스트네임 허용 (와일드카드)
      },
    ],
  },
};

export default nextConfig;