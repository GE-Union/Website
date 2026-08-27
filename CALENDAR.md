# Calendar guide

The `/calendar` page is a static Astro page that loads public events directly
from Google Calendar in the visitor's browser. Editing an event in Google
Calendar updates the site without a new deployment.

## Code map

- `src/data/calendar.ts` contains the public calendar ID and display settings.
- `src/components/calendar/EventCalendar.astro` owns the semantic HTML and
  page-scoped styles.
- `src/scripts/calendar-date.ts` contains pure date and time rules.
- `src/scripts/event-calendar.ts` connects FullCalendar, Google Calendar, page
  states, and the event dialog.
- `tests/fixtures/calendar.ts` is the deterministic Google API response used by
  browser tests.

Keeping these responsibilities separate makes visual changes, timing-rule
changes, and service integration changes independently reviewable.

## Local setup

1. Copy `.env.example` to `.env`.
2. Add the browser key after `PUBLIC_GOOGLE_CALENDAR_API_KEY=`.
3. Run `npm run dev`.

The month grid still renders without a key, but it shows a configuration notice
instead of requesting events.

## Google Cloud restrictions

The key is sent to every visitor's browser, so it is public by design. Its
protection comes from Google Cloud restrictions, not from hiding the value.

Configure both restriction types:

1. Under **API restrictions**, allow only **Google Calendar API**.
2. Under **Application restrictions**, choose **Websites** and allow only the
   required HTTP referrers, for example:
   - `https://geunion.dk/*`
   - `https://www.geunion.dk/*` while that hostname can serve the site
   - the exact preview-deployment host
   - `http://localhost:4321/*` and `http://127.0.0.1:4321/*` for development

Do not reuse this key for server-side services or unrelated APIs.

## Deployment checklist

**Publishing rule:** every production or preview build must receive
`PUBLIC_GOOGLE_CALENDAR_API_KEY` from the hosting provider's persistent
environment configuration. A developer's ignored `.env` file is not uploaded
with the site.

1. Add `PUBLIC_GOOGLE_CALENDAR_API_KEY` to the hosting provider's build
   environment.
2. Add the production and preview hostnames to the key's HTTP-referrer list.
3. Confirm that Google Calendar API is the key's only allowed API.
4. Rebuild and deploy. Astro reads the variable during the build, so changing
   it requires a new deployment.
5. Visit `/calendar`, confirm events load, open an event, and test previous,
   next, today, and Retry.

The Google Calendar itself must remain readable by the API. A private calendar
will produce the page's network-error state.

## Behavior

- Event titles and descriptions are rendered as text, never as HTML.
- Events ending the following morning before 05:00 stay on their starting day
  in the month grid while the dialog keeps the real end time.
- Google all-day end dates are treated as exclusive.
- Missing time, location, and description fields are omitted from the dialog.
- Loading, empty, missing-key, and network-error states are visible and
  announced to assistive technology.
- Retry requests the current calendar period again.
- On mobile, the month grid scrolls inside its own viewport rather than
  widening the document.

## Testing and bundle policy

Use `npm run test:e2e`, `npm run test:a11y`, and `npm run test:visual` after
calendar changes. The tests use a fake public key and mocked Google responses;
they never depend on live events.

FullCalendar is intentionally the site's largest browser dependency. The
bundle guard measures JavaScript per route: `/calendar` has an explicit 72 KiB
gzip allowance, while every other route keeps the 24 KiB limit. FullCalendar
must never be imported by the shared layout or another page.

Intentional differences from the legacy calendar are the contained mobile
scrolling, semantic dialog and close control, explicit service states, safe
plain-text descriptions, and removal of the unused TimeGrid module.
