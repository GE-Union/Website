#!/usr/bin/env node
/**
 * check-dist-assets.mjs — guard the build output.
 *
 * 1. The immutable legacy export (reference/) must never leak into dist/.
 * 2. Every *local* asset referenced by built HTML (img/script/link/source)
 *    must exist in dist/.
 * 3. Remote raster assets must stay remote: dist/ must not contain committed
 *    copies of the GitHub course files, carousel images, or reel previews
 *    (docs/CLAUDE.md asset rules).
 *
 * Usage: node scripts/check-dist-assets.mjs   (requires `npm run build`)
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

if (!existsSync(DIST)) {
  console.error(
    "check-dist-assets: dist/ not found. Run `npm run build` first.",
  );
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const distFiles = walk(DIST).map((f) => relative(DIST, f));
const errors = [];

// 1. No legacy-export leakage: no path segment may be named reference/legacy-export.
for (const f of distFiles) {
  const segments = f.split("/");
  if (segments.includes("reference") || segments.includes("legacy-export")) {
    errors.push(`legacy export leaked into dist: ${f}`);
  }
}

// 3. No committed copies of remote-only rasters. The remote sets live in
// GitHub repos WebsiteContent/CourseBank; their basenames are distinctive.
const remoteOnlyBasenames = new Set([
  ...["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
  ...[
    "Events.JPG",
    "Leadership.JPG",
    "Marketing.JPG",
    "Partnerships.JPG",
    "Website.JPG",
  ],
  ...[
    "reel1.png",
    "reel2.png",
    "reel3.png",
    "reel4.png",
    "reel5.png",
    "reel6.png",
  ],
  "ge-ects-fordeling.png",
]);
for (const f of distFiles) {
  if (remoteOnlyBasenames.has(basename(f))) {
    errors.push(`remote-only asset has a local copy in dist: ${f}`);
  }
}

// 2. Every local asset referenced by built HTML exists in dist/.
const ATTR_RE =
  /<(?:img|script|source|link|video|audio)\s[^>]*?(?:src|href)\s*=\s*"([^"]*)"/gi;
let checked = 0;
for (const f of distFiles.filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(join(DIST, f), "utf8");
  for (const m of html.matchAll(ATTR_RE)) {
    const url = m[1].trim();
    if (!url.startsWith("/") || url.startsWith("//")) continue; // remote or relative-external
    checked += 1;
    const clean = decodeURIComponent(url.split("#")[0].split("?")[0]);
    if (!existsSync(join(DIST, clean))) {
      errors.push(`/${f} references missing local asset: ${url}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`check-dist-assets: ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

console.log(
  `check-dist-assets: OK — ${distFiles.length} dist file(s), ${checked} local asset reference(s), no legacy leakage, no remote-asset copies.`,
);
