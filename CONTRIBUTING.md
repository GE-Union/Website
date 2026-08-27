# Contributing to the GE Union website

The project is intentionally plain: Astro templates, TypeScript, and CSS. Follow an existing nearby example before introducing a new pattern or dependency.

## Start a change

1. Install the pinned Node.js version with `nvm install && nvm use`.
2. Install the exact dependencies with `npm ci`.
3. Create a branch for one feature or fix.
4. Run `npm run dev` and check the page at the narrowest and widest relevant sizes.
5. Run `npm run check` before opening a pull request.

Do not include `.DS_Store`, editor settings, local environment files, generated reports, or unrelated formatting changes in a commit.

## Find the right place

| Change                             | Start here                    |
| ---------------------------------- | ----------------------------- |
| Page composition or page copy      | `src/pages/`                  |
| Reusable page section              | `src/components/`             |
| Browser interaction                | `src/scripts/`                |
| Shared labels, URLs, or typed data | `src/data/`                   |
| Design tokens or site-wide CSS     | `src/styles/`                 |
| Public local file                  | `public/`                     |
| Behavior regression                | `tests/unit/` or `tests/e2e/` |
| Visual regression                  | `tests/visual/`               |

Keep pages thin. A component owns its markup and visual contract; a browser script owns behavior; data modules own shared values. If a file starts doing more than one of those jobs, split it by responsibility instead of adding sections of comments.

## Make a maintainable change

- Use semantic HTML before adding ARIA.
- Use existing CSS variables and respect `prefers-reduced-motion`.
- Keep remote URLs in `src/data/external-assets.ts`.
- Treat all remote text as untrusted; create DOM nodes and use `textContent`.
- Add or update the smallest test that proves the changed behavior.
- Avoid a new package when the platform or an existing dependency already solves the problem.

The frozen `reference/legacy-export/` directory is for comparison only. Never edit or deploy it.

## Special systems

- Calendar behavior and setup: [CALENDAR.md](CALENDAR.md)
- Course Bank architecture and tests: [docs/course-bank.md](docs/course-bank.md)

Course uploads, names, descriptions, and folder mappings belong in the separate CourseBank repository. This website only validates and renders its generated manifest.

## Before requesting review

- The change is limited to one purpose.
- `npm run check` passes.
- New interaction works with a keyboard and at mobile width.
- Error, loading, empty, and reduced-motion states were considered where relevant.
- The commit contains no secrets or unrelated files.

In the pull request, explain the user-visible outcome and how you verified it. A reviewer should be able to understand the boundary of the change without reconstructing it from the diff.
