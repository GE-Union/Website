import dtuLogo from "../assets/about/dtu-logo.svg";
import idaLogo from "../assets/about/ida.webp";
import pfLogo from "../assets/about/pf.webp";
import specialisations from "../assets/about/specialisations.svg";
import favicon from "../assets/favicon.png";
import homeIcons from "../assets/icons/home.svg";
import siteIcons from "../assets/icons/site.svg";
import geLogoBig from "../assets/logos/ge-logo-big.svg";

export const localAssets = {
  geLogoBig: geLogoBig.src,
  siteIcons: siteIcons.src,
  homeIcons: homeIcons.src,
  dtuLogo: dtuLogo.src,
  pfLogo: pfLogo.src,
  idaLogo: idaLogo.src,
  specialisations: specialisations.src,
  favicon: favicon.src,
} as const;
