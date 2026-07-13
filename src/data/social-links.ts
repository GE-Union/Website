/**
 * Footer social destinations, unchanged from the legacy site.
 * `newTab` mirrors legacy behavior: Reddit opened in the same tab there,
 * so it still does. New-tab links get rel="noopener noreferrer" when rendered.
 */

export interface SocialLink {
  readonly name: string;
  readonly href: string;
  readonly icon: string;
  readonly newTab: boolean;
}

export const socialLinks: readonly SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ge.union/",
    icon: "/assets/icons/soc-insta.svg",
    newTab: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/GE-Union/61573069635006/?_rdr",
    icon: "/assets/icons/soc-facebook.svg",
    newTab: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/groups/10061020/",
    icon: "/assets/icons/soc-linkedin.svg",
    newTab: true,
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/r/DTU/",
    icon: "/assets/icons/soc-reddit.svg",
    newTab: false,
  },
];
