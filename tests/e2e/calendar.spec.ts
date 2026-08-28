import { expect, test, type Page, type Route } from "@playwright/test";
import {
  calendarEventsFixture,
  emptyCalendarFixture,
  googleCalendarApiPattern,
  unsafeCalendarTitle,
} from "../fixtures/calendar";

test.use({ timezoneId: "America/New_York" });

async function useCalendarClock(page: Page) {
  await page.clock.setFixedTime(new Date("2026-08-27T12:00:00+02:00"));
}

async function mockCalendar(
  page: Page,
  fixture: unknown = calendarEventsFixture,
) {
  await page.route(googleCalendarApiPattern, (route) =>
    route.fulfill({ status: 200, json: fixture }),
  );
}

async function openCalendar(
  page: Page,
  fixture: unknown = calendarEventsFixture,
) {
  await useCalendarClock(page);
  await mockCalendar(page, fixture);
  await page.goto("/calendar");
  await page
    .locator('[data-calendar-state="ready"]')
    .waitFor({ state: "attached" });
}

test("renders the configured month and title-only events", async ({ page }) => {
  let requestUrl = "";
  await useCalendarClock(page);
  await page.route(googleCalendarApiPattern, (route) => {
    requestUrl = route.request().url();
    return route.fulfill({ status: 200, json: calendarEventsFixture });
  });

  await page.goto("/calendar");
  await page
    .locator('[data-calendar-state="ready"]')
    .waitFor({ state: "attached" });

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Calendar");
  await expect(page.locator(".fc-toolbar-title")).toHaveText("August 2026");
  await expect(page.locator(".fc-col-header-cell")).toHaveText([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  // The multi-week event has one rendered segment in each calendar row.
  await expect(page.locator(".fc-event")).toHaveCount(8);
  await expect(page.getByText("+1 more")).toBeVisible();
  await expect(
    page.locator(".fc-event").filter({ hasText: unsafeCalendarTitle }),
  ).toHaveText(unsafeCalendarTitle);
  expect(requestUrl).toContain("key=playwright-public-test-key");
  expect(requestUrl).toContain("singleEvents=true");
  expect(requestUrl).toContain("timeZone=Europe%2FCopenhagen");
});

test("opens untrusted event content safely and restores keyboard focus", async ({
  page,
}) => {
  await openCalendar(page);
  const event = page
    .locator(".fc-event")
    .filter({ hasText: unsafeCalendarTitle });

  await event.click();
  const dialog = page.getByRole("dialog", { name: unsafeCalendarTitle });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveJSProperty("open", true);
  await expect(
    page.getByRole("button", { name: "Close event details" }),
  ).toBeFocused();
  await expect(page.locator("[data-event-date]")).toHaveText(
    "Thursday  ·  27th August",
  );
  await expect(page.locator("[data-event-time]")).toHaveText("09:00 - 11:30");
  await expect(page.locator("[data-event-location]")).toHaveText(
    "DTU Building 101",
  );
  await expect(dialog.locator(".event-dialog-row").nth(1)).toContainText(
    "Date: Thursday · 27th August",
  );
  await expect(dialog.locator("[data-event-time-row]")).toContainText(
    "Time: 09:00 - 11:30",
  );
  await expect(dialog.locator("[data-event-location-row]")).toContainText(
    "Location: DTU Building 101",
  );
  const description = page.locator("[data-event-description]");
  await expect(description.locator("strong")).toHaveText("GE Union");
  await expect(
    description.getByRole("link", { name: "Event details" }),
  ).toHaveAttribute("href", "https://example.com");
  await expect(
    description.getByRole("link", { name: "Event details" }),
  ).toHaveAttribute("rel", "noopener noreferrer");
  await expect(description.getByText("Unsafe link")).not.toHaveAttribute(
    "href",
  );
  await expect(description.locator("strong")).not.toHaveAttribute("onclick");
  await expect(description.locator("img, script, style")).toHaveCount(0);
  await expect(dialog.locator("dt, dd")).toHaveCount(0);
  await expect(dialog.locator(".event-dialog-dot")).toHaveCount(4);
  await expect(dialog.locator(".event-dialog-logo")).toBeVisible();
  expect(await page.evaluate(() => "injected" in window)).toBe(false);
  await expect(page).toHaveURL("/calendar");

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(event).toBeFocused();
  await expect
    .poll(() =>
      event.evaluate((element) => ({
        boxShadow: window.getComputedStyle(element).boxShadow,
        overlay: window.getComputedStyle(element, "::after").content,
      })),
    )
    .toEqual({ boxShadow: "none", overlay: "none" });

  await event.press("Enter");
  await page.keyboard.press("Enter");
  await expect(dialog).not.toBeVisible();
  await expect(event).toBeFocused();
});

test("locks background scrolling while event details are open", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 600 });
  await openCalendar(page);
  const event = page.locator(".fc-event").filter({ hasText: "Study day" });
  await event.scrollIntoViewIfNeeded();
  const scrollBeforeOpen = await page.evaluate(() => window.scrollY);

  await event.click();
  const dialog = page.getByRole("dialog", { name: "Study day" });
  const content = page.locator(".event-dialog-content");
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      content.evaluate(
        (element) => element.scrollHeight <= element.clientHeight,
      ),
    )
    .toBe(true);
  await expect
    .poll(() => page.evaluate(() => document.body.style.position))
    .toBe("fixed");
  expect(await page.evaluate(() => document.body.style.top)).toBe(
    `-${scrollBeforeOpen}px`,
  );
  const lockedScrollPosition = await page.evaluate(() => window.scrollY);

  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => window.scrollY)).toBe(lockedScrollPosition);

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBeforeOpen);
  expect(await page.evaluate(() => document.body.style.position)).toBe("");
});

