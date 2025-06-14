/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link } from "@webstudio-is/sdk-components-react-router";
import { HtmlEmbed as HtmlEmbed, Box as Box, Image as Image, Text as Text, Button as Button } from "@webstudio-is/sdk-components-react";
import { Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-06-14T14:52:17.575Z";

      export const siteName = "GE Union";

      export const breakpoints = [{"id":"2EiFMEG40PBm9_fkelqpo"},{"id":"xOnFYyuZv5VkMeeKDLyiu","maxWidth":991},{"id":"Uvcw_OJqyPoLioZzUbP1x","maxWidth":767},{"id":"eCbcXJaLEKSKcnbAPzNF0","maxWidth":479}];

      export const favIconAsset: string | undefined =
        "Favicon_gtxnE_QXZldwugdMJXAuG.ico";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        ["Rubik-VariableFont_wght_rrlmmnwM8xol83_Rm9VjL.ttf"]

      export const pageBackgroundImageAssets: string[] =
        []

      

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-element c1lzvaoj`}>
<HtmlEmbed
code={"<style>\n  h1{\n    font-family: Tanker;\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_RyiWP8CNKOfskpwMp_P8Y.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 30s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 3.7em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script>\n  // 1) Configuration\n  if (typeof JSON_URL === 'undefined' || JSON_URL === null) {\n    let JSON_URL = \"https://raw.githubusercontent.com/GE-Union/CourseBank/main/structure.json\";\n  }\n  if (typeof CACHE_KEY === 'undefined' || CACHE_KEY === null) {\n    let CACHE_KEY = \"coursebank_structure_cache\";\n  }\n  if (typeof CACHE_TTL === 'undefined' || CACHE_TTL === null) {\n    let CACHE_TTL = 90 * 60 * 1000; // 90 min\n  }\n  if (typeof EXT_COLORS === 'undefined' || EXT_COLORS === null) {\n    let EXT_COLORS = {\n      PDF: \"#D32F2F\",\n      IPYNB: \"#F37C2F\",\n      ZIP: \"#595959\",\n      DOCX: \"#2A5699\",\n      XLSX: \"#1D6F42\",\n      PPTX: \"#D24726\",\n      TXT: \"#616161\",\n    };\n  }\n\n  \n  // 3) Helpers\n  async function fetchStructure() {\n    // try cache\n    const raw = localStorage.getItem(CACHE_KEY);\n    if (false) {\n      const { ts, data } = JSON.parse(raw);\n      if (Date.now() - ts < CACHE_TTL) {\n        return data;\n      }\n    }\n    // otherwise re-fetch\n    const res = await fetch(JSON_URL, { cache: \"no-store\" });\n    if (!res.ok) throw new Error(\"Failed to load structure.json\");\n    const data = await res.json();\n    localStorage.setItem(\n      CACHE_KEY,\n      JSON.stringify({ ts: Date.now(), data }),\n    );\n    return data;\n  }\n  \n  function getFolderData(structure, folderPath) {\n    const parts = folderPath.split(\"/\");\n    let cur = structure;\n    for (const p of parts) {\n      if (!(p in cur)) return null;\n      cur = cur[p];\n    }\n    return Array.isArray(cur) ? cur : null;\n  }\n  \n  function makeFileLink(folder, file) {\n    const container = document.createElement(\"div\");\n    container.className = \"custom-file-link\";\n  \n    // split name & author\n    const [rawName, rawAuth] = file.split(\"-a-\");\n    const filename = (rawName || file).replace(/_/g, \" \");\n    const author = rawAuth\n      ? rawAuth.replace(/_/g, \" \").replace(/\\.[^/.]+$/, \"\")\n      : \"Unknown\";\n  \n    const ext = file.split(\".\").pop().toUpperCase();\n  \n    const fullPath = `${folder}/${file}`;\n    const encodedPath = fullPath\n      .split('/')\n      .map(seg => encodeURIComponent(seg))\n      .join('/');\n  \n    const a = document.createElement('a');\n    if (['PDF'].includes(ext)) {\n      a.target = '_blank';\n      a.href = `https://geunion.dk/coursebank/${encodedPath}`;  // proxy script\n    } else {\n      a.setAttribute('download', `${filename} - ${author}`);\n      a.target = '_self';\n      a.href = `https://raw.githubusercontent.com/GE-Union/CourseBank/main/${encodedPath}`;\n    }\n    a.style.display = 'flex';\n    a.style.alignItems = 'center';\n    a.style.width = '100%';\n  \n    // icon\n    const icon = document.createElement(\"div\");\n    icon.className = \"file-icon\";\n    const img = document.createElement(\"img\");\n    img.src =\n      \"https://raw.githubusercontent.com/GE-Union/CourseBank/main/res/file-icon.svg\";\n    img.alt = \"File Icon\";\n    icon.appendChild(img);\n  \n    const badge = document.createElement(\"div\");\n    badge.className = \"extension-badge\";\n    badge.textContent = ext;\n    badge.style.backgroundColor =\n      EXT_COLORS[ext] || \"var(--global-palette2,#1e73be)\";\n    icon.appendChild(badge);\n  \n    // details\n    const details = document.createElement(\"div\");\n    details.className = \"file-details\";\n    details.innerHTML = `<strong>${filename}</strong><span>${author}</span>`;\n  \n    // assemble\n    a.appendChild(icon);\n    a.appendChild(details);\n    container.appendChild(a);\n    return container;\n  }\n  \n  async function initFileLists() {\n    const holders = document.querySelectorAll(\".file-list\");\n    console.log(holders);\n    if (!holders.length) return;\n  \n    try {\n      const structure = await fetchStructure();\n      holders.forEach((holder) => {\n        const folder = holder.dataset.folder;\n        holder.innerHTML = \"\"; // clear “Loading…”\n        const files = getFolderData(structure, folder);\n        if (!files) {\n          holder.textContent = `Folder not found: ${folder}`;\n          return;\n        }\n        files.forEach((f) => holder.appendChild(makeFileLink(folder, f)));\n        console.log(`Populated ${folder}`);\n      });\n    } catch (err) {\n      console.error(err);\n      holders.forEach((holder) => {\n        holder.textContent = \"Unable to load course structure.\";\n      });\n    }\n  }\n  \n  window.addEventListener('pageshow', (event) => {\n    requestAnimationFrame(() => {\n      setTimeout(function() {initFileLists();}, 500)\n    });\n  });\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n.custom-file-link {\n  margin: 1em 0;\n  display: flex;\n  align-items: center;\n  max-width: 500px;\n  transition: transform 0.1s;\n  height: 40px;\n  width: 100%;\n}\n.custom-file-link > a {\n  text-decoration: none;\n}\n\n.custom-file-link:hover {\n  transform: translateX(5px);\n  cursor: pointer;\n}.custom-file-link:hover .file-details strong {\n  color: var(--front-red-1) !important;\n}\n\n.file-icon {\n  margin-right: 10px;\n  width: 36px;\n  height: 36px;\n  position: relative;\n}\n\n.file-icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n\n.extension-badge {\n  position: absolute;\n  top: 0;\n  left: 0;\n  color: white;\n  font-size: 10px;\n  font-weight: 500;\n  padding: 1px 2px;\n  border-radius: 2px;\n  margin-top: 13.5px;\n  margin-left: 1px;\n  pointer-events: none;\n}\n\n.file-details {\n  display: flex;\n  flex-direction: column;\n  width: calc(100% - 42px)\n}\n\n.file-details strong {\n  font-size: 1em;\n  font-weight: 500;\n  color: var(--front-1);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.file-details span {\n  font-size: 0.8em;\n  color: var(--front-3);\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n</style>"}
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
className={`w-box ci03eyw cavbteo c17p08f7 cy2vnym cgykfac c8chaf1 crymv6m ch588tu cd1c1x2 cgjpuuk co3wgvm cjdg5q7`}>
<Link
href={"/"}
className={`w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q`}>
<Text
className={`w-text`}>
{"Home"}
</Text>
</Link>
<Link
href={"/course-bank"}
className={`w-link c4qqqhz cr2ujrk c8l261o czgmbqe c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q`}>
<Text
className={`w-text`}>
{"Course Bank"}
</Text>
</Link>
<Link
href={"/calendar"}
className={`w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q`}>
<Text
className={`w-text`}>
{"Calendar"}
</Text>
</Link>
<Link
href={"/about-geu"}
className={`w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q`}>
<Text
className={`w-text`}>
{"About"}
</Text>
</Link>
</Box>
<Dialog>
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
<Text
className={`w-text`}>
{"Home"}
</Text>
</Link>
<Link
href={"/course-bank"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
<Text
className={`w-text`}>
{"Course Bank"}
</Text>
</Link>
<Link
href={"/calendar"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
<Text
className={`w-text`}>
{"Calendar"}
</Text>
</Link>
<Link
href={"/about-geu"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
<Text
className={`w-text`}>
{"About"}
</Text>
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
className={`w-text cg3nt0s c74dsfz czgmbqe cyoo8jj c1wwlxnr cje5w08 c1bck0pu c16hxlzn c1c73s0v c7u4ssh`}>
{"Stuff for and about courses."}
</Text>
</Box>
</Box>
<div
className={`w-element ci03eyw cu8ogtt c1v4vkm5 c1993r1 c1w5mydw cn76a88 c1eeo1qt`}>
<div
className={`w-element cd3toq c17nm8vt c1xymrvd c8yo8yx cngdgqi c1in3n8u c3q79or cqlg791 csphimz c102ag1h c1jfe7vy ce1jmtw`}>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/maths1b\">\n  Loading…\n</div>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</div>
<div
className={`w-element cd3toq c17nm8vt c1xymrvd c8yo8yx cngdgqi c1in3n8u c3q79or cqlg791 csphimz c102ag1h c1jfe7vy ce1jmtw`}>
<HtmlEmbed
code={"<div class=\"file-list\"\n     data-folder=\"polytechnical-foundations/statistics\">\n  Loading…\n</div>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</div>
</div>
</Body>
}


      export { Page }
    