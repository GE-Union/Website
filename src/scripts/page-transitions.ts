const STORAGE_KEY = "geu-page-transition";
const TOP_THRESHOLD = 0.2;
const RING_DURATION = 320;

const timing = {
  exit: 105,
  exitStagger: 16,
  enter: 185,
  enterStagger: 16,
  enterStaggerLimit: 128,
  enterDelay: 35,
  subtitle: 180,
  subtitleLead: 45,
  panel: 280,
  contentIn: 260,
  extraIn: 210,
  extraOut: 115,
  quickOut: 70,
} as const;

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

function graphemes(text: string): string[] {
  if (!("Segmenter" in Intl)) return Array.from(text);
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return Array.from(segmenter.segment(text), ({ segment }) => segment);
}

/** Copies only the subtitle glyphs. The real title always animates in place. */
function copySubtitle(hero: Hero): {
  overlay: HTMLElement | null;
  characters: HTMLElement[];
} {
  if (!hero.subtitle) return { overlay: null, characters: [] };

  const panelBounds = hero.panel.getBoundingClientRect();
  const overlay = document.createElement("div");
  overlay.className = "transition-text-overlay";
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    left: `${panelBounds.left}px`,
    top: `${panelBounds.top}px`,
    width: `${panelBounds.width}px`,
    height: `${panelBounds.height}px`,
    borderRadius: getComputedStyle(hero.panel).borderRadius,
  });

  const characters: HTMLElement[] = [];
  const walker = document.createTreeWalker(hero.subtitle, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const text = walker.currentNode as Text;
    const style = getComputedStyle(text.parentElement ?? hero.subtitle);
    let offset = 0;

    for (const value of graphemes(text.data)) {
      const start = offset;
      offset += value.length;
      if (/^\s+$/u.test(value)) continue;

      const range = document.createRange();
      range.setStart(text, start);
      range.setEnd(text, offset);
      const bounds = range.getBoundingClientRect();
      const character = document.createElement("span");
      character.className = "transition-overlay-character";
      character.textContent = value;
      Object.assign(character.style, {
        left: `${bounds.left - panelBounds.left}px`,
        top: `${bounds.top - panelBounds.top}px`,
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontStyle: style.fontStyle,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
      });
      overlay.append(character);
      characters.push(character);
    }
  }

  document.body.append(overlay);
  return { overlay, characters };
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

function heroExit(
  hero: Hero,
  origin: Point,
): { animations: Animation[]; overlay: HTMLElement | null } {
  const subtitle = copySubtitle(hero);
  const characters = [...titleCharacters(hero), ...subtitle.characters];
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
          duration: timing.exit,
          delay: Math.round(ratio * timing.exitStagger),
          easing: "cubic-bezier(0.12, 0.75, 0.2, 1)",
          fill: "forwards",
        },
      );
    },
  );
  return { animations, overlay: subtitle.overlay };
}

function heroEntry(hero: Hero): Animation[] {
  hero.title.style.animation = "none";
  if (hero.subtitle) hero.subtitle.style.animation = "none";

  const characters = titleCharacters(hero);
  const lastDelay = Math.min(
    Math.max(characters.length - 1, 0) * timing.enterStagger,
    timing.enterStaggerLimit,
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
        duration: timing.enter,
        delay:
          timing.enterDelay +
          Math.min(index * timing.enterStagger, timing.enterStaggerLimit),
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
          duration: timing.subtitle,
          delay:
            timing.enterDelay + lastDelay + timing.enter - timing.subtitleLead,
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
        duration: timing.panel,
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
  let overlay: HTMLElement | null = null;
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
    overlay?.remove();
    overlay = null;
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
      ...fade(hero.extras, true, timing.extraIn, 105),
      ...fade(content(), true, timing.contentIn, contentDelay),
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
          duration: timing.quickOut,
          easing: "ease-in",
          fill: "forwards",
        }),
      ];
      await waitFor(animations, timing.quickOut + 15);
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

      const exit = heroExit(hero, origin);
      overlay = exit.overlay;
      if (hero.subtitle) hero.subtitle.style.opacity = "0";
      animations = [
        ...exit.animations,
        ...fade(hero.extras, false, timing.extraOut, 0),
        ...fade(content(), false, 130, 0, "ease-in-out"),
      ];
      await waitFor(animations, timing.exit + timing.exitStagger + 10);
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
