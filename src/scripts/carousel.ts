const AUTOPLAY_MS = 3000;

export function initCarousels(): void {
  document
    .querySelectorAll<HTMLElement>("[data-carousel]")
    .forEach(initCarousel);
}

export function initCarousel(root: HTMLElement): void {
  if (root.dataset.ready === "true") return;
  root.dataset.ready = "true";
  const slides = [
    ...root.querySelectorAll<HTMLElement>("[data-carousel-slide]"),
  ];
  const track = root.querySelector<HTMLElement>("[data-carousel-track]");
  const previous = root.querySelector<HTMLButtonElement>(
    "[data-carousel-previous]",
  );
  const next = root.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const status = root.querySelector<HTMLElement>("[data-carousel-status]");
  if (!slides.length || !track || !previous || !next) return;

  let index = 0;
  let timer: number | undefined;
  let pointerStart: number | undefined;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const render = (announce = false) => {
    track.style.setProperty("--slide-index", String(index));
    slides.forEach((slide, slideIndex) =>
      slide.toggleAttribute("aria-hidden", slideIndex !== index),
    );
    if (announce && status)
      status.textContent = `Image ${index + 1} of ${slides.length}`;
  };
  const move = (delta: number, announce = true) => {
    index = (index + delta + slides.length) % slides.length;
    render(announce);
  };
  const stop = () => {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
    root.dataset.autoplay = "paused";
  };
  const start = () => {
    stop();
    if (
      !reduceMotion.matches &&
      !root.matches(":hover") &&
      !root.contains(document.activeElement)
    ) {
      timer = window.setInterval(() => move(1, false), AUTOPLAY_MS);
      root.dataset.autoplay = "playing";
    }
  };

  previous.addEventListener("click", () => {
    move(-1);
    start();
  });
  next.addEventListener("click", () => {
    move(1);
    start();
  });
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget as Node | null)) start();
  });
  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  });
  root.addEventListener("pointerdown", (event) => {
    pointerStart = event.clientX;
    stop();
  });
  root.addEventListener("pointerup", (event) => {
    if (
      pointerStart !== undefined &&
      Math.abs(event.clientX - pointerStart) > 45
    )
      move(event.clientX < pointerStart ? 1 : -1);
    pointerStart = undefined;
    start();
  });
  root.addEventListener("pointercancel", () => {
    pointerStart = undefined;
    start();
  });
  reduceMotion.addEventListener("change", () => {
    if (reduceMotion.matches) stop();
    else start();
  });
  render();
  start();
}
