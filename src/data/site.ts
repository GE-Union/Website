/**
 * Typed site configuration — the single source of truth for site-wide
 * SEO values. Canonicals, Open Graph URLs, JSON-LD, the sitemap filter
 * (astro.config.mjs) and robots.txt are all derived from here.
 */

import { carouselImages } from "./external-assets";
import { socialLinks } from "./social-links";

export const siteConfig = {
  /** Site/organization name, used for og:site_name and JSON-LD. */
  name: "GE Union",

  /**
   * Canonical production origin: apex domain, https, no www.
   * Must stay in sync with `site` in astro.config.mjs (a unit test
   * cross-checks the two).
   */
  origin: "https://geunion.dk",

  /** Default `<html lang>`; every legacy page was English. */
  language: "en",

  /**
   * Title template applied by SeoHead ("%s" = the page title).
   * Deliberately the identity template: legacy titles are bare
   * ("Course Bank", not "Course Bank | GE Union") and the fidelity
   * migration preserves them. Change to e.g. "%s | GE Union" later
   * if the owners want branded titles.
   */
  titleTemplate: "%s",

  /**
   * Default social-share image (og:image / twitter:image). Reuses an
   * existing remote raster from the home carousel per the asset policy —
   * no new locally hosted raster is created in this phase. Swap for a
   * purpose-made 1200×630 card in a later phase if the owners want one.
   */
  defaultSocialImage: carouselImages[0],

  /**
   * Google Analytics: the legacy GA4 measurement ID is preserved here,
   * but analytics is OFF by default. Set `enabled: true` only after the
   * team has confirmed its privacy/consent approach (see
   * docs/seo-matrix.md, "Analytics opt-in").
   */
  analytics: {
    measurementId: "G-T1BFLB9XDL",
    enabled: false,
  },

  /**
   * Seasonal switch for /minecraft. While false the page is noindex;
   * the owner flips this to true when the event is active, which makes
   * /minecraft indexable and adds it to the sitemap (see seo-matrix.ts).
   */
  minecraftEventActive: false,
} as const;

/**
 * Public social profiles for JSON-LD `sameAs` — only profiles that are
 * actually GE Union's own. The footer's Reddit link points at r/DTU
 * (DTU's community, not a GE Union profile), so it is excluded.
 */
export const organizationSameAs: readonly string[] = socialLinks
  .filter((link) => link.name !== "Reddit")
  .map((link) => link.href);

/**
 * Canonical URL rules: apex origin, no trailing slash (the root is the
 * bare origin + "/"). The static host serves both /calendar and
 * /calendar/; canonicals, og:url, and sitemap entries all use the
 * slash-less form so crawlers never see duplicate URLs.
 */
export function toCanonicalUrl(path: string): string {
  const url = new URL(path, siteConfig.origin);
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }
  return url.href;
}
