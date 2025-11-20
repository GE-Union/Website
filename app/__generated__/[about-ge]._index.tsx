/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, Text as Text, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button } from "@webstudio-is/sdk-components-react";
import { Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-11-20T11:28:23.239Z";

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
className={`w-element c1lzvaoj c1qux398 ci03eyw cu8ogtt c1qpyqes cm1ds2c`}>
<HtmlEmbed
code={"<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');\n@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');\n  \n  h1{\n    font-family: 'Tanker';\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n    margin-bottom: 0.5em;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_orTDw4lIQEfSgOgF0DBVy.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script>\n  if (typeof window.GE_QA_JSON_URL === 'undefined') {\n    window.GE_QA_JSON_URL = \"https://raw.githubusercontent.com/GE-Union/WebsiteContent/main/AboutGE/QnA.json\";\n  }\n  if (typeof window.GE_QA_CACHE_KEY === 'undefined') {\n    window.GE_QA_CACHE_KEY = \"coursebank_structure_cache\";\n  }\n  if (typeof window.CACHE_TTL === 'undefined') {\n    window.CACHE_TTL = 90 * 60 * 1000; // 90 min\n  }\n\n  async function fetchQnA() {\n    // try cache\n    const raw = localStorage.getItem(GE_QA_CACHE_KEY);\n    if (raw) {\n      const { ts, data } = JSON.parse(raw);\n      if (Date.now() - ts < CACHE_TTL) {\n        return data;\n      }\n    }\n    // otherwise re-fetch\n    const res = await fetch(GE_QA_JSON_URL, { cache: \"no-store\" });\n    if (!res.ok) throw new Error(\"Failed to load structure.json\");\n    const data = await res.json();\n    localStorage.setItem(\n      GE_QA_CACHE_KEY,\n      JSON.stringify({ ts: Date.now(), data }),\n    );\n    return data;\n  }\n\n  function initQnA() {\n    var qnaContainer = document.getElementById('qna-container');\n    if (!qnaContainer) return;\n    qnaContainer.innerHTML = \"\";\n\n    fetchQnA()\n      .then(data => {\n        if (!data.categories) {\n          qnaContainer.textContent = \"No Q&A data found.\";\n          return;\n        }\n\n        data.categories.forEach(category => {\n          // Create category title\n          const catTitle = document.createElement('h3');\n          catTitle.textContent = category.category;\n          qnaContainer.appendChild(catTitle);\n\n          // Create list for questions\n          const list = document.createElement('div');\n          list.className = 'qna-list';\n          \n          category.questions.forEach(q => {\n            const item = document.createElement('div');\n            item.className = 'qna-item';\n          \n            const question = document.createElement('div');\n            question.className = 'qna-question';\n            \n            const questionText = document.createElement('span');\n            questionText.textContent = q.question;\n            questionText.className = 'qna-question-text';\n          \n            const arrow = document.createElement('div');\n            arrow.className = 'qna-arrow';\n            arrow.innerHTML = `\n              <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" style=\"display: block;\">\n                <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4 6 4 4 4-4\"/>\n              </svg>\n            `;\n          \n            question.appendChild(questionText);\n            question.appendChild(arrow);\n          \n            const answer = document.createElement('div');\n            answer.className = 'qna-answer';\n            answer.textContent = q.answer;\n            answer.style.display = 'none';\n          \n            question.addEventListener('click', () => {\n              const isVisible = answer.style.display === 'block';\n              answer.style.display = isVisible ? 'none' : 'block';\n              arrow.classList.toggle('open', !isVisible);\n            });\n          \n            item.appendChild(question);\n            item.appendChild(answer);\n            list.appendChild(item);\n            const hr = document.createElement(\"hr\");\n            list.appendChild(hr);\n          });\n\n          list.removeChild(list.lastElementChild);\n          qnaContainer.appendChild(list);\n\n\n        });\n      })\n      .catch(err => {\n        console.error(err);\n        qnaContainer.textContent = \"Failed to load Q&A data.\";\n      });\n  }\n  \n  document.addEventListener('DOMContentLoaded', () => {\n    requestAnimationFrame(() => {\n      initQnA();\n    });\n  });\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<style>\n  .qna-question {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n  font-weight: 500;\n  padding: 18px 0;\n  line-height: 1em;\n}\n  \n.qna-arrow svg {\n  width: 20px; height: 20px\n}\n\n.qna-arrow {\n  display: block;\n  align-content: center;\n  transition: transform 0.2s ease;\n  height: 20px; width: 20px;\n  transform-origin: 50% 50%;\n  user-select: none; pointer-events: none;\n  color: var(--front-3);\n}\n\n.qna-arrow.open {\n  transform: rotate(180deg);\n}\n\n.qna-answer {\n  margin: 5px 0 30px 0;\n  padding-left: 10px;\n  display: none;\n  transition: height 0.5s ease;\n}\n\n#qna-container hr{\n  margin: 0 10px 0 10px;\n  border-width: 0.5px;\n  border-color: var(--front-3);\n  opacity: 0.3;\n}\n\n</style>"}
className={`w-html-embed`} />
<Box
className={`w-box cck00sw cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1uz2t7q c4psa79 c1ldi832 ${"icon-background home-top"}`}>
<Box
className={`w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m`}>
<Link
href={"/"}
target={"_self"}
id={"menu-icon"}
className={`w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 cqyp7hg c1moglug`}>
<Image
src={"/assets/GE_Logo_-_Big_kpMORCHYDLOpQbfBKYwZ7.svg"}
width={492}
height={684}
loading={"eager"}
alt={""}
className={`w-image cy2rpkp c1l3m6tn c1vsv73g c1wjaqd0`} />
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
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1tj415q`}>
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
className={`w-link c4qqqhz c1l00ka2 c8l261o c8qj03j c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q`}>
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
href={"/about-ge"}
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
className={`w-element cyoo8jj c1k74xht cnurt1a c1wzvl6u`}>
{"about GE"}
</h1>
<Text
className={`w-text cqawzgp c1s7gudn czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu cnurt1a c1wzvl6u c7u4ssh`}>
{"Everything you need to know while you’re here"}
</Text>
</Box>
</Box>
<div
className={`w-element ci03eyw c1rwubzf c1log017 c1nj86ny cpq2gwm c1w0yra6 cj7bt5u c19dg1ud cbbmghh c1k74xht c9au2ch cyuvfar c1wjiq3p c19dst95 c18fbvuf c1x3epop`}>
<Image
src={"/assets/S-Advanced-Icon_1_WAQFozAAYDN85UOJBjcGw.svg"}
alt={""}
loading={"eager"}
width={4167}
height={4167}
optimize={false}
className={`w-image cqb6n9z c1fo9mp9 c1k3gxy3`} />
<Image
src={"/assets/S-Cyber-Icon_1_fIL8LjjPw8kUgIjK9k4lA.svg"}
alt={""}
loading={"eager"}
width={4167}
height={4167}
optimize={false}
className={`w-image cqb6n9z c1fo9mp9 c1k3gxy3`} />
<Image
src={"/assets/S-Living-Icon_1_HCmIDHSqU5Ugss3mk1aRq.svg"}
alt={""}
loading={"eager"}
width={4167}
height={4167}
optimize={false}
className={`w-image cqb6n9z c1fo9mp9 c1k3gxy3`} />
<Image
src={"/assets/S-Energy-Icon_1_l_ehl9l9wBIuE34ATzvBV.svg"}
alt={""}
loading={"eager"}
width={4167}
height={4167}
optimize={false}
className={`w-image cqb6n9z c1fo9mp9 c1k3gxy3`} />
</div>
<div
className={`w-element c1w0yra6 cpq2gwm cj7bt5u c4qqqhz c1f0lefa c1dsvsvh c1nixf1k c17i4kqy c1hhefcr c6jvbv7`}>
<p
className={`w-element cyoo8jj c1l00ka2 ca8r8od c1twkhmw c1pkzl4t csju6l8 c1q6vwwy c1iwy39r`}>
{"The Bachelor of Science in General Engineering at DTU"}
</p>
<p
className={`w-element cd1g2e5 cyoo8jj csju6l8`}>
{"But we like to call it "}
<b
className={`w-element`}>
{"GE"}
</b>
{"."}
</p>
<p
className={`w-element`}>
{"It's a three-year international programme that gives you a strong foundation in mathematics, physics, chemistry, and biotechnology. It teaches you to collaborate across disciplines and apply engineering skills to real-world challenges. Through practical design-build projects, you will develop problem-solving abilities and learn how to work effectively in diverse teams. Studying in an international environment with courses taught in English, you’ll gain the broad competences needed to become an innovative engineer ready to shape the future."}
</p>
</div>
<div
className={`w-element c1w0yra6 cpq2gwm cj7bt5u c4qqqhz c1f0lefa c1dsvsvh ci03eyw cs5vl0c c1s1dhpt c1nixf1k c17i4kqy c1hhefcr c6jvbv7`}>
<div
className={`w-element`}>
<h2
className={`w-element`}>
{"Curriculum"}
</h2>
<h3
className={`w-element`}>
{"Polytechnical Foundations "}
<span
className={`w-element c1vn0xiq cr2ujrk c8py5un cycv0tm cf92qlo c1p20m63`}>
{"The Core Stuff"}
</span>
</h3>
<p
className={`w-element`}>
{"The polytechnical foundation is basically all the main general subjects every GE student will have to take, which include Chemistry, Bioengineering, Physics, Programming, Statistics, and Mathematics. Some are more of a pain than others, but the main point is to bring all students to a general standard across all these base subjects. "}
</p>
</div>
<Image
src={"https://student.dtu.dk/-/media/subsites/studieordninger/general-engineering/ge-ects-fordeling.png"}
optimize={true}
loading={"lazy"}
className={`w-image c1tpjvk7 cjxjfnc ce30i2p cbg59jt`} />
</div>
<Image
src={"https://student.dtu.dk/-/media/subsites/studieordninger/general-engineering/ge-ects-fordeling.png"}
optimize={false}
loading={"lazy"}
className={`w-image c1tpjvk7 c4qqqhz cvuh4zx ce30i2p c14e6dcj cri3ouj cr2180h cpgn581 c1sucy14 c1e7x5sb c1eiysop c1pv9cz1`} />
<div
className={`w-element c1w0yra6 cpq2gwm c12zhvo c4qqqhz c1f0lefa c1dsvsvh cwkfinq c17i4kqy c1hhefcr c6jvbv7`}>
<h3
className={`w-element`}>
{"Specialisations "}
<span
className={`w-element c1vn0xiq cr2ujrk c8py5un cycv0tm cf92qlo c1p20m63`}>
{"The Branches"}
</span>
</h3>
<p
className={`w-element`}>
{"After completing the core courses in General Engineering, you can choose to specialise in one of four areas. Each specialisation builds on your broad engineering foundation and prepares you for specific industries and career paths:"}
</p>
<div
className={`w-element ci03eyw c1vi0mt cqaj6f4 c16lfnyl c1bti4b5 cc4bk5j`}>
<div
className={`w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q`}>
<Image
src={"/assets/S-Advanced-Icon_1_WAQFozAAYDN85UOJBjcGw.svg"}
width={4167}
height={4167}
alt={""}
optimize={false}
className={`w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo`} />
<h3
className={`w-element c1r67alc`}>
{"Advanced Materials "}
<br />
{""}
</h3>
<p
className={`w-element`}>
{"Focus on developing new sustainable and functional materials for manufacturing, nanotechnology, acoustics, and physics. This track prepares you to innovate in creating materials that will shape industries and future technologies."}
</p>
</div>
<div
className={`w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q`}>
<Image
src={"/assets/S-Cyber-Icon_1_fIL8LjjPw8kUgIjK9k4lA.svg"}
width={4167}
height={4167}
alt={""}
optimize={false}
className={`w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo`} />
<h3
className={`w-element c1r67alc`}>
{"Cyber Systems"}
</h3>
<p
className={`w-element`}>
{"Dive into computers, artificial intelligence, data analytics, modelling, software and hardware development. This specialisation equips you to work with cutting-edge technologies in computing and digital systems."}
</p>
</div>
<div
className={`w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q`}>
<Image
src={"/assets/S-Living-Icon_1_HCmIDHSqU5Ugss3mk1aRq.svg"}
width={4167}
height={4167}
alt={""}
optimize={false}
className={`w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo`} />
<h3
className={`w-element c1r67alc`}>
{"Living Systems"}
</h3>
<p
className={`w-element`}>
{"Explore engineering related to all living things including aquatic systems, medicine, healthcare, and food production. This specialisation connects biology, chemistry, and technology to create sustainable solutions that improve health and protect the environment."}
</p>
</div>
<div
className={`w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q`}>
<Image
src={"/assets/S-Energy-Icon_1_l_ehl9l9wBIuE34ATzvBV.svg"}
width={4167}
height={4167}
alt={""}
optimize={false}
className={`w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo`} />
<h3
className={`w-element c1r67alc`}>
{"Future Energy"}
</h3>
<p
className={`w-element`}>
{"Work on creating a sustainable world by developing renewable energy technologies such as wind and solar power, electrolysis, applied chemistry, and entrepreneurship. This specialisation focuses on the energy solutions of tomorrow."}
</p>
</div>
</div>
</div>
<div
className={`w-element c1w0yra6 cpq2gwm clrom7z c4qqqhz c1f0lefa c1duohc3 c1nixf1k c17i4kqy c1hhefcr c6jvbv7`}>
<h2
className={`w-element`}>
{"DTU Course Analyzer"}
</h2>
<p
className={`w-element`}>
<span
className={`w-element`}>
{"If you wish to learn more about different courses and what previous students thought of them, you can check out "}
</span>
<Link_1
href={"https://dtucourseanalyzer.pythonanywhere.com/"}
className={`w-element cz03vb2 czvb4c7 ck11ylk c767uka c1sy2opm`}>
{"DTU Course Analyzer"}
</Link_1>
<span
className={`w-element`}>
{". It is a student made website that gives a lot of info about courses like pass rate, average grades but most importantly student opinions on lecturers :D (very important)"}
</span>
</p>
</div>
<Box
className={`w-box c9esr7v cm1ds2c c1fxgukz cd3toq c17nm8vt c1xymrvd c8yo8yx csaxvfs ce1jmtw c1m7qrvj c1o7c5y4 c1ndanu0 ${"icon-background"}`}>
<div
className={`w-element ci03eyw c1nj86ny c4jnp6s c1l3m6tn c1w0yra6 cpq2gwm c1v4vkm5 c16pnwu4 cypyahl cs11lv9 c1njbxf1`}>
<Link
href={"/"}
className={`w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1dohq8s c3gx87z cqyp7hg c1moglug`}>
<Image
src={"/assets/GEU_Icon_1_qa8eLWu5EKj0C18RuAmQB.svg"}
width={256}
height={238}
alt={""}
className={`w-image c1l3m6tn ct616nu cmvyqw5 cqw0qi cc5htwv`} />
</Link>
<div
className={`w-element ci03eyw c1is6v5c co8t7od c1nj86ny c74dsfz c1jwuvkp cezuxvu`}>
<Link_1
href={"https://www.instagram.com/ge.union/"}
target={"_blank"}
className={`w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst`}>
<Image
src={"/assets/soc-insta_3EK2yfeQrKO1VBcKS5CMG.svg"}
width={417}
height={417}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
<Link_1
href={"https://www.facebook.com/people/GE-Union/61573069635006/?_rdr"}
target={"_blank"}
className={`w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst`}>
<Image
src={"/assets/soc-facebook_dRtaC2-32UMM-Zp4wCSDO.svg"}
width={417}
height={417}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
<Link_1
href={"https://www.linkedin.com/groups/10061020/"}
target={"_blank"}
className={`w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst`}>
<Image
src={"/assets/soc-linkedin_JewsOzbBNtsSePfOyCp1_.svg"}
width={417}
height={417}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
<Link_1
href={"https://www.reddit.com/r/DTU/"}
className={`w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst`}>
<Image
src={"/assets/soc-reddit_YIY3q3bmqs_8zl81uxYxk.svg"}
width={417}
height={417}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
</div>
</div>
</Box>
<HtmlEmbed
code={"<style>\n  /* Optional quality-of-life styles */\n  #menu-icon {\n    cursor: grab;\n    touch-action: none;   /* allow smooth touch drag */\n    will-change: transform;\n    \n    uuser-drag: none;\n    -webkit-uuser-drag: none;\n    -moz-uuser-drag: none;\n    user-select: none;    /* avoid text selection while dragging */\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n  }\n  #menu-icon.dragging { cursor: grabbing; }\n</style>\n\n<script>\n(() => {\n  const icon = document.getElementById('menu-icon');\n  if (!icon) return;\n\n  // position is managed purely via transform so layout doesn't shift\n  let pointerID = null;\n  let tx = 0, ty = 0;               // current translation\n  let vx = 0, vy = 0;               // current velocity (px/s)\n  let dragging = false;\n  let startX = 0, startY = 0;       // pointer-down position\n  let lastPx = 0, lastPy = 0;       // last pointer position (for velocity)\n  let lastT = 0;                    // last timestamp\n\n  // Spring params: tweak for feel\n  const STIFFNESS = 300;   // spring constant (higher = snappier)\n  const DAMPING   = 15;   // damping (lower = bouncier)\n  const EPS_POS   = 0.5;  // stop threshold (position, px)\n  const EPS_VEL   = 0.5;  // stop threshold (velocity, px/s)\n\n  const originalHref = icon.href;\n\n  \n  const setTransform = () => {\n    icon.style.transform = `translate(${tx}px, ${ty}px)`;\n  };\n\n  const onPointerDown = (e) => {\n    curPointerID = e.pointerId;\n    startX = e.clientX - tx;\n    startY = e.clientY - ty;\n\n    lastPx = e.clientX;\n    lastPy = e.clientY;\n    lastT  = performance.now();\n    vx = 0; vy = 0; // reset; we'll accumulate movement velocity\n  }\n  \n  const onDragStart = (e) => {\n    e.preventDefault();\n    icon.removeAttribute('href');\n    dragging = true;\n    icon.classList.add('dragging');\n    icon.setPointerCapture?.(curPointerId);\n  };\n\n  const onPointerMove = (e) => {\n    if (!dragging) return;\n\n    const now = performance.now();\n    const dt  = (now - lastT) / 1000;\n    tx = e.clientX - startX;\n    ty = e.clientY - startY;\n\n    // simple low-pass filtered velocity estimate for spring kick\n    if (dt > 0) {\n      const instVx = (e.clientX - lastPx) / dt;\n      const instVy = (e.clientY - lastPy) / dt;\n      vx = 0.8 * vx + 0.2 * instVx;\n      vy = 0.8 * vy + 0.2 * instVy;\n    }\n    lastPx = e.clientX;\n    lastPy = e.clientY;\n    lastT  = now;\n\n    setTransform();\n  };\n\n  const onPointerUp = (e) => {\n    if (!dragging) return;\n    e.preventDefault();\n    e.stopPropagation()\n    e.stopImmediatePropagation();\n    dragging = false;\n    icon.classList.remove('dragging');\n    icon.releasePointerCapture?.(e.pointerId);\n    animateBack(); // start spring home\n    return;\n  };\n\n  function animateBack() {\n    let prev = performance.now();\n    function step(now) {\n      const dt = Math.min((now - prev) / 1000, 0.032); // clamp dt for stability\n      prev = now;\n\n      // Hooke's law: F = -k*x - c*v (mass=1)\n      const ax = -STIFFNESS * tx - DAMPING * vx;\n      const ay = -STIFFNESS * ty - DAMPING * vy;\n\n      vx += ax * dt;\n      vy += ay * dt;\n      tx += vx * dt;\n      ty += vy * dt;\n\n      setTransform();\n\n      const nearOrigin = Math.hypot(tx, ty) < EPS_POS;\n      const slowEnough = Math.hypot(vx, vy) < EPS_VEL;\n\n      if (nearOrigin && slowEnough) {\n        // snap exactly home to avoid subpixel fuzz\n        tx = ty = vx = vy = 0;\n        setTransform();\n        icon.setAttribute('href', originalHref);\n        return;\n      }\n      // If user grabbed again, stop the spring.\n      if (dragging) return;\n\n      requestAnimationFrame(step);\n    }\n    requestAnimationFrame(step);\n  }\n\n  // Keep it floating above other content while dragging (no layout changes)\n  icon.style.zIndex = (parseInt(getComputedStyle(icon).zIndex) || 1).toString();\n\n  // Bind events\n  icon.addEventListener('dragstart', onDragStart);\n  icon.addEventListener('pointerdown', onPointerDown);\n  window.addEventListener('pointermove', onPointerMove, { passive: true });\n  window.addEventListener('pointerup', onPointerUp);\n  window.addEventListener('pointercancel', onPointerUp);\n})();\n</script>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
</Body>
}


      export { Page }
    