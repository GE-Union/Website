/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { HtmlEmbed as HtmlEmbed, Box as Box, Text as Text, Span as Span, Image as Image, Button as Button } from "@webstudio-is/sdk-components-react";
import { Tabs as Tabs, TabsList as TabsList, TabsTrigger as TabsTrigger, TabsContent as TabsContent, Accordion as Accordion, AccordionItem as AccordionItem, AccordionHeader as AccordionHeader, AccordionTrigger as AccordionTrigger, AccordionContent as AccordionContent, Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-08-28T01:52:20.369Z";

      export const siteName = "GE Union";

      export const breakpoints = [{"id":"2EiFMEG40PBm9_fkelqpo"},{"id":"xOnFYyuZv5VkMeeKDLyiu","maxWidth":991},{"id":"Uvcw_OJqyPoLioZzUbP1x","maxWidth":767},{"id":"eCbcXJaLEKSKcnbAPzNF0","maxWidth":479}];

      export const favIconAsset: string | undefined =
        "Favicon_gtxnE_QXZldwugdMJXAuG.ico";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        []

      export const pageBackgroundImageAssets: string[] =
        []

      

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-element c1lzvaoj c1qux398`}>
<HtmlEmbed
code={"<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');\n@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');\n  \n  h1{\n    font-family: 'Tanker';\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_RyiWP8CNKOfskpwMp_P8Y.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script>\n  // 1) Configuration\n  if (typeof window.JSON_URL === 'undefined') {\n    window.JSON_URL = \"https://raw.githubusercontent.com/GE-Union/CourseBank/main/structure.json\";\n  }\n  if (typeof window.CACHE_KEY === 'undefined') {\n    window.CACHE_KEY = \"coursebank_structure_cache\";\n  }\n  if (typeof window.CACHE_TTL === 'undefined') {\n    window.CACHE_TTL = 90 * 60 * 1000; // 90 min\n  }\n  if (typeof window.EXT_COLORS === 'undefined') {\n    window.EXT_COLORS = {\n      PDF: \"#D32F2F\",\n      IPYNB: \"#F37C2F\",\n      ZIP: \"#595959\",\n      DOCX: \"#2A5699\",\n      XLSX: \"#1D6F42\",\n      PPTX: \"#D24726\",\n      TXT: \"#616161\",\n    };\n  }\n\n  \n  // 3) Helpers\n  async function fetchStructure() {\n    // try cache\n    const raw = localStorage.getItem(CACHE_KEY);\n    if (false) {\n      const { ts, data } = JSON.parse(raw);\n      if (Date.now() - ts < CACHE_TTL) {\n        return data;\n      }\n    }\n    // otherwise re-fetch\n    const res = await fetch(JSON_URL, { cache: \"no-store\" });\n    if (!res.ok) throw new Error(\"Failed to load structure.json\");\n    const data = await res.json();\n    localStorage.setItem(\n      CACHE_KEY,\n      JSON.stringify({ ts: Date.now(), data }),\n    );\n    return data;\n  }\n  \n  function getFolderData(structure, folderPath) {\n    const parts = folderPath.split(\"/\");\n    let cur = structure;\n    for (const p of parts) {\n      if (!(p in cur)) return null;\n      cur = cur[p];\n    }\n    return Array.isArray(cur) ? cur : null;\n  }\n  \n  function makeFileLink(folder, file) {\n    const container = document.createElement(\"div\");\n    container.className = \"custom-file-link\";\n  \n    // split name & author\n    const [rawName, rawAuth] = file.split(\"-a-\");\n    const filename = (rawName || file).replace(/_/g, \" \");\n    const author = rawAuth\n      ? rawAuth.replace(/_/g, \" \").replace(/\\.[^/.]+$/, \"\")\n      : \"Unknown\";\n  \n    const ext = file.split(\".\").pop().toUpperCase();\n  \n    const fullPath = `${folder}/${file}`;\n    const encodedPath = fullPath\n      .split('/')\n      .map(seg => encodeURIComponent(seg))\n      .join('/');\n  \n    const a = document.createElement('a');\n    if (['PDF'].includes(ext)) {\n      a.target = '_blank';\n      a.href = `https://raw.githubusercontent.com/GE-Union/CourseBank/main/${encodedPath}`;\n    } else {\n      a.setAttribute('download', \"\");\n      a.href = `https://raw.githubusercontent.com/GE-Union/CourseBank/main/${encodedPath}`; // direct download\n      //a.href = `https://geunion.dk/coursebank/${encodedPath}`;  // proxy script\n    }\n    a.style.display = 'flex';\n    a.style.alignItems = 'center';\n    a.style.width = '100%';\n    a.style.lineHeight = \"1.2\";\n  \n    // icon\n    const icon = document.createElement(\"div\");\n    icon.className = \"file-icon\";\n    const img = document.createElement(\"img\");\n    img.src =\n      \"https://raw.githubusercontent.com/GE-Union/CourseBank/main/res/file-icon.svg\";\n    img.alt = \"File Icon\";\n    icon.appendChild(img);\n  \n    const badge = document.createElement(\"div\");\n    badge.className = \"extension-badge\";\n    badge.textContent = ext;\n    badge.style.backgroundColor =\n      EXT_COLORS[ext] || \"var(--global-palette2,#1e73be)\";\n    icon.appendChild(badge);\n  \n    // details\n    const details = document.createElement(\"div\");\n    details.className = \"file-details\";\n    details.innerHTML = `<strong>${filename}</strong><span>${author}</span>`;\n  \n    // assemble\n    a.appendChild(icon);\n    a.appendChild(details);\n    container.appendChild(a);\n    return container;\n  }\n  \n  async function initFileLists() {\n    const holders = document.querySelectorAll(\".file-list\");\n    console.log(holders);\n    if (!holders.length) return;\n  \n    try {\n      const structure = await fetchStructure();\n      holders.forEach((holder) => {\n        const folder = holder.dataset.folder;\n        holder.innerHTML = \"\"; // clear “Loading…”\n        const files = getFolderData(structure, folder);\n        if (!files) {\n          holder.textContent = \"No notes found\";\n          return;\n        }\n        files.forEach((f) => holder.appendChild(makeFileLink(folder, f)));\n        console.log(`Populated ${folder}`);\n      });\n    } catch (err) {\n      console.error(err);\n      holders.forEach((holder) => {\n        holder.textContent = \"Unable to load course structure.\";\n      });\n    }\n  }\n  \n  document.addEventListener('DOMContentLoaded', () => {\n    requestAnimationFrame(() => {\n      setTimeout(function() {initFileLists();}, 500)\n    });\n  });\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n.file-list{\n  display: flex;\n  flex-wrap: wrap;\n  max-width: 850px\n}\n  \n.custom-file-link {\n  margin: 1em 0;\n  display: flex;\n  align-items: center;\n  max-width: 500px;\n  min-width: 300px;\n  transition: transform 0.1s;\n  height: 40px;\n  width: 50%;\n  flex-shrink: 0; flex-grow: 1;\n}\n.custom-file-link > a {\n  text-decoration: none;\n}\n\n.custom-file-link:hover {\n  transform: translateX(5px);\n  cursor: pointer;\n}.custom-file-link:hover .file-details strong {\n  color: var(--front-red-1) !important;\n}\n\n.file-icon {\n  margin-right: 10px;\n  width: 36px;\n  height: 36px;\n  position: relative;\n}\n\n.file-icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n\n.extension-badge {\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: white;\n  font-size: 10px;\n  font-weight: 500;\n  padding: 1px 2px;\n  border-radius: 2px;\n  margin-top: 13.5px;\n  margin-left: 1px;\n  pointer-events: none;\n}\n\n.file-details {\n  display: flex;\n  flex-direction: column;\n  width: calc(100% - 58px);\n}\n\n.file-details strong {\n  font-size: 1em;\n  font-weight: 500;\n  color: var(--front-1);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.file-details span {\n  font-size: 0.8em;\n  color: var(--front-3);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n</style>"}
className={`w-html-embed`} />
<Box
className={`w-box cck00sw cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1uz2t7q c4psa79 c1ldi832 ${"icon-background home-top"}`}>
<Box
className={`w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m`}>
<Link
href={"/"}
className={`w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c3gx87z cqyp7hg c1moglug`}>
<Image
src={"/assets/GE_Logo_-_Big_AQmTkCh-ue9Xfr1xXdV_k.svg"}
width={492}
height={684}
className={`w-image c1g1752z c1l3m6tn c1wjaqd0`} />
</Link>
<Box
className={`w-box ci03eyw c5zf3td c1bdekej cy2vnym cgykfac c8chaf1 crymv6m ch588tu cd1c1x2 cgjpuuk co3wgvm cjdg5q7`}>
<Link
href={"/"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1tj415q cycv0tm`}>
{"Home"}
</Link>
<Link
href={"/course-bank"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c1wmsojl c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1tj415q`}>
<span
className={`w-element cycv0tm`}>
{"Course "}
</span>
{"Bank"}
</Link>
<Link
href={"/calendar"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1tj415q`}>
{"Calendar"}
</Link>
<Tooltip
delayDuration={0}>
<TooltipTrigger>
<div
className={`w-element c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cbahl6h c1tj415q`}>
{"About"}
</div>
</TooltipTrigger>
<TooltipContent
className={`w-tooltip-content c5mlbae cm1ds2c c1fxgukz cdzo1k7 c1lp7lun c3ryv7d c1t11c95 c1kz25wt c1jbi97f crebcbz cfjpsss ci03eyw cu8ogtt c4bgnbx cj82r57 c14a5ioc cm4j335`}>
<Link
href={"/about-ge"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q`}>
{"General Engineering"}
</Link>
<Link_1
href={"/about-dtu"}
className={`w-element c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht cz03vb2 cqo7rnh cz5lin5 c1tj415q`}>
{"DTU"}
</Link_1>
<Link
href={"/about-geu"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q`}>
{"GE Union"}
</Link>
</TooltipContent>
</Tooltip>
</Box>
<Dialog
open={false}>
<DialogTrigger>
<Button
className={`w-button cvuh4zx c1v4vkm5 c1bti4b5 c1jbi97f crebcbz cr2ujrk ciidiay c1kf82bd c7jsqgj ctcp1cq c1r8lktc c1t9gjz2 c7jkqej cn1fibt cnwk8w7 c10ybtws cdxgxee c1wmsojl co1yi26 c1vk95sq c12eb7ae`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5px\" d=\"M2.667 8h10.666M2.667 4h10.666M2.667 12h10.666\"/></svg>"}
className={`w-html-embed`} />
</Button>
</DialogTrigger>
<DialogOverlay
className={`w-dialog-overlay c15392bw c12qysi7 c1jkbqq5 ch8lzlo c13hlxg9 c5mlbae c17brv9o cvuh4zx cu8ogtt c8nmv6p cwqnf9o c1bm3fk1 c183bdo0`}>
<DialogContent
className={`w-dialog-content c5mlbae ci03eyw cu8ogtt c7na04l ctnx82u cngdgqi cs20kd cnkevhm cpq2gwm cql21mx ck11ylk c1a71d48 c18s1ywe c1log017 cyuvfar ctbdlr1 c1kek3tg c1s3e5c3 c1ort9jz cuvlntl c18vlwwr c17sz26a cng5oj6`}>
<Box
data-ws-tag="nav"
className={`w-box c39ez8k`}>
<Box
className={`w-box ci03eyw cu8ogtt c15abkx5 cfp2jcf`}>
<DialogDescription
className={`w-dialog-description cy7nrqp c1ujy25t cdhy4s8 cc02v1c ca2fle4 c1kvebu6`}>
{"Find any page you want on the site"}
</DialogDescription>
<h2
className={`w-element`}>
{"Navigation"}
</h2>
</Box>
<Box
className={`w-box ci03eyw c1rb689p c1hbxsx0 cy2vnym cgykfac cu8ogtt cfx1lak c12zhvo c8chaf1 crymv6m cjdg5q7`}>
<Link
href={"/"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"Home"}
</Link>
<Link
href={"/course-bank"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"Course Bank"}
</Link>
<Link
href={"/calendar"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"Calendar"}
</Link>
<Link
href={"/introduction"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"Dashboard"}
</Link>
<Link
href={"/about-geu"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"About GE"}
</Link>
<Link
href={"/about-dtu"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"About DTU"}
</Link>
<Link
href={"/about-geu"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"About GE Union"}
</Link>
</Box>
</Box>
<DialogClose
className={`w-close-button c58kvwj c9jo736 crviqmx c40fhby c1koy2kb cvrpl4x c1uib4vc ci03eyw c1v4vkm5 c1bti4b5 c1qsi9u3 c1s85o6f c7jkqej cy7nrqp cq3zzid cjdtlt6 cxudh90 c12m3onu`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12.5 3 3 12.5M3 3l9.5 9.5\"/></svg>"}
className={`w-html-embed`} />
</DialogClose>
</DialogContent>
</DialogOverlay>
</Dialog>
</Box>
<Box
className={`w-box c65isya ck11ylk c19haj7v ci03eyw cu8ogtt c1bti4b5 cve325e c14k8w3n cjdez0h c4psa79 chvq5aa chtpppz`}>
<h1
className={`w-element cyoo8jj cnurt1a c1wzvl6u`}>
{"Course bank"}
</h1>
<Text
className={`w-text cg3nt0s c74dsfz czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu c16hxlzn c1c73s0v c7u4ssh`}>
{"Your GE hub for course info and notes."}
</Text>
</Box>
</Box>
<Tabs
value={"0"}
className={`w-tabs cu8ogtt c1v4vkm5 c3q79or cqlg791 c6yvppa ci03eyw`}>
<TabsList
className={`w-tabs-list cfyrpk4 c1qpyqes c1bti4b5 cd3toq c17nm8vt c8yo8yx c1xymrvd c1n9f9m4 c1jbi97f c1lgzutd csp87lc c1lvtt9b c12gpzk6 c1jsmjku c1cshlcb cde37yz ca1ntyv cwsyfmt cgmjq0a c1xmffmh c142qj80 c15igavi`}>
<TabsTrigger
data-ws-index="0"
className={`w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c12m3onu cxbwblh co1yi26 c1vk95sq c4m1pwg c1al8gxi cws4pam cqp7jpc c1kvgv3n`}>
<span
className={`w-element c426or5 cycv0tm ckiq6wr`}>
{"Polytechnical "}
</span>
{"Foundations"}
</TabsTrigger>
<TabsTrigger
data-ws-index="1"
className={`w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c12m3onu cxbwblh co1yi26 c1vk95sq c4m1pwg c1al8gxi cws4pam cqp7jpc c1kvgv3n`}>
{"Advanced"}
<Span
className={`w-text-1 cwti2ho cvuh4zx ckiq6wr`}>
{"Systems"}
</Span>
</TabsTrigger>
<TabsTrigger
data-ws-index="2"
className={`w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c12m3onu cxbwblh co1yi26 c1vk95sq c4m1pwg c1al8gxi cws4pam cqp7jpc c1kvgv3n`}>
{"Cyber"}
<Span
className={`w-text-1 cwti2ho cvuh4zx ckiq6wr`}>
{"Systems"}
</Span>
</TabsTrigger>
<TabsTrigger
data-ws-index="3"
className={`w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c12m3onu cxbwblh co1yi26 c1vk95sq c4m1pwg c1al8gxi cws4pam cqp7jpc c1kvgv3n`}>
{"Living"}
<Span
className={`w-text-1 cwti2ho cvuh4zx ckiq6wr`}>
{"Systems"}
</Span>
</TabsTrigger>
<TabsTrigger
data-ws-index="4"
className={`w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c12m3onu cxbwblh co1yi26 c1vk95sq c4m1pwg c1al8gxi cws4pam cqp7jpc c1kvgv3n`}>
{"Future"}
<Span
className={`w-text-1 cwti2ho cvuh4zx ckiq6wr`}>
{"Energy"}
</Span>
</TabsTrigger>
</TabsList>
<TabsContent
data-ws-index="0"
className={`w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f`}>
<p
className={`w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2`}>
{"The "}
<b
className={`w-element`}>
{"Polytechnical Foundations"}
</b>
{" are a set of courses all at DTU are required to take. They cover a wide variety of stuffs and suck sometimes. They are still cool in general tho."}
</p>
<Accordion
collapsible={true}
className={`w-accordion`}>
<AccordionItem
data-ws-index="0"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text c1kzhrg`}>
{"Mathematics 1a"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"01003"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Covers logic, complex numbers, polynomials, linear algebra, and differential equations, combining theory with computation. Strengthens problem-solving through reasoning, thematic exercises, and computer-based methods."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/maths1a\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Mathematics 1b"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"01004"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Focuses on multivariable calculus, including gradients, Jacobians, Taylor expansions, optimization, and vector fields. Combines theory and computation with integrals, parameterizations, and the spectral theorem. Develops skills through thematic exercises, group projects, and computer-based methods."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/maths1b\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Chemistry"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"26020"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Covers atomic structure, bonding, thermodynamics, equilibrium, kinetics, acids/bases, and redox reactions. Connects chemistry to materials, catalysis, and element cycles with focus on technology and sustainability."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/chemistry\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="3"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Computer Programming"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02003"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Learn the basics of Python programming while solving real problems with code. You’ll practice everything from loops and functions to working with data, and even try out simple projects. A hands-on way to build the coding skills every engineer needs."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/computer-programming\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="4"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Physics"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"10063"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Covers the big three of engineering physics: mechanics, thermodynamics, and electromagnetism: plus  experiments. You’ll learn to model real systems, crunch data in Python, and see how physics explains (almost) everything around you."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/physics1\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="5"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Statistics"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02402"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Learn how to make sense of data with graphs, probability, and statistical models. You’ll try out tools like Python to test ideas, run regressions, and check if results actually make sense."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/statistics\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="6"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Interdisciplinary Bioengineering"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"27020"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Get an intro to biology and biotechnology and see how they connect to engineering. From DNA and proteins to ecosystems and data science, you’ll explore how biology can inspire tech. Finish with a group project solving a real-world problem."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/interdisciplinary-bioengineering\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="7"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Science, Technology and Society"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"42620"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Explore how technology shapes society and sustainability from ethics and the SDGs to public debates about innovation. You’ll analyze real cases, tackle dilemmas, and learn tools to think critically about the role of engineers in the world."}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/science-technology-and-society\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<hr
className={`w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue`} />
<AccordionItem
data-ws-index="8"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Mathematics 2"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"01034"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"Takes math to the next level with differential equations, infinite series, and Fourier series. You’ll learn how to solve complex systems, test stability, and approximate functions."}
{""}
<br />
{""}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"rest-of-obligatory-courses/maths2\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
</Accordion>
</TabsContent>
<TabsContent
data-ws-index="1"
className={`w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f`}>
<p
className={`w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2`}>
{"The "}
<b
className={`w-element`}>
{"Advanced Materials"}
</b>
{" specialization is about creating sustainable and functional materials for the future. From nanotechnology and modeling to acoustics, physics, and manufacturing, it opens doors across cutting-edge engineering fields."}
</p>
<Accordion
collapsible={true}
className={`w-accordion cyoabi7`}>
<AccordionItem
data-ws-index="0"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text c1kzhrg`}>
{"Introduction to Advanced Materials"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"41680"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/introduction-to-advanced-materials\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to Numerical Algorithms"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02601"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/introduction-to-numerical-algorithms\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Resource Engineering"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"12139"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/resource-engineering\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="3"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Physics for Materials and Energy"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"10080"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/physics-for-materials-and-energy\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="4"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Materials Technology"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"41684"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/materials-technology\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="5"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Materials Characterization and Testing"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"41685"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/materials-characterization-and-testing\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<hr
className={`w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue`} />
<AccordionItem
data-ws-index="6"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to Machine Learning"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02451"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/introduction-to-machine-learning\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="7"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Image Analysis"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02503"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/image-analysis\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="8"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Mathematical Modelling"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02526"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/mathematical-modelling\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="9"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to 3D printing"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"41789"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/introduction-to-3d-printing\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="10"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Computer Simulation of Materials"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"47212"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"advanced-materials/computer-simulations-of-materials\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
</Accordion>
</TabsContent>
<TabsContent
data-ws-index="2"
className={`w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f`}>
<p
className={`w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2`}>
{"The "}
<b
className={`w-element`}>
{"Cyber Systems"}
</b>
{" specialization is about computers and integrated systems. It is objectively the best specialization for the best people."}
</p>
<Accordion
collapsible={true}
className={`w-accordion`}>
<AccordionItem
data-ws-index="0"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text c1kzhrg`}>
{"Introduction to Cyber Systems"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02135"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"cyber-systems/introduction-to-cyber-systems\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Discrete Mathematics"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"01017"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"cyber-systems/discrete-mathematics\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Algorithms and Data Structures 1"}
<Span
className={`w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"26020"}
</Span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"cyber-systems/algorithms-and-data-structures1\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="3"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Computer Science Modelling"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02141"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"cyber-systems/computer-science-modelling\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="4"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Functional Programming"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02157"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"cyber-systems/functional-programming\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="5"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Agile Object-oriented Software Development"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02160"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"cyber-systems/agile-object-oriented-software-development\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
</Accordion>
</TabsContent>
<TabsContent
data-ws-index="3"
className={`w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f`}>
<p
className={`w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2`}>
{"The "}
<b
className={`w-element`}>
{"Living Systems"}
</b>
{" specialization covers everything from food and aquatic engineering to healthcare, medicine, and chemicals. It’s a gateway to Denmark’s world-leading biotech and pharma scene, with strong links to companies like Novo Nordisk."}
</p>
<Accordion
collapsible={true}
className={`w-accordion`}>
<AccordionItem
data-ws-index="0"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text c1kzhrg`}>
{"Introduction to Living Systems"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"12701"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/introduction-to-living-systems\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to Genetic Methods in Engineering"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"25106"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/introduction-to-genetic-methods-in-engineering\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Biochemistry"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"27022"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/biochemistry\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="3"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Experimental Molecular Microbiology"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"27027"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/experimental-molecular-microbiology\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<hr
className={`w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue`} />
<AccordionItem
data-ws-index="4"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to Bioinformatics"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"22111"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/introduction-to-bioinformatics\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="5"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Ecology"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"25105"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/ecology\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="6"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Fisheries and Aquaculture"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"25107"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/fisheries-and-aquaculture\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="7"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Applied Molecular Techniques"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"25108"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/applied-molecular-techniques\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="8"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Biophysics and Biophysical Chemistry"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"26211"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/biophysics-and-biophysical-chemistry\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="9"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Molecular Biology"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"27026"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/molecular-biology\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="10"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Fermentation Technology"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"27034"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/fermentation-technology\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="11"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Bio Process Technology"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"28025"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"living-systems/bio-process-technology\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
</Accordion>
</TabsContent>
<TabsContent
data-ws-index="4"
className={`w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f`}>
<p
className={`w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2`}>
{"The "}
<b
className={`w-element`}>
{"Future Energy"}
</b>
{" specialization focuses on the green transition, from wind and solar power to electrolysis, applied chemistry, and sustainable entrepreneurship. It opens doors to careers in Denmark’s energy sector, with leading companies like Vestas driving innovation worldwide."}
</p>
<Accordion
collapsible={true}
className={`w-accordion`}>
<AccordionItem
data-ws-index="0"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text c1kzhrg`}>
{"Introduction to Future Energy"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"47202"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/introduction-to-future-energy\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to Numerical Algorithms"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"02601"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/introduction-to-numerical-algorithms\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Physics for Materials and Energy"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"10080"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/physics-for-materials-and-energy\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="3"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"General Electrical Engineering"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"46055"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/general-electrical-engineering\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="4"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Engineering Thermodynamics"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"47201"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/engineering-thermodynamics\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<hr
className={`w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue`} />
<AccordionItem
data-ws-index="5"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Physics of Solar Energy and Energy Storage"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"10260"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/physics-of-solar-energy-and-energy-storage\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="6"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Climate Change"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"12205"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/climate-change\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="7"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to Wind Energy"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"46000"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/introduction-to-wind-energy\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="8"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Introduction to Energy Analytics"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"46040"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/introduction-to-energy-analytics\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="9"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Electrochemical Energy Technologies"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"47205"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/electrochemical-energy-technologies\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="10"
className={`w-item`}>
<AccordionHeader
className={`w-item-header ci03eyw`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a`}>
<Text
className={`w-text`}>
{"Electrochemical Energy Storage and Power2X"}
<span
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk`}>
{"47211"}
</span>
</Text>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/></svg>"}
className={`w-html-embed`} />
</Box>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp`}>
<span
className={`w-element`}>
{"No description"}
</span>
<h3
className={`w-element cc02v1c`}>
{"Notes"}
</h3>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"future-energy/electrochemical-energy-storage-and-power2x\">\n  Loading…\n</div>\n<script>\n  initFileLists();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</AccordionContent>
</AccordionItem>
</Accordion>
</TabsContent>
<div
className={`w-element cbeiaob ci03eyw c16e72yc cqaj6f4 c16lfnyl c1fri8go c1jj1apw`}>
<div
className={`w-element ci03eyw c1v4vkm5 c1svdh6y cft5z6j c156d1ag c1uw2bda cnd6e42 col1yiq corpumv c1q3q0jq c1rdt54o c6775s7 c5v0tdv c5wuwv0 c8nmv6p cwqnf9o cgam0gy c1lvim05`}>
<h4
className={`w-element ca2fle4 cc02v1c c5fuofq cuz3b7n`}>
{"See more on"}
</h4>
<Link
href={"https://www.studocu.com/da/institution/danmarks-tekniske-universitet/2833"}
target={"_blank"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c143l1dc cbazxvp c1ydztro cpyan2s c15o04ri`}>
<Text
className={`w-text`}>
{"Studocu"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
className={`w-image c1nfcmlw`} />
</Link>
</div>
<div
className={`w-element ci03eyw c1v4vkm5 cui8ecu c1qvvqb3 c156d1ag c1uw2bda cnd6e42 col1yiq corpumv c1q3q0jq c1rdt54o c6775s7 c5v0tdv c5wuwv0 c8nmv6p cwqnf9o cgam0gy c1lvim05`}>
<h4
className={`w-element ca2fle4 cc02v1c c5fuofq cuz3b7n`}>
{"Upload notes"}
</h4>
<Link
href={"https://docs.google.com/forms/d/e/1FAIpQLSfsAo2xfW8tSNVPVtKocAg1h23JNxV34xfJyf_n_9SxwNugzw/viewform"}
target={"_blank"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1bf26ov cbazxvp c1ydztro cpyan2s c15o04ri`}>
<Text
className={`w-text`}>
{"Here"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
className={`w-image c1nfcmlw`} />
</Link>
</div>
</div>
</Tabs>
</Body>
}


      export { Page }
    