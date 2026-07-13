import { expect, test } from "@playwright/test";

// Screenshot smoke test proving the visual-comparison toolchain. Baselines
// for these Playwright tests live in tests/visual/snapshots/ (committed);
// tests/visual/reference/ holds the live-site captures used for manual
// parity review during page reconstruction.
test("smoke page visual snapshot", async ({ page }) => {
  await page.goto("/");
  // The build timestamp changes every build; hide it before comparing.
  await page
    .locator("time")
    .evaluate((el) => ((el as HTMLElement).style.visibility = "hidden"));
  await expect(page).toHaveScreenshot("smoke-page.png", { fullPage: true });
});
