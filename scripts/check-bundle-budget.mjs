import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { init, parse } from "es-module-lexer";

const DIST_DIR = fileURLToPath(new URL("../dist/", import.meta.url));
const ASTRO_DIR = fileURLToPath(new URL("../dist/_astro/", import.meta.url));
const KIB = 1024;

const budgets = {
  totalDistBytes: 576 * KIB,
  defaultPageJavaScriptGzipBytes: 24 * KIB,
  defaultLargestJavaScriptGzipBytes: 12 * KIB,
  totalCssGzipBytes: 24 * KIB,
  pageOverrides: new Map([
    [
      "course-bank/index.html",
      {
        htmlBytes: 16 * KIB,
      },
    ],
    [
      "calendar/index.html",
      {
        pageJavaScriptGzipBytes: 72 * KIB,
        largestJavaScriptGzipBytes: 68 * KIB,
      },
    ],
  ]),
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
  return `${(bytes / KIB).toFixed(1)} KiB`;
}

function pageLabel(path) {
  const relativePath = relative(DIST_DIR, path);
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replace(/\/index\.html$/, "")}`;
}

function assertBudget(label, actual, budget) {
  if (actual > budget) {
    throw new Error(
      `${label} is ${formatBytes(actual)}; budget is ${formatBytes(budget)}.`,
    );
  }
}

function scriptsInHtml(html) {
  const scripts = [];
  const pattern =
    /<script\b(?=[^>]*\btype=["']module["'])([^>]*)>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(pattern)) {
    const src = match[1].match(/\bsrc=["']([^"']+)["']/i)?.[1];
    scripts.push(src ? { src } : { source: match[2] });
  }
  return scripts;
}

function resolveLocalModule(specifier, importer) {
  const clean = decodeURIComponent(specifier.split("#")[0].split("?")[0]);
  const path = clean.startsWith("/")
    ? resolve(DIST_DIR, clean.slice(1))
    : clean.startsWith(".")
      ? resolve(dirname(importer), clean)
      : null;

  if (!path) {
    throw new Error(
      `Unsupported built module import "${specifier}" in ${importer}.`,
    );
  }

  const fromDist = relative(DIST_DIR, path);
  if (fromDist.startsWith("..") || resolve(DIST_DIR, fromDist) !== path) {
    throw new Error(`Built module import escapes dist/: ${specifier}`);
  }
  if (extname(path) !== ".js") {
    throw new Error(`Built module import is not JavaScript: ${specifier}`);
  }
  return path;
}

function moduleImports(source, label) {
  const [imports] = parse(source, label);
  return imports.flatMap((entry) => {
    if (entry.n) return [entry.n];
    if (entry.d === -2) return [];
    throw new Error(
      `Non-literal dynamic import cannot be budgeted in ${label}.`,
    );
  });
}

const sourceCache = new Map();
const gzipCache = new Map();

async function moduleSource(path) {
  if (!sourceCache.has(path))
    sourceCache.set(path, await readFile(path, "utf8"));
  return sourceCache.get(path);
}

async function moduleGzipBytes(path) {
  if (!gzipCache.has(path)) {
    gzipCache.set(
      path,
      gzipSync(await moduleSource(path), { level: 9 }).byteLength,
    );
  }
  return gzipCache.get(path);
}

async function collectReachableModules(entry, reachable) {
  if (reachable.has(entry)) return;
  reachable.add(entry);

  const source = await moduleSource(entry);
  for (const specifier of moduleImports(source, entry)) {
    await collectReachableModules(
      resolveLocalModule(specifier, entry),
      reachable,
    );
  }
}

await init;

const distFiles = await filesUnder(DIST_DIR);
const compiledFiles = await filesUnder(ASTRO_DIR);
const totalDistBytes = (
  await Promise.all(distFiles.map(async (file) => (await stat(file)).size))
).reduce((total, size) => total + size, 0);

const cssFiles = compiledFiles.filter((file) => extname(file) === ".css");
const totalCssGzipBytes = (
  await Promise.all(
    cssFiles.map(
      async (file) => gzipSync(await readFile(file), { level: 9 }).byteLength,
    ),
  )
).reduce((total, size) => total + size, 0);

const pageResults = [];
for (const htmlFile of distFiles.filter((file) => extname(file) === ".html")) {
  const html = await readFile(htmlFile, "utf8");
  const scripts = scriptsInHtml(html);
  const inlineSources = scripts.flatMap((script) =>
    "source" in script ? [script.source] : [],
  );
  const reachable = new Set();

  for (const script of scripts) {
    if ("src" in script) {
      await collectReachableModules(
        resolveLocalModule(script.src, htmlFile),
        reachable,
      );
    } else {
      for (const specifier of moduleImports(script.source, htmlFile)) {
        await collectReachableModules(
          resolveLocalModule(specifier, htmlFile),
          reachable,
        );
      }
    }
  }

  const inlineGzipBytes = inlineSources.length
    ? gzipSync(inlineSources.join("\n"), { level: 9 }).byteLength
    : 0;
  const inlineBlocks = inlineSources.map(
    (source) => gzipSync(source, { level: 9 }).byteLength,
  );
  const externalBlocks = await Promise.all([...reachable].map(moduleGzipBytes));
  pageResults.push({
    file: htmlFile,
    htmlBytes: Buffer.byteLength(html),
    pageJavaScriptGzipBytes:
      inlineGzipBytes + externalBlocks.reduce((total, size) => total + size, 0),
    largestJavaScriptGzipBytes: Math.max(0, ...inlineBlocks, ...externalBlocks),
  });
}

assertBudget("Total dist size", totalDistBytes, budgets.totalDistBytes);
assertBudget("Total CSS (gzip)", totalCssGzipBytes, budgets.totalCssGzipBytes);

for (const result of pageResults) {
  const relativePath = relative(DIST_DIR, result.file);
  const override = budgets.pageOverrides.get(relativePath);
  if (override?.htmlBytes) {
    assertBudget(
      `${pageLabel(result.file)} HTML`,
      result.htmlBytes,
      override.htmlBytes,
    );
  }
  assertBudget(
    `${pageLabel(result.file)} JavaScript (gzip)`,
    result.pageJavaScriptGzipBytes,
    override?.pageJavaScriptGzipBytes ?? budgets.defaultPageJavaScriptGzipBytes,
  );
  assertBudget(
    `${pageLabel(result.file)} largest JavaScript block (gzip)`,
    result.largestJavaScriptGzipBytes,
    override?.largestJavaScriptGzipBytes ??
      budgets.defaultLargestJavaScriptGzipBytes,
  );
}

const calendar = pageResults.find(
  ({ file }) => relative(DIST_DIR, file) === "calendar/index.html",
);
const heaviestStandardPage = pageResults
  .filter(({ file }) => relative(DIST_DIR, file) !== "calendar/index.html")
  .toSorted(
    (left, right) =>
      right.pageJavaScriptGzipBytes - left.pageJavaScriptGzipBytes,
  )[0];

console.log(
  [
    "bundle budget: OK",
    `dist ${formatBytes(totalDistBytes)}`,
    `standard page max ${formatBytes(heaviestStandardPage?.pageJavaScriptGzipBytes ?? 0)} (${heaviestStandardPage ? pageLabel(heaviestStandardPage.file) : "none"})`,
    `calendar ${formatBytes(calendar?.pageJavaScriptGzipBytes ?? 0)}`,
    `CSS ${formatBytes(totalCssGzipBytes)}`,
  ].join(" — "),
);
