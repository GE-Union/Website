import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  getPageSeo,
  indexableRoutes,
  isInSitemap,
  routes,
  seoMatrix,
} from "../../src/data/seo-matrix";
import {
  organizationSameAs,
  siteConfig,
  toCanonicalUrl,
} from "../../src/data/site";
import { allRemoteImages } from "../../src/data/external-assets";

// The SEO matrix is the only place indexing is decided (CLAUDE.md).
// These tests keep it internally consistent; tests/seo/ then checks the
// built HTML against it.
describe("seo matrix", () => {
  it("covers all 8 legacy routes exactly", () => {
    expect([...routes].sort()).toEqual(
      [
        "/",
        "/about-geu",
        "/about-ge",
        "/about-dtu",
        "/course-bank",
        "/calendar",
        "/introduction",
        "/minecraft",
      ].sort(),
    );
  });

  it("uses clean route keys: leading slash, no trailing slash", () => {
    for (const route of routes) {
      expect(route.startsWith("/"), route).toBe(true);
      if (route !== "/") {
        expect(route.endsWith("/"), route).toBe(false);
      }
    }
  });

  it("gives every route a non-empty title and no placeholder origins", () => {
    for (const route of routes) {
      const entry = seoMatrix[route];
      expect(entry.title.trim(), route).not.toBe("");
      for (const value of [entry.title, entry.description ?? ""]) {
        expect(value, route).not.toContain("https://url");
      }
    }
  });

  it("gives every indexable route a description", () => {
    for (const route of indexableRoutes) {
      expect(seoMatrix[route].description?.trim(), route).toBeTruthy();
    }
  });

  it("keeps /introduction noindex while it is a placeholder", () => {
    expect(seoMatrix["/introduction"].robots.index).toBe(false);
  });

  it("ties /minecraft indexing to the seasonal flag", () => {
    expect(seoMatrix["/minecraft"].robots.index).toBe(
      siteConfig.minecraftEventActive,
    );
  });

  it("resolves every page to an absolute remote social image", () => {
    for (const route of routes) {
      const seo = getPageSeo(route);
      expect(seo.socialImage, route).toMatch(/^https:\/\//);
      expect(allRemoteImages, route).toContain(seo.socialImage);
    }
  });

  it("filters the sitemap to exactly the indexable routes", () => {
    for (const route of routes) {
      const directoryUrl = new URL(
        route === "/" ? "/" : `${route}/`,
        siteConfig.origin,
      ).href;
      expect(isInSitemap(directoryUrl), route).toBe(
        seoMatrix[route].robots.index,
      );
    }
    expect(isInSitemap(`${siteConfig.origin}/404/`)).toBe(false);
  });
});

describe("site config", () => {
  it("builds canonical URLs on the apex origin without trailing slashes", () => {
    expect(toCanonicalUrl("/")).toBe("https://geunion.dk/");
    expect(toCanonicalUrl("/calendar")).toBe("https://geunion.dk/calendar");
    expect(toCanonicalUrl("/calendar/")).toBe("https://geunion.dk/calendar");
    expect(toCanonicalUrl("https://geunion.dk/about-geu/")).toBe(
      "https://geunion.dk/about-geu",
    );
  });

  it("matches the origin configured in astro.config.mjs", () => {
    const config = readFileSync("astro.config.mjs", "utf8");
    expect(config).toContain("siteConfig.origin");
    expect(siteConfig.origin).toBe("https://geunion.dk");
  });

  it("preserves the legacy GA4 measurement ID", () => {
    expect(siteConfig.analytics.measurementId).toBe("G-T1BFLB9XDL");
  });

  it("lists only GE Union's own profiles in sameAs (no r/DTU)", () => {
    expect(organizationSameAs.length).toBeGreaterThan(0);
    for (const url of organizationSameAs) {
      expect(url).toMatch(/^https:\/\//);
      expect(url).not.toContain("reddit.com");
    }
  });
});
