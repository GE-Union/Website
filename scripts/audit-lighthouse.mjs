#!/usr/bin/env node
/**
 * audit-lighthouse.mjs — run Lighthouse against every page of the built site.
 *
 * Serves dist/ with `astro preview`, audits each route found in dist/, and
 * writes HTML reports to reports/lighthouse/. Requires Chrome/Chromium and a
 * completed `npm run build`. Not part of CI (scores vary with hardware/network).
 *
 * Usage: node scripts/audit-lighthouse.mjs
 */

import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const OUT_DIR = join(ROOT, "reports", "lighthouse");
const PORT = 4321;
const ORIGIN = `http://localhost:${PORT}`;

if (!existsSync(DIST)) {
  console.error(
    "audit-lighthouse: dist/ not found. Run `npm run build` first.",
  );
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const routes = walk(DIST)
  .filter((f) => f.endsWith("index.html"))
  .map((f) => "/" + relative(DIST, dirname(f)))
  .map((r) => (r === "/." ? "/" : r))
  .sort();

const preview = spawn("npx", ["astro", "preview", "--port", String(PORT)], {
  cwd: ROOT,
  stdio: "ignore",
});

async function waitForServer(url, attempts = 50) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  throw new Error(`preview server did not start at ${url}`);
}

try {
  await waitForServer(ORIGIN);
  const { default: lighthouse } = await import("lighthouse");
  const chromeLauncher = await import("chrome-launcher");
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new"],
  });
  mkdirSync(OUT_DIR, { recursive: true });

  try {
    const summary = [];
    for (const route of routes) {
      const result = await lighthouse(`${ORIGIN}${route}`, {
        port: chrome.port,
        output: "html",
        logLevel: "error",
      });
      const scores = Object.fromEntries(
        Object.entries(result.lhr.categories).map(([id, c]) => [
          id,
          Math.round((c.score ?? 0) * 100),
        ]),
      );
      const slug = route === "/" ? "home" : route.replaceAll("/", "");
      writeFileSync(join(OUT_DIR, `${slug}.html`), result.report);
      summary.push({ route, ...scores });
      console.log(
        `${route.padEnd(16)} perf ${scores.performance}  a11y ${scores.accessibility}  bp ${scores["best-practices"]}  seo ${scores.seo}`,
      );
    }
    writeFileSync(
      join(OUT_DIR, "summary.json"),
      JSON.stringify(summary, null, 2),
    );
    console.log(
      `audit-lighthouse: reports written to ${relative(ROOT, OUT_DIR)}/`,
    );
  } finally {
    chrome.kill();
  }
} finally {
  preview.kill();
}
