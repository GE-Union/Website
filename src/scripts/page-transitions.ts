const STORAGE_KEY = "geu-page-transition";
const TOP_THRESHOLD = 0.2;
const HERO_EXIT_DURATION_MS = 125;
const HERO_EXIT_STAGGER_MS = 45;
const QUICK_EXIT_DURATION_MS = 70;

type TransitionMode = "hero" | "quick";

interface Point {
  x: number;
  y: number;
}

interface PreparedHero {
  title: HTMLElement;
  subtitle: HTMLElement | null;
  titleCharacters: HTMLElement[];
  allCharacters: HTMLElement[];
}

function isInternalPageLink(
  event: MouseEvent,
  anchor: HTMLAnchorElement,
): URL | null {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    anchor.hasAttribute("download") ||
    (anchor.target && anchor.target !== "_self")
  ) {
    return null;
  }

  const url = new URL(anchor.href, window.location.href);
  const sameDocument =
    url.pathname === window.location.pathname &&
    url.search === window.location.search;

  if (
    url.origin !== window.location.origin ||
    !["http:", "https:"].includes(url.protocol) ||
    sameDocument
  ) {
    return null;
  }

  return url;
}

function splitGraphemes(value: string): string[] {
  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }

  return Array.from(value);
}

function splitElement(element: HTMLElement): HTMLElement[] {
  if (
    element.dataset.transitionTextReady === "true" &&
    element.querySelector(".transition-text-visual")
  ) {
    return Array.from(
      element.querySelectorAll<HTMLElement>(".transition-char"),
    );
  }

  const visual = document.createElement("span");
  visual.className = "transition-text-visual";

  while (element.firstChild) visual.append(element.firstChild);
  element.append(visual);

  const walker = document.createTreeWalker(visual, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

  for (const textNode of textNodes) {
    const fragment = document.createDocumentFragment();
    const parts = textNode.data.split(/(\s+)/u).filter(Boolean);

    for (const part of parts) {
      if (/^\s+$/u.test(part)) {
        fragment.append(document.createTextNode(part));
        continue;
      }

      const word = document.createElement("span");
      word.className = "transition-word";
      for (const grapheme of splitGraphemes(part)) {
        const character = document.createElement("span");
        character.className = "transition-char";
        character.textContent = grapheme;
        word.append(character);
      }
      fragment.append(word);
    }

    textNode.replaceWith(fragment);
  }

  element.dataset.transitionTextReady = "true";
  return Array.from(element.querySelectorAll<HTMLElement>(".transition-char"));
}

function prepareHero(): PreparedHero | null {
  const title = document.querySelector<HTMLElement>("[data-transition-title]");
  if (!title) return null;

  const subtitle = document.querySelector<HTMLElement>(
    "[data-transition-subtitle]",
  );
  const titleCharacters = splitElement(title);
  const subtitleCharacters = subtitle ? splitElement(subtitle) : [];

  return {
    title,
    subtitle,
    titleCharacters,
    allCharacters: [...titleCharacters, ...subtitleCharacters],
  };
}

function clickPoint(event: MouseEvent, anchor: HTMLAnchorElement): Point {
  if (event.detail !== 0 && (event.clientX !== 0 || event.clientY !== 0)) {
    return { x: event.clientX, y: event.clientY };
  }

  const bounds = anchor.getBoundingClientRect();
  return {
    x: bounds.left + bounds.width / 2,
    y: bounds.top + bounds.height / 2,
  };
}

function isNearTop(): boolean {
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
  return window.scrollY <= viewportHeight * TOP_THRESHOLD;
}

function deterministicRandom(index: number, origin: Point): number {
  const value = Math.sin(
    (index + 1) * 12.9898 + origin.x * 0.018 + origin.y * 0.033,
  );
  const scaled = value * 43758.5453;
  return scaled - Math.floor(scaled);
}

function waitForAnimations(
  animations: Animation[],
  timeoutMs: number,
): Promise<void> {
  const finished = Promise.allSettled(
    animations.map((animation) => animation.finished),
  ).then(() => undefined);
  const timeout = new Promise<void>((resolve) => {
    window.setTimeout(resolve, timeoutMs);
  });
  return Promise.race([finished, timeout]);
}

function animateHeroExit(hero: PreparedHero, origin: Point): Animation[] {
  const measurements = hero.allCharacters.map((character) => {
    const bounds = character.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    return {
      character,
      distance: Math.hypot(x - origin.x, y - origin.y),
      angle: Math.atan2(y - origin.y, x - origin.x),
    };
  });
  const distances = measurements.map(({ distance }) => distance);
  const minimumDistance = Math.min(...distances);
  const maximumDistance = Math.max(...distances);
  const distanceRange = Math.max(maximumDistance - minimumDistance, 1);

  return measurements.map(({ character, distance, angle }, index) => {
    const distanceRatio = (distance - minimumDistance) / distanceRange;
    const random = deterministicRandom(index, origin);
    const angleWithJitter = angle + (random - 0.5) * 0.28;
    const travel = 42 + (1 - distanceRatio) * 14 + random * 7;
    const x = Math.cos(angleWithJitter) * travel;
    const y = Math.sin(angleWithJitter) * travel;
    const rotation = (random - 0.5) * 12;
    const delay = Math.round(distanceRatio * HERO_EXIT_STAGGER_MS);
    const animation = character.animate(
      [
        { opacity: 1, transform: "translate(0, 0) rotate(0) scale(1)" },
        {
          opacity: 0,
          transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rotation.toFixed(2)}deg) scale(0.96)`,
        },
      ],
      {
        duration: HERO_EXIT_DURATION_MS,
        delay,
        easing: "cubic-bezier(0.2, 0.8, 0.4, 1)",
        fill: "forwards",
      },
    );
    animation.id = "geu-hero-character-exit";
    return animation;
  });
}

function animateHeroEntry(hero: PreparedHero): Animation[] {
  hero.title.style.animation = "none";
  hero.title.style.opacity = "1";
  if (hero.subtitle) {
    hero.subtitle.style.animation = "none";
    hero.subtitle.style.opacity = "1";
  }

  const animations = hero.titleCharacters.map((character, index) => {
    const animation = character.animate(
      [
        { opacity: 0, transform: "translateY(3px) scale(0.88)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      {
        duration: 125,
        delay: Math.min(index * 6, 54),
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "both",
      },
    );
    animation.id = "geu-hero-character-enter";
    return animation;
  });

  if (hero.subtitle) {
    const animation = hero.subtitle.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 120,
      delay: 25,
      easing: "ease-out",
      fill: "both",
    });
    animation.id = "geu-hero-subtitle-enter";
    animations.push(animation);
  }

  return animations;
}

function animateQuickExit(): Animation {
  const originY = window.scrollY + window.innerHeight / 2;
  const animation = document.body.animate(
    [
      { opacity: 1, transform: "scale(1)" },
      { opacity: 0, transform: "scale(0.992)" },
    ],
    {
      duration: QUICK_EXIT_DURATION_MS,
      easing: "ease-in",
      fill: "forwards",
    },
  );
  document.body.style.transformOrigin = `50% ${originY}px`;
  animation.id = "geu-page-quick-exit";
  return animation;
}

function storeTransition(mode: TransitionMode): void {
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ mode, createdAt: Date.now() }),
    );
  } catch {
    // The outgoing animation still works in strict privacy modes.
  }
}

export function initPageTransitions(): () => void {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let hero: PreparedHero | null = null;
  let navigationLocked = false;
  let activeAnimations: Animation[] = [];
  let settleTimer: number | undefined;

  const clearElementOverrides = () => {
    if (hero) {
      hero.title.style.removeProperty("animation");
      hero.title.style.removeProperty("opacity");
      hero.subtitle?.style.removeProperty("animation");
      hero.subtitle?.style.removeProperty("opacity");
    }
    document.body.style.removeProperty("transform-origin");
  };

  const settle = (mode?: TransitionMode) => {
    for (const animation of activeAnimations) animation.cancel();
    activeAnimations = [];
    if (settleTimer !== undefined) window.clearTimeout(settleTimer);
    settleTimer = undefined;
    clearElementOverrides();
    root.dataset.pageTransition = "complete";
    root.removeAttribute("data-transition-origin-x");
    root.removeAttribute("data-transition-origin-y");
    if (mode) root.dataset.lastPageTransition = mode;
  };

  const runIncomingTransition = async () => {
    const state = root.dataset.pageTransition;
    if (state !== "hero-enter" && state !== "quick-enter") return;
    const mode: TransitionMode = state === "hero-enter" ? "hero" : "quick";

    if (reducedMotion.matches) {
      settle(mode);
      return;
    }

    if (mode === "hero") {
      hero = prepareHero();
    }

    if (mode === "hero" && hero) {
      activeAnimations = animateHeroEntry(hero);
      await waitForAnimations(activeAnimations, 200);
      settle(mode);
      return;
    }

    settleTimer = window.setTimeout(() => settle("quick"), 105);
  };

  void runIncomingTransition();

  const onClick = async (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest<HTMLAnchorElement>("a[href]");
    if (!anchor) return;

    const url = isInternalPageLink(event, anchor);
    if (!url || reducedMotion.matches || navigationLocked) return;

    event.preventDefault();
    navigationLocked = true;

    const outgoingHero = prepareHero();
    const destinationIsInner = url.pathname !== "/";
    const mode: TransitionMode =
      outgoingHero && destinationIsInner && isNearTop() ? "hero" : "quick";
    storeTransition(mode);
    root.dataset.pageTransition = `${mode}-exit`;
    root.dataset.lastPageTransition = mode;

    if (mode === "hero" && outgoingHero) {
      hero = outgoingHero;
      const origin = clickPoint(event, anchor);
      root.dataset.transitionOriginX = String(Math.round(origin.x));
      root.dataset.transitionOriginY = String(Math.round(origin.y));
      activeAnimations = animateHeroExit(outgoingHero, origin);
      await waitForAnimations(
        activeAnimations,
        HERO_EXIT_DURATION_MS + HERO_EXIT_STAGGER_MS + 20,
      );
    } else {
      activeAnimations = [animateQuickExit()];
      await waitForAnimations(activeAnimations, QUICK_EXIT_DURATION_MS + 15);
    }

    window.location.assign(url.href);
  };

  const onPageShow = (event: PageTransitionEvent) => {
    if (!event.persisted) return;

    navigationLocked = false;
    settle();
    if (reducedMotion.matches) return;

    root.dataset.pageTransition = "quick-enter";
    root.dataset.lastPageTransition = "quick";
    const animation = document.body.animate(
      [
        { opacity: 0, transform: "scale(0.992)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 85, easing: "ease-out", fill: "both" },
    );
    animation.id = "geu-page-history-enter";
    activeAnimations = [animation];
    void waitForAnimations(activeAnimations, 100).then(() => settle("quick"));
  };

  document.addEventListener("click", onClick);
  window.addEventListener("pageshow", onPageShow);

  return () => {
    document.removeEventListener("click", onClick);
    window.removeEventListener("pageshow", onPageShow);
    settle();
  };
}
