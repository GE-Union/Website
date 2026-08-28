export function initReelEntrances(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const reels = document.querySelector<HTMLElement>("[data-reels]");
  if (!reels) return;
  const imagesReady = Promise.allSettled(
    Array.from(reels.querySelectorAll("img"), (image) => image.decode()),
  );
  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      await imagesReady;
      reels.classList.add("is-visible");
    },
    { threshold: 0.15 },
  );

  observer.observe(reels);
}
