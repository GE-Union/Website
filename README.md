# GE Union website

The source code for [geunion.dk](https://geunion.dk) — a static site built with
[Astro](https://astro.build), TypeScript, and plain CSS. It is a maintainable
rebuild of the original Webstudio site, whose immutable export lives in
`reference/legacy-export/` (never edit or deploy that folder).

## Getting started

You need [Node.js](https://nodejs.org). The exact version is pinned in
[.nvmrc](.nvmrc); if you use [nvm](https://github.com/nvm-sh/nvm), run:

```sh
nvm install   # reads .nvmrc
nvm use
```

Then install dependencies and start the dev server:

```sh
npm ci        # exact install from package-lock.json (prefer this over npm install)
npm run dev   # dev server at http://localhost:4321, reloads on save
```

To run browser tests once, you also need the test browser:

```sh
npx playwright install chromium
```

## Commands

| Command                    | What it does                                                                           |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `npm run dev`              | Dev server with hot reload                                                             |
| `npm run build`            | Build the deployable static site into `dist/`                                          |
| `npm run preview`          | Serve the built `dist/` locally, exactly as it would deploy                            |
| `npm run format`           | Rewrite all files with Prettier                                                        |
| `npm run format:check`     | Fail if any file is not Prettier-formatted                                             |
| `npm run lint`             | ESLint (includes a guard against unsafe `innerHTML`)                                   |
| `npm run typecheck`        | Strict TypeScript check of `.astro` and `.ts` files                                    |
| `npm test` / `test:unit`   | Vitest unit tests (`tests/unit/`)                                                      |
| `npm run test:e2e`         | Playwright behavior tests against the built site (`tests/e2e/`)                        |
| `npm run test:a11y`        | Automated accessibility scans with axe (`tests/a11y/`)                                 |
| `npm run test:visual`      | Screenshot-comparison tests (`tests/visual/`)                                          |
| `npm run check:links`      | Every internal link in `dist/` resolves to a real file                                 |
| `npm run check:assets`     | Every registered remote URL still responds (needs network)                             |
| `npm run check:dist`       | No legacy-export leakage or remote-asset copies in `dist/`                             |
| `npm run validate:html`    | HTML validity of everything in `dist/`                                                 |
| `npm run audit:lighthouse` | Lighthouse reports per page into `reports/lighthouse/`                                 |
| `npm run check`            | The full deterministic gate: format, lint, types, unit tests, build, HTML, dist, links |

`npm run check` is what CI runs (plus the e2e and a11y suites). Run it before
pushing.

## How the code is organized

Astro uses **file-based routing**: every file in `src/pages/` becomes a page at
the matching URL. `src/pages/about-geu.astro` → `https://geunion.dk/about-geu`.

- `src/pages/` — one file per route. Keep these thin: mostly composition of
  components plus that page's content.
- `src/layouts/` — the shared HTML document shell (head, header, footer) that
  pages wrap themselves in.
- `src/components/` — reusable pieces, grouped by area (`layout/`,
  `navigation/`, `calendar/`, …). Rule of thumb: extract a component when it is
  reused, has its own behavior, or defines a stable visual contract — not for
  every `<div>`.
- `src/data/` — typed data that more than one file needs (site info,
  navigation, SEO matrix, remote asset URLs).
- `src/scripts/` — small vanilla TypeScript files that run in the browser
  (carousel, calendar, drag interaction). Each page loads only what it uses.
- `src/styles/` — global CSS: `reset.css`, design tokens, base styles.
- `public/` — files copied to the site as-is (favicon, local images).
- `reference/` — the frozen legacy export. Read it, never change it; it is
  the migration's source of truth and is never deployed.
- `scripts/` — Node scripts for audits and build guards (the `check:*`
  commands).
- `tests/` — `unit/`, `e2e/`, `a11y/`, and `visual/`. The
  `tests/visual/reference/` folder holds screenshots of the live site used for
  manual parity review; Playwright's own baselines live in
  `tests/visual/snapshots/`.
- `docs/` — the migration audit, content review log, asset mapping, and the
  prompt pack driving the rebuild.

An `.astro` file has two parts: a `---`-fenced code block at the top
(TypeScript, runs at build time) and an HTML template below it. A `<style>` tag
inside a component is **scoped** — it only affects that component's markup.

## CSS conventions

- Plain CSS only — no Tailwind, no CSS-in-JS, no UI framework.
- Shared design decisions (colors, spacing, radii, fonts) are CSS custom
  properties in `src/styles/` (design tokens), e.g. `color: var(--front-1)`.
- Keep selectors low-specificity: class names and element selectors, no long
  descendant chains, no `!important`.
- Component-specific styles live in the component's own scoped `<style>` tag;
  only genuinely global rules go in `src/styles/`.
- Respect `prefers-reduced-motion` for any animation.

## Remote asset policy

Some images and data files are loaded from other servers at their original
URLs (GitHub content repos, DTU's site) — **on purpose**, to stay faithful to
the current site:

- Every remote URL lives in one place:
  [src/data/external-assets.ts](src/data/external-assets.ts). Never paste a
  remote URL directly into a page.
- Remote images are rendered with a normal `<img>` tag — no optimizer, proxy,
  or downloaded copy. Do not commit copies of them.
- `npm run check:assets` verifies the remote URLs still respond;
  `npm run check:dist` fails the build guard if a copy sneaks into `dist/`.
- Local assets (logo, favicon, a few images) live in `public/assets/` and are
  mapped in [docs/external-assets.md](docs/external-assets.md).

## Working with Claude Code

This repo is set up for [Claude Code](https://claude.com/claude-code). The
project instructions live in [docs/CLAUDE.md](docs/CLAUDE.md) — Claude reads
them automatically and they define the rules above in detail.

- Start Claude Code from the repository root so it picks up the instructions.
- The rebuild is driven by the phased prompt pack in
  [docs/prompts/](docs/prompts/); run the prompts in order and review the diff
  after each one.
- Ask Claude to run `npm run check` (and the browser suites) before you accept
  a change — the instructions require it, but it never hurts to ask.
- Good prompts are specific: name the route, the component, or the doc you
  want changed, and say what "done" looks like.

## Quality gates

CI (GitHub Actions, [.github/workflows/ci.yml](.github/workflows/ci.yml)) runs
`npm ci`, `npm run check`, and the e2e + a11y suites on every push and pull
request. Visual tests, remote-asset probes, and Lighthouse are run locally
because they depend on the machine or the network. CI never deploys.
