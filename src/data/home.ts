import { carouselImages, reelPreviews } from "./external-assets";

export const homeCarousel = [
  { src: carouselImages[0], caption: "The GE Union team" },
  { src: carouselImages[1], caption: "Gift for support tutors" },
  { src: carouselImages[2], caption: "GEU event pizza break" },
  { src: carouselImages[3], caption: "Maths brush-up course" },
  { src: carouselImages[4], caption: "Bar staff at GE Grill" },
  { src: carouselImages[5], caption: "GE Grill event" },
] as const;

export const homeReels = reelPreviews;

export const homeSocialBlocks = [
  {
    title: "Instagram",
    text: "Follow us on Instagram for job postings, epic events, memes, and all the GE vibes you need!",
    label: "See on Instagram",
    href: "https://www.instagram.com/ge.union/",
  },
  {
    title: "LinkedIn",
    text: "A community connecting students and graduates! This space helps with career support, job searches, industry insights, and student-relevant job postings from alumni.",
    label: "LinkedIn Network",
    href: "https://www.linkedin.com/company/ge-union",
  },
  {
    title: "Reddit",
    text: "We’re also active on the DTU subreddit! Look out for the GE flair, where we answer questions from future GE students about housing, finances, and student life at DTU.",
    label: "See on Reddit",
    href: "https://www.reddit.com/r/DTU/",
  },
  {
    title: "Facebook",
    text: "Follow us on Facebook for job postings, events, memes, and all the GE vibes you need!",
    label: "See on Facebook",
    href: "https://www.facebook.com/people/GE-Union/61573069635006/?_rdr",
  },
] as const;

export const applicationUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScu14PgRWRO-iJ6uEs9s8lNS5QsuPb0HNvI8OY9KIkB9he5VQ/viewform?usp=header";

export const contactEmail = "geunion.dtu@gmail.com";
