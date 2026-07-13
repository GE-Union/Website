import { defineConfig, devices } from "@playwright/test";

// Three browser-test suites over the built static site:
//   e2e    — behavior (tests/e2e)
//   a11y   — axe-core scans (tests/a11y)
//   visual — screenshot comparisons (tests/visual)
// The webServer builds and serves dist/, so tests always run against exactly
// what would be deployed.
export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      // Tolerate sub-visible anti-aliasing drift between builds; real layout
      // or color changes are orders of magnitude larger.
      maxDiffPixels: 64,
    },
  },
  snapshotPathTemplate:
    "tests/visual/snapshots/{testFilePath}/{arg}-{projectName}{ext}",
  webServer: {
    command: "npm run build && npm run preview -- --port 4321",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "e2e",
      testDir: "tests/e2e",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "a11y",
      testDir: "tests/a11y",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "visual",
      testDir: "tests/visual",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
