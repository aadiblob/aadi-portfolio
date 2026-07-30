import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
