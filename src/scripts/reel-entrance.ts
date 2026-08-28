export function initReelEntrances(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll<HTMLElement>("[data-reels]").forEach((reels) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        reels.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(reels);
  });
}
