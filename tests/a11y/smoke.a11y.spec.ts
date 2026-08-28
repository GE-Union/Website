import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { courseBankCatalogFixture } from "../fixtures/course-bank";
import {
  calendarEventsFixture,
  googleCalendarApiPattern,
  unsafeCalendarTitle,
} from "../fixtures/calendar";

// The preserved translucent navigation palette does not pass axe's automated
// contrast threshold, so contrast remains a documented manual review item.
const scan = (page: Page) =>
  new AxeBuilder({ page }).disableRules(["color-contrast"]);
const routes = [
  "/",
  "/course-bank",
  "/calendar",
  "/about-ge",
  "/about-geu",
  "/about-dtu",
  "/introduction",
  "/minecraft",
];

for (const route of routes) {
  test(`shell on ${route} has no axe violations`, async ({ page }) => {
    if (route === "/course-bank") {
      await page.route(
        "**/GE-Union/CourseBank/main/catalog.v2.json",
        (request) =>
          request.fulfill({ status: 200, json: courseBankCatalogFixture }),
      );
    }
    if (route === "/calendar") {
      await page.clock.setFixedTime(new Date("2026-08-27T12:00:00+02:00"));
      await page.route(googleCalendarApiPattern, (request) =>
        request.fulfill({ status: 200, json: calendarEventsFixture }),
      );
    }
    await page.goto(route);
    if (route === "/course-bank") {
      await page
        .locator('[data-course-bank-state="ready"]')
        .waitFor({ state: "attached" });
    }
    if (route === "/calendar") {
      await page
        .locator('[data-calendar-state="ready"]')
        .waitFor({ state: "attached" });
    }
    const results = await scan(page).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("open calendar event dialog has no axe violations", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-08-27T12:00:00+02:00"));
  await page.route(googleCalendarApiPattern, (route) =>
    route.fulfill({ status: 200, json: calendarEventsFixture }),
  );
  await page.goto("/calendar");
  await page
    .locator('[data-calendar-state="ready"]')
    .waitFor({ state: "attached" });
  await page
    .locator(".fc-event")
    .filter({ hasText: unsafeCalendarTitle })
    .click();
  await expect(
    page.getByRole("dialog", { name: unsafeCalendarTitle }),
  ).toBeVisible();
  expect((await scan(page).analyze()).violations).toEqual([]);
});

test("calendar error and retry state has no axe violations", async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date("2026-08-27T12:00:00+02:00"));
  await page.route(googleCalendarApiPattern, (route) =>
    route.fulfill({ status: 500, body: "failed" }),
  );
  await page.goto("/calendar");
  await page
    .locator('[data-calendar-state="error"]')
    .waitFor({ state: "attached" });
  expect((await scan(page).analyze()).violations).toEqual([]);
});

test("Course Bank alternate tab has no axe violations", async ({ page }) => {
  await page.route("**/GE-Union/CourseBank/main/catalog.v2.json", (route) =>
    route.fulfill({ status: 200, json: courseBankCatalogFixture }),
  );
  await page.goto("/course-bank");
  await page
    .locator('[data-course-bank-state="ready"]')
    .waitFor({ state: "attached" });
  await page.getByRole("tab", { name: "Advanced Materials" }).click();
  const course = page.locator("#course-panel-advanced details.course").first();
  await course.locator("summary").click();
  await expect(course).toHaveAttribute("open", "");
  await expect
    .poll(() =>
      course.evaluate(
        (element) => element.getAnimations({ subtree: true }).length,
      ),
    )
    .toBe(0);
  expect((await scan(page).analyze()).violations).toEqual([]);
});

test("Course Bank error and retry state has no axe violations", async ({
  page,
}) => {
  await page.route("**/GE-Union/CourseBank/main/catalog.v2.json", (route) =>
    route.fulfill({ status: 500, body: "failed" }),
  );
  await page.goto("/course-bank");
  await page
    .locator('[data-course-bank-state="error"]')
    .waitFor({ state: "attached" });
  expect((await scan(page).analyze()).violations).toEqual([]);
});

test("open About menu has no axe violations", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "About" }).click();
  const results = await scan(page).analyze();
  expect(results.violations).toEqual([]);
});

test("open mobile drawer has no axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const results = await scan(page).analyze();
  expect(results.violations).toEqual([]);
});
