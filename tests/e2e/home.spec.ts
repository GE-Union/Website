import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("feature cards use exact destinations", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Calendar/ }).first(),
    ).toHaveAttribute("href", "/calendar");
    await expect(
      page.getByRole("link", { name: /Course Bank/ }).first(),
    ).toHaveAttribute("href", "/course-bank");
    await expect(page.locator('.feature[href="/introduction"]')).toBeVisible();
  });
  test("carousel loops and pauses on focus", async ({ page }) => {
    const carousel = page.locator("[data-carousel]");
    await expect(carousel).toHaveAttribute("data-autoplay", "playing");
    await carousel.focus();
    await expect(carousel).toHaveAttribute("data-autoplay", "paused");
    await page.getByRole("button", { name: "Previous image" }).click();
    await expect(carousel.locator("[data-carousel-status]")).toHaveText(
      "Image 6 of 6",
    );
    await expect(carousel).toHaveAttribute("data-autoplay", "paused");
  });
  test("application and email calls to action are exact", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Submit your application/ }),
    ).toHaveAttribute(
      "href",
      "https://docs.google.com/forms/d/e/1FAIpQLScu14PgRWRO-iJ6uEs9s8lNS5QsuPb0HNvI8OY9KIkB9he5VQ/viewform?usp=header",
    );
    await expect(
      page.locator('a[href="mailto:geunion.dtu@gmail.com"]'),
    ).toHaveCount(2);
  });
});
