import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Requirement: Static export
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
