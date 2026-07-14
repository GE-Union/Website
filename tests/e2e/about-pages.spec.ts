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
