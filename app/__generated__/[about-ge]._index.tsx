/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, Text as Text, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button } from "@webstudio-is/sdk-components-react";
import { Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


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
className={`w-element c1lzvaoj c1qux398 ci03eyw cu8ogtt c1qpyqes`}>
<HtmlEmbed
code={"<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');\n@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');\n  \n  h1{\n    font-family: 'Tanker';\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n    margin-bottom: 0.5em;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_RyiWP8CNKOfskpwMp_P8Y.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
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
{"about GE"}
</h1>
<Text
className={`w-text cg3nt0s c74dsfz czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu c16hxlzn c1c73s0v c7u4ssh`}>
{"Everything you need to know while you’re here"}
</Text>
</Box>
</Box>
<div
className={`w-element ccxbyd9 ctslah9 cj7bt5u c4qqqhz c1p34zf0 c1dsvsvh`}>
<h2
className={`w-element`}>
{"What is GE?"}
</h2>
<p
className={`w-element`}>
{"The Bachelor of Science in General Engineering at DTU is a three-year international programme that gives you a strong foundation in mathematics, physics, chemistry, and biotechnology. It teaches you to collaborate across disciplines and apply engineering skills to real-world challenges. Through practical design-build projects, you will develop problem-solving abilities and learn how to work effectively in diverse teams. Studying in an international environment with courses taught in English, you’ll gain the broad competences needed to become an innovative engineer ready to shape the future."}
</p>
</div>
<div
className={`w-element ccxbyd9 ctslah9 cj7bt5u c4qqqhz c1p34zf0 c1dsvsvh`}>
<h2
className={`w-element`}>
{"Polytechnical Foundations "}
<span
className={`w-element c1vn0xiq cr2ujrk c8py5un cycv0tm cf92qlo c1p20m63`}>
{"The Core Stuff"}
</span>
</h2>
<p
className={`w-element`}>
{"The polytechnical foundation is basically all the main general subjects every GE student will have to take, which include Chemistry, Bioengineering, Physics, Programming, Statistics, and Mathematics. Some are more of a pain than others, but the main point is to bring all students to a general standard across all these base subjects. "}
</p>
</div>
<div
className={`w-element ccxbyd9 ctslah9 cj7bt5u c4qqqhz c1p34zf0 c1dsvsvh`}>
<h2
className={`w-element`}>
{"Specialisations "}
<span
className={`w-element c1vn0xiq cr2ujrk c8py5un cycv0tm cf92qlo c1p20m63`}>
{"The Branches"}
</span>
</h2>
<p
className={`w-element`}>
{"After completing the core courses in General Engineering, you can choose to specialise in one of four areas. Each specialisation builds on your broad engineering foundation and prepares you for specific industries and career paths:"}
</p>
<div
className={`w-element ci03eyw c1vi0mt cqaj6f4 c16lfnyl c1bti4b5 cc4bk5j`}>
<div
className={`w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q`}>
<Image
src={"/assets/S-Advanced-Icon_TWuU1GxlAwBjJmF4_F-gd.png"}
width={4167}
height={4167}
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
src={"/assets/S-Cyber-Icon_gtF6axbVfym-YHvyK1vT6.png"}
width={4167}
height={4167}
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
src={"/assets/S-Living-Icon_GY_Y8vI69OfuA7uQA4-A2.png"}
width={4167}
height={4167}
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
src={"/assets/S-Energy-Icon_mssMv-71p9Azt25Zel5LO.png"}
width={4167}
height={4167}
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
className={`w-element ccxbyd9 ctslah9 cj7bt5u c4qqqhz c1p34zf0 c1duohc3`}>
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
</Body>
}


      export { Page }
    