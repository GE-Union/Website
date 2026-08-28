const AUTOPLAY_MS = 3000;
const SWIPE_VELOCITY = 0.5;

interface DragState {
  pointerId: number;
  startX: number;
  startTime: number;
  origin: number;
}

export function initCarousels(): void {
  document
    .querySelectorAll<HTMLElement>("[data-carousel]")
    .forEach(initCarousel);
}

export function initCarousel(root: HTMLElement): void {
  if (root.dataset.ready === "true") return;

  const originals = [
    ...root.querySelectorAll<HTMLElement>("[data-carousel-slide]"),
  ];
  const viewport = root.querySelector<HTMLElement>("[data-carousel-viewport]");
  const track = root.querySelector<HTMLElement>("[data-carousel-track]");
  const previous = root.querySelector<HTMLButtonElement>(
    "[data-carousel-previous]",
  );
  const next = root.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const status = root.querySelector<HTMLElement>("[data-carousel-status]");

  if (!originals.length || !viewport || !track || !previous || !next) return;

  root.dataset.ready = "true";

  let logicalIndex = 0;
  let physicalIndex = originals.length > 1 ? originals.length : 0;
  let translate = 0;
  let timer: number | undefined;
  let drag: DragState | undefined;
  let hovered = false;
  let focusWithin = false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const makeClone = (source: HTMLElement): HTMLElement => {
    const clone = source.cloneNode(true) as HTMLElement;
    clone.removeAttribute("data-carousel-slide");
    clone.removeAttribute("data-active");
    clone.setAttribute("data-carousel-clone", "");
    clone.setAttribute("aria-hidden", "true");
    clone
      .querySelectorAll<HTMLElement>("[id]")
      .forEach((element) => element.removeAttribute("id"));
    return clone;
  };

  if (originals.length > 1) {
    track.prepend(...originals.map(makeClone));
    track.append(...originals.map(makeClone));
  } else {
    previous.hidden = true;
    next.hidden = true;
  }

  const allSlides = (): HTMLElement[] => [
    ...track.querySelectorAll<HTMLElement>(".slide"),
  ];

  const targetTranslate = (): number => {
    const active = allSlides()[physicalIndex];
    if (!active) return translate;
    return (
      viewport.clientWidth / 2 - (active.offsetLeft + active.offsetWidth / 2)
    );
  };

  const setTransition = (enabled: boolean): void => {
    track.style.transition = enabled ? "" : "none";
  };

  const setTranslate = (value: number): void => {
    translate = value;
    track.style.transform = `translate3d(${value}px, 0, 0)`;
  };

  const currentTranslate = (): number => {
    const transform = window.getComputedStyle(track).transform;
    return transform === "none"
      ? translate
      : new DOMMatrixReadOnly(transform).m41;
  };

  const updateActiveSlide = (): void => {
    allSlides().forEach((slide, index) => {
      if (index === physicalIndex) slide.setAttribute("data-active", "true");
      else slide.removeAttribute("data-active");
    });
    originals.forEach((slide, index) => {
      if (index === logicalIndex) slide.removeAttribute("aria-hidden");
      else slide.setAttribute("aria-hidden", "true");
    });
  };

  const render = (animated: boolean): void => {
    setTransition(animated && !reduceMotion.matches);
    updateActiveSlide();
    setTranslate(targetTranslate());
  };

  const announce = (): void => {
    if (status)
      status.textContent = `Image ${logicalIndex + 1} of ${originals.length}`;
  };

  const normaliseBoundary = (): void => {
    if (originals.length < 2) return;
    const step = originals[1].offsetLeft - originals[0].offsetLeft;
    const cycleWidth = step * originals.length;
    const visibleTranslate = currentTranslate();

    if (physicalIndex < originals.length) {
      physicalIndex += originals.length;
      setTransition(false);
      root.dataset.normalising = "true";
      updateActiveSlide();
      setTranslate(visibleTranslate - cycleWidth);
      void track.offsetWidth;
      delete root.dataset.normalising;
    } else if (physicalIndex >= originals.length * 2) {
      physicalIndex -= originals.length;
      setTransition(false);
      root.dataset.normalising = "true";
      updateActiveSlide();
      setTranslate(visibleTranslate + cycleWidth);
      void track.offsetWidth;
      delete root.dataset.normalising;
    }
  };

  const stop = (): void => {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
    root.dataset.autoplay = "paused";
  };

  const canAutoplay = (): boolean =>
    originals.length > 1 &&
    !reduceMotion.matches &&
    !hovered &&
    !focusWithin &&
    !drag &&
    document.visibilityState === "visible";

  const start = (): void => {
    stop();
    if (!canAutoplay()) return;
    timer = window.setInterval(() => move(1, false), AUTOPLAY_MS);
    root.dataset.autoplay = "playing";
  };

  const move = (delta: -1 | 1, shouldAnnounce = true): void => {
    normaliseBoundary();
    logicalIndex = (logicalIndex + delta + originals.length) % originals.length;
    physicalIndex += delta;
    render(true);
    if (shouldAnnounce) announce();
  };

  const finishDrag = (event: PointerEvent, cancelled = false): void => {
    if (!drag || event.pointerId !== drag.pointerId) return;

    const distance = event.clientX - drag.startX;
    const duration = Math.max(performance.now() - drag.startTime, 1);
    const velocity = distance / duration;
    const threshold = Math.min(60, originals[0].offsetWidth * 0.15);
    const shouldMove =
      !cancelled &&
      (Math.abs(distance) >= threshold ||
        (Math.abs(distance) >= 12 && Math.abs(velocity) >= SWIPE_VELOCITY));

    if (viewport.hasPointerCapture(event.pointerId))
      viewport.releasePointerCapture(event.pointerId);
    drag = undefined;
    delete root.dataset.dragging;

    if (shouldMove) move(distance < 0 ? 1 : -1);
    else render(true);
    start();
  };

  previous.addEventListener("click", () => {
    move(-1);
    start();
  });
  next.addEventListener("click", () => {
    move(1);
    start();
  });

  root.addEventListener("mouseenter", () => {
    hovered = true;
    stop();
  });
  root.addEventListener("mouseleave", () => {
    hovered = false;
    start();
  });
  root.addEventListener("focusin", () => {
    focusWithin = true;
    stop();
  });
  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget as Node | null)) return;
    focusWithin = false;
    start();
  });
  root.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
    start();
  });

  viewport.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0 || originals.length < 2) return;
    normaliseBoundary();
    const visibleTranslate = currentTranslate();
    setTransition(false);
    setTranslate(visibleTranslate);
    drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTime: performance.now(),
      origin: visibleTranslate,
    };
    viewport.setPointerCapture(event.pointerId);
    root.dataset.dragging = "true";
    stop();
  });
  viewport.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    setTranslate(drag.origin + event.clientX - drag.startX);
  });
  viewport.addEventListener("pointerup", (event) => finishDrag(event));
  viewport.addEventListener("pointercancel", (event) =>
    finishDrag(event, true),
  );

  track.addEventListener("transitionend", (event) => {
    if (event.target === track && event.propertyName === "transform")
      normaliseBoundary();
  });

  const resizeObserver = new ResizeObserver(() => render(false));
  resizeObserver.observe(viewport);

  reduceMotion.addEventListener("change", () => {
    render(false);
    start();
  });
  document.addEventListener("visibilitychange", start);

  render(false);
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}
