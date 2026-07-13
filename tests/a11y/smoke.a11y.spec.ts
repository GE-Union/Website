import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

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
    await page.goto(route);
    const results = await scan(page).analyze();
    expect(results.violations).toEqual([]);
  });
}

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
