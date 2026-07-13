#!/usr/bin/env node
/**
 * check-external-assets.mjs — verify that every remote URL registered in
 * src/data/external-assets.ts still responds.
 *
 * Network-dependent by nature, so it is NOT part of `npm run check` or CI;
 * run it manually (or on a schedule) to catch upstream deletions/renames.
 *
 * The URL list is extracted textually from external-assets.ts so this script
 * stays dependency-free and the data file stays the single source of truth.
 *
 * Usage: node scripts/check-external-assets.mjs
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = join(ROOT, "src", "data", "external-assets.ts");

// Endpoints that are known-broken on the legacy site and documented in
// docs/migration-audit.md. They are kept in the registry for fidelity but a
// failure here is reported as a warning, not an error.
const KNOWN_BROKEN = new Set([
  "https://raw.githubusercontent.com/GE-Union/WebsiteContent/main/Introduction/QnA.json",
]);

const source = readFileSync(DATA_FILE, "utf8");
const urls = [
  ...new Set([...source.matchAll(/"(https:\/\/[^"]+)"/g)].map((m) => m[1])),
  // URLs ending in "/" are base prefixes that page scripts append paths to,
  // not fetchable resources themselves.
].filter((url) => !url.endsWith("/"));

if (urls.length === 0) {
  console.error(
    "check-external-assets: no URLs found in src/data/external-assets.ts",
  );
  process.exit(1);
}

/** HEAD first, falling back to GET for hosts that reject HEAD. */
async function probe(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, { method, redirect: "follow" });
      if (res.ok) return { ok: true, status: res.status };
      if (method === "GET") return { ok: false, status: res.status };
    } catch (err) {
      if (method === "GET")
        return { ok: false, status: `network error: ${err.message}` };
    }
  }
  return { ok: false, status: "unreachable" };
}

const results = await Promise.all(
  urls.map(async (url) => ({ url, ...(await probe(url)) })),
);

const failures = results.filter((r) => !r.ok && !KNOWN_BROKEN.has(r.url));
const warnings = results.filter((r) => !r.ok && KNOWN_BROKEN.has(r.url));

for (const w of warnings) {
  console.warn(
    `  warn (known broken, see migration audit): ${w.status} ${w.url}`,
  );
}
if (failures.length > 0) {
  console.error(
    `check-external-assets: ${failures.length} unreachable URL(s):`,
  );
  for (const f of failures) console.error(`  ${f.status} ${f.url}`);
  process.exit(1);
}

console.log(
  `check-external-assets: OK — ${results.length - warnings.length}/${urls.length} remote URL(s) respond (${warnings.length} known-broken warning(s)).`,
);