test("smoothly shrinks, fades, and blurs the event popup", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openCalendar(page);
  await page.locator(".fc-event").filter({ hasText: "Study day" }).click();
  const dialog = page.getByRole("dialog", { name: "Study day" });
  const card = dialog.locator(".event-dialog-card");

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveAttribute("data-closing", "true");
  await expect
    .poll(() =>
      card.evaluate((element) => getComputedStyle(element).animationName),
    )
    .toBe("event-dialog-card-out");

  const closingFrames = await card.evaluate((element) => {
    const animation = element.getAnimations()[0];
    if (!(animation?.effect instanceof KeyframeEffect)) return [];

    return animation.effect.getKeyframes().map((frame) => ({
      filter: frame.filter ?? "none",
      opacity: frame.opacity ?? "1",
      transform: frame.transform ?? "none",
    }));
  });
  expect(closingFrames.at(-1)).toEqual({
    filter: "blur(12px)",
    opacity: "0",
    transform: "scale(0.9)",
  });
  await expect(dialog).not.toBeVisible();
});

test("keeps long event details scrollable without moving the page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 600 });
  const longDescription = [
    "<h1>Detailed programme</h1>",
    `<pre><code>${"A".repeat(240)}</code></pre>`,
    ...Array.from(
      { length: 40 },
      (_, index) => `<p>Event detail line ${index + 1}</p>`,
    ),
  ].join("");
  const fixture = {
    ...calendarEventsFixture,
    items: calendarEventsFixture.items.map((event) =>
      event.id === "safety"
        ? { ...event, description: longDescription }
        : event,
    ),
  };
  await openCalendar(page, fixture);
  const event = page
    .locator(".fc-event")
    .filter({ hasText: unsafeCalendarTitle });
  await event.scrollIntoViewIfNeeded();
  const scrollBeforeOpen = await page.evaluate(() => window.scrollY);

  await event.click();
  const content = page.locator(".event-dialog-content");
  await expect
    .poll(() =>
      content.evaluate(
        (element) => element.scrollHeight > element.clientHeight,
      ),
    )
    .toBe(true);
  await expect(content.getByRole("heading", { level: 1 })).toHaveText(
    "Detailed programme",
  );
  await expect
    .poll(() =>
      content.evaluate((element) => element.scrollWidth - element.clientWidth),
    )
    .toBeLessThanOrEqual(1);
  await content.hover();
  await page.mouse.wheel(0, 500);
  await expect
    .poll(() => content.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => document.body.style.top)).toBe(
    `-${scrollBeforeOpen}px`,
  );
  expect(await page.evaluate(() => window.scrollY)).toBe(0);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBeforeOpen);
});

test("formats all-day and post-midnight event details", async ({ page }) => {
  await openCalendar(page);

  await page.locator(".fc-event").filter({ hasText: "Study day" }).click();
  await expect(page.locator("[data-event-date]")).toHaveText(
    "Friday  ·  28th August",
  );
  await expect(page.locator("[data-event-time-row]")).toBeHidden();
  await page.keyboard.press("Escape");

  await page.locator(".fc-event").filter({ hasText: "Late party" }).click();
  await expect(page.locator("[data-event-date]")).toHaveText(
    "Saturday  ·  29th August",
  );
  await expect(page.locator("[data-event-time]")).toHaveText(
    "22:00 - 02:00 🌙",
  );
});

