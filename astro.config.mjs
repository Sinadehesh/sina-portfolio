// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Canonical origin used for canonical URLs, sitemap.xml, robots.txt and llms.txt.
  // Keep in sync with `site.url` in src/lib/data.ts.
  site: "https://sinadehesh.com",
  // Directory output (/work/recallmate/index.html); internal links use trailing slashes to match.
  trailingSlash: "always",

  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [react()]
});
