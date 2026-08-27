# Course Bank architecture

## Source of truth

The CourseBank GitHub repository owns the complete feature:

- catalog.source.json contains categories, courses, descriptions, folder
  mappings, site links and UI labels.
- Course folders contain the uploaded resources.
- .github/scripts/build_catalog.py validates both sources and publishes
  catalog.v2.json.
- structure.json is generated from the same validated inputs for legacy
  clients only.

The website contains no course/category inventory. Its static HTML is a small
loading, status and retry shell; tabs, disclosures, files and calls to action
are created from catalog.v2.json in the browser. A new valid course or upload
therefore appears without rebuilding this repository.

## Publishing guarantees

The CourseBank workflow runs compiler unit tests and validates the entire
repository before publishing either manifest. Publishing never renames a
resource. Invalid extensions, unsafe paths, duplicates, symlinks, oversized
files and resources in undeclared folders fail the workflow, leaving the
previous valid catalog live.

Each manifest includes the exact Git commit that was validated. The browser
constructs resource and icon URLs from repository.rawBase, sourceRevision and
the file path. This makes a loaded catalog internally consistent even when
another upload is committed while a visitor has the page open.

## Browser data flow

1. course-bank.ts requests the v2 catalog from GitHub Raw with normal browser
   HTTP caching enabled and a 10-second timeout.
2. The loader checks geu:course-bank:catalog:v2. A validated entry younger
   than 90 minutes is used immediately.
3. A network response is validated before it is rendered or cached.
4. Rendering uses DOM node creation and textContent; repository strings are
   never assigned through innerHTML.
5. An expired valid cache is retained as a stale fallback when GitHub cannot be
   reached. Retry explicitly requests the network.

The manifest parser enforces schema version 2, HTTPS URLs, a full commit SHA,
safe path segments, bounded collection sizes, file/course path agreement and
unique category/course paths.

## Interaction behavior

All courses start collapsed. Native details and summary semantics provide the
accessible state, while a dedicated reveal wrapper receives the eased height
animation. Overflow clipping exists only during the animation and the closed
state is finalized before temporary dimensions are removed, preventing the old
end-of-animation size pop. Reduced-motion users receive an immediate state
change.

Tabs implement the ARIA tab pattern, roving focus, Home/End and directional
keyboard navigation. PDF and notebook behavior is unchanged: PDFs use an
isolated blob tab with the raw URL as fallback, notebooks download under their
repository filename, and other formats link directly to the commit-pinned raw
resource.

## Package boundary

src/data/course-bank.ts was removed. Neither manifest, the icon nor any course
resource may be emitted into dist; check-dist-assets.mjs enforces that boundary.
The page therefore grows with a small generic renderer rather than with every
future course and file.

## Verification

- Unit tests cover schema/path/URL validation, HTTP and local caching, cache
  corruption, stale fallback and forced refresh.
- Playwright covers generated inventory, injection safety, keyboard tabs,
  disclosures, caching, error/retry, PDFs and notebooks.
- Axe scans the loaded page, an alternate tab and the error state.
- Visual regression covers all audited viewport sizes.

Run the optional live manifest probe with:

    COURSE_BANK_LIVE=1 npm run test:e2e -- --grep '\[live\]'