test("shows loading and empty states", async ({ page }) => {
  let releaseRequest: (() => void) | undefined;
  await useCalendarClock(page);
  await page.route(googleCalendarApiPattern, async (route) => {
    await new Promise<void>((resolve) => {
      releaseRequest = resolve;
    });
    await route.fulfill({ status: 200, json: emptyCalendarFixture });
  });

  await page.goto("/calendar");
  await expect(page.locator("[data-event-calendar]")).toHaveAttribute(
    "data-calendar-state",
    "loading",
  );
  await expect(page.locator("[data-calendar-grid]")).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await expect(page.locator("[data-calendar-notice]")).toBeHidden();

  releaseRequest?.();
  await expect(page.locator("[data-event-calendar]")).toHaveAttribute(
    "data-calendar-state",
    "empty",
  );
  await expect(page.locator("[data-calendar-notice]")).toBeHidden();
  await expect(page.locator("[data-calendar-live]")).toHaveText(
    "No events are scheduled in this period.",
  );
});

test("recovers from a network error when Retry is used", async ({ page }) => {
  let requests = 0;
  await useCalendarClock(page);
  await page.route(googleCalendarApiPattern, (route) => {
    requests += 1;
    if (requests === 1) return route.fulfill({ status: 500, body: "failed" });
    return route.fulfill({ status: 200, json: calendarEventsFixture });
  });

  await page.goto("/calendar");
  await page
    .locator('[data-calendar-state="error"]')
    .waitFor({ state: "attached" });
  await expect(page.locator("[data-calendar-notice-text]")).toHaveText(
    "Unable to load calendar events. Please try again.",
  );

  await page.getByRole("button", { name: "Retry" }).click();
  await page
    .locator('[data-calendar-state="ready"]')
    .waitFor({ state: "attached" });
  expect(requests).toBe(2);
});

test("shows a missing-key state without requesting Google", async ({
  page,
}) => {
  let apiRequests = 0;
  await useCalendarClock(page);
  await page.route(googleCalendarApiPattern, (route) => {
    apiRequests += 1;
    return route.abort();
  });
  await page.route("**/calendar", async (route: Route) => {
    const response = await route.fetch();
    const html = (await response.text()).replace(
      /data-api-key="[^"]+"/,
      "data-api-key",
    );
    await route.fulfill({ response, body: html });
  });

  await page.goto("/calendar");
  await expect(page.locator("[data-event-calendar]")).toHaveAttribute(
    "data-calendar-state",
    "missing-key",
  );
  await expect(page.locator("[data-calendar-notice-text]")).toContainText(
    "service is not configured",
  );
  expect(apiRequests).toBe(0);
});

test("caps and centers the calendar on wide screens", async ({ page }) => {
  await page.setViewportSize({ width: 2200, height: 1000 });
  await openCalendar(page);

  const bounds = (await page.locator("[data-event-calendar]").boundingBox())!;
  expect(bounds.width).toBeCloseTo(1300, 0);
  expect(bounds.x).toBeCloseTo((2200 - bounds.width) / 2, 0);
});

test("contains mobile overflow inside the month grid", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openCalendar(page);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  const gridOverflow = await page
    .locator("[data-calendar-scroll-region]")
    .evaluate((element) => element.scrollWidth - element.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(gridOverflow).toBeGreaterThan(0);

  const scrollGutters = await page
    .locator("[data-calendar-scroll-region]")
    .evaluate((element) => {
      const grid = element.querySelector<HTMLElement>(".fc-scrollgrid")!;
      const regionBounds = element.getBoundingClientRect();
      element.scrollLeft = 0;
      const left = grid.getBoundingClientRect().left - regionBounds.left;
      element.scrollLeft = element.scrollWidth;
      const right = regionBounds.right - grid.getBoundingClientRect().right;
      element.scrollLeft = 0;
      return { left, right };
    });
  expect(scrollGutters.left).toBeGreaterThan(0);
  expect(scrollGutters.right).toBeCloseTo(scrollGutters.left, 0);

  const monthGrid = page.getByRole("region", {
    name: "Calendar month grid. Scroll horizontally to see all weekdays.",
  });
  await expect(monthGrid).toHaveAttribute("tabindex", "0");
  await monthGrid.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => monthGrid.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0);
  await expect(page.locator(".fc-header-toolbar")).toBeVisible();
});
