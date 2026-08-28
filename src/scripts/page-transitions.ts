const STORAGE_KEY = "geu-page-transition";
const TOP_THRESHOLD = 0.2;
const RING_DURATION = 320;
const EXIT_DURATION = 105;
const EXIT_STAGGER = 16;
const ENTER_DURATION = 185;
const ENTER_STAGGER = 16;
const ENTER_STAGGER_LIMIT = 128;
const ENTER_DELAY = 35;
const SUBTITLE_DURATION = 180;
const SUBTITLE_LEAD = 45;
const PANEL_DURATION = 280;
const CONTENT_DURATION = 260;
const EXTRA_IN_DURATION = 210;
const EXTRA_OUT_DURATION = 115;
const QUICK_OUT_DURATION = 70;

type Mode = "hero" | "quick";
type HeroKind = "home" | "inner";

interface Point {
  x: number;
  y: number;
}

interface RingState extends Point {
  startedAt: number;
  heroHeight: number;
  hero: HeroKind;
}

interface Hero {
  title: HTMLElement;
  subtitle: HTMLElement | null;
  panel: HTMLElement;
  extras: HTMLElement[];
  kind: HeroKind;
}

const select = <T extends Element>(selector: string): T | null =>
  document.querySelector<T>(selector);

function getHero(): Hero | null {
  const title = select<HTMLElement>("[data-transition-title]");
  const panel = title?.closest<HTMLElement>("[data-transition-panel]");
  if (!title || !panel) return null;

  return {
    title,
    panel,
    subtitle: select("[data-transition-subtitle]"),
    extras: Array.from(
      document.querySelectorAll<HTMLElement>("[data-transition-extra]"),
    ),
    kind: panel.dataset.transitionPanel === "home" ? "home" : "inner",
  };
}

function titleCharacters(hero: Hero): HTMLElement[] {
  return Array.from(
    hero.title.querySelectorAll<HTMLElement>("[data-transition-character]"),
  );
}

function internalLink(event: MouseEvent): HTMLAnchorElement | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return null;
  }

  const anchor =
    event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>("a[href]")
      : null;
  if (
    !anchor ||
    anchor.hasAttribute("download") ||
    (anchor.target && anchor.target !== "_self")
  ) {
    return null;
  }

  const url = new URL(anchor.href, location.href);
  const samePage =
    url.pathname === location.pathname && url.search === location.search;
  return url.origin === location.origin &&
    ["http:", "https:"].includes(url.protocol) &&
    !samePage
    ? anchor
    : null;
}

function eventPoint(event: MouseEvent, anchor: HTMLElement): Point {
  if (event.detail && (event.clientX || event.clientY)) {
    return { x: event.clientX, y: event.clientY };
  }
  const bounds = anchor.getBoundingClientRect();
  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  };
}

function nearTop(): boolean {
  const height = window.visualViewport?.height ?? innerHeight;
  return scrollY <= height * TOP_THRESHOLD;
}

function random(index: number, origin: Point): number {
  const value = Math.sin(
    (index + 1) * 12.9898 + origin.x * 0.018 + origin.y * 0.033,
  );
  const scaled = value * 43758.5453;
  return scaled - Math.floor(scaled);
}

function animate(
  element: Element,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
  paused = false,
): Animation {
  const animation = element.animate(keyframes, options);
  if (paused) {
    animation.pause();
    animation.currentTime = 0;
  }
  return animation;
}

async function waitFor(
  animations: Animation[],
  timeout: number,
): Promise<void> {
  await Promise.race([
    Promise.allSettled(animations.map(({ finished }) => finished)),
    new Promise((resolve) => setTimeout(resolve, timeout)),
  ]);
}

async function playAfterPaint(animations: Animation[]): Promise<void> {
  await new Promise<void>((resolve) => {
    const fallback = setTimeout(resolve, 50);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        clearTimeout(fallback);
        resolve();
      }),
    );
  });
  animations.forEach((animation) => animation.play());
}

function content(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("body > main, body > footer"),
  );
}

function fade(
  elements: HTMLElement[],
  entering: boolean,
  duration: number,
  delay: number,
  easing = entering ? "cubic-bezier(0.22, 1, 0.36, 1)" : "ease-in",
): Animation[] {
  return elements.map((element) => {
    if (entering) element.style.animation = "none";
    return animate(
      element,
      [{ opacity: entering ? 0 : 1 }, { opacity: entering ? 1 : 0 }],
      {
        duration,
        delay,
        easing,
        fill: "both",
      },
      entering,
    );
  });
}

