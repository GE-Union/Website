/**
 * Per-route SEO matrix — the only place indexing decisions are made
 * (CLAUDE.md). Pages read their head metadata via `getPageSeo`, the
 * sitemap filter in astro.config.mjs reads `isInSitemap`, and
 * docs/seo-matrix.md documents every row for the content owners.
 *
 * Titles and descriptions preserve the legacy values recorded in
 * docs/migration-audit.md. `/` and `/about-geu` had no description on
 * the legacy site, so those two are newly authored from existing page
 * copy (flagged in docs/content-review.md).
 */

import type { SeoProps } from "../components/seo/SeoHead.astro";
import { siteConfig } from "./site";

/** Every content route the site builds. */
export type Route =
  | "/"
  | "/about-geu"
  | "/about-ge"
  | "/about-dtu"
  | "/course-bank"
  | "/calendar"
  | "/introduction"
  | "/minecraft";

export interface RouteSeo {
  readonly title: string;
  /** Required whenever `robots.index` is true (enforced by unit test). */
  readonly description?: string;
  readonly robots: { readonly index: boolean; readonly follow: boolean };
  /** Absolute URL override; defaults to siteConfig.defaultSocialImage. */
  readonly socialImage?: string;
}

export const seoMatrix: Record<Route, RouteSeo> = {
  "/": {
    title: "GE Union",
    // Newly authored (legacy home had no description); wording reuses the
    // site's own copy ("student-led community hub by GE students for GE
    // students", "YOUR GE journey").
    description:
      "GE Union is a student-led community hub by GE students, for GE students at DTU. Find events, course notes, and tools for your GE journey.",
    robots: { index: true, follow: true },
  },
  "/about-geu": {
    title: "About GE Union",
    // Newly authored (legacy page had no description); derived from the
    // page's hero and "who we are" section.
    description:
      "Who are we and why are we here? GE Union is a student-led community hub by GE students, for GE students at DTU.",
    robots: { index: true, follow: true },
  },
  "/about-ge": {
    title: "About General Engineering",
    description:
      "Find anything you want to know about General Engineering: Structure, Specialisations, Life, etc.",
    robots: { index: true, follow: true },
  },
  "/about-dtu": {
    title: "About DTU",
    description:
      "Learn more about DTU, its student organisations PF and S-Huset, and the Danish Society of Engineers, IDA.",
    robots: { index: true, follow: true },
  },
  "/course-bank": {
    title: "Course Bank",
    // The double space before "courses" is verbatim from the legacy site
    // (content rule: preserve wording, flag in docs/content-review.md).
    description:
      "Get notes, past papers, and details for all General Engineering  courses. Hand picked by students!",
    robots: { index: true, follow: true },
  },
  "/calendar": {
    title: "Calendar",
    description:
      "See all upcoming events, periods, and deadlines all in one place.",
    robots: { index: true, follow: true },
  },
  "/introduction": {
    // Body is only "Coming soon"; stays noindex until real content ships
    // (CLAUDE.md SEO rule). Legacy had no description; none invented.
    title: "Dashboard",
    robots: { index: false, follow: true },
  },
  "/minecraft": {
    title: "Minecraft Month",
    description:
      "Join us for Minecraft Month for all of November. We welcome all of GE!",
    // Seasonal: indexable only while the owner marks the event active.
    robots: { index: siteConfig.minecraftEventActive, follow: true },
  },
};

export const routes = Object.keys(seoMatrix) as readonly Route[];

/** Routes that are indexable, and therefore the sitemap allowlist. */
export const indexableRoutes: readonly Route[] = routes.filter(
  (route) => seoMatrix[route].robots.index,
);

/**
 * Sitemap filter: only indexable routes are listed. Accepts the full page
 * URL @astrojs/sitemap passes to `filter` (directory-format URLs carry a
 * trailing slash; normalize before comparing).
 */
export function isInSitemap(pageUrl: string): boolean {
  let path = new URL(pageUrl).pathname;
  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return indexableRoutes.includes(path as Route);
}

/** Head metadata for a page, ready to pass to BaseLayout's `seo` prop. */
export function getPageSeo(route: Route): SeoProps {
  const entry = seoMatrix[route];
  return {
    title: entry.title,
    description: entry.description,
    canonicalPath: route,
    robots: entry.robots,
    socialImage: entry.socialImage ?? siteConfig.defaultSocialImage,
  };
}
