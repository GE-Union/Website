import { expect, test, type Page } from "@playwright/test";
import { COURSE_BANK_CACHE_KEY } from "../../src/scripts/course-bank-utils";
import {
  courseBankIconFixture,
  courseBankStructureFixture,
} from "../fixtures/course-bank";

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

async function preparePage(page: Page, path: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path);
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete),
  );
}

async function prepareCourseBank(page: Page) {
  await page.route("**/GE-Union/CourseBank/main/structure.json", (route) =>
    route.fulfill({ status: 200, json: courseBankStructureFixture }),
  );
  await page.route("**/GE-Union/CourseBank/main/res/file-icon.svg", (route) =>
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
  await preparePage(page, "/course-bank");
  await page
    .locator('[data-course-bank-state="ready"]')
    .waitFor({ state: "attached" });
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete),
  );
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
