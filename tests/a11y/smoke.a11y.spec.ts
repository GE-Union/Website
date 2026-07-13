import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Axe scan of the temporary smoke page. Real per-route scans are added as
// pages are reconstructed; this proves the a11y toolchain works.
test("smoke page has no axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
