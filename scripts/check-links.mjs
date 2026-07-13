#!/usr/bin/env node
/**
 * check-links.mjs — verify that every internal link in the built site
 * resolves to a file in dist/.
 *
 * Checks <a href> targets only (assets are covered by check-dist-assets.mjs).
 * External http(s), mailto:, and tel: links are skipped here; remote assets
 * are checked by check-external-assets.mjs.
 *
 * Usage: node scripts/check-links.mjs   (requires a completed `npm run build`)
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

if (!existsSync(DIST)) {
  console.error("check-links: dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

/** Recursively collect files under a directory. */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

/** Does an internal URL path resolve to a file in dist/? */
function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0]);
  if (clean === "" || clean === "/")
    return existsSync(join(DIST, "index.html"));
  const candidates = [
    join(DIST, clean),
    join(DIST, clean, "index.html"),
    join(DIST, `${clean}.html`),
    join(DIST, `${clean}/index.html`),
  ];
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
}

const htmlFiles = walk(DIST).filter((f) => f.endsWith(".html"));
const failures = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const page = "/" + relative(DIST, file).replace(/index\.html$/, "");
  for (const m of html.matchAll(/<a\s[^>]*href\s*=\s*"([^"]*)"/gi)) {
    const href = m[1].trim();
    if (
      href === "" ||
      href.startsWith("#") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      continue;
    }
    checked += 1;
    const target = href.startsWith("/")
      ? href
      : join("/", dirname(relative(DIST, file)), href);
    if (!resolves(target)) failures.push({ page, href });
  }
}

if (failures.length > 0) {
  console.error(`check-links: ${failures.length} broken internal link(s):`);
  for (const { page, href } of failures) {
    console.error(`  ${page} -> ${href}`);
  }
  process.exit(1);
}

console.log(
  `check-links: OK — ${checked} internal link(s) across ${htmlFiles.length} page(s) all resolve.`,
);
