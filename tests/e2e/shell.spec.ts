import { expect, test } from "@playwright/test";

// Shared-shell behavior: header navigation, About disclosure menu,
// draggable-logo click-through, mobile drawer, and footer links.

test.describe("primary navigation", () => {
  test("top bar navigates to Course Bank and Calendar", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });

    await nav.getByRole("link", { name: "Course Bank" }).click();
    await expect(page).toHaveURL("/course-bank");

    await nav.getByRole("link", { name: "Calendar" }).click();
    await expect(page).toHaveURL("/calendar");

    await nav.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("About menu links reach all three about pages", async ({ page }) => {
    for (const [label, url] of [
      ["General Engineering", "/about-ge"],
      ["DTU", "/about-dtu"],
      ["GE Union", "/about-geu"],
    ] as const) {
      await page.goto("/");
      const trigger = page.getByRole("button", { name: "About" });
      await trigger.click();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await page.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(url);
    }
  });

  test("about pages are reachable without JavaScript", async ({ browser }) => {
    // The legacy site's About links only existed after hydration
    // (migration audit finding 11); the rebuild must not regress that.
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/");
    for (const href of ["/about-ge", "/about-dtu", "/about-geu"]) {
      await expect(
        page.locator(`#about-menu-list a[href="${href}"]`),
      ).toBeAttached();
    }
    await context.close();
  });
});

test.describe("About menu keyboard behavior", () => {
  test("opens with Enter, closes with Escape, returns focus", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "About" });
    const menu = page.locator("#about-menu-list");

    await trigger.focus();
    await expect(menu).toBeHidden();

    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toBeVisible();

    // Links are tabbable while open.
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "General Engineering" }),
    ).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("closes when focus leaves the menu", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "About" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Tab through all three links and out of the group.
    for (let i = 0; i < 4; i++) await page.keyboard.press("Tab");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("header logo", () => {
  test("a plain click on the logo navigates home", async ({ page }) => {
    await page.goto("/calendar");
    await page.locator("#menu-icon").click();
    await expect(page).toHaveURL("/");
  });

  test("a drag does not navigate and springs back", async ({ page }) => {
    await page.goto("/calendar");
    const logo = page.locator("#menu-icon");
    const box = (await logo.boundingBox())!;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 120, cy + 80, { steps: 8 });
    await page.mouse.up();

    await expect(page).toHaveURL("/calendar"); // drag must not navigate
    // Spring settles back to identity transform.
    await expect
      .poll(async () => logo.evaluate((el) => getComputedStyle(el).transform))
      .toBe("none");
  });
});

test.describe("mobile drawer", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("burger opens the dialog; Escape closes and restores focus", async ({
    page,
  }) => {
    await page.goto("/");
    const burger = page.getByRole("button", { name: "Open navigation menu" });
    await burger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: "About GE Union" }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(burger).toBeFocused();
  });

  test("drawer links navigate", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL("/introduction");
  });
});

test.describe("footer", () => {
  test("keeps all legacy destinations and drops the Webstudio badge", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.locator("footer");

    await expect(footer.locator('a[href="/"]')).toBeVisible();
    for (const [name, href] of [
      ["Instagram", "https://www.instagram.com/ge.union/"],
      [
        "Facebook",
        "https://www.facebook.com/people/GE-Union/61573069635006/?_rdr",
      ],
      ["LinkedIn", "https://www.linkedin.com/groups/10061020/"],
      ["Reddit", "https://www.reddit.com/r/DTU/"],
    ] as const) {
      await expect(footer.getByRole("link", { name })).toHaveAttribute(
        "href",
        href,
      );
    }

    await expect(page.locator('a[href*="webstudio.is"]')).toHaveCount(0);
  });

  test("new-tab links carry rel=noopener noreferrer", async ({ page }) => {
    await page.goto("/");
    const blankLinks = page.locator('footer a[target="_blank"]');
    for (const link of await blankLinks.all()) {
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
