/**
 * robots.txt, generated from the same site data as the sitemap so the
 * two can never disagree. Noindex pages are deliberately NOT disallowed
 * here: crawlers must be able to fetch them to see their
 * `<meta name="robots" content="noindex">` — a Disallow would hide it.
 */

import type { APIRoute } from "astro";
import { siteConfig } from "../data/site";

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("/sitemap-index.xml", siteConfig.origin).href;
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemapUrl}`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
