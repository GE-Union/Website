import { expect, test } from "@playwright/test";

test.describe("page transitions", () => {
  test("pushes hero characters away from the cursor before inner navigation", async ({
    page,
  }) => {
    await page.goto("/about-geu", { waitUntil: "domcontentloaded" });

    const calendarLink = page.getByRole("link", { name: "Calendar" }).first();
    const linkBounds = (await calendarLink.boundingBox())!;
    const click = {
      x: linkBounds.x + linkBounds.width / 2,
      y: linkBounds.y + linkBounds.height / 2,
    };
    const navigation = page.waitForURL("**/calendar", { waitUntil: "commit" });
    const exitMotion = await page.evaluate(({ x, y }) => {
      const title = document.querySelector<HTMLElement>(
        "[data-transition-title]",
      )!;
      const content = document.querySelector<HTMLElement>("main")!;
      const titleBefore = title.getBoundingClientRect();
      const contentBefore = content.getBoundingClientRect();
      const titleCharactersBefore = Array.from(
        title.querySelectorAll<HTMLElement>("[data-transition-character]"),
        (character) => character.getBoundingClientRect(),
      );
      const subtitleBounds: DOMRect[] = [];
      const subtitle = document.querySelector("[data-transition-subtitle]")!;
      const walker = document.createTreeWalker(subtitle, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const text = walker.currentNode as Text;
        let offset = 0;
        for (const value of Array.from(text.data)) {
          const start = offset;
          offset += value.length;
          if (/^\s+$/u.test(value)) continue;
          const range = document.createRange();
          range.setStart(text, start);
          range.setEnd(text, offset);
          subtitleBounds.push(range.getBoundingClientRect());
        }
      }
      const target = document.elementFromPoint(x, y);
      target?.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          button: 0,
          clientX: x,
          clientY: y,
          detail: 1,
        }),
      );
      const titleCharacters = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-transition-title] [data-transition-character]",
        ),
      );
      const subtitleCopies = Array.from(
        document.querySelectorAll<HTMLElement>(".transition-overlay-character"),
      );
      const characters = [...titleCharacters, ...subtitleCopies];
      const root = document.documentElement;
      const origin = { x, y };
      const characterTiming = characters
        .map((character) => {
          const bounds = character.getBoundingClientRect();
          const animation = character.getAnimations()[0];
          if (!animation) return null;
          const effect = animation.effect as KeyframeEffect;
          return {
            delay: Number(effect.getTiming().delay),
            duration: Number(effect.getTiming().duration),
            keyframes: effect.getKeyframes().map((keyframe) => ({
              offset: keyframe.computedOffset,
              opacity: keyframe.opacity,
            })),
            distance: Math.hypot(
              bounds.left + bounds.width / 2 - origin.x,
              bounds.top + bounds.height / 2 - origin.y,
            ),
          };
        })
        .filter((item) => item !== null);
      const ring = document.querySelector<HTMLElement>(".transition-ring")!;
      const ringAnimation = ring.getAnimations()[0];
      return {
        state: root.dataset.pageTransition,
        stableLayout:
          titleBefore.x === title.getBoundingClientRect().x &&
          titleBefore.y === title.getBoundingClientRect().y &&
          contentBefore.x === content.getBoundingClientRect().x &&
          contentBefore.y === content.getBoundingClientRect().y,
        titleCharacterDeltas: titleCharacters.map((character, index) => {
          const before = titleCharactersBefore[index];
          const after = character.getBoundingClientRect();
          return before
            ? { x: after.left - before.left, y: after.top - before.top }
            : { x: 0, y: 0 };
        }),
        subtitleCopyDeltas: subtitleCopies.map((character, index) => {
          const before = subtitleBounds[index];
          const after = character.getBoundingClientRect();
          return {
            x: after.left - before.left,
            y: after.top - before.top,
          };
        }),
        characterTiming,
        ring: {
          active: root.dataset.transitionRing,
          duration: Number(ringAnimation?.effect?.getTiming().duration),
          currentTime: Number(ringAnimation?.currentTime),
          left: Number.parseFloat(getComputedStyle(ring).left),
          top: Number.parseFloat(getComputedStyle(ring).top),
          borderWidth: getComputedStyle(ring).borderTopWidth,
          filter: getComputedStyle(ring).filter,
          clipBounds: document
            .querySelector(".transition-ring-clip")!
            .getBoundingClientRect()
            .toJSON(),
        },
        contentAnimations: document.querySelector("main")?.getAnimations()
          .length,
      };
    }, click);

    expect(exitMotion.state).toBe("hero-exit");
    expect(exitMotion.stableLayout).toBe(true);
    expect(
      Math.max(...exitMotion.titleCharacterDeltas.map(({ x }) => Math.abs(x))),
    ).toBeLessThanOrEqual(0.25);
    expect(
      Math.max(...exitMotion.titleCharacterDeltas.map(({ y }) => Math.abs(y))),
    ).toBeLessThanOrEqual(0.25);
    expect(
      Math.max(
        ...exitMotion.subtitleCopyDeltas.flatMap(({ x, y }) => [
          Math.abs(x),
          Math.abs(y),
        ]),
      ),
    ).toBeLessThanOrEqual(0.25);
    const timing = exitMotion.characterTiming;
    expect(timing.length).toBeGreaterThan(20);
    const byDistance = timing.sort((a, b) => a!.distance - b!.distance);
    expect(byDistance[0]!.delay).toBeLessThan(
      byDistance[byDistance.length - 1]!.delay,
    );
    expect(
      Math.max(...timing.map((item) => item!.duration + item!.delay)),
    ).toBe(121);
    expect(timing[0]!.keyframes?.[2]).toEqual({
      offset: 0.86,
      opacity: "1",
    });
    expect(exitMotion.contentAnimations).toBe(1);
    expect(exitMotion.ring.active).toBe("active");
    expect(exitMotion.ring.duration).toBe(320);
    expect(
      Math.abs(
        exitMotion.ring.clipBounds.left + exitMotion.ring.left - click.x,
      ),
    ).toBeLessThan(1.1);
    expect(
      Math.abs(exitMotion.ring.clipBounds.top + exitMotion.ring.top - click.y),
    ).toBeLessThan(1.1);
    expect(exitMotion.ring.clipBounds.height).toBe(250);
    expect(exitMotion.ring.borderWidth).toBe("48px");
    expect(exitMotion.ring.filter).toBe("blur(24px)");

    await navigation;
    const incomingRing = await page
      .locator(".transition-ring")
      .evaluate((ring) => {
        const animation = ring.getAnimations()[0];
        return {
          active: document.documentElement.dataset.transitionRing,
          currentTime: Number(animation?.currentTime),
          left: Number.parseFloat(getComputedStyle(ring).left),
          top: Number.parseFloat(getComputedStyle(ring).top),
          clipBounds: document
            .querySelector(".transition-ring-clip")!
            .getBoundingClientRect()
            .toJSON(),
        };
      });
    if (incomingRing.active === "active") {
      expect(incomingRing.currentTime).toBeGreaterThan(
        exitMotion.ring.currentTime,
      );
      expect(incomingRing.left).toBe(exitMotion.ring.left);
      expect(incomingRing.top).toBe(exitMotion.ring.top);
      expect(incomingRing.clipBounds).toEqual(exitMotion.ring.clipBounds);
    } else {
      // A slow document commit can outlast the intentionally brief shockwave.
      expect(incomingRing.active).toBeUndefined();
    }
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
  });

  test("reveals the new title character by character and fades its subtitle", async ({
    page,
  }) => {
    await page.goto("/about-geu", { waitUntil: "domcontentloaded" });
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
          .some(({ playState }) => playState === "running") &&
        document.querySelector("[data-transition-subtitle]")?.getAnimations()
          .length &&
        document.querySelector("main")?.getAnimations().length,
    );

    const entry = await page.evaluate(() => {
      const titleAnimations = document
        .querySelector("[data-transition-title]")!
        .getAnimations({ subtree: true });
      const subtitleAnimations = document
        .querySelector("[data-transition-subtitle]")!
        .getAnimations();
      const titleTiming = titleAnimations.map((animation) => {
        const timing = animation.effect!.getTiming();
        return {
          delay: Number(timing.delay),
          duration: Number(timing.duration),
        };
      });
      const subtitleTiming = subtitleAnimations[0]!.effect!.getTiming();
      return {
        titleAnimations: titleAnimations.length,
        titleTiming,
        subtitleAnimations: subtitleAnimations.length,
        subtitleTiming: {
          delay: Number(subtitleTiming.delay),
          duration: Number(subtitleTiming.duration),
        },
        contentAnimations: document.querySelector("main")!.getAnimations()
          .length,
        contentBounds: document
          .querySelector("main")!
          .getBoundingClientRect()
          .toJSON(),
      };
    });
    expect(entry.titleAnimations).toBeGreaterThan(1);
    expect(entry.subtitleAnimations).toBe(1);
    expect(entry.contentAnimations).toBe(1);
    expect(entry.titleTiming.every(({ duration }) => duration === 185)).toBe(
      true,
    );
    expect(Math.min(...entry.titleTiming.map(({ delay }) => delay))).toBe(35);
    const titleEnd = Math.max(
      ...entry.titleTiming.map(({ delay, duration }) => delay + duration),
    );
    expect(entry.subtitleTiming.delay).toBe(titleEnd - 45);
    expect(entry.subtitleTiming.duration).toBe(180);

    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
    await expect(page.locator(".transition-text-overlay")).toHaveCount(0);
    await expect(page.locator("[data-transition-title]")).toHaveCSS(
      "opacity",
      "1",
    );
    const settledContentBounds = await page
      .locator("main")
      .evaluate((element) => element.getBoundingClientRect().toJSON());
    expect({
      x: settledContentBounds.x,
      y: settledContentBounds.y,
      width: settledContentBounds.width,
    }).toEqual({
      x: entry.contentBounds.x,
      y: entry.contentBounds.y,
      width: entry.contentBounds.width,
    });
    await expect(
      page.getByRole("heading", { name: "Calendar", level: 1 }),
    ).toBeVisible();
  });

  test("keeps the Course Bank title characters through catalog rendering", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator(".feature-grid").evaluate(async (grid) => {
      await Promise.allSettled(
        grid.getAnimations().map((animation) => animation.finished),
      );
    });

    const navigation = page.waitForURL("**/course-bank", {
      waitUntil: "commit",
    });
    await page.evaluate(() =>
      document
        .querySelector<HTMLAnchorElement>('.feature[href="/course-bank"]')!
        .click(),
    );
    await navigation;
    await page.waitForFunction(
      () =>
        document
          .querySelector("[data-transition-title]")
          ?.getAnimations({ subtree: true }).length,
    );

    await expect(
      page.locator("[data-transition-title] [data-transition-character]"),
    ).toHaveCount(10);
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
    await expect(
      page.locator("[data-transition-title] [data-transition-character]"),
    ).toHaveCount(10);
  });

  test("uses a very fast page fade when scrolled beyond the top threshold", async ({
    page,
  }) => {
    await page.goto("/about-geu", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.5));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(180);

    const navigation = page.waitForURL("**/calendar", { waitUntil: "commit" });
    const exit = await page.evaluate(() => {
      document
        .querySelectorAll<HTMLAnchorElement>('a[href="/calendar"]')
        .item(0)
        .click();
      const animation = document.body.getAnimations()[0];
      return {
        state: document.documentElement.dataset.pageTransition,
        duration: Number(animation?.effect?.getTiming().duration),
      };
    });

    expect(exit).toEqual({ state: "quick-exit", duration: 70 });

    await navigation;
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
  });

  test("carries the hero transition from Home into an inner page", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const homeHeroHeight = await page
      .locator(".home-hero")
      .evaluate((hero) => hero.getBoundingClientRect().height);
    const navigation = page.waitForURL("**/calendar", { waitUntil: "commit" });
    const exit = await page.evaluate(() => {
      document
        .querySelector<HTMLAnchorElement>('.feature[href="/calendar"]')!
        .click();
      return {
        state: document.documentElement.dataset.pageTransition,
        extraAnimations: document
          .querySelector("[data-transition-extra]")!
          .getAnimations().length,
      };
    });
    expect(exit).toEqual({ state: "hero-exit", extraAnimations: 1 });

    await navigation;
    await page.waitForFunction(
      () =>
        document.querySelector("[data-transition-panel]")?.getAnimations()
          .length,
    );
    const panelEntry = await page
      .locator("[data-transition-panel]")
      .evaluate((panel) => {
        const animation = panel.getAnimations()[0]!;
        return (animation.effect as KeyframeEffect)
          .getKeyframes()
          .map(({ height }) => Number.parseFloat(String(height)));
      });
    expect(panelEntry[0]).toBeCloseTo(homeHeroHeight, 0);
    expect(panelEntry[1]).toBe(250);
    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
  });

  test("grows the hero and fades Home features in from an inner page", async ({
    page,
  }) => {
    await page.goto("/about-geu", { waitUntil: "domcontentloaded" });
    const sourceHeight = await page
      .locator("[data-transition-panel]")
      .evaluate((hero) => hero.getBoundingClientRect().height);
    const navigation = page.waitForURL(/\/$/, { waitUntil: "commit" });
    await page.getByRole("link", { name: "Home" }).first().click();
    await navigation;

    await page.waitForFunction(
      () =>
        document.querySelector("[data-transition-panel]")?.getAnimations()
          .length &&
        document.querySelector("[data-transition-extra]")?.getAnimations()
          .length,
    );
    const entry = await page.evaluate(() => {
      const panel = document.querySelector("[data-transition-panel]")!;
      const panelAnimation = panel.getAnimations()[0]!;
      return {
        panelHeights: (panelAnimation.effect as KeyframeEffect)
          .getKeyframes()
          .map(({ height }) => Number.parseFloat(String(height))),
        extraAnimations: document
          .querySelector("[data-transition-extra]")!
          .getAnimations().length,
      };
    });
    expect(entry.panelHeights[0]).toBe(sourceHeight);
    expect(entry.panelHeights[1]).toBeGreaterThan(sourceHeight);
    expect(entry.extraAnimations).toBe(1);

    await expect(page.locator("html")).toHaveAttribute(
      "data-page-transition",
      "complete",
    );
    await expect(page.locator("[data-transition-extra]")).toHaveCSS(
      "opacity",
      "1",
    );
  });

  test("keeps the full Home entrance for reloads and external entries", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const entrance = await page.evaluate(() => ({
      transitionState: document.documentElement.dataset.pageTransition,
      hero: document
        .querySelector(".home-hero")!
        .getAnimations()
        .map((animation) => (animation as CSSAnimation).animationName),
      title: document
        .querySelector("[data-transition-title]")!
        .getAnimations()
        .map((animation) => (animation as CSSAnimation).animationName),
      grid: document
        .querySelector(".feature-grid")!
        .getAnimations()
        .map((animation) => (animation as CSSAnimation).animationName),
      features: Array.from(document.querySelectorAll(".feature")).map(
        (feature) =>
          feature
            .getAnimations()
            .map((animation) => (animation as CSSAnimation).animationName),
      ),
      main: document
        .querySelector("body > main")!
        .getAnimations()
        .map((animation) => (animation as CSSAnimation).animationName),
    }));

    expect(entrance.transitionState).toBeUndefined();
    expect(entrance.hero).toContain("home-hero-reveal");
    expect(entrance.title).toContain("home-fade-in");
    expect(entrance.grid).toContain("home-grid-in");
    expect(
      entrance.features.every((animations) =>
        animations.includes("home-feature-in"),
      ),
    ).toBe(true);
    expect(entrance.main).toContain("home-fade-in");
  });

  test("keeps data-page footers below the viewport while content initializes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 900 });

    for (const route of ["/calendar", "/course-bank"]) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const footerTop = await page
        .locator("body > footer")
        .evaluate((footer) => footer.getBoundingClientRect().top);
      expect(footerTop).toBeGreaterThanOrEqual(900);
    }
  });

  test("bypasses motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about-geu", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Calendar" }).first().click();

    await expect(page).toHaveURL(/\/calendar\/?$/);
    await expect(page.locator("body")).toHaveCSS("opacity", "1");
  });

  test("restores a cached page and allows another transition", async ({
    page,
  }) => {
    await page.goto("/about-geu", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Calendar" }).first().click();
    await expect(page).toHaveURL(/\/calendar\/?$/);

    await page.evaluate(() => history.back());
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
