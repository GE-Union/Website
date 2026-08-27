import { expect, test, type Page } from "@playwright/test";
import {
  calendarEventsFixture,
  googleCalendarApiPattern,
} from "../fixtures/calendar";

const eventTitle = "Intro Party";
const visualCalendarFixture = {
  ...calendarEventsFixture,
  items: calendarEventsFixture.items.map((event, index) =>
    index === 0
      ? {
          ...event,
          summary: eventTitle,
          description:
            "<p>Welcome to <strong>GE Union</strong>.</p><p><a href='#'>Event details</a></p>",
        }
      : event,
  ),
};

async function openEventDialog(page: Page) {
  await page.clock.setFixedTime(new Date("2026-08-27T12:00:00+02:00"));
  await page.route(googleCalendarApiPattern, (route) =>
    route.fulfill({ status: 200, json: visualCalendarFixture }),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/calendar");
  await page
    .locator('[data-calendar-state="ready"]')
    .waitFor({ state: "attached" });
  await page.locator(".fc-event").filter({ hasText: eventTitle }).click();
  await page.getByRole("dialog", { name: eventTitle }).waitFor({
    state: "visible",
  });
  await page.evaluate(() => document.fonts.ready);
}

for (const viewport of [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 844 },
] as const) {
  test(`legacy event popup composition at ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await openEventDialog(page);
    await expect(page).toHaveScreenshot(
      `calendar-dialog-${viewport.name}.png`,
      { fullPage: true },
    );
  });
}