function heroExit(hero: Hero, origin: Point): Animation[] {
  const characters = titleCharacters(hero);
  const measurements = characters.map((character) => {
    const bounds = character.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    return {
      character,
      distance: Math.hypot(x - origin.x, y - origin.y),
      angle: Math.atan2(y - origin.y, x - origin.x),
    };
  });
  const minimum = Math.min(...measurements.map(({ distance }) => distance));
  const spread =
    Math.max(...measurements.map(({ distance }) => distance)) - minimum || 1;

  const animations = measurements.map(
    ({ character, distance, angle }, index) => {
      const ratio = (distance - minimum) / spread;
      const variation = random(index, origin);
      const direction = angle + (variation - 0.5) * 0.28;
      const travel = 118 + (1 - ratio) * 32 + variation * 24;
      const x = Math.cos(direction) * travel;
      const y = Math.sin(direction) * travel;
      const rotation = (variation - 0.5) * 12;
      return animate(
        character,
        [
          { opacity: 1, transform: "translate(0) rotate(0) scale(1)" },
          {
            offset: 0.58,
            opacity: 1,
            transform: `translate(${x * 0.68}px, ${y * 0.68}px) rotate(${rotation * 0.5}deg) scale(.99)`,
          },
          {
            offset: 0.86,
            opacity: 1,
            transform: `translate(${x * 0.92}px, ${y * 0.92}px) rotate(${rotation * 0.86}deg) scale(.97)`,
          },
          {
            opacity: 0,
            transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(.95)`,
          },
        ],
        {
          duration: EXIT_DURATION,
          delay: Math.round(ratio * EXIT_STAGGER),
          easing: "cubic-bezier(0.12, 0.75, 0.2, 1)",
          fill: "forwards",
        },
      );
    },
  );
  if (hero.subtitle) {
    animations.push(
      animate(hero.subtitle, [{ opacity: 1 }, { opacity: 0 }], {
        duration: EXIT_DURATION,
        easing: "ease-in",
        fill: "forwards",
      }),
    );
  }
  return animations;
}

function heroEntry(hero: Hero): Animation[] {
  hero.title.style.animation = "none";
  if (hero.subtitle) hero.subtitle.style.animation = "none";

  const characters = titleCharacters(hero);
  const lastDelay = Math.min(
    Math.max(characters.length - 1, 0) * ENTER_STAGGER,
    ENTER_STAGGER_LIMIT,
  );
  const animations = characters.map((character, index) =>
    animate(
      character,
      [
        { opacity: 0, transform: "translateY(5px) scale(.82)" },
        {
          offset: 0.78,
          opacity: 1,
          transform: "translateY(0) scale(1.025)",
        },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      {
        duration: ENTER_DURATION,
        delay:
          ENTER_DELAY + Math.min(index * ENTER_STAGGER, ENTER_STAGGER_LIMIT),
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      },
      true,
    ),
  );

  if (hero.subtitle) {
    animations.push(
      animate(
        hero.subtitle,
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: SUBTITLE_DURATION,
          delay: ENTER_DELAY + lastDelay + ENTER_DURATION - SUBTITLE_LEAD,
          easing: "ease-out",
          fill: "both",
        },
        true,
      ),
    );
  }
  return animations;
}

function panelEntry(root: HTMLElement, hero: Hero): Animation[] {
  const source = root.dataset.transitionSource as HeroKind | undefined;
  const height = Number(root.dataset.transitionHeight);
  if (!source || source === hero.kind || !Number.isFinite(height)) return [];

  hero.panel.style.removeProperty("height");
  hero.panel.style.removeProperty("min-height");
  const target = hero.panel.getBoundingClientRect().height;
  hero.panel.style.minHeight = "0";
  hero.panel.style.height = `${height}px`;
  if (Math.abs(height - target) < 1) return [];

  return [
    animate(
      hero.panel,
      [{ height: `${height}px` }, { height: `${target}px` }],
      {
        duration: PANEL_DURATION,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      },
      true,
    ),
  ];
}

function setRingClip(root: HTMLElement, hero: Hero): void {
  const bounds = hero.panel.getBoundingClientRect();
  const values = {
    "--ring-left": `${bounds.left}px`,
    "--ring-top": `${bounds.top}px`,
    "--ring-width": `${bounds.width}px`,
    "--ring-height": `${bounds.height}px`,
    "--ring-radius": getComputedStyle(hero.panel).borderRadius,
  };
  for (const [property, value] of Object.entries(values)) {
    root.style.setProperty(property, value);
  }
}

function startRing(root: HTMLElement, hero: Hero, ring: RingState): void {
  root.style.setProperty("--ring-x", `${ring.x}px`);
  root.style.setProperty("--ring-y", `${ring.y}px`);
  root.style.setProperty("--ring-delay", "0ms");
  setRingClip(root, hero);
  root.dataset.transitionRing = "active";
}

function save(mode: Mode, ring?: RingState): void {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ mode, createdAt: Date.now(), ring }),
    );
  } catch {
    // Navigation still works when storage is unavailable.
  }
}

export function initPageTransitions(): () => void {
  const root = document.documentElement;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let hero: Hero | null = null;
  let animations: Animation[] = [];
  let locked = false;
  let settleTimer: number | undefined;
  let ringTimer: number | undefined;

  const clearRing = () => {
    delete root.dataset.transitionRing;
    ringTimer = undefined;
  };

  const scheduleRingCleanup = () => {
    if (root.dataset.transitionRing !== "active") return;
    if (ringTimer) clearTimeout(ringTimer);
    const currentTime = Number(
      select<HTMLElement>(".transition-ring")?.getAnimations()[0]
        ?.currentTime ?? 0,
    );
    ringTimer = window.setTimeout(
      clearRing,
      Math.max(0, RING_DURATION - currentTime) + 30,
    );
  };

  const clearOverrides = () => {
    if (hero) {
      for (const element of [hero.title, hero.subtitle, ...hero.extras]) {
        element?.style.removeProperty("animation");
      }
      hero.subtitle?.style.removeProperty("opacity");
      hero.panel.style.removeProperty("height");
      hero.panel.style.removeProperty("min-height");
    }
    content().forEach((element) => element.style.removeProperty("animation"));
  };

  const settle = () => {
    animations.forEach((animation) => animation.cancel());
    animations = [];
    if (settleTimer) clearTimeout(settleTimer);
    settleTimer = undefined;
    clearOverrides();
    root.dataset.pageTransition = "complete";
    delete root.dataset.transitionSource;
    delete root.dataset.transitionHeight;
  };

  scheduleRingCleanup();

  const enter = async () => {
    const state = root.dataset.pageTransition;
    if (state !== "hero-enter" && state !== "quick-enter") return;
    if (reducedMotion.matches) return settle();

    if (state === "quick-enter") {
      settleTimer = window.setTimeout(settle, 105);
      return;
    }

    hero = getHero();
    if (!hero) return settle();
    const contentDelay =
      root.dataset.transitionSource === "home" && hero.kind === "inner"
        ? 190
        : 24;
    animations = [
      ...heroEntry(hero),
      ...panelEntry(root, hero),
      ...fade(hero.extras, true, EXTRA_IN_DURATION, 105),
      ...fade(content(), true, CONTENT_DURATION, contentDelay),
    ];
    const entryAnimations = animations;
    await playAfterPaint(entryAnimations);
    await waitFor(entryAnimations, 530);
    if (animations === entryAnimations) settle();
  };

  void enter();

  const leave = async (event: MouseEvent) => {
    const anchor = internalLink(event);
    if (!anchor || reducedMotion.matches || locked) return;

    event.preventDefault();
    locked = true;
    hero = getHero();
    const mode: Mode = hero && nearTop() ? "hero" : "quick";
    root.dataset.pageTransition = `${mode}-exit`;
    animations.forEach((animation) => animation.cancel());
    animations = [];
    clearOverrides();

    if (mode === "quick" || !hero) {
      save("quick");
      animations = [
        animate(document.body, [{ opacity: 1 }, { opacity: 0 }], {
          duration: QUICK_OUT_DURATION,
          easing: "ease-in",
          fill: "forwards",
        }),
      ];
      await waitFor(animations, QUICK_OUT_DURATION + 15);
    } else {
      const origin = eventPoint(event, anchor);
      const panelBounds = hero.panel.getBoundingClientRect();
      const ring: RingState = {
        ...origin,
        startedAt: Date.now(),
        heroHeight: panelBounds.height,
        hero: hero.kind,
      };
      startRing(root, hero, ring);
      scheduleRingCleanup();
      save("hero", ring);

      animations = [
        ...heroExit(hero, origin),
        ...fade(hero.extras, false, EXTRA_OUT_DURATION, 0),
        ...fade(content(), false, 130, 0, "ease-in-out"),
      ];
      await waitFor(
        animations,
        hero.kind === "home"
          ? PANEL_DURATION + 10
          : EXIT_DURATION + EXIT_STAGGER + 10,
      );
    }

    location.assign(anchor.href);
  };

  const restore = (event: PageTransitionEvent) => {
    if (!event.persisted) return;
    locked = false;
    settle();
    if (reducedMotion.matches) return;

    root.dataset.pageTransition = "quick-enter";
    const restoreAnimations = [
      animate(document.body, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 85,
        easing: "ease-out",
        fill: "both",
      }),
    ];
    animations = restoreAnimations;
    void waitFor(restoreAnimations, 100).then(() => {
      if (animations === restoreAnimations) settle();
    });
  };

  document.addEventListener("click", leave);
  addEventListener("pageshow", restore);

  return () => {
    document.removeEventListener("click", leave);
    removeEventListener("pageshow", restore);
    if (ringTimer) clearTimeout(ringTimer);
    clearRing();
    settle();
  };
}
