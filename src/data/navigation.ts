/**
 * Single source of truth for site navigation. Every internal route the
 * shell links to is declared here; components never hard-code hrefs.
 */

/** All internal routes the site serves. */
export type Route =
  | "/"
  | "/course-bank"
  | "/calendar"
  | "/about-ge"
  | "/about-geu"
  | "/about-dtu"
  | "/introduction"
  | "/minecraft";

export interface NavLink {
  readonly label: string;
  readonly href: Route;
  /**
   * Rendering quirks preserved from the legacy nav:
   * - "hide" removes the whole link below 768px (the Home link — the logo
   *   covers it on small screens).
   * - "shorten" hides a "Course " prefix below 768px so the link reads "Bank".
   */
  readonly narrowViewport?: "hide" | "shorten";
}

/** Top-bar links rendered before the About menu. */
export const primaryNavLinks: readonly NavLink[] = [
  { label: "Home", href: "/", narrowViewport: "hide" },
  { label: "Course Bank", href: "/course-bank", narrowViewport: "shorten" },
  { label: "Calendar", href: "/calendar" },
];

/** Links inside the About disclosure menu (legacy: JS-only tooltip). */
export const aboutMenuLinks: readonly NavLink[] = [
  { label: "General Engineering", href: "/about-ge" },
  { label: "DTU", href: "/about-dtu" },
  { label: "GE Union", href: "/about-geu" },
];

/** Links in the mobile drawer, in legacy order (includes /introduction). */
export const mobileMenuLinks: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Course Bank", href: "/course-bank" },
  { label: "Calendar", href: "/calendar" },
  { label: "Dashboard", href: "/introduction" },
  { label: "About GE", href: "/about-ge" },
  { label: "About DTU", href: "/about-dtu" },
  { label: "About GE Union", href: "/about-geu" },
];
