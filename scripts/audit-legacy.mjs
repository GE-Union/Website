#!/usr/bin/env node
/**
 * audit-legacy.mjs — reproducible structural inventory of the legacy
 * Webstudio export in reference/legacy-export/.
 *
 * Usage: node scripts/audit-legacy.mjs [--out docs/page-inventory.json]
 *
 * Dependency-free on purpose: the export is machine-generated, well-formed
 * HTML, so a small tag tokenizer is sufficient and keeps this runnable
 * before the project has a package.json.
 */

import { createHash } from "node:crypto";
import {
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT_DIR = join(ROOT, "reference", "legacy-export");
const OUT_ARG = process.argv.indexOf("--out");
const OUT_FILE = join(
  ROOT,
  OUT_ARG > -1 ? process.argv[OUT_ARG + 1] : "docs/page-inventory.json",
);

const ROUTES = [
  { route: "/", file: "index.html" },
  { route: "/about-ge", file: "about-ge/index.html" },
  { route: "/about-geu", file: "about-geu/index.html" },
  { route: "/about-dtu", file: "about-dtu/index.html" },
  { route: "/calendar", file: "calendar/index.html" },
  { route: "/course-bank", file: "course-bank/index.html" },
  { route: "/introduction", file: "introduction/index.html" },
  { route: "/minecraft", file: "minecraft/index.html" },
];

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);
const BLOCK_TAGS = new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "div",
  "section",
  "article",
  "header",
  "footer",
  "nav",
  "main",
  "blockquote",
  "figcaption",
  "button",
  "summary",
  "td",
  "th",
  "caption",
]);

const sha1 = (s) => createHash("sha1").update(s).digest("hex").slice(0, 8);
const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
const squash = (s) => decodeEntities(s).replace(/\s+/g, " ").trim();

function parseAttrs(attrString) {
  const attrs = {};
  for (const m of attrString.matchAll(
    /([a-zA-Z][\w:-]*)(?:\s*=\s*"([^"]*)"|\s*=\s*'([^']*)'|\s*=\s*([^\s"'>]+))?/g,
  )) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  }
  return attrs;
}

/**
 * Stream the HTML into (tag-open, tag-close, text) events with an element
 * stack, and let a visitor collect what it needs.
 */
function walkHtml(html, visit) {
  const tagRe =
    /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<!doctype[^>]*>|<\/?([a-zA-Z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*)\/?>/gi;
  const stack = [];
  let last = 0;
  let m;
  while ((m = tagRe.exec(html))) {
    const text = html.slice(last, m.index);
    if (text.trim()) visit.text?.(text, stack);
    last = tagRe.lastIndex;

    const [raw, name] = m;
    if (!name) continue; // comment / doctype
    const tag = name.toLowerCase();

    if (raw.startsWith("</")) {
      // pop to matching open tag (export HTML is well-formed)
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          const closed = stack.splice(i);
          visit.close?.(closed[0], stack);
          break;
        }
      }
      continue;
    }

    const node = { tag, attrs: parseAttrs(m[2] ?? ""), start: m.index };
    visit.open?.(node, stack);

    const selfClosing = raw.endsWith("/>") || VOID_TAGS.has(tag);
    if (selfClosing) continue;

    // raw-text elements: grab content wholesale and skip ahead
    if (tag === "script" || tag === "style") {
      const end = html.indexOf(`</${tag}`, last);
      const body = end === -1 ? "" : html.slice(last, end);
      visit.rawText?.(node, body, stack);
      tagRe.lastIndex = end === -1 ? html.length : html.indexOf(">", end) + 1;
      last = tagRe.lastIndex;
      continue;
    }
    stack.push(node);
  }
}

