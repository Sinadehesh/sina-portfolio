import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Every route here is prerendered, so the site ships as plain files to
  // Cloudflare's edge — no server, no cold starts.
  output: "export",
  // Static export has no image-optimisation server; size images before
  // adding them to /public.
  images: { unoptimized: true },
};

export default nextConfig;
