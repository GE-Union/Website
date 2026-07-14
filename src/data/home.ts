import { carouselImages, reelPreviews } from "./external-assets";

export const homeCarousel = [
  { src: carouselImages[0], caption: "The GE Union team" },
  { src: carouselImages[1], caption: "Gift for support tutors" },
  { src: carouselImages[2], caption: "GEU event pizza break" },
  { src: carouselImages[3], caption: "Maths brush-up course" },
  { src: carouselImages[4], caption: "Bar staff at GE Grill" },
  { src: carouselImages[5], caption: "GE Grill event" },
] as const;

export const homeReels = reelPreviews.map((src, index) => ({
  src,
  alt: `GE Union Instagram reel preview ${index + 1}`,
}));

export const applicationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScu14PgRWRO-iJ6uEs9s8lNS5QsuPb0HNvI8OY9KIkB9he5VQ/viewform?usp=header";
