import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external video embeds
  allowedDevOrigins: ['*'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
    ],
  },
  // Server actions configuration
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
