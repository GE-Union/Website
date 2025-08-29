/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { HtmlEmbed as HtmlEmbed, Box as Box, Text as Text, Image as Image, Button as Button } from "@webstudio-is/sdk-components-react";
import { Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-08-29T01:41:00.015Z";

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
className={`w-element c1lzvaoj c1qux398 ci03eyw cu8ogtt c1qpyqes c1k74xht`}>
<HtmlEmbed
code={"<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');\n@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');\n  \n  h1{\n    font-family: 'Tanker';\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n    margin-bottom: 0.5em;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_RyiWP8CNKOfskpwMp_P8Y.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
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
className={`w-link c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q`}>
{"General Engineering"}
</Link>
<Link_1
href={"/about-dtu"}
className={`w-element c4qqqhz c1l00ka2 c8l261o c8qj03j c1ho4waj c1k74xht cz03vb2 cqo7rnh cz5lin5 c1tj415q`}>
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
{"about DTU"}
</h1>
<Text
className={`w-text cg3nt0s c74dsfz czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu c16hxlzn c1c73s0v c7u4ssh`}>
{"What to know about the school itself"}
</Text>
</Box>
</Box>
<div
className={`w-element cvuh4zx ckiq6wr`}>
<Image
src={"/assets/DTU_Logo_Ir4X3IvjYl1LrQdKx8B5X.svg"}
width={468}
height={683}
alt={""}
className={`w-image c1x3epop cww5rzx cejbzap c3n0xi`} />
</div>
<div
className={`w-element ccxbyd9 ctslah9 clrom7z c4qqqhz c1p34zf0 c1dsvsvh ci03eyw c7dq5yt c1erinc3 catlkx8 c1m3jn9j c17u97jl c1spep64 c39ez8k`}>
<Image
src={"/assets/DTU_Logo_Ir4X3IvjYl1LrQdKx8B5X.svg"}
width={46}
height={68}
alt={""}
className={`w-image c1l3m6tn c169jybr cywgt5k cycv0tm`} />
<div
className={`w-element`}>
<div
className={`w-element`}>
<h2
className={`w-element`}>
{"What is "}
<span
className={`w-element c1r3ijl0 c1ionsgt c10yf0de c1ij4r40`}>
{"DTU"}
</span>
{"?"}
</h2>
<Image
src={"/assets/DTU_Logo_Ir4X3IvjYl1LrQdKx8B5X.svg"}
width={468}
height={683}
alt={""}
className={`w-image cbb1cch c192h3vw chva2w cpdl5o6 cxxvcyz ccteu3v c1y9qbks clrh4h0 cvuh4zx cgjpuuk`} />
</div>
<p
className={`w-element`}>
<span
className={`w-element`}>
<span
className={`w-element`}>
{"DTU is undoubtedly the best engineering university in europe ("}
</span>
<Link_1
href={"https://engirank.eu/"}
className={`w-element chpvhw5 c1br4k3t c1vn0xiq c1fzztwi cz03vb2 cgjpuuk`}>
{"click here for proof"}
</Link_1>
<span
className={`w-element`}>
{"). Founded by H.C. Ørsted 1829 in, not only does it have great facilities and amazing teachers (like Steeven), but DTU has been heavly involved in inovations in fields such as Biotechnology, Materials Science or even inventing the modern wind turbine (wow!). The main campus situated in the north of Copenhagen in a rich city called Lyngby, (if the public transports actually work), it is about a 40-50min train/bus ride, 20min drive or about a 3h walk from the center."}
</span>
</span>
</p>
</div>
</div>
<div
className={`w-element ccxbyd9 ctslah9 clrom7z c4qqqhz c1p34zf0 c1dsvsvh c1m3jn9j`}>
<Image
src={"/assets/denmark-denmark-svgrepo-com_2tKbgjDykJqfBmTwPfbFA.svg"}
width={800}
height={800}
className={`w-image cbb1cch ct260lj c4gyptv c1p1mrll cvuh4zx czyi9o9 crgfw76 c1mwgji1 c1yp8zjv`} />
<h2
className={`w-element c10jlucd`}>
{"What the hell is PF?"}
</h2>
<div
className={`w-element ci03eyw catlkx8 c1v4vkm5 c5ysdna c10qj6hj cloqs28 c1euhnlj cuekr74 cmho28s`}>
<p
className={`w-element catlkx8 ceiem4c`}>
<Link_1
href={"https://www.pf.dk/en"}
className={`w-element cz03vb2 cz0xufp c9st17j c11jzf7t c1335tz cqiqnof c1t9afk7`}>
{"PF"}
</Link_1>
<span
className={`w-element`}>
{" is basically the mother of all DTU student organisations. As a general rule, If an organisation is student-led, it's surely somehow a part of PF (except for "}
</span>
<Link_1
href={"https://nul-kryds.dk/"}
className={`w-element cz03vb2 cz0xufp c9st17j c11jzf7t c1335tz cqiqnof c1t9afk7`}>
{"Nul-Kryds"}
</Link_1>
<span
className={`w-element`}>
{" for some reason?). This is mainly because PF predates the Danish constitution and is almost as old as DTU itself (founded in 1845). As a piece of DTU admin lore, PF and Nul-kryds are the 2 only student oganisations that DTU recognises and gives funding to. All other organisations need to receive their funds from PF."}
</span>
</p>
<div
className={`w-element c1dohq8s cywyj2c ci03eyw cq67jvo c1bti4b5 c18d5cyi c1qkexhc c1yjp7xb c1s4e4no`}>
<Image
src={"/assets/pf_v1LIcbFFW8g4G_d6CCya4.png"}
width={512}
height={512}
alt={""}
className={`w-image c1yssf23 c58kvwj c7898it c8ao5vx c615b72 cbv71vy cql385l c5i7s9p cpdl5o6 c1yvsbq5 cbajk5q c7dfb6a cqy2tuz`} />
</div>
</div>
<div
className={`w-element`}>
<h3
className={`w-element`}>
{"S-Huset"}
</h3>
<p
className={`w-element`}>
{"You might have already been to S-Huset (student house) for a beer or maybe for a sandwich at the café; if you have, you can thank PF for that. Unlike the 4 DTU-sponsored \"Friday Bars\" (Hegnet, Diamenten, Ether, Diagonalen) that are open from 14 to 21 on Fridays, S-Huset is independent and stays open till 1 on weekdays and 3 am on Fridays. It's a great bar that you can chill at from lunch time to late evening, playing pool, foosball, or ping pong with cheap beer! "}
</p>
</div>
</div>
<div
className={`w-element ccxbyd9 ctslah9 clrom7z c4qqqhz c1p34zf0 c1duohc3 c1nixf1k`}>
<div
className={`w-element`}>
<h2
className={`w-element`}>
{"What the hell is "}
<span
className={`w-element c1r3ijl0 c2st41q c7u4ssh cagwawx`}>
{"IDA"}
</span>
{"?"}
</h2>
<Image
src={"/assets/ida_vxJXM3ZQMHYnDy0d1GadA.png"}
width={190}
height={78}
alt={""}
className={`w-image cbb1cch c192h3vw c1jzx0qs cxxvcyz cgu8udb c5jmnrj c1tr3pou cvuh4zx cgjpuuk`} />
</div>
<div
className={`w-element ci03eyw catlkx8 c1v4vkm5 c1sqf2ek c10pyque c1bbxo3g c1pnodu0`}>
<p
className={`w-element`}>
<span
className={`w-element`}>
{"Simply put, IDA is a gift from god for DTU students; they're a trade union, but they also offer free home insurance for STEM students in Denmark. They are the people to talk to for everything regarding grown-up stuff, such as CV & career help, contracts & legal documents, salary negotiation, and they also organise plenty of events, both professional and just fun. You can check out their website here: "}
</span>
<Link_1
href={"https://english.ida.dk/"}
className={`w-element cz03vb2 c10tpvj3`}>
{"IDA english website"}
</Link_1>
</p>
<div
className={`w-element c1dohq8s cc96m4b ci03eyw cfx1lak c1bti4b5 c18d5cyi c5xw8br c9m7qox cycv0tm`}>
<Image
src={"/assets/ida_vxJXM3ZQMHYnDy0d1GadA.png"}
width={190}
height={78}
alt={""}
className={`w-image c2oalyv c58kvwj c7898it c8ao5vx ce9edmz c2qrd9k cghtjis`} />
</div>
</div>
<p
className={`w-element c14xzzjo`}>
{"Most importantly, make sure to apply for their free home insurance; it's free and covers so much. After signing up (for free), you could spill coffee on your laptop, and they'll pay for it. As I said, a gift from god."}
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
src={"/assets/GEU_Icon_D3w8VZ53_-Z22xmyL4iB1.svg"}
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
src={"/assets/icons8-instagram-100_Bv473-epGJTlb2PIIMZrK.png"}
width={100}
height={100}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
<Link_1
href={"https://www.facebook.com/people/GE-Union/61573069635006/?_rdr"}
target={"_blank"}
className={`w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst`}>
<Image
src={"/assets/icons8-facebook-100_h1qyKfUPJkKqOQqUT8Zyf.png"}
width={100}
height={100}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
<Link_1
href={"https://www.linkedin.com/groups/10061020/"}
target={"_blank"}
className={`w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst`}>
<Image
src={"/assets/icons8-linkedin-100_32y9UEexB2a26klZGd2BD.png"}
width={100}
height={100}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
<Link_1
href={"https://www.reddit.com/r/DTU/"}
className={`w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst`}>
<Image
src={"/assets/icons8-reddit-100_Q4RTsOhheuWPPCcLZd7_J.png"}
width={100}
height={100}
alt={""}
loading={"lazy"}
className={`w-image`} />
</Link_1>
</div>
</div>
</Box>
</Body>
}


      export { Page }
    