import { expect, test, type Page, type Route } from "@playwright/test";
import {
  calendarEventsFixture,
  emptyCalendarFixture,
  googleCalendarApiPattern,
  unsafeCalendarDescription,
  unsafeCalendarTitle,
} from "../fixtures/calendar";

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

async function openCalendar(page: Page) {
  await useCalendarClock(page);
  await mockCalendar(page);
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
    "Thursday · 27th August",
  );
  await expect(page.locator("[data-event-time]")).toHaveText("09:00 - 11:30");
  await expect(page.locator("[data-event-location]")).toHaveText(
    "DTU Building 101",
  );
  await expect(page.locator("[data-event-description]")).toHaveText(
    unsafeCalendarDescription,
  );
  await expect(dialog.locator("img")).toHaveCount(0);
  expect(await page.evaluate(() => "injected" in window)).toBe(false);
  await expect(page).toHaveURL("/calendar");

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(event).toBeFocused();

  await event.press("Enter");
  await page.getByRole("button", { name: "Close event details" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(event).toBeFocused();
});

test("formats all-day and post-midnight event details", async ({ page }) => {
  await openCalendar(page);

  await page.locator(".fc-event").filter({ hasText: "Study day" }).click();
  await expect(page.locator("[data-event-date]")).toHaveText(
    "Friday · 28th August",
  );
  await expect(page.locator("[data-event-time-row]")).toBeHidden();
  await page.keyboard.press("Escape");

  await page.locator(".fc-event").filter({ hasText: "Late party" }).click();
  await expect(page.locator("[data-event-date]")).toHaveText(
    "Saturday · 29th August",
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

  releaseRequest?.();
  await expect(page.locator("[data-event-calendar]")).toHaveAttribute(
    "data-calendar-state",
    "empty",
  );
  await expect(page.locator("[data-calendar-notice-text]")).toHaveText(
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

test("contains mobile overflow inside the month grid", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openCalendar(page);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  const gridOverflow = await page
    .locator(".fc-view-harness")
    .evaluate((element) => element.scrollWidth - element.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(gridOverflow).toBeGreaterThan(0);
  await expect(page.locator(".fc-header-toolbar")).toBeVisible();
});
