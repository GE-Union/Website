/**
 * Local image paths used by the shared shell. The files are byte-identical
 * copies of the legacy export assets; the old → new path mapping lives in
 * docs/external-assets.md.
 */

export const localAssets = {
  /** Header logo, all pages except /minecraft (legacy GE_Logo_-_Big). */
  geLogoBig: "/assets/logos/ge-logo-big.svg",
  /** Pixel-art header logo for /minecraft (legacy geu-logo-pixel). */
  geuLogoPixel: "/assets/logos/geu-logo-pixel.svg",
  /** Footer icon, rendered inverted (legacy GEU_Icon_1). */
  geuIcon: "/assets/logos/geu-icon.svg",
  /** CTA arrow glyph (legacy Arrow_…). */
  arrow: "/assets/icons/arrow.svg",
  /** Site favicon (legacy 270 KB .ico, kept for fidelity — revisit). */
  favicon: "/assets/favicon.ico",
} as const;
