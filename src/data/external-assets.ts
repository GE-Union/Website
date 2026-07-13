/**
 * Single source of truth for every remote URL the site uses at runtime.
 *
 * Policy (see docs/CLAUDE.md):
 * - Remote raster assets stay at their exact current URLs during the
 *   fidelity migration. Render them with plain <img> tags — no optimizer,
 *   proxy, downloader, or committed copies.
 * - `npm run check:assets` verifies every URL here still responds.
 *
 * The URL inventory comes from docs/migration-audit.md (2026-07-13).
 */

/** Remote raster images shown in the home/about carousels. */
export const carouselImages = [
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/1.jpg?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/2.jpg?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/3.jpg?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/4.jpg?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/5.jpg?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/6.jpg?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/Events.JPG?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/Leadership.JPG?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/Marketing.JPG?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/Partnerships.JPG?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/home-carousel/Website.JPG?raw=true",
] as const;

/** Remote previews for the Instagram reel strip. */
export const reelPreviews = [
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/reel-previews/reel1.png?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/reel-previews/reel2.png?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/reel-previews/reel3.png?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/reel-previews/reel4.png?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/reel-previews/reel5.png?raw=true",
  "https://github.com/GE-Union/WebsiteContent/blob/main/images/reel-previews/reel6.png?raw=true",
] as const;

/** ECTS distribution chart on /about-ge, hosted by DTU. */
export const dtuEctsChart =
  "https://student.dtu.dk/-/media/subsites/studieordninger/general-engineering/ge-ects-fordeling.png";

/**
 * Remote data endpoints fetched by page scripts.
 * Note: introductionQna returned 404 at audit time (docs/migration-audit.md);
 * the loader that used it was already dead on the legacy site.
 */
export const dataEndpoints = {
  aboutGeQna:
    "https://raw.githubusercontent.com/GE-Union/WebsiteContent/main/AboutGE/QnA.json",
  introductionQna:
    "https://raw.githubusercontent.com/GE-Union/WebsiteContent/main/Introduction/QnA.json",
  courseBankStructure:
    "https://raw.githubusercontent.com/GE-Union/CourseBank/main/structure.json",
  courseBankRawBase:
    "https://raw.githubusercontent.com/GE-Union/CourseBank/main/",
} as const;

/** Every remote image URL, for the check:assets script and tests. */
export const allRemoteImages: readonly string[] = [
  ...carouselImages,
  ...reelPreviews,
  dtuEctsChart,
];
