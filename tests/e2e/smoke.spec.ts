import { expect, test } from "@playwright/test";

// Pipeline smoke test against the temporary index page. Replaced by real
// route tests during page reconstruction.
test("smoke page renders with global styles and no console errors", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  await expect(
    page.getByRole("heading", { level: 1, name: /GE Union rebuild/ }),
  ).toBeVisible();

  // The proof box is tinted via a CSS custom property from global.css —
  // if this holds, the global stylesheet made it through the build.
  const accent = await page
    .locator(".token-proof")
    .evaluate((el) => getComputedStyle(el).borderTopColor);
  expect(accent).toBe("rgb(153, 0, 0)");

  expect(consoleErrors).toEqual([]);
});
