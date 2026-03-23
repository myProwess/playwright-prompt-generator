import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Requirement: Static export
  basePath: process.env.NODE_ENV === "production" ? "/playwright-prompt-generator" : "",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
