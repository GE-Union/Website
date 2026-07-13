import { describe, expect, it } from "vitest";
import {
  allRemoteImages,
  carouselImages,
  dataEndpoints,
  reelPreviews,
} from "../../src/data/external-assets";

// The asset policy requires remote assets to stay at their exact current
// URLs. These tests keep the registry well-formed so page code and the
// check:assets script can rely on it.
describe("external asset registry", () => {
  const allUrls = [...allRemoteImages, ...Object.values(dataEndpoints)];

  it("uses https for every remote URL", () => {
    for (const url of allUrls) {
      expect(url, url).toMatch(/^https:\/\//);
    }
  });

  it("contains no duplicate image URLs", () => {
    expect(new Set(allRemoteImages).size).toBe(allRemoteImages.length);
  });

  it("keeps the audited inventory sizes (11 carousel, 6 reels)", () => {
    expect(carouselImages).toHaveLength(11);
    expect(reelPreviews).toHaveLength(6);
  });

  it("keeps GitHub raster URLs in ?raw=true form so they redirect to the file", () => {
    for (const url of [...carouselImages, ...reelPreviews]) {
      expect(url, url).toMatch(
        /^https:\/\/github\.com\/GE-Union\/.+\?raw=true$/,
      );
    }
  });
});
