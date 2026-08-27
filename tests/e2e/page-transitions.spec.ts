import { expect, test } from "@playwright/test";

test.describe("page transitions", () => {
  test("pushes hero characters away from the cursor before inner navigation", async ({
    page,
  }) => {
    await page.goto("/about-geu");

    const calendarLink = page.getByRole("link", { name: "Calendar" }).first();
    const linkBounds = (await calendarLink.boundingBox())!;
    const click = {
      x: linkBounds.x + linkBounds.width / 2,
      y: linkBounds.y + linkBounds.height / 2,
    };
    const navigation = page.waitForURL("**/calendar");
    await page.mouse.click(click.x, click.y);

    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "hero-exit",
    );
    const timing = await page
      .locator(".transition-char")
      .evaluateAll((characters) => {
        const root = document.documentElement;
        const origin = {
          x: Number(root.dataset.transitionOriginX),
          y: Number(root.dataset.transitionOriginY),
        };
        return characters
          .map((character) => {
            const bounds = character.getBoundingClientRect();
            const animation = character
              .getAnimations()
              .find(({ id }) => id === "geu-hero-character-exit");
            if (!animation) return null;
            return {
              delay: Number(animation.effect?.getTiming().delay),
              duration: Number(animation.effect?.getTiming().duration),
              distance: Math.hypot(
                bounds.left + bounds.width / 2 - origin.x,
                bounds.top + bounds.height / 2 - origin.y,
              ),
            };
          })
          .filter((item) => item !== null);
      });

    expect(timing.length).toBeGreaterThan(20);
    const byDistance = timing.sort((a, b) => a!.distance - b!.distance);
    expect(byDistance[0]!.delay).toBeLessThan(
      byDistance[byDistance.length - 1]!.delay,
    );
    expect(
      Math.max(...timing.map((item) => item!.duration + item!.delay)),
    ).toBe(170);

    await navigation;
    await expect(page.locator("html")).toHaveAttribute(
      "data-last-page-transition",
      "hero",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
  });

  test("reveals the new title character by character and fades its subtitle", async ({
    page,
  }) => {
    await page.goto("/about-geu");
    await page.evaluate(() => {
      sessionStorage.setItem(
        "geu-page-transition",
        JSON.stringify({ mode: "hero", createdAt: Date.now() }),
      );
    });

    await page.goto("/calendar", { waitUntil: "commit" });
    await page.waitForFunction(
      () =>
        document
          .querySelector("[data-transition-title]")
          ?.getAnimations({ subtree: true })
          .some(({ id }) => id === "geu-hero-character-enter") &&
        document
          .querySelector("[data-transition-subtitle]")
          ?.getAnimations()
          .some(({ id }) => id === "geu-hero-subtitle-enter"),
    );

    const entry = await page.evaluate(() => ({
      titleAnimations: document
        .querySelector("[data-transition-title]")!
        .getAnimations({ subtree: true })
        .filter(({ id }) => id === "geu-hero-character-enter").length,
      subtitleAnimations: document
        .querySelector("[data-transition-subtitle]")!
        .getAnimations()
        .filter(({ id }) => id === "geu-hero-subtitle-enter").length,
    }));
    expect(entry.titleAnimations).toBeGreaterThan(1);
    expect(entry.subtitleAnimations).toBe(1);

    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
    await expect(
      page.getByRole("heading", { name: "Calendar", level: 1 }),
    ).toBeVisible();
  });

  test("uses a very fast page fade when scrolled beyond the top threshold", async ({
    page,
  }) => {
    await page.goto("/about-geu");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.5));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(180);

    const navigation = page.waitForURL("**/calendar");
    const exit = await page.evaluate(() => {
      document
        .querySelectorAll<HTMLAnchorElement>('a[href="/calendar"]')
        .item(0)
        .click();
      const animation = document.body
        .getAnimations()
        .find(({ id }) => id === "geu-page-quick-exit");
      return {
        state: document.documentElement.dataset.pageTransition,
        duration: Number(animation?.effect?.getTiming().duration),
      };
    });

    expect(exit).toEqual({ state: "quick-exit", duration: 70 });

    await navigation;
    await expect(page.locator("html")).toHaveAttribute(
      "data-last-page-transition",
      "quick",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
  });

  test("keeps Home navigation on the quick path", async ({ page }) => {
    await page.goto("/");
    const navigation = page.waitForURL("**/calendar");
    await page.locator('.feature[href="/calendar"]').click();

    await navigation;
    await expect(page.locator("html")).toHaveAttribute(
      "data-last-page-transition",
      "quick",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
  });

  test("bypasses motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about-geu");
    await page.getByRole("link", { name: "Calendar" }).first().click();

    await expect(page).toHaveURL(/\/calendar\/?$/);
    await expect(page.locator("html")).not.toHaveAttribute(
      "data-last-page-transition",
    );
    await expect(page.locator("body")).toHaveCSS("opacity", "1");
  });

  test("restores a cached page and allows another transition", async ({
    page,
  }) => {
    await page.goto("/about-geu");
    await page.getByRole("link", { name: "Calendar" }).first().click();
    await expect(page).toHaveURL(/\/calendar\/?$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/about-geu\/?$/);
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );

    await page.getByRole("link", { name: "Course Bank" }).first().click();
    await expect(page).toHaveURL(/\/course-bank\/?$/);
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
  });
});
