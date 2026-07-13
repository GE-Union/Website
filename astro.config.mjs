// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Canonical production origin. Canonicals, Open Graph URLs, and the sitemap
// are all derived from this single value.
export default defineConfig({
  site: "https://geunion.dk",
  output: "static",
  integrations: [sitemap()],
});
