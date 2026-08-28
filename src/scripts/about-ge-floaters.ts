export function initAboutGeFloaters() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.querySelector<HTMLElement>(".about-ge-content");
  const sprite = document
    .querySelector<SVGUseElement>(".floater use")
    ?.getAttribute("href")
    ?.split("#")[0];
  if (!root || !sprite) return;

  void fetch(sprite)
    .then(async (response) => {
      if (!response.ok) return;
      await response.arrayBuffer();
      requestAnimationFrame(() => root.classList.add("floaters-ready"));
    })
    .catch(() => {});

  const wideLayout = window.matchMedia("(min-width: 1100px)");
  const floaters = Array.from(
    document.querySelectorAll<HTMLElement>(".floater"),
  ).map((element) => {
    const size = Number.parseFloat(element.style.getPropertyValue("--size"));
    return [element, 0.04 + ((size - 26) / 19) * 0.12] as const;
  });

  let animationFrame = 0;

  const render = () => {
    const scrollY = window.scrollY;
    for (const [element, rate] of floaters) {
      element.style.translate = `0 ${(-scrollY * rate).toFixed(2)}px`;
    }

    animationFrame = 0;
  };

  const scheduleRender = () => {
    if (wideLayout.matches && !animationFrame)
      animationFrame = requestAnimationFrame(render);
  };

  scheduleRender();
  window.addEventListener("scroll", scheduleRender, { passive: true });
  wideLayout.addEventListener("change", scheduleRender);
}
