import { expect, test } from "@playwright/test";

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

for (const vp of viewports) {
  test(`shell snapshot at ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/about-geu");
    // Freeze the scrolling background pattern so pixels are stable.
    await page.addStyleTag({
      content: "*, *::before, *::after { animation: none !important; }",
    });
    await expect(page).toHaveScreenshot(`shell-${vp.name}.png`, {
      fullPage: true,
    });
  });
}
