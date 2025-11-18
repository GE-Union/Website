/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { HtmlEmbed as HtmlEmbed, Box as Box, Image as Image, Button as Button, Text as Text } from "@webstudio-is/sdk-components-react";
import { Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose, Accordion as Accordion, AccordionItem as AccordionItem, AccordionHeader as AccordionHeader, AccordionTrigger as AccordionTrigger, AccordionContent as AccordionContent } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-11-18T18:36:08.441Z";

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
className={`w-element c11tcoly cmz8li2 cr9uasm`}>
<HtmlEmbed
code={"<style>\n@import url('https://fonts.cdnfonts.com/css/minecrafter-alt');\n@import url('https://fonts.cdnfonts.com/css/minecraftia');\n@import url('https://fonts.cdnfonts.com/css/minecraft-title');\n  \n  h1{\n    font-family: 'Minecrafter Alt';\n    font-weight: 500;\n    font-size: 3.8em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-family: 'Minecraft title';\n    font-weight: 100;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n    margin-bottom: 0.3em;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_orTDw4lIQEfSgOgF0DBVy.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n\n\n\n\n/* Minecraft Style Button */\n.mc-button {\n\theight: var(--btn-size);\n\twidth: calc(var(--btn-size) * 10);\n\tcursor: pointer;\n\toverflow: hidden;\n\twhite-space: nowrap;\n\tuser-select: none;\n\n\tbackground: #999 url('https://i.ibb.co/rb2TWXL/bgbtn.png') center / cover;\n\timage-rendering: pixelated;\n\tborder: 2px solid #000;\n\t\n\t/* Mouse over */\n\t&:hover .mcbuttitle {\n\t\tbackground-color: rgba(100, 100, 255, .45);\n\t\ttext-shadow: 2px 2px #202013CC;\n\t\tcolor: #FFFFA0;\n\t}\n\t&:active .mcbuttitle {\n\t\tbox-shadow: inset -2px -4px #0004, inset 2px 2px #FFF5;\n\t}\n\t/* Button title */\n\t.mcbuttitle {\n\t\twidth: 100%; height: 100%;\n\t\tpadding-bottom: .3em;\n\t\t@include flex-center-hv;\n\t\t\n\t\tcolor: #DDD;\n\t\ttext-shadow: 2px 2px #000A;\n\t\tbox-shadow: inset -2px -4px #0006, inset 2px 2px #FFF7;\n\t}\n\t/* Others */\n\t&.full { width: 100%; height: 100%; }\n\t&.lang {\n\t\t& img { width: 26px; height: 26px;}\n\t\t& .mcbuttitle  { padding-bottom: 0; } }\n}\n\n  \n\n\n  .pixel-corners {\n  clip-path: polygon(\n    0px calc(100% - 24px),\n    6px calc(100% - 24px),\n    6px calc(100% - 12px),\n    12px calc(100% - 12px),\n    12px calc(100% - 6px),\n    24px calc(100% - 6px),\n    24px 100%,\n    calc(100% - 24px) 100%,\n    calc(100% - 24px) calc(100% - 6px),\n    calc(100% - 12px) calc(100% - 6px),\n    calc(100% - 12px) calc(100% - 12px),\n    calc(100% - 6px) calc(100% - 12px),\n    calc(100% - 6px) calc(100% - 24px),\n    100% calc(100% - 24px),\n    100% 24px,\n    calc(100% - 6px) 24px,\n    calc(100% - 6px) 12px,\n    calc(100% - 12px) 12px,\n    calc(100% - 12px) 6px,\n    calc(100% - 24px) 6px,\n    calc(100% - 24px) 0px,\n    24px 0px,\n    24px 6px,\n    12px 6px,\n    12px 12px,\n    6px 12px,\n    6px 24px,\n    0px 24px\n  );\n}\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<Box
className={`w-box cck00sw ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1c1nljs c1uz2t7q c4psa79 c1ldi832 ${"icon-background home-top pixel-corners"}`}>
<Box
className={`w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m`}>
<Link
href={"/"}
target={"_self"}
id={"menu-icon"}
className={`w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 cqyp7hg c1moglug`}>
<Image
src={"/assets/geu-logo-pixel_A2AuJTFOfuj8lUzQcoPbx.svg"}
width={50}
height={70}
loading={"eager"}
alt={""}
className={`w-image c2esyix c15yfdgq ct616nu c1uhp8e3 c1swt08u c1wjaqd0`} />
</Link>
<Box
className={`w-box ci03eyw c5zf3td c1bdekej cy2vnym cgykfac c8chaf1 crymv6m ch588tu cd1c1x2 cgjpuuk co3wgvm cjdg5q7`}>
<Link
href={"/"}
className={`w-link c4qqqhz c1l00ka2 cmz8li2 c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1hqjrr7 c1tj415q cycv0tm`}>
{"Home"}
</Link>
<Link
href={"/course-bank"}
className={`w-link c4qqqhz c1l00ka2 cmz8li2 c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1hqjrr7 c1tj415q`}>
<span
className={`w-element cycv0tm`}>
{"Course "}
</span>
{"Bank"}
</Link>
<Link
href={"/calendar"}
className={`w-link c4qqqhz c1l00ka2 cmz8li2 c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1hqjrr7 c1tj415q`}>
{"Calendar"}
</Link>
<Tooltip
delayDuration={0}>
<TooltipTrigger>
<div
className={`w-element c4qqqhz c1l00ka2 cmz8li2 c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cbahl6h c1tj415q`}>
{"About"}
</div>
</TooltipTrigger>
<TooltipContent
className={`w-tooltip-content c5mlbae cm1ds2c c1fxgukz c1n9f9m4 c1lp7lun c3ryv7d c1t11c95 c1kz25wt c1jbi97f crebcbz cfjpsss ci03eyw cu8ogtt ct1jq01 c7d32e2`}>
<Link
href={"/about-ge"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1hqjrr7 c1tj415q`}>
{"General Engineering"}
</Link>
<Link_1
href={"/about-dtu"}
className={`w-element c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht cz03vb2 cqo7rnh cz5lin5 c1hqjrr7 c1tj415q`}>
{"DTU"}
</Link_1>
<Link
href={"/about-geu"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1hqjrr7 c1tj415q`}>
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
className={`w-element cyoo8jj c1k74xht cbwlfln cnurt1a c1wzvl6u ca31dgg c1pu31ho`}>
{"Minecraft month"}
</h1>
<Text
className={`w-text cqawzgp c1s7gudn czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu cnurt1a c1wzvl6u c7u4ssh`}>
{"Join the rest of GE for mining and crafting!"}
</Text>
</Box>
</Box>
<div
className={`w-element c1w0yra6 cpq2gwm c19f83kh c4qqqhz c7wcowi c1dsvsvh cyoo8jj c1nixf1k c17i4kqy c1hhefcr c6jvbv7`}>
<p
className={`w-element`}>
{"Minecraft Month is a fun, open-world Minecraft server experience running throughout "}
<b
className={`w-element`}>
{"November"}
</b>
{". The event is designed for players of all skill levels to explore, collaborate, and enjoy Minecraft together at DTU."}
{""}
<br />
{""}
{""}
<br />
{""}
{"The event is open to everyone: "}
<b
className={`w-element`}>
{"GE students or not!"}
</b>
</p>
</div>
<div
className={`w-element c19f83kh c1lb4b9w c1p6r7jt`}>
<div
className={`w-element c1iphxzh c1ixxl29 ce1ywqb c1hackn6 c15j8t4a c1vmh594 c1hhrno2 c1dbtj0a c1w0yra6 cpq2gwm c1ie7ree cld634l ceogueq cjpq878 c1a3xarh c7874j4`}>
<div
className={`w-element ci03eyw c2z8j1e c1l3m6tn cqaj6f4 c16lfnyl ct7on7b cgqm29d c1wmsojl c1g46emb c11aly8t cd5ot2b c1q3wo66 ${""}`}>
<div
className={`w-element c4qqqhz`}>
<Image
src={"/assets/Logo_Pixel_d728hgLJjfa_DK4_-SbRA.png"}
width={512}
height={512}
alt={""}
loading={"lazy"}
className={`w-image c1u1zexl ca40tb c1g46emb cj1ukl1`} />
</div>
<div
className={`w-element ck11ylk c767uka c4qqqhz`}>
<h1
className={`w-element ca31dgg ctuz1ay c1h5g7r3`}>
{"GE Union"}
</h1>
<p
className={`w-element cnwmbet c13opn8k c1tiz6lo c1pkzl4t`}>
<span
className={`w-element c35rkun c1k74xht`}>
{"IP: "}
</span>
{"mc.geunion.dk"}
{""}
<br />
{""}
<span
className={`w-element c35rkun c1k74xht`}>
{"Version: "}
</span>
{"1.21.10"}
</p>
</div>
</div>
</div>
</div>
<div
className={`w-element c1w0yra6 cpq2gwm cerccex c4qqqhz c7wcowi c1dsvsvh cyoo8jj c4nxafs c17i4kqy c1hhefcr c6jvbv7 c17qa5tp`}>
<p
className={`w-element c1vn0xiq`}>
{"Duration: "}
<span
className={`w-element c8qj03j cwh659g`}>
{"November 1st - 31st"}
</span>
</p>
</div>
<div
className={`w-element c1w0yra6 cpq2gwm cj7bt5u c4qqqhz c1f0lefa c1dsvsvh c1nixf1k c17i4kqy c1hhefcr c6jvbv7`}>
<h2
className={`w-element`}>
{"Event Details"}
</h2>
<p
className={`w-element`}>
{"The server starts with a "}
<b
className={`w-element`}>
{"limited world boundary"}
</b>
{"."}
{""}
<br />
{""}
{"Each day, the "}
<b
className={`w-element`}>
{"boundary expands"}
</b>
{", revealing new areas, challenges, and opportunities."}
{""}
<br />
{""}
{"Designed to provide "}
<b
className={`w-element`}>
{"fresh content daily"}
</b>
{" and keep players engaged."}
{""}
<br />
{""}
{""}
<br />
{""}
<b
className={`w-element`}>
{"Everyone"}
</b>
{" should be able to have fun, whether you’re a beginner or a pro."}
</p>
<h2
className={`w-element cazktie`}>
{"Activities"}
</h2>
<div
className={`w-element ci03eyw cu8ogtt c1svdh6y cft5z6j`}>
<div
className={`w-element ci03eyw`}>
<p
className={`w-element cda4yqq c767uka c8ao5vx`}>
{"Day 5:  "}
</p>
<p
className={`w-element`}>
{"Design best house - players will have since day one to gather materials and prepare the best looking house."}
</p>
</div>
<div
className={`w-element ci03eyw`}>
<p
className={`w-element cda4yqq c767uka c8ao5vx`}>
{"Day 10: "}
</p>
<p
className={`w-element`}>
{"We open the nether."}
</p>
</div>
<div
className={`w-element ci03eyw`}>
<p
className={`w-element cda4yqq c767uka c8ao5vx`}>
{"Day 15: "}
</p>
<p
className={`w-element`}>
{"PvP tournament."}
</p>
</div>
<div
className={`w-element ci03eyw`}>
<p
className={`w-element cda4yqq c767uka c8ao5vx`}>
{"Day 20: "}
</p>
<p
className={`w-element`}>
{"End will be playable."}
</p>
</div>
<div
className={`w-element ci03eyw`}>
<p
className={`w-element cda4yqq c767uka c8ao5vx`}>
{"Day 25: "}
</p>
<p
className={`w-element c8ao5vx`}>
{"TBA"}
</p>
</div>
</div>
</div>
<Image
src={"/assets/geu-logo-pixel_A2AuJTFOfuj8lUzQcoPbx.svg"}
width={50}
height={70}
alt={""}
className={`w-image c1shgpg6 c7hwif1 cy9rpio c1w0yra6 cpq2gwm cj7bt5u c1k74xht c19dg1ud c1hhfflc c1dyo3uz`} />
<div
className={`w-element c1w0yra6 cpq2gwm c19f83kh c4qqqhz c1f0lefa c1kzw9o3 c1nixf1k c17i4kqy c1hhefcr c6jvbv7`}>
<h2
className={`w-element`}>
{"Server Details"}
</h2>
<p
className={`w-element`}>
{"This is a vanilla "}
<b
className={`w-element`}>
{"Java Edition"}
</b>
{" server, meaning you don't need any mods to play! "}
<span
className={`w-element c8ao5vx`}>
{"You will not be able to play on Bedrock Edition."}
</span>
</p>
<h2
className={`w-element cazktie`}>
{"How to Join"}
</h2>
<p
className={`w-element`}>
{"1. Open the Minecraft Launcher"}
{""}
<br />
{""}
{"2. Make sure you're on Java Edition"}
{""}
<br />
{""}
{"3. Launch the game and enter Multiplayer"}
{""}
<br />
{""}
{"4. Choose "}
<b
className={`w-element`}>
{"Add Server"}
</b>
{""}
<br />
{""}
{"5. Set the Address to "}
<b
className={`w-element c18t8i99 czaajis c1tta375`}>
{"mc.geunion.dk"}
</b>
{" and save"}
{""}
<br />
{""}
{"6. Click "}
<b
className={`w-element`}>
{"play"}
</b>
{" and have fun!"}
</p>
<h2
className={`w-element cazktie`}>
{"Communication Options"}
</h2>
<p
className={`w-element czk4mnn`}>
{"Players can communicate in three different ways:"}
</p>
<Accordion
collapsible={true}
value={""}
className={`w-accordion`}>
<AccordionItem
data-ws-index="0"
className={`w-item c10ziczw`}>
<AccordionHeader
className={`w-item-header ci03eyw cmz8li2`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 c1uqlbxg cfrthnz c14k6nzi cr2ujrk c18uv5ha ck08swj c1kjz0sw c1hs8b7k c1u8r20w ci1qamt`}>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2 cmt2x3l cgrn48i`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\">\n  <path d=\"M0 3h3v3H0zM12 3h3v3h-3zM3 6h3v3H3zM9 6h3v3H9zM6 9h3v3H6z\" shape-rendering=\"crispEdges\" style=\"fill:#000;opacity:255\"/>\n</svg>\n"}
className={`w-html-embed`} />
</Box>
<Text
className={`w-text`}>
<b
className={`w-element`}>
{"Proximity voice chat"}
</b>
{" "}
<span
className={`w-element cycv0tm`}>
{"via mod installed on the server"}
</span>
</Text>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c1ycv641 cak89in cdj7twg c1o0ntyx clw24wx c1gnh8fz`}>
<span
className={`w-element`}>
{"To enable proximity chat, you can install the Simple Voice Chat mod from Modrinth. You will need Minecraft Java Edition and either Forge or Fabric installed. Once set up, you will be able to talk to players who are physically close to you in-game. If you prefer not to install the mod, you can always communicate through Discord voice channels or in-game text chat instead. But we highly recommend using it, as it will significantly enhance your experience on the server."}
</span>
<Link_1
href={"https://modrinth.com/plugin/simple-voice-chat"}
target={"_blank"}
className={`w-element c6f08mx c1cn8p4x c1w0yra6 cpq2gwm c12zhvo ck08swj c1ho4waj`}>
<div
className={`w-element ${"mc-button"}`}>
<p
className={`w-element c2z8j1e c1cz5kzf cyoo8jj ${"mcbuttitle"}`}>
{"Modrinth Mod"}
</p>
</div>
</Link_1>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="1"
className={`w-item c10ziczw`}>
<AccordionHeader
className={`w-item-header ci03eyw cmz8li2`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 c1uqlbxg c1hs8b7k cfrthnz c14k6nzi cr2ujrk c18uv5ha ck08swj c1kjz0sw c1u8r20w ci1qamt`}>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2 cmt2x3l cgrn48i`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\">\n  <path d=\"M0 3h3v3H0zM12 3h3v3h-3zM3 6h3v3H3zM9 6h3v3H9zM6 9h3v3H6z\" shape-rendering=\"crispEdges\" style=\"fill:#000;opacity:255\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
<Text
className={`w-text`}>
<b
className={`w-element`}>
{"Voicechannels "}
</b>
{"via"}
<span
className={`w-element cycv0tm`}>
{" DTU"}
</span>
{" Discord "}
<span
className={`w-element cycv0tm`}>
{"server"}
</span>
</Text>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c1ycv641 cak89in cdj7twg c1o0ntyx clw24wx c1gnh8fz`}>
<span
className={`w-element`}>
{"When you join the Discord server, you’ll first see the introduction and role-selection menu. Select GE "}
<span
className={`w-element c8ao5vx`}>
{"(or your relevant category)"}
</span>
{", and then choose the Minecraft role. This instantly unlocks the Minecraft announcement channel, text channel, and dedicated voice channels so you can stay updated and communicate with other players."}
</span>
<Link_1
href={"https://discord.gg/2g6XbdAP"}
target={"_blank"}
className={`w-element c6f08mx c1cn8p4x c1w0yra6 cpq2gwm c12zhvo ck08swj c1ho4waj`}>
<div
className={`w-element ${"mc-button"}`}>
<p
className={`w-element c2z8j1e c1cz5kzf cyoo8jj ${"mcbuttitle"}`}>
{"DTU Discord"}
</p>
</div>
</Link_1>
</AccordionContent>
</AccordionItem>
<AccordionItem
data-ws-index="2"
className={`w-item c10ziczw`}>
<AccordionHeader
className={`w-item-header ci03eyw cmz8li2`}>
<AccordionTrigger
className={`w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 c1uqlbxg c1hs8b7k cfrthnz c1kjz0sw c14k6nzi cr2ujrk c18uv5ha ck08swj c1u8r20w ci1qamt`}>
<Box
className={`w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2 cmt2x3l cgrn48i`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\">\n  <path d=\"M0 3h3v3H0zM12 3h3v3h-3zM3 6h3v3H3zM9 6h3v3H9zM6 9h3v3H6z\" shape-rendering=\"crispEdges\" style=\"fill:#000;opacity:255\"/>\n</svg>"}
className={`w-html-embed`} />
</Box>
<Text
className={`w-text`}>
<b
className={`w-element`}>
{"Using the In-game chat"}
</b>
</Text>
</AccordionTrigger>
</AccordionHeader>
<AccordionContent
className={`w-item-content cm1ds2c c1fxgukz crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c1ycv641 cak89in cdj7twg c1o0ntyx clw24wx c1gnh8fz`}>
{"Doesn't require any setup! Just press "}
<b
className={`w-element`}>
{"T"}
</b>
{" In game."}
</AccordionContent>
</AccordionItem>
</Accordion>
</div>
<Image
src={"/assets/geu-logo-pixel_A2AuJTFOfuj8lUzQcoPbx.svg"}
width={50}
height={70}
alt={""}
className={`w-image c1shgpg6 c7hwif1 cy9rpio c1w0yra6 cpq2gwm cj7bt5u c1k74xht c19dg1ud c1hhfflc c1dyo3uz`} />
<div
className={`w-element c1w0yra6 cpq2gwm cj7bt5u c4qqqhz c1f0lefa c1kzw9o3 c1nixf1k c17i4kqy c1hhefcr c6jvbv7`}>
<h2
className={`w-element`}>
{"Rules"}
</h2>
<p
className={`w-element`}>
<b
className={`w-element`}>
{"Be respectful"}
</b>
{" - Treat your fellow players with kindness. This server is supposed to be a fun environment for everyone so any kind of harassment, toxic behaviour or hate speech is unacceptable."}
{""}
<br />
{""}
{""}
<br />
{""}
<b
className={`w-element`}>
{"No HAXXXX"}
</b>
{" - using mods "}
<span
className={`w-element c8ao5vx`}>
{"(other than the one for the voicechat)"}
</span>
{", hacks or other kinds of exploits that enable an unfair advantage over other players is not allowed."}
{""}
<br />
{""}
{""}
<br />
{""}
<b
className={`w-element`}>
{"No griefing"}
</b>
{" - Don’t destroy or alter other player’s builds and bases without their permission."}
{""}
<br />
{""}
{""}
<br />
{""}
<b
className={`w-element`}>
{"No stealing"}
</b>
{" - Don’t take other players items from their chests or inventories without their permission."}
{""}
<br />
{""}
{""}
<br />
{""}
<b
className={`w-element`}>
{"Keep the chat clean"}
</b>
{" - avoid excessive spamming, swearing, inappropriate discussions or similar."}
</p>
</div>
<Box
className={`w-box c9esr7v cm1ds2c c1fxgukz c5f1dbc cnkzs50 chbqw1w c1ylpb7q cqp51h6 csaxvfs ce1jmtw c1m7qrvj c1o7c5y4 c1ndanu0 ${"icon-background pixel-corners"}`}>
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
className={`w-element ci03eyw c1is6v5c co8t7od c1nj86ny c74dsfz c1jwuvkp c1ih5jst cvn9nmc cezuxvu`}>
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
    