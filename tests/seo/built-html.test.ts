import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import {
  indexableRoutes,
  routes,
  seoMatrix,
  type Route,
} from "../../src/data/seo-matrix";
import { toCanonicalUrl } from "../../src/data/site";

/**
 * Parses the production build in dist/ and fails on the SEO defects the
 * legacy export shipped with (docs/prompts/04-seo-system.md):
 * `https://url` placeholders, missing canonical/title/description on
 * indexable pages, conflicting robots directives, missing absolute
 * og:image, and noindex pages leaking into the sitemap.
 *
 * Run `npm run build` first; `npm run check` sequences this after the
 * build automatically.
 */

const DIST = "dist";

function distHtmlPath(route: Route): string {
  return route === "/"
    ? join(DIST, "index.html")
    : join(DIST, route.slice(1), "index.html");
}

function walkHtmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walkHtmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

/** All attribute values of the given meta tags, attribute order agnostic. */
function metaContents(
  html: string,
  attr: "name" | "property",
  key: string,
): string[] {
  const results: string[] = [];
  for (const tag of html.match(/<meta[^>]*>/g) ?? []) {
    if (new RegExp(`${attr}="${key}"`).test(tag)) {
      const content = /content="([^"]*)"/.exec(tag);
      if (content) results.push(content[1]);
    }
  }
  return results;
}

function canonicalHrefs(html: string): string[] {
  return (html.match(/<link[^>]*rel="canonical"[^>]*>/g) ?? []).map(
    (tag) => /href="([^"]*)"/.exec(tag)?.[1] ?? "",
  );
}

beforeAll(() => {
  if (!existsSync(join(DIST, "index.html"))) {
    throw new Error(
      "dist/ is missing or incomplete — run `npm run build` before `npm run test:seo`.",
    );
  }
});

describe("built head markup", () => {
  it("contains no `https://url` placeholder anywhere in the build", () => {
    for (const file of walkHtmlFiles(DIST)) {
      expect(readFileSync(file, "utf8"), file).not.toContain("https://url");
    }
  });

  for (const route of routes) {
    describe(route, () => {
      const html = () => readFileSync(distHtmlPath(route), "utf8");
      const expected = seoMatrix[route];

      it("has exactly one non-empty <title>", () => {
        const titles = html().match(/<title>([^<]*)<\/title>/g) ?? [];
        expect(titles).toHaveLength(1);
        expect(titles[0]).toContain(expected.title);
      });

      it("has exactly one robots meta with no conflicting directives", () => {
        const robots = metaContents(html(), "name", "robots");
        expect(robots).toHaveLength(1);
        const tokens = robots[0].split(",").map((token) => token.trim());
        expect(tokens).toEqual([
          expected.robots.index ? "index" : "noindex",
          expected.robots.follow ? "follow" : "nofollow",
        ]);
      });

      it("has an absolute og:image and a twitter card", () => {
        const ogImages = metaContents(html(), "property", "og:image");
        expect(ogImages).toHaveLength(1);
        expect(ogImages[0]).toMatch(/^https:\/\//);
        expect(metaContents(html(), "name", "twitter:card")).toHaveLength(1);
        expect(metaContents(html(), "name", "twitter:image")[0]).toMatch(
          /^https:\/\//,
        );
      });

      if (expected.robots.index) {
        it("has a description, canonical, and matching og:url (indexable)", () => {
          const canonical = toCanonicalUrl(route);
          expect(
            metaContents(html(), "name", "description")[0]?.trim(),
          ).toBeTruthy();
          expect(canonicalHrefs(html())).toEqual([canonical]);
          expect(metaContents(html(), "property", "og:url")).toEqual([
            canonical,
          ]);
        });
      }
    });
  }

  it("404.html exists and is noindex with no canonical", () => {
    const path = join(DIST, "404.html");
    expect(existsSync(path)).toBe(true);
    const html = readFileSync(path, "utf8");
    expect(metaContents(html, "name", "robots")).toEqual(["noindex, follow"]);
    expect(canonicalHrefs(html)).toHaveLength(0);
  });
});

describe("sitemap", () => {
  const sitemapUrls = (): string[] => {
    const files = readdirSync(DIST).filter(
      (name) => name.startsWith("sitemap-") && name.endsWith(".xml"),
    );
    expect(files).toContain("sitemap-index.xml");
    return files
      .filter((name) => name !== "sitemap-index.xml")
      .flatMap((name) =>
        [
          ...readFileSync(join(DIST, name), "utf8").matchAll(
            /<loc>([^<]*)<\/loc>/g,
          ),
        ].map((match) => match[1]),
      );
  };

  it("lists every indexable route in canonical (no-trailing-slash) form", () => {
    const urls = sitemapUrls();
    for (const route of indexableRoutes) {
      expect(urls).toContain(toCanonicalUrl(route));
    }
  });

  it("contains no noindex route", () => {
    const urls = sitemapUrls();
    for (const route of routes) {
      if (!seoMatrix[route].robots.index) {
        expect(urls, route).not.toContain(toCanonicalUrl(route));
        expect(urls, route).not.toContain(`${toCanonicalUrl(route)}/`);
      }
    }
  });

  it("robots.txt points at the sitemap and disallows nothing", () => {
    const robots = readFileSync(join(DIST, "robots.txt"), "utf8");
    expect(robots).toContain("Sitemap: https://geunion.dk/sitemap-index.xml");
    expect(robots).not.toContain("Disallow");
  });
});
