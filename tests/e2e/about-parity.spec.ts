import { expect, test } from "@playwright/test";

test("GE Union identity switches between its card and compact treatment", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/about-geu");
  await expect(page.locator(".identity-card")).toBeVisible();
  await expect(page.locator(".identity-summary")).toBeHidden();

  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator(".identity-card")).toBeHidden();
  await expect(page.locator(".identity-summary")).toBeVisible();
});

test("About GE uses DTU's curriculum diagram and places it responsively", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto("/about-ge");
  const diagram = page.locator(".curriculum");
  await expect(diagram).toHaveAttribute(
    "src",
    "https://student.dtu.dk/-/media/subsites/studieordninger/general-engineering/ge-ects-fordeling.png",
  );

  const desktopDiagram = await diagram.boundingBox();
  const desktopCopy = await page
    .locator(".curriculum-foundations > div")
    .boundingBox();
  expect(desktopDiagram).not.toBeNull();
  expect(desktopCopy).not.toBeNull();
  expect(desktopDiagram!.x).toBeGreaterThan(
    desktopCopy!.x + desktopCopy!.width,
  );

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileDiagram = await diagram.boundingBox();
  const mobileCopy = await page
    .locator(".curriculum-foundations > div")
    .boundingBox();
  expect(mobileDiagram).not.toBeNull();
  expect(mobileCopy).not.toBeNull();
  expect(mobileDiagram!.y).toBeGreaterThan(mobileCopy!.y + mobileCopy!.height);
});

test("About DTU uses lightweight decorative mobile logo treatments", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about-dtu");

  await expect(page.locator(".variant-dtu .media")).toHaveCSS(
    "overflow",
    "hidden",
  );
  await expect(page.locator(".variant-pf .media")).toHaveCSS(
    "position",
    "absolute",
  );
  await expect(page.locator(".variant-pf .media")).toHaveCSS("opacity", "0.2");
  await expect(page.locator(".variant-ida .media")).toBeHidden();
});
