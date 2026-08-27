# Course Bank architecture

## Data ownership

The page deliberately has two data sources:

- `src/data/course-bank.ts` owns the five visible categories, their copy, all
  49 course definitions, course codes, and the exact repository folder mapped
  to each course. Astro renders this content into the static HTML.
- `https://raw.githubusercontent.com/GE-Union/CourseBank/main/structure.json`
  owns the changing file inventory. The browser fetches it at runtime and
  matches its arrays only to the allowlisted course folders above.

An unknown remote folder is not rendered automatically. Add a typed course
definition when a new folder should become visible. Course documents, the
structure file, and the file icon remain remote and are never copied into the
site build.

## Browser data flow

1. The static page shows category tabs, initially collapsed course disclosures,
   descriptions, and loading placeholders without waiting for GitHub.
2. `src/scripts/course-bank.ts` asks the data loader for the structure once.
3. The loader checks `geu:course-bank:structure:v1`. A validated entry younger
   than 90 minutes is used immediately; otherwise GitHub is requested with a
   10-second timeout.
4. A successful response is validated and stored with its fetch timestamp.
5. Each allowlisted folder is rendered with safe DOM node creation and
   `textContent`. A missing or empty folder displays `No notes found`.
6. Retry always makes a network request, even when a fresh cache exists.

The cache is fully enabled. The legacy `if (false)` branch and zero-multiplied
TTL were temporary test code and are not carried forward.

Course disclosures use native `details` and `summary` elements. JavaScript
animates a dedicated content wrapper with eased height, fade, and chevron
transitions in both directions, leaving the summary outside the clipping area.
The native behavior remains available without JavaScript, while reduced-motion
users get an immediate state change.

## Failure behavior

- Corrupt, future-dated, or structurally invalid cache entries are removed.
- Browser storage failures are ignored; live fetching continues.
- If an expired validated cache exists and refresh fails, saved notes remain
  visible with a stale-data notice and Retry button.
- Without usable cached data, all note holders show an error and the page-level
  Retry button requests fresh data.
- Repository filenames containing path separators, dot segments, or control
  characters invalidate the remote structure before any URL is built.
- Unknown repository branches are ignored because the static catalog is the
  display allowlist.

## File behavior

The `-a-` filename separator identifies the author and underscores become
spaces for display. Files without that separator show `Unknown`.

- PDFs retain a safe GitHub Raw fallback link. A normal click opens a blank tab
  synchronously, fetches a PDF-typed blob, navigates the tab, and severs opener
  access before content loads. Popup blocking leaves the raw link behavior
  available.
- Notebooks are fetched to a blob so the original repository filename is used
  for the download.
- Other formats use their segment-encoded GitHub Raw URL directly.

No repository-controlled string is assigned through `innerHTML`.

## Verification

- Unit tests cover the 49-course catalog, path safety, parsing, URL encoding,
  extension metadata, validation, cache boundaries/corruption, stale fallback,
  and forced refresh.
- Playwright uses deterministic GitHub mocks for tabs, mobile layout, cache,
  error/retry, safe rendering, PDF behavior, and notebook downloads.
- Axe scans the loaded page, an alternate tab, and the error state.
- Visual regression screenshots cover all four audited viewport sizes.
- `check-dist-assets.mjs` rejects emitted structure/icon files and common
  course-document formats.

Run the optional live endpoint probe with:

```sh
COURSE_BANK_LIVE=1 npm run test:e2e -- --grep '\[live\]'
```
