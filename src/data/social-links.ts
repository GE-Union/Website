export interface SocialLink {
  readonly name: string;
  readonly href: string;
  readonly icon: "instagram" | "facebook" | "linkedin" | "reddit";
  readonly newTab: boolean;
}

export const socialLinks: readonly SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ge.union/",
    icon: "instagram",
    newTab: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/GE-Union/61573069635006/?_rdr",
    icon: "facebook",
    newTab: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/groups/10061020/",
    icon: "linkedin",
    newTab: true,
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/r/DTU/",
    icon: "reddit",
    newTab: false,
  },
];
