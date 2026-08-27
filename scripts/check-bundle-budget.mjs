import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const DIST_DIR = fileURLToPath(new URL("../dist/", import.meta.url));
const ASTRO_DIR = fileURLToPath(new URL("../dist/_astro/", import.meta.url));

const budgets = {
  totalDistBytes: 512 * 1024,
  maxPageJavaScriptGzipBytes: 24 * 1024,
  largestJavaScriptGzipBytes: 12 * 1024,
  totalCssGzipBytes: 24 * 1024,
};

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await filesUnder(path)));
    else if (entry.isFile()) files.push(path);
  }

  return files;
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

function assertBudget(label, actual, budget) {
  if (actual > budget) {
    throw new Error(
      `${label} is ${formatBytes(actual)}; budget is ${formatBytes(budget)}.`,
    );
  }
}

const distFiles = await filesUnder(DIST_DIR);
const compiledFiles = await filesUnder(ASTRO_DIR);
const totalDistBytes = (
  await Promise.all(distFiles.map(async (file) => (await stat(file)).size))
).reduce((total, size) => total + size, 0);

const compressed = await Promise.all(
  compiledFiles
    .filter((file) => [".css", ".js"].includes(extname(file)))
    .map(async (file) => ({
      file,
      extension: extname(file),
      gzipBytes: gzipSync(await readFile(file), { level: 9 }).byteLength,
    })),
);

const javascript = compressed.filter((asset) => asset.extension === ".js");
const css = compressed.filter((asset) => asset.extension === ".css");
const compiledJavaScriptGzipBytes = javascript.reduce(
  (total, asset) => total + asset.gzipBytes,
  0,
);
const totalCssGzipBytes = css.reduce(
  (total, asset) => total + asset.gzipBytes,
  0,
);
const largestJavaScript = javascript.toSorted(
  (left, right) => right.gzipBytes - left.gzipBytes,
)[0];

const htmlFiles = distFiles.filter((file) => extname(file) === ".html");
const inlineScripts = [];
const pageJavaScript = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const scripts = [
    ...html.matchAll(
      /<script\b(?=[^>]*\btype=["']module["'])[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => match[1]);
  const gzipBytes = scripts.length
    ? gzipSync(scripts.join("\n"), { level: 9 }).byteLength
    : 0;
  pageJavaScript.push({ file, gzipBytes });
  inlineScripts.push(
    ...scripts.map((source) => ({
      file,
      gzipBytes: gzipSync(source, { level: 9 }).byteLength,
    })),
  );
}

const heaviestPage = pageJavaScript.toSorted(
  (left, right) => right.gzipBytes - left.gzipBytes,
)[0];
const largestInlineScript = inlineScripts.toSorted(
  (left, right) => right.gzipBytes - left.gzipBytes,
)[0];
const maxPageJavaScriptGzipBytes =
  compiledJavaScriptGzipBytes + (heaviestPage?.gzipBytes ?? 0);
const largestJavaScriptGzipBytes = Math.max(
  largestJavaScript?.gzipBytes ?? 0,
  largestInlineScript?.gzipBytes ?? 0,
);

assertBudget("Total dist size", totalDistBytes, budgets.totalDistBytes);
assertBudget(
  "Maximum JavaScript loaded by one page (gzip)",
  maxPageJavaScriptGzipBytes,
  budgets.maxPageJavaScriptGzipBytes,
);
assertBudget(
  "Largest client JavaScript block (gzip)",
  largestJavaScriptGzipBytes,
  budgets.largestJavaScriptGzipBytes,
);
assertBudget("Total CSS (gzip)", totalCssGzipBytes, budgets.totalCssGzipBytes);

const heaviestPageLabel = heaviestPage
  ? relative(DIST_DIR, heaviestPage.file)
  : "none";

console.log(
  [
    `bundle budget: OK`,
    `dist ${formatBytes(totalDistBytes)}`,
    `max page JS gzip ${formatBytes(maxPageJavaScriptGzipBytes)} (${heaviestPageLabel})`,
    `largest JS block ${formatBytes(largestJavaScriptGzipBytes)}`,
    `CSS gzip ${formatBytes(totalCssGzipBytes)}`,
  ].join(" — "),
);
