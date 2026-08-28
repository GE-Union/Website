import { expect, test } from "@playwright/test";

const pages = [
  ["/about-geu", "about GE Union"],
  ["/about-ge", "about GE"],
  ["/about-dtu", "about DTU"],
] as const;

for (const [route, heading] of pages) {
  test(`${route} has one correctly named page heading`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });
}

test("About GE preserves its visible external destinations and omits dead Q&A", async ({
  page,
}) => {
  await page.goto("/about-ge");
  await expect(
    page.getByRole("link", { name: "DTU Course Analyzer" }),
  ).toHaveAttribute("href", "https://dtucourseanalyzer.pythonanywhere.com/");
  await expect(page.locator("#qna-container")).toHaveCount(0);
});

test("About GE specialisation cards activate their ambient icons", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about-ge");

  const rail = page.locator(".floating-rail").first();
  const card = page.locator(".specialisation-card.specialisation--cyber");
  const floater = page.locator(".floater.specialisation--cyber svg").first();

  await expect(rail).toBeVisible();
  await expect(page.locator(".floater")).toHaveCount(16);

  const livingSprite = await page
    .locator(".specialisation--living use")
    .first()
    .getAttribute("href");
  const livingLineCap = await page.evaluate(async (href) => {
    const source = await fetch(href!.split("#")[0]).then((response) =>
      response.text(),
    );
    return new DOMParser()
      .parseFromString(source, "image/svg+xml")
      .querySelector("#living")
      ?.getAttribute("stroke-linecap");
  }, livingSprite);
  expect(livingLineCap).toBe("round");

  const blurBySize = await page.locator(".floater").evaluateAll((floaters) =>
    floaters
      .map((floater) => ({
        size: floater.getBoundingClientRect().width,
        blur: Number.parseFloat(
          getComputedStyle(floater.querySelector("svg")!).filter.match(
            /blur\((.+)px\)/,
          )?.[1] ?? "0",
        ),
      }))
      .sort((left, right) => left.size - right.size),
  );
  expect(blurBySize.at(-1)!.blur).toBeLessThan(blurBySize[0].blur);

  await card.hover();
  await expect(card.locator("h3")).toHaveCSS("color", "rgb(113, 84, 0)");
  await expect
    .poll(() => floater.evaluate((element) => getComputedStyle(element).fill))
    .toBe("rgb(255, 208, 66)");
  await expect
    .poll(() => floater.evaluate((element) => getComputedStyle(element).filter))
    .toBe("blur(0px)");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(rail).toBeHidden();
});

test("About GE floaters wait for their sprite and fade in", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  let releaseSprite!: () => void;
  const spriteBlocked = new Promise<void>((resolve) => {
    releaseSprite = resolve;
  });
  await page.route("**/specialisations.*.svg", async (route) => {
    await spriteBlocked;
    await route.continue();
  });

  await page.goto("/about-ge", { waitUntil: "domcontentloaded" });
  const rail = page.locator(".floating-rail").first();
  await expect(rail).toHaveCSS("opacity", "0");

  releaseSprite();
  await expect(rail).toHaveCSS("opacity", "1", { timeout: 3000 });
});

test("About GE floaters remain inside their rails and respond to scrolling by size", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto("/about-ge");

  const clearances = await page.locator(".floater").evaluateAll((floaters) =>
    floaters.map((floater) => {
      const bounds = floater.getBoundingClientRect();
      const railBounds = floater.parentElement!.getBoundingClientRect();
      return {
        left: bounds.left - railBounds.left,
        right: railBounds.right - bounds.right,
      };
    }),
  );

  expect(clearances.every(({ left, right }) => left >= 0 && right >= 0)).toBe(
    true,
  );

  const smallFloater = page.locator('.floater[style*="--size: 26px"]').first();
  const largeFloater = page.locator('.floater[style*="--size: 45px"]').first();

  const scrollTo = (top: number) =>
    page.evaluate((scrollTop) => window.scrollTo(0, scrollTop), top);
  const readTranslation = (floater: typeof smallFloater) =>
    floater.evaluate((element) => {
      const [x, y] = getComputedStyle(element).translate.split(" ");
      return { x: Number.parseFloat(x), y: Number.parseFloat(y) };
    });

  await scrollTo(300);
  await expect
    .poll(async () => Math.abs((await readTranslation(largeFloater)).y))
    .toBeGreaterThan(0);
  const smallTranslationAt300 = await readTranslation(smallFloater);
  const largeTranslationAt300 = await readTranslation(largeFloater);

  await scrollTo(600);
  await expect
    .poll(async () => Math.abs((await readTranslation(largeFloater)).y))
    .toBeGreaterThan(Math.abs(largeTranslationAt300.y));
  const largeTranslationAt600 = await readTranslation(largeFloater);

  await scrollTo(300);
  await expect
    .poll(async () => (await readTranslation(largeFloater)).y)
    .toBeCloseTo(largeTranslationAt300.y, 1);
  const largeTranslationAfterReturn = await readTranslation(largeFloater);

  expect(Math.abs(smallTranslationAt300.y)).toBeGreaterThan(0);
  expect(Math.abs(largeTranslationAt300.y)).toBeGreaterThan(
    Math.abs(smallTranslationAt300.y),
  );
  expect(largeTranslationAt300.x).toBeCloseTo(0, 5);
  expect(Math.abs(largeTranslationAt600.y)).toBeGreaterThan(
    Math.abs(largeTranslationAt300.y),
  );
  expect(largeTranslationAfterReturn.y).toBeCloseTo(largeTranslationAt300.y, 1);
});

test("About DTU preserves organisation destinations", async ({ page }) => {
  await page.goto("/about-dtu");
  for (const href of [
    "https://engirank.eu/",
    "https://www.pf.dk/en",
    "https://nul-kryds.dk/",
    "https://english.ida.dk/",
  ]) {
    await expect(page.locator(`main a[href="${href}"]`)).toHaveCount(1);
  }
});

test("team carousel supports keyboard navigation", async ({ page }) => {
  await page.goto("/about-geu");
  const carousel = page.getByRole("region", { name: "GE Union teams" });
  await carousel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(carousel.locator("[data-carousel-status]")).toHaveText(
    "Image 2 of 5",
  );
});

test("About pages do not overflow the mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route] of pages) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  }
});
