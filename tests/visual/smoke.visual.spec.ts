import { expect, test, type Page } from "@playwright/test";
import { COURSE_BANK_CACHE_KEY } from "../../src/scripts/course-bank-utils";
import {
  courseBankIconFixture,
  courseBankCatalogFixture,
} from "../fixtures/course-bank";
import {
  emptyCalendarFixture,
  googleCalendarApiPattern,
} from "../fixtures/calendar";

// Playwright-managed snapshots of the shared shell (hero + footer) at the
// four audited viewports. These guard the shell against regressions
// between prompts; manual parity review against the live-site captures in
// tests/visual/reference/ happens per page phase (docs/visual-parity.md).
const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "laptop", width: 1024, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
] as const;

async function waitForRenderedImages(page: Page) {
  await page.evaluate(async () => {
    const images = [...document.images].filter(
      (image) => !image.closest("details:not([open])"),
    );
    images.forEach((image) => {
      image.loading = "eager";
    });
    await Promise.all(
      images.map(
        (image) =>
          image.complete ||
          new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          }),
      ),
    );
  });
}

async function preparePage(page: Page, path: string, waitForImages = true) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path);
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }",
  });
  await page.evaluate(() => document.fonts.ready);
  if (waitForImages) {
    await page.waitForFunction(() =>
      [...document.images].every((image) => image.complete),
    );
  }
}

async function prepareCourseBank(page: Page) {
  await page.route("**/GE-Union/CourseBank/main/catalog.v2.json", (route) =>
    route.fulfill({ status: 200, json: courseBankCatalogFixture }),
  );
  await page.route("**/GE-Union/CourseBank/*/res/file-icon.svg", (route) =>
    route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: courseBankIconFixture,
    }),
  );
  await page.addInitScript(
    (key) => localStorage.removeItem(key),
    COURSE_BANK_CACHE_KEY,
  );
  await preparePage(page, "/course-bank", false);
  await page
    .locator('[data-course-bank-state="ready"]')
    .waitFor({ state: "attached" });
  await waitForRenderedImages(page);
}

async function prepareCalendar(page: Page) {
  await page.clock.setFixedTime(new Date("2026-07-13T12:00:00+02:00"));
  await page.route(googleCalendarApiPattern, (route) =>
    route.fulfill({ status: 200, json: emptyCalendarFixture }),
  );
  await preparePage(page, "/calendar");
  await page
    .locator('[data-calendar-state="empty"]')
    .waitFor({ state: "attached" });
}

for (const vp of viewports) {
  test(`shell snapshot at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await preparePage(page, "/about-geu");
    await expect(page).toHaveScreenshot(`shell-${vp.name}.png`, {
      fullPage: true,
    });
  });
}

for (const vp of viewports) {
  test(`calendar composition at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await prepareCalendar(page);
    await expect(page).toHaveScreenshot(`calendar-${vp.name}.png`, {
      fullPage: true,
    });
  });
}

for (const vp of viewports.filter(({ name }) =>
  ["desktop", "mobile"].includes(name),
)) {
  test(`home composition at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await preparePage(page, "/");
    await expect(page).toHaveScreenshot(`home-${vp.name}.png`, {
      fullPage: true,
    });
  });
}

for (const vp of viewports) {
  test(`course bank composition at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await prepareCourseBank(page);
    await expect(page).toHaveScreenshot(`course-bank-${vp.name}.png`, {
      fullPage: true,
    });
  });
}