/** Ids/classes an inline script expects to find in the DOM. */
function scriptDomTargets(js) {
  const targets = new Set();
  for (const m of js.matchAll(/getElementById\(\s*["']([^"']+)["']\s*\)/g))
    targets.add(`#${m[1]}`);
  for (const m of js.matchAll(
    /querySelector(?:All)?\(\s*["']([#.][\w-]+)["']\s*\)/g,
  ))
    targets.add(m[1]);
  return [...targets];
}

function classifyRemoteUrl(url) {
  if (
    /\.(png|jpe?g|gif|webp|avif)([?#]|$)|\?raw=true$|media\.licdn\.com|i\.ibb\.co|student\.dtu\.dk\/-\/media/.test(
      url,
    )
  )
    return "raster";
  if (/\.svg([?#]|$)/.test(url)) return "vector";
  if (/\.json([?#]|$)/.test(url)) return "json";
  if (/fonts\.googleapis|fontshare|cdnfonts|fonts\.gstatic/.test(url))
    return "font";
  if (/googletagmanager|google-analytics/.test(url)) return "analytics";
  if (/cdn\.jsdelivr\.net/.test(url)) return "third-party library";
  if (/docs\.google\.com\/forms/.test(url)) return "document";
  return "other";
}

function inventoryPage({ route, file }) {
  const html = readFileSync(join(EXPORT_DIR, file), "utf8");
  const page = {
    route,
    sourceFile: `reference/legacy-export/${file}`,
    bytes: Buffer.byteLength(html),
    sha256: sha256(html),
    lang: (html.match(/<html[^>]*\slang="([^"]*)"/) ?? [])[1] ?? null,
    metadata: { title: null, metas: [], links: [], ldJson: [] },
    headings: [],
    textBlocks: [],
    links: [],
    formDestinations: [],
    images: [],
    externalScripts: [],
    inlineScripts: [],
    externalStylesheets: [],
    inlineStyleBlocks: [],
    dataEndpoints: [],
    localAssets: [],
    remoteUrls: [],
  };

  let inHead = false;
  let headingCtx = null; // {level, parts}
  const blockCtx = []; // parallel text-block accumulator per open block element
  let currentLink = null;

  const addRemote = (url, via) => {
    if (/^https?:\/\//.test(url)) page.remoteUrls.push({ url, via });
  };
  const addLocal = (url, via) => {
    if (url.startsWith("/assets/"))
      page.localAssets.push({ url: url.split("?")[0], via });
  };

  walkHtml(html, {
    open(node, _stack) {
      const { tag, attrs } = node;
      if (tag === "head") inHead = true;
      if (tag === "body") inHead = false;

      if (inHead) {
        if (tag === "meta" && (attrs.name || attrs.property)) {
          page.metadata.metas.push({
            name: attrs.name ?? attrs.property,
            content: attrs.content ?? "",
          });
        }
        if (tag === "link" && attrs.rel && attrs.rel !== "stylesheet") {
          page.metadata.links.push({
            rel: attrs.rel,
            href: attrs.href ?? "",
            as: attrs.as,
            imagesrcset: attrs.imagesrcset?.split(" ")[0],
          });
          if (attrs.href) addLocal(attrs.href, `link[rel=${attrs.rel}]`);
          if (attrs.imagesrcset)
            addLocal(attrs.imagesrcset.split(" ")[0], "preload-imagesrcset");
        }
      }
      if (tag === "link" && attrs.rel === "stylesheet") {
        page.externalStylesheets.push(attrs.href);
        addRemote(attrs.href, "stylesheet");
        addLocal(attrs.href, "stylesheet");
      }
      if (/^h[1-6]$/.test(tag))
        headingCtx = { level: Number(tag[1]), parts: [] };
      if (BLOCK_TAGS.has(tag)) {
        node.textParts = [];
        blockCtx.push(node);
      }
      if (tag === "a") {
        currentLink = {
          href: attrs.href ?? null,
          target: attrs.target ?? null,
          rel: attrs.rel ?? null,
          texts: [],
        };
        page.links.push(currentLink);
        node.isLink = true;
        if (attrs.href) {
          addRemote(attrs.href, "link");
          if (/docs\.google\.com\/forms/.test(attrs.href ?? ""))
            page.formDestinations.push(attrs.href);
        }
      }
      if (tag === "form" && attrs.action)
        page.formDestinations.push(attrs.action);
      if (tag === "img") {
        page.images.push({
          src: attrs.src ?? null,
          alt: attrs.alt ?? null,
          loading: attrs.loading ?? null,
          width: attrs.width ?? null,
          height: attrs.height ?? null,
          id: attrs.id || undefined,
        });
        if (attrs.src) {
          addRemote(attrs.src, "img");
          addLocal(attrs.src, "img");
        }
      }
      if (tag === "script" && attrs.src) {
        page.externalScripts.push(attrs.src);
        addRemote(attrs.src, "script");
        addLocal(attrs.src, "script");
      }
    },
    close(node) {
      if (/^h[1-6]$/.test(node.tag) && headingCtx) {
        page.headings.push({
          level: headingCtx.level,
          text: squash(headingCtx.parts.join(" ")),
        });
        headingCtx = null;
      }
      if (node.textParts) {
        const i = blockCtx.indexOf(node);
        if (i > -1) blockCtx.splice(i, 1);
        const text = squash(node.textParts.join(" "));
        // only keep leaf-ish blocks: text directly inside this element
        if (text) page.textBlocks.push({ tag: node.tag, text });
      }
      if (node.isLink && currentLink) {
        currentLink.text = squash(currentLink.texts.join(" "));
        delete currentLink.texts;
        currentLink = null;
      }
    },
    text(text, _stack) {
      if (inHead) return;
      if (headingCtx) headingCtx.parts.push(text);
      if (currentLink) currentLink.texts.push(text);
      // attribute the text to the nearest open block element only
      const owner = blockCtx[blockCtx.length - 1];
      if (owner) owner.textParts.push(text);
    },
    rawText(node, body) {
      const { tag, attrs } = node;
      if (tag === "script" && !attrs.src) {
        const trimmed = body.trim();
        const targets = scriptDomTargets(trimmed);
        page.inlineScripts.push({
          hash: sha1(trimmed),
          bytes: trimmed.length,
          type: attrs.type ?? "text/javascript",
          id: attrs.id || undefined,
          summary: trimmed.replace(/\s+/g, " ").slice(0, 100),
          domTargets: targets,
          usesInnerHTML: /\.innerHTML\s*=|html:\s*['"`]/.test(trimmed),
          localStorageKeys: [
            ...trimmed.matchAll(
              /(?:CACHE_KEY|GE_QA_CACHE_KEY|Intro_QA_CACHE_KEY)\s*=\s*"([^"]+)"/g,
            ),
          ].map((m) => m[1]),
        });
        for (const m of trimmed.matchAll(/https:\/\/[^\s"'`\\)]+/g)) {
          const url = m[0];
          if (
            /raw\.githubusercontent|googleapis\.com\/|group\.calendar\.google\.com/.test(
              url,
            )
          ) {
            page.dataEndpoints.push(url);
          }
          addRemote(url, "inline-script");
        }
        if (/googleCalendarApiKey/.test(trimmed)) {
          page.dataEndpoints.push(
            "https://www.googleapis.com/calendar/v3 (via FullCalendar googleCalendarApiKey)",
          );
        }
      }
      if (
        tag === "style" ||
        (tag === "script" && attrs.type === "application/ld+json")
      ) {
        if (tag === "script") {
          page.metadata.ldJson.push(JSON.parse(body));
          return;
        }
        const trimmed = body.trim();
        page.inlineStyleBlocks.push({
          hash: sha1(trimmed),
          bytes: trimmed.length,
          imports: [...trimmed.matchAll(/@import url\("([^"]+)"\)/g)].map((m) =>
            decodeEntities(m[1]),
          ),
          customProperties: [
            ...new Set(
              [...trimmed.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]),
            ),
          ],
          mediaQueries: [
            ...new Set(
              [...trimmed.matchAll(/@media[^{]+/g)].map((m) => m[0].trim()),
            ),
          ],
        });
        for (const m of trimmed.matchAll(/url\("([^"]+)"\)/g)) {
          addRemote(decodeEntities(m[1]), "inline-style");
          addLocal(m[1], "inline-style");
        }
      }
    },
  });

  page.metadata.title = squash(
    (html.match(/<title>([\s\S]*?)<\/title>/) ?? [undefined, ""])[1],
  );

  // dead script detection: which DOM targets are missing from static HTML?
  // A target absent from the static HTML may still be created by the page's
  // hydration entry bundle (Webstudio renders some embeds client-side), so
  // check there before calling a script dead.
  const entryMatch = html.match(/assets\/entries\/(pages_[\w.-]+\.js)/);
  const entryJs = entryMatch
    ? readFileSync(join(EXPORT_DIR, "assets/entries", entryMatch[1]), "utf8")
    : "";
  for (const s of page.inlineScripts) {
    const missing = s.domTargets.filter((t) => {
      const name = t.slice(1);
      const present = t.startsWith("#")
        ? new RegExp(`id="${name}"`).test(html)
        : new RegExp(`class="[^"]*\\b${name}\\b[^"]*"`).test(html);
      return !present;
    });
    if (!missing.length) continue;
    const hydrated = missing.filter((t) => {
      const name = t.slice(1);
      // element markup inside the entry bundle (embed `code` props are
      // escaped strings, so match both plain and escaped quotes)
      return new RegExp(`(id|class)=\\\\?"[^"]*${name}`).test(entryJs);
    });
    const dead = missing.filter((t) => !hydrated.includes(t));
    if (hydrated.length) s.targetsRenderedByHydration = hydrated;
    if (dead.length) s.missingDomTargets = dead;
  }

  // dedupe remote urls / local assets
  const seenR = new Map();
  for (const r of page.remoteUrls) {
    const k = r.url;
    if (!seenR.has(k))
      seenR.set(k, {
        url: k,
        via: new Set(),
        classification: classifyRemoteUrl(k),
      });
    seenR.get(k).via.add(r.via);
  }
  page.remoteUrls = [...seenR.values()].map((r) => ({ ...r, via: [...r.via] }));
  const seenL = new Map();
  for (const l of page.localAssets) {
    if (!seenL.has(l.url)) seenL.set(l.url, { url: l.url, via: new Set() });
    seenL.get(l.url).via.add(l.via);
  }
  page.localAssets = [...seenL.values()].map((l) => ({
    ...l,
    via: [...l.via],
  }));
  page.dataEndpoints = [...new Set(page.dataEndpoints)];

  return page;
}

function localAssetTable(pages) {
  const files = [];
  (function walk(dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else files.push(p);
    }
  })(join(EXPORT_DIR, "assets"));

  return files.map((p) => {
    const rel = "/" + relative(EXPORT_DIR, p).replaceAll("\\", "/");
    const buf = readFileSync(p);
    const usedBy = pages
      .filter(
        (pg) =>
          pg.localAssets.some((a) => a.url === rel) ||
          pg.externalStylesheets.includes(rel) ||
          pg.externalScripts.includes(rel),
      )
      .map((pg) => pg.route);
    // JS chunks/entries are referenced from other JS, not HTML: mark separately
    const referencedByJs = /\/assets\/(chunks|entries)\//.test(rel);
    return {
      path: rel,
      bytes: buf.length,
      sha256: sha256(buf),
      usedBy,
      referencedByJs,
    };
  });
}

function repeatedRegions(pages) {
  // fingerprint recognisable shared regions by their stable markers
  const markers = [
    {
      name: "top navigation (logo, Home/Course Bank/Calendar links, About dropdown trigger, burger button)",
      pattern: /id="menu-icon"/,
    },
    {
      name: "draggable-logo inline script",
      pattern: /getElementById\("menu-icon"\)/,
    },
    {
      name: "footer (GEU icon, social links, mail, DTU logo)",
      pattern: /GEU_Icon_1_qa8eLWu5EKj0C18RuAmQB\.svg/,
    },
    { name: "Google Analytics gtag bootstrap", pattern: /G-T1BFLB9XDL/ },
    {
      name: "font imports + base typography html-embed",
      pattern: /fontshare\.com\/v2\/css\?f\[\]=tanker/,
    },
    {
      name: "icon-background animated tile",
      pattern: /icon-background_orTDw4lIQEfSgOgF0DBVy\.svg/,
    },
    { name: "Flickity photo carousel", pattern: /id="carousel"/ },
    {
      name: "socials strip (Instagram/LinkedIn/Reddit/Facebook cards)",
      pattern: /See on Instagram/,
    },
  ];
  return markers.map(({ name, pattern }) => ({
    region: name,
    pages: pages
      .filter((p) =>
        pattern.test(
          readFileSync(
            join(
              EXPORT_DIR,
              p.sourceFile.replace("reference/legacy-export/", ""),
            ),
            "utf8",
          ),
        ),
      )
      .map((p) => p.route),
  }));
}

function routeGraph(pages) {
  const internal = (href) =>
    href && href.startsWith("/") && !href.startsWith("/assets");
  const nodes = pages.map((p) => p.route);
  const edges = [];
  for (const p of pages) {
    for (const l of p.links) {
      if (internal(l.href)) edges.push({ from: p.route, to: l.href });
    }
  }
  const inbound = Object.fromEntries(
    nodes.map((r) => [
      r,
      edges.filter((e) => e.to === r && e.from !== r).map((e) => e.from),
    ]),
  );
  return {
    edges,
    inboundStaticLinks: inbound,
    unreachableWithoutJs: nodes.filter(
      (r) => r !== "/" && inbound[r].length === 0,
    ),
    note: "The About dropdown and mobile menu are client-rendered (Radix via Webstudio chunks); their links to /about-ge, /about-geu, /about-dtu exist only after hydration.",
  };
}

const pages = ROUTES.map(inventoryPage);

const css = readFileSync(
  join(EXPORT_DIR, "assets/static/app_generated_index-6937cd5a.DvTqMP96.css"),
  "utf8",
);

const inventory = {
  generatedBy: "scripts/audit-legacy.mjs",
  source: {
    archive: "reference/GE_Union.zip",
    archiveSha256: sha256(readFileSync(join(ROOT, "reference/GE_Union.zip"))),
    extractedTo: "reference/legacy-export/",
    publishedAt: (readFileSync(join(EXPORT_DIR, "index.html"), "utf8").match(
      /data-ws-last-published="([^"]+)"/,
    ) ?? [])[1],
  },
  routes: pages.map((p) => p.route),
  routeGraph: routeGraph(pages),
  sharedStylesheet: {
    path: "/assets/static/app_generated_index-6937cd5a.DvTqMP96.css",
    bytes: Buffer.byteLength(css),
    customProperties: [
      ...new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])),
    ].sort(),
    mediaQueries: [
      ...new Set([...css.matchAll(/@media[^{]+/g)].map((m) => m[0].trim())),
    ],
    fontFamilies: [
      ...new Set(
        [...css.matchAll(/font-family:([^;}]+)/g)].map((m) => m[1].trim()),
      ),
    ],
  },
  fonts: {
    remote: [
      "https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap",
      "https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap",
      "https://fonts.cdnfonts.com/css/minecraft-title (minecraft page only)",
      "https://fonts.cdnfonts.com/css/minecrafter-alt (minecraft page only, imported but see inventory)",
      "https://fonts.cdnfonts.com/css/minecraftia (minecraft page only)",
    ],
    localFontFiles: [],
  },
  repeatedRegions: repeatedRegions(pages),
  localAssets: localAssetTable(pages),
  pages,
};

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(inventory, null, 2) + "\n");
console.log(`Wrote ${relative(ROOT, OUT_FILE)}`);
console.log(`  routes: ${pages.length}`);
console.log(`  local assets: ${inventory.localAssets.length}`);
console.log(
  `  unreachable without JS: ${inventory.routeGraph.unreachableWithoutJs.join(", ") || "none"}`,
);
for (const p of pages) {
  const dead = p.inlineScripts.filter((s) => s.missingDomTargets?.length);
  if (dead.length)
    console.log(
      `  ${p.route}: scripts with missing DOM targets: ${dead.map((s) => s.hash + " → " + s.missingDomTargets.join(",")).join("; ")}`,
    );
}
