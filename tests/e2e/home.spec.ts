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
  test("carousel keeps legacy image geometry and a raised selection", async ({
    page,
  }) => {
    const cases = [
      { viewport: 1200, width: 450, height: 300 },
      { viewport: 700, width: 270, height: 180 },
      { viewport: 390, width: 225, height: 150 },
    ];

    for (const item of cases) {
      await page.setViewportSize({ width: item.viewport, height: 844 });
      await page.goto("/");
      const carousel = page.locator("[data-carousel]");
      const selected = carousel.locator(
        '[data-carousel-slide][data-active="true"]',
      );
      const neighbor = carousel.locator("[data-carousel-slide]").nth(1);
      await selected.scrollIntoViewIfNeeded();

      const imageBox = await selected.locator("img").boundingBox();
      const viewportBox = await carousel
        .locator("[data-carousel-viewport]")
        .boundingBox();
      expect(imageBox).not.toBeNull();
      expect(viewportBox).not.toBeNull();
      expect(imageBox!.width).toBeCloseTo(item.width, 0);
      expect(imageBox!.height).toBeCloseTo(item.height, 0);
      expect(imageBox!.x + imageBox!.width / 2).toBeCloseTo(
        viewportBox!.x + viewportBox!.width / 2,
        0,
      );
      await expect(selected).toHaveCSS("opacity", "1");
      await expect(neighbor).toHaveCSS("opacity", "0.78");
      await expect(selected.locator("figcaption")).toHaveCSS("opacity", "1");
      await expect(neighbor.locator("figcaption")).toHaveCSS("opacity", "0");
    }
  });
  test("carousel drags live and captures release outside its viewport", async ({
    page,
  }) => {
    const carousel = page.locator("[data-carousel]");
    const viewport = carousel.locator("[data-carousel-viewport]");
    await viewport.scrollIntoViewIfNeeded();
    const box = await viewport.boundingBox();
    expect(box).not.toBeNull();

    const startX = box!.x + box!.width / 2;
    const y = box!.y + box!.height / 2;
    const initialTransform = await carousel
      .locator("[data-carousel-track]")
      .evaluate((track) => getComputedStyle(track).transform);

    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(startX - 90, y, { steps: 4 });
    await expect(carousel).toHaveAttribute("data-dragging", "true");
    await expect
      .poll(() =>
        carousel
          .locator("[data-carousel-track]")
          .evaluate((track) => getComputedStyle(track).transform),
      )
      .not.toBe(initialTransform);
    await page.mouse.move(box!.x - 80, y);
    await page.mouse.up();

    await expect(carousel).not.toHaveAttribute("data-dragging", "true");
    await expect(carousel.locator("[data-carousel-status]")).toHaveText(
      "Image 2 of 6",
    );
  });
  test("carousel disables autoplay when reduced motion is requested", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator("[data-carousel]")).toHaveAttribute(
      "data-autoplay",
      "paused",
    );
  });
  test("carousel remains bounded through rapid wraparound navigation", async ({
    page,
  }) => {
    const carousel = page.locator("[data-carousel]");
    const next = page.getByRole("button", { name: "Next image" });
    const previous = page.getByRole("button", { name: "Previous image" });

    for (let index = 0; index < 14; index += 1) await next.click();
    await expect(carousel.locator("[data-carousel-status]")).toHaveText(
      "Image 3 of 6",
    );
    for (let index = 0; index < 8; index += 1) await previous.click();
    await expect(carousel.locator("[data-carousel-status]")).toHaveText(
      "Image 1 of 6",
    );

    await expect(carousel.locator('[data-active="true"]')).toHaveCount(1);
    await expect
      .poll(async () => {
        const selected = await carousel
          .locator('[data-active="true"] img')
          .boundingBox();
        const viewport = await carousel
          .locator("[data-carousel-viewport]")
          .boundingBox();
        if (!selected || !viewport) return Number.POSITIVE_INFINITY;
        return Math.abs(
          selected.x + selected.width / 2 - (viewport.x + viewport.width / 2),
        );
      })
      .toBeLessThan(1);
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
