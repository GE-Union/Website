import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { courseBankStructureFixture } from "../fixtures/course-bank";

// Axe scans of the shared shell on every route, plus the two overlay
// states (About menu open, mobile drawer open). Page-body content is
// scanned again as pages are reconstructed.
//
// color-contrast is excluded: the legacy palette must be preserved during
// the fidelity migration (docs/CLAUDE.md), and its translucent nav text on
// the red panels measures below WCAG thresholds. Recorded as a known
// deviation in docs/design-system.md; the owner decision belongs to the
// accessibility phase (prompt 10).
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
        "**/GE-Union/CourseBank/main/structure.json",
        (request) =>
          request.fulfill({ status: 200, json: courseBankStructureFixture }),
      );
    }
    await page.goto(route);
    if (route === "/course-bank") {
      await page
        .locator('[data-course-bank-state="ready"]')
        .waitFor({ state: "attached" });
    }
    const results = await scan(page).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("Course Bank alternate tab has no axe violations", async ({ page }) => {
  await page.route("**/GE-Union/CourseBank/main/structure.json", (route) =>
    route.fulfill({ status: 200, json: courseBankStructureFixture }),
  );
  await page.goto("/course-bank");
  await page
    .locator('[data-course-bank-state="ready"]')
    .waitFor({ state: "attached" });
  await page.getByRole("tab", { name: "Advanced Systems" }).click();
  expect((await scan(page).analyze()).violations).toEqual([]);
});

test("Course Bank error and retry state has no axe violations", async ({
  page,
}) => {
  await page.route("**/GE-Union/CourseBank/main/structure.json", (route) =>
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
