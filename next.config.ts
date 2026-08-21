import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three/webgpu + three/tsl ship untranspiled modern ESM.
  transpilePackages: ["three"],
};

export default nextConfig;
