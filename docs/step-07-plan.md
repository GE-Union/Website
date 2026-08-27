# Step 07 plan — Course Bank

## Goal

Rebuild `/course-bank` as static, semantic Astro content backed at runtime by
the existing `GE-Union/CourseBank` repository. Preserve the visible legacy
content and exact course-to-folder mappings while fixing the legacy cache,
security, reliability, and accessibility defects.

## Feature commits

1. **Course catalog and data layer — complete**
   - Extract the five categories and all legacy courses into typed data.
   - Add safe filename parsing, extension metadata, URL construction,
     structure validation, and folder lookup helpers.
   - Enable a versioned 90-minute local cache with corrupt-cache recovery,
     stale fallback, timeout support, and explicit bypass.
   - Cover the pure data behavior with unit tests.
2. **Course-bank interface and runtime — complete**
   - Render category introductions, courses, descriptions, note holders, and
     calls to action in Astro.
   - Add accessible tabs and semantic course disclosures.
   - Fetch the remote structure once, render file rows without `innerHTML`,
     and implement PDF/notebook/other-file behavior.
   - Reproduce the legacy desktop and mobile layout.
3. **Integration coverage and documentation — complete**
   - Add mocked E2E behavior tests, course-bank accessibility coverage, and
     deterministic visual snapshots.
   - Strengthen the build guard against copied course documents.
   - Document the data flow, cache/failure behavior, and intentional legacy
     deviations.

## Cache contract

- Key: `geu:course-bank:structure:v1`
- TTL: 90 minutes
- A fresh validated entry is returned without a network request.
- An expired validated entry may be shown as a stale fallback only when the
  refresh fails.
- Corrupt or invalid entries are removed and never rendered.
- Storage read/write failures are non-fatal.
- A retry always requests the remote endpoint and does not return a fresh
  cache entry in place of that request.

## Completion gates

- Formatting, lint, strict typecheck, unit tests, production build, SEO tests,
  HTML validation, dist/bundle/link/asset checks.
- Course-bank E2E, axe, and deterministic visual coverage at audited widths.
- No course documents, `structure.json`, or remote file icon copied to
  `dist/`.
