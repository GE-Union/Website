// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { isInSitemap } from "./src/data/seo-matrix";
import { siteConfig, toCanonicalUrl } from "./src/data/site";

// Canonical production origin. Canonicals, Open Graph URLs, robots.txt,
// and the sitemap are all derived from this single value (src/data/site.ts).
export default defineConfig({
  site: siteConfig.origin,
  output: "static",
  integrations: [
    sitemap({
      // Only indexable routes from the SEO matrix; noindex pages
      // (/introduction, seasonal /minecraft) and 404 never appear.
      filter: (page) => isInSitemap(page),
      // Sitemap entries must match the canonical form: no trailing slash.
      serialize: (item) => ({ ...item, url: toCanonicalUrl(item.url) }),
    }),
  ],
});
