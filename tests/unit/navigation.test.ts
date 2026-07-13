import { describe, expect, it } from "vitest";
import {
  aboutMenuLinks,
  mobileMenuLinks,
  primaryNavLinks,
} from "../../src/data/navigation";

// Prompt 03 requirement: the navigation must contain normal links to
// these six routes. The data module is the single source components
// render from, so the guarantee is enforced here.
const requiredRoutes = [
  "/",
  "/course-bank",
  "/calendar",
  "/about-geu",
  "/about-ge",
  "/about-dtu",
] as const;

describe("navigation data", () => {
  it("covers the six required routes across top bar + About menu", () => {
    const hrefs = [...primaryNavLinks, ...aboutMenuLinks].map((l) => l.href);
    for (const route of requiredRoutes) {
      expect(hrefs).toContain(route);
    }
  });

  it("keeps the legacy mobile drawer list (7 links incl. Dashboard)", () => {
    expect(mobileMenuLinks.map((l) => l.href)).toEqual([
      "/",
      "/course-bank",
      "/calendar",
      "/introduction",
      "/about-ge",
      "/about-dtu",
      "/about-geu",
    ]);
  });

  it("has no duplicate hrefs within a list", () => {
    for (const list of [primaryNavLinks, aboutMenuLinks, mobileMenuLinks]) {
      const hrefs = list.map((l) => l.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
    }
  });
});
