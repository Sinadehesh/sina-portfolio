import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three/webgpu + three/tsl ship untranspiled modern ESM.
  transpilePackages: ["three"],
  // Every route here is prerendered, so the site ships as plain files to
  // Cloudflare's edge — no server, no cold starts.
  output: "export",
  // Static export has no image-optimisation server. The portrait is already
  // resized at 1100x1467 by scripts/generate-portrait-placeholder.mjs and
  // carries an inline LQIP, so there is nothing left to optimise at request
  // time.
  images: { unoptimized: true },
};

export default nextConfig;
