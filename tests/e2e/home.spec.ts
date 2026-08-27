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
  test("calendar card shows exactly one responsive visual", async ({
    page,
  }) => {
    const calendar = page.locator(".calendar-card");

    await page.setViewportSize({ width: 1200, height: 900 });
    await expect(calendar.locator("[data-mini-calendar]")).toBeVisible();
    await expect(calendar.locator(".calendar-icon")).toBeHidden();

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(calendar.locator("[data-mini-calendar]")).toBeHidden();
    await expect(calendar.locator(".calendar-icon")).toBeVisible();
  });
  test("home decorations stay out of layout flow", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 });

    await expect(page.locator(".reels")).toHaveCSS("position", "absolute");
    await expect(page.locator(".reels img")).toHaveCount(6);
    const columns = page.locator(".reel-column");
    await expect(columns).toHaveCount(4);
    expect(
      await columns.evaluateAll((items) =>
        items.map((item) => item.querySelectorAll("img").length),
      ),
    ).toEqual([1, 2, 2, 1]);
    expect(
      await columns.evaluateAll((items) =>
        items.map((item) => getComputedStyle(item).marginTop),
      ),
    ).toEqual(["129px", "0px", "-258px", "0px"]);

    const socialButton = page.locator(".social-block .cta-link").first();
    await expect(socialButton).toHaveCSS("outline-style", "solid");
    await expect(socialButton).toHaveCSS("outline-width", "8px");
    await expect(socialButton).toHaveCSS("outline-color", "rgb(233, 233, 233)");

    const letter = page.locator(".letter-mask img");
    await expect(letter).toBeAttached();
    const letterBox = await letter.boundingBox();
    expect(letterBox).not.toBeNull();
    expect(letterBox!.height).toBeCloseTo(letterBox!.width, 0);
    await page.locator(".email-link").hover();
    await expect(letter).toHaveCSS("translate", "0px -52px");

    const feature = page.locator(".feature").first();
    const arrow = feature.locator(".feature-arrow svg");
    await feature.hover();
    await expect(arrow).toHaveCSS(
      "color",
      await feature.evaluate((element) => getComputedStyle(element).color),
    );
    await expect
      .poll(async () => (await arrow.boundingBox())?.width ?? 0)
      .toBeGreaterThanOrEqual(28);
  });
  test("feature cards retain their outer and viewport gaps", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 900 });
    const grid = (await page.locator(".feature-grid").boundingBox())!;
    const calendar = (await page.locator(".calendar-card").boundingBox())!;
    const course = (await page.locator(".course-card").boundingBox())!;
    const dashboard = (await page.locator(".dashboard-card").boundingBox())!;

    expect(grid.x + grid.width - (course.x + course.width)).toBeCloseTo(10, 0);
    expect(grid.x + grid.width - (dashboard.x + dashboard.width)).toBeCloseTo(
      10,
      0,
    );
    expect(900 - (calendar.y + calendar.height)).toBeCloseTo(14, 0);
    expect(900 - (dashboard.y + dashboard.height)).toBeCloseTo(14, 0);
  });
  test("hero title is centered between navigation and feature cards", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 1200, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");

      const centers = await page.evaluate(() => {
        const header = document
          .querySelector(".site-header")!
          .getBoundingClientRect();
        const grid = document
          .querySelector(".feature-grid")!
          .getBoundingClientRect();
        const title = document
          .querySelector(".hero-copy h1")!
          .getBoundingClientRect();
        const subtitle = document
          .querySelector(".hero-copy p")!
          .getBoundingClientRect();
        return {
          available: (header.bottom + grid.top) / 2,
          copy: (title.top + subtitle.bottom) / 2,
        };
      });

      expect(centers.copy).toBeCloseTo(centers.available, 0);
    }
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
