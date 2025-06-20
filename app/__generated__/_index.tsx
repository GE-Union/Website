/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, Text as Text, Bold as Bold, Image as Image, HtmlEmbed as HtmlEmbed, Span as Span, Button as Button } from "@webstudio-is/sdk-components-react";
import { Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-06-20T20:28:15.306Z";

      export const siteName = "GE Union";

      export const breakpoints = [{"id":"2EiFMEG40PBm9_fkelqpo"},{"id":"xOnFYyuZv5VkMeeKDLyiu","maxWidth":991},{"id":"Uvcw_OJqyPoLioZzUbP1x","maxWidth":767},{"id":"eCbcXJaLEKSKcnbAPzNF0","maxWidth":479}];

      export const favIconAsset: string | undefined =
        "Favicon_gtxnE_QXZldwugdMJXAuG.ico";

      // Font assets on current page (can be preloaded)
      export const pageFontAssets: string[] =
        ["Tanker-Regular_vPx8SYfLVoGYGM2zAfTx1.woff","Rubik-VariableFont_wght_rrlmmnwM8xol83_Rm9VjL.ttf"]

      export const pageBackgroundImageAssets: string[] =
        []

      
            

            export const CustomCode = () => {
              return (<></>);
            }
          

      const Page = (_props: { system: any; }) => {
return <Body
className={`w-body cdzo1k7 c1lzvaoj cm1ds2c c1qux398`}>
<HtmlEmbed
code={"<style>\n  h1{\n    font-family: Tanker;\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_RyiWP8CNKOfskpwMp_P8Y.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 30s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<Box
className={`w-box c3q79or cqlg791 c1fhonxu ci03eyw cu8ogtt c1nj86ny c1hj4una c859cl6 c1sebhbp c1ptsxkm c1dix99q c1qvfclh c1igvbb7 c1frygxh cb4z2jo c88f0ss c1xzxpj4 cnva8sp c13m9ff cb9skoy cu2cy9t c1towtha cm98duv`}>
<Box
className={`w-box c1vu5acx cd3toq c17nm8vt c1xymrvd c8yo8yx c1duce4z ci03eyw cu8ogtt c1171g5c cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 cxh7lm9 ${"icon-background home-top"}`}>
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
className={`w-link c4qqqhz cr2ujrk c8l261o c1wmsojl c1ho4waj c1k74xht c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q`}>
{"Home"}
</Link>
<Link
href={"/course-bank"}
className={`w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q`}>
{"Course Bank"}
</Link>
<Link
href={"/calendar"}
className={`w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q`}>
{"Calendar"}
</Link>
<Tooltip
delayDuration={0}>
<TooltipTrigger>
<div
className={`w-element c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1k74xht ch9rsc5 c1w0lkxn c1122adb c10pf28n cbahl6h c1tj415q`}>
{"About"}
</div>
</TooltipTrigger>
<TooltipContent
className={`w-tooltip-content c5mlbae cm1ds2c c1fxgukz cdzo1k7 c1lp7lun c3ryv7d c1t11c95 c1kz25wt c1jbi97f crebcbz cfjpsss ci03eyw cu8ogtt c4bgnbx cj82r57 c14a5ioc cm4j335`}>
<Link
href={"/about-ge"}
className={`w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5 c1tj415q`}>
{"General Engineering"}
</Link>
<Link
href={"/about-geu"}
className={`w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1k74xht c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5 c1tj415q`}>
{"GE Union"}
</Link>
</TooltipContent>
</Tooltip>
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
href={"/about-geu"}
className={`w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5`}>
{"About GE"}
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
className={`w-box cprdnmx ck11ylk c19haj7v ci03eyw cu8ogtt c1bti4b5 cgiudld c1xj8ubg cpr5h0z c16m1c5v c2i8l03`}>
<h1
className={`w-element cyoo8jj`}>
{"GE Union"}
</h1>
<Text
className={`w-text cg3nt0s c74dsfz czgmbqe cyoo8jj c1wwlxnr cje5w08 c1bck0pu c16hxlzn c1c73s0v c7u4ssh`}>
{"Group of "}
<Bold
className={`w-bold-text`}>
{"guys"}
</Bold>
{" that do "}
<Bold
className={`w-bold-text`}>
{"stuff"}
</Bold>
{". See what we do here! "}
</Text>
</Box>
</Box>
<Box
className={`w-box c9uhbgw ctrhycw cda4yqq c767uka cdzo1k7 c1w0yra6 cpq2gwm cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw chfxkqq cvm9uv1 c1bg833b c1j0nlio c1e4l0yv c1h2mtua c1o388ql c1cyyop6 c16za6ul ceiem4c cnkevhm c1ehrzp cbcspme codk3bn c1y28bfl c3knbg7 c13m9ff cb9skoy c1g2lc43 c4iwcdt ${"home-cards"}`}>
<Link
href={"/calendar"}
className={`w-link c8nmv6p cwqnf9o c1vn0xiq c1n9f9m4 c4bgnbx cj82r57 c14a5ioc cm4j335 c1xz83ly c12s4iry c1ixcxvm cct8mvq c1ho4waj cu8ogtt c1v4vkm5 ck11ylk c767uka c1ntwtne ci03eyw cqietgu cdmn2c9 cm5zmxq cvr3dv5 ctdgi7y c1ive82f c17vhk5v cagydry ${"home-top-card"}`}>
<div
className={`w-element ci03eyw c197jlyy c1tmykg6 c121nwe4 codsd31 c16er72m c1qt5xo2 c1v4vkm5`}>
<Text
className={`w-text c1lt64h c12zdnex c7amdgj c1nx261z c7tuxro`}>
{"Calendar"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
loading={"eager"}
className={`w-image c1mngz4m c1rwubzf c1tmykg6 c40iywk codsd31 c16er72m c1qt5xo2 cpt3wp3 cgykxgu crl8cro ${"home-top-card-title-icon"}`} />
</div>
<Box
className={`w-box ck11ylk c767uka c1dohq8s ci03eyw c1nj86ny c1v4vkm5 c11gzzxy cc356ws`}>
<Text
className={`w-text cy7nrqp c8l261o cdhy4s8 c5sx8jk cvxkwqs c1w0yra6 cpq2gwm c93vxni c1k1kr9l cpp7o71 c1ajim6p cpyan2s c12tkve4 c5k3a4h crsc1f9 c1c7zter c1lot409 ccjnvj1 c1mkam2s crc7qf5`}>
{"See all upcoming events, periods, and deadlines all in one place."}
{""}
<br />
{""}
{""}
<br />
{""}
<Span
className={`w-text-1 cgjpuuk`}>
{"Everything relevant for GE Students."}
</Span>
</Text>
<div
className={`w-element c1t205vl c1mngz4m cvuh4zx c14e6dcj c638992 ccyo9a2 c6piima`}>
<Image
src={"/assets/Calendar_Icon_JBq83QCbGJiotNNmNumnQ.svg"}
width={650}
height={570}
className={`w-image cnkevhm c1oqdnpz cpc2g7h c1o8iolx c1w0yra6 c1sb186u c1730thw co345il c1lzvaoj ck7n286 c1rv4359 c5frzz4 c11l77i1 c13qonci`} />
</div>
<Box
className={`w-box ck11ylk c767uka c1dohq8s c102e7b2 c1p5610w crsc1f9 c1c7zter c5xw8br cbg59jt`}>
<Box
className={`w-box cwthfpg c1x7uwo4 c12zhvo cxa4mkp ccoo3t2 cd3toq c17nm8vt c1xymrvd c8yo8yx cu8nwxp`}>
<h1
className={`w-element c1vn0xiq c14233kc c76nei5 cnkevhm c1som3p5 c1kz2gr c1wt45pu c1awmcrg cyoo8jj`}>
{"Coming Soon"}
</h1>
</Box>
</Box>
</Box>
</Link>
<Box
className={`w-box ck11ylk ci03eyw cu8ogtt chfxkqq cvm9uv1 c1nj86ny c19haj7v cirsbpr c1dohq8s`}>
<Link
href={"/course-bank"}
className={`w-link c8nmv6p cwqnf9o c1vn0xiq c1n9f9m4 c4bgnbx cj82r57 c14a5ioc cm4j335 c1xz83ly c12s4iry c1ixcxvm cct8mvq c1ho4waj cu8ogtt c1v4vkm5 ck11ylk c19haj7v c102e7b2 ci03eyw c1dohq8s cdmn2c9 cm5zmxq cvr3dv5 ${"home-top-card"}`}>
<div
className={`w-element ci03eyw c197jlyy c1tmykg6 c121nwe4 codsd31 c16er72m c1qt5xo2 c1v4vkm5 ceiem4c`}>
<Text
className={`w-text c1lt64h c12zdnex c7amdgj c1nx261z c7tuxro`}>
{"Course Bank"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
loading={"eager"}
className={`w-image c1mngz4m c1rwubzf c1tmykg6 c40iywk codsd31 c16er72m c1qt5xo2 cpt3wp3 cgykxgu crl8cro ${"home-top-card-title-icon"}`} />
</div>
<div
className={`w-element ck11ylk c767uka c1dohq8s`}>
<div
className={`w-element c1t205vl`}>
<Image
src={"/assets/Vault_Icon_b47VgS0N6eONtPMryR-cd.svg"}
width={650}
height={570}
className={`w-image cnkevhm c1oqdnpz cpc2g7h c1o8iolx c1w0yra6 c1sb186u c1730thw co345il ck7n286`} />
</div>
<p
className={`w-element cy7nrqp c8l261o cdhy4s8 c5sx8jk c1wauoq4 c1w0yra6 cpq2gwm cyoo8jj cpyan2s c12tkve4 c5k3a4h crsc1f9 c1c7zter c1lot409 ccjnvj1 c1mkam2s crc7qf5`}>
{"Here's some demo text for a good demonstration of what I'm trying to do."}
</p>
</div>
</Link>
<Link
href={"/about-ge"}
className={`w-link c8nmv6p cwqnf9o c1vn0xiq c1n9f9m4 c4bgnbx cj82r57 c14a5ioc cm4j335 c1xz83ly c12s4iry c1ixcxvm cct8mvq c1ho4waj cu8ogtt c1v4vkm5 ck11ylk c767uka c102e7b2 ci03eyw cdmn2c9 cm5zmxq cvr3dv5 ${"home-top-card"}`}>
<div
className={`w-element ci03eyw c197jlyy c1tmykg6 c121nwe4 codsd31 c16er72m c1qt5xo2 c1v4vkm5`}>
<Text
className={`w-text c1lt64h c12zdnex c7amdgj c1nx261z c7tuxro`}>
{"about GE"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
loading={"eager"}
className={`w-image c1mngz4m c1rwubzf c1tmykg6 c40iywk codsd31 c16er72m c1qt5xo2 cpt3wp3 cgykxgu crl8cro ${"home-top-card-title-icon"}`} />
</div>
<div
className={`w-element ck11ylk c767uka c1dohq8s`}>
<div
className={`w-element c1t205vl`}>
<Image
src={"/assets/About_GE_Icon_nX97REgvEFTexDZ2ZYnYa.svg"}
width={650}
height={570}
className={`w-image cnkevhm c1oqdnpz cpc2g7h c1o8iolx c1w0yra6 c1sb186u c1730thw co345il ck7n286`} />
</div>
<p
className={`w-element cy7nrqp c8l261o cdhy4s8 c5sx8jk c1wauoq4 c1w0yra6 cpq2gwm cyoo8jj cpyan2s c12tkve4 c5k3a4h crsc1f9 c1c7zter c1lot409 ccjnvj1 c1mkam2s crc7qf5`}>
{"Here's some demo text for a good demonstration of what I'm trying to do."}
</p>
</div>
</Link>
</Box>
</Box>
</Box>
<div
className={`w-element ci03eyw cu8ogtt c1v4vkm5 ciu9gta c8l261o c1wmsojl c3brmnq`}>
<div
className={`w-element cy2b8wa cd3toq c17nm8vt c1xymrvd c8yo8yx c1o3ocm4 c1q7at0i cjpac5y c1tmykg6 c156xldz codsd31 c16er72m c1qt5xo2 ci03eyw cu8ogtt c183x3a4 cs4zrmt chjepeg ct6fd0n c19raolx ct5uc8i ${"icon-background\n"}`}>
<div
className={`w-element c1o49hcl ci03eyw c1dgy9if c1a10q77 c1v4vkm5 c6d6cak c5dclxw c7tvdys cgiudld c1xj8ubg`}>
<div
className={`w-element cx80e38 c9iyznh c1xsuntc cez05na cr2fx1c c1ydphkn cpy5f0q c119ibn4 cqmovsy`} />
<h2
className={`w-element cx80e38 c9iyznh c1lt64h c1jzivuf chpvhw5 c125l1v1 c1k74xht`}>
{"Coming Up"}
</h2>
</div>
<div
className={`w-element ck11ylk c767uka cxn45mh c134tzij c11cmzdu`} />
</div>
</div>
<Box
className={`w-box ci03eyw cu8ogtt c9py6bs c3brmnq cqaj6f4 c16lfnyl c1v4vkm5`}>
<h2
className={`w-element`}>
{"Who We Are"}
</h2>
<p
className={`w-element c1km7ytz cwfxmkq cyoo8jj c1f0lefa c1q98tuy c19a8u9t`}>
{"Longer description of what we do. This should explain in better detail who we are, what we do, and why we do it, also specifying what people can get from us. More info will be available via the button. This is just a summary for those who are confused."}
</p>
<Link
href={"/about-geu"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1582rzp cpyan2s`}>
<Text
className={`w-text`}>
{"Learn more"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
className={`w-image c1nfcmlw`} />
</Link>
</Box>
<Box
className={`w-box c1n9f9m4 c7hwif1 c1iebwwx`} />
<Box
className={`w-box c3q79or cqlg791 ctg5cc4 cd3toq c17nm8vt c1xymrvd c8yo8yx c1n9f9m4 ci03eyw cu8ogtt ccjedbp c1z0fjz8 c9py6bs czpkcbu cz85z79 cl4abvr cnkevhm c8nmv6p cwqnf9o c1v4vkm5 c3zzp20 ckpfi68 cy3m4bk c16o2wqc cwwztsj`}>
<Box
className={`w-box c58kvwj c9g6b5g c13gcvvn c1oqdnpz c1ckfy1d c1qp0aqz c1xos25p c1du959o chqmdb4 c1pmzggb ci03eyw cn8b0jh cywh3a ccmrhvk`}>
<div
className={`w-element cwawr8f ci03eyw cn8b0jh cywh3a cu8ogtt c1qqrgor`}>
<Image
src={"/assets/Screenshot_2025-06-09_at_15.12.21_xgls5tLl42q4e_k6MmtjO.png"}
width={912}
height={1544}
className={`w-image cd3toq c17nm8vt c1xymrvd c8yo8yx c1dohq8s c2z8j1e c1a9mgdi c117si4 c74spxi c1i89xtz c1wuzpx5`} />
</div>
<div
className={`w-element cwawr8f ci03eyw cu8ogtt cn8b0jh cywh3a cy6xfzs`}>
<Image
src={"/assets/Screenshot_2025-06-09_at_15.15.22_28Nk3FxKrVQH3_D-DJB9V.png"}
width={1012}
height={1598}
className={`w-image cd3toq c17nm8vt c1xymrvd c8yo8yx c1dohq8s c2z8j1e c1a9mgdi c117si4 c74spxi c1i89xtz c1wuzpx5`} />
<Image
src={"/assets/Screenshot_2025-06-09_at_15.12.00_VuYJoCf9M7gEJK1UitS5V.png"}
width={922}
height={1568}
loading={"lazy"}
className={`w-image cd3toq c17nm8vt c1xymrvd c8yo8yx c1dohq8s c2z8j1e c1a9mgdi c117si4 c74spxi c1i89xtz c1wuzpx5`} />
</div>
<div
className={`w-element cwawr8f ci03eyw cn8b0jh cywh3a cu8ogtt c1rvt1lv`}>
<Image
src={"/assets/Screenshot_2025-06-09_at_15.16.25_5EHDhLRRJGycIY9CMDZBm.png"}
width={814}
height={1526}
className={`w-image cd3toq c17nm8vt c1xymrvd c8yo8yx c1dohq8s c2z8j1e c1a9mgdi c117si4 c74spxi c1i89xtz c1wuzpx5`} />
<Image
src={"/assets/Screenshot_2025-06-09_at_15.13.24_cygbVPsKh8byh2bPb6QNx.png"}
width={936}
height={1598}
loading={"lazy"}
className={`w-image cd3toq c17nm8vt c1xymrvd c8yo8yx c1dohq8s c2z8j1e c1a9mgdi c117si4 c74spxi c1i89xtz c1wuzpx5`} />
</div>
<div
className={`w-element cwawr8f ci03eyw cu8ogtt cn8b0jh cywh3a cy6xfzs`}>
<Image
src={"/assets/Screenshot_2025-06-09_at_15.17.19_TDP3CA8b2pTflLXFxzO5v.png"}
width={856}
height={1546}
className={`w-image cd3toq c17nm8vt c1xymrvd c8yo8yx c1dohq8s c2z8j1e c1a9mgdi c117si4 c74spxi c1i89xtz c1wuzpx5`} />
</div>
</Box>
<Box
className={`w-box ci03eyw c1v4vkm5 c1nj86ny c2z8j1e cm8v8zq cfbnsol c1ehyscn cgdtuiz c11mvqgx cfml0nf c3knbg7 c9feaj6 cxpcy99`}>
<Box
className={`w-box cda4yqq c19haj7v cyuvfar`}>
<h2
className={`w-element`}>
{"Instagram"}
</h2>
<p
className={`w-element c7wcowi c2z8j1e cmndei7 c3q79or c8qj03j`}>
{"Follow us on Instagram for job postings, epic events, memes, and all the GE vibes you need!"}
</p>
</Box>
<Link
href={"https://www.instagram.com/ge.union/"}
target={"_blank"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1984dmv c1582rzp cpyan2s`}>
<Text
className={`w-text`}>
{"See on Instagram"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
className={`w-image c1nfcmlw`} />
</Link>
</Box>
<Box
className={`w-box ci03eyw c1v4vkm5 c1nj86ny c2z8j1e cm8v8zq cfbnsol c1ehyscn cgdtuiz c11mvqgx cfml0nf c3knbg7 c9feaj6 cxpcy99`}>
<Box
className={`w-box cda4yqq c19haj7v cyuvfar`}>
<h2
className={`w-element`}>
{"LinkedIn"}
</h2>
<p
className={`w-element c7wcowi c2z8j1e cmndei7 c3q79or c8qj03j`}>
{"A community connecting students and graduates! This space helps with career support, job searches, industry insights, and student-relevant job postings from alumni."}
</p>
</Box>
<Link
href={"https://www.linkedin.com/groups/10061020/"}
target={"_blank"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1984dmv c1582rzp cpyan2s`}>
<Text
className={`w-text`}>
{"LinkedIn Network"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
className={`w-image c1nfcmlw`} />
</Link>
</Box>
<Box
className={`w-box ci03eyw c1v4vkm5 c1nj86ny c2z8j1e cm8v8zq cfbnsol c1ehyscn cgdtuiz c11mvqgx cfml0nf c3knbg7 c9feaj6 cxpcy99`}>
<Box
className={`w-box cda4yqq c19haj7v cyuvfar`}>
<h2
className={`w-element`}>
{"Reddit"}
</h2>
<p
className={`w-element c7wcowi c2z8j1e cmndei7 c3q79or c8qj03j`}>
{"Find us with a flair, we exist there too. Interact with the lads and get answers for most frequent questions."}
</p>
</Box>
<Link
href={"https://www.reddit.com/r/DTU/"}
target={"_blank"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1984dmv c1582rzp cpyan2s`}>
<Text
className={`w-text`}>
{"See on Reddit"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
className={`w-image c1nfcmlw`} />
</Link>
</Box>
<Box
className={`w-box ci03eyw c1v4vkm5 c1nj86ny c2z8j1e cm8v8zq cfbnsol c1ehyscn cgdtuiz c11mvqgx cfml0nf c3knbg7 c9feaj6 cxpcy99`}>
<Box
className={`w-box cda4yqq c19haj7v cyuvfar`}>
<h2
className={`w-element`}>
{"Facebook"}
</h2>
<p
className={`w-element c7wcowi c2z8j1e cmndei7 c3q79or c8qj03j`}>
{"Tired of writing at this point. Imagine this contains lots of fascinating information."}
</p>
</Box>
<Link
href={"https://www.facebook.com/people/GE-Union/61573069635006/?_rdr"}
target={"_blank"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c7xu66z c1582rzp cpyan2s`}>
<Text
className={`w-text`}>
{"See on Facebook"}
</Text>
<Image
src={"/assets/Arrow_H1ljlBGfuft_TMCdE7Zb5.svg"}
width={25}
height={24}
className={`w-image c1nfcmlw`} />
</Link>
</Box>
<Box
className={`w-box ci03eyw c1v4vkm5 c1nj86ny c2z8j1e cm8v8zq cfbnsol c1ehyscn cgdtuiz c11mvqgx cfml0nf c3knbg7 c9feaj6 cxpcy99`}>
<Box
className={`w-box cda4yqq c19haj7v cyuvfar`}>
<h2
className={`w-element`}>
{"Contact us"}
</h2>
<p
className={`w-element c7wcowi c2z8j1e cmndei7 c3q79or c8qj03j`}>
{"You can reach us at "}
<Link_1
href={"mailto:geunion.dtu@gmail.com"}
className={`w-element c5pdwyd c1ho4waj`}>
<b
className={`w-element`}>
{"geunion.dtu@gmail.com"}
</b>
</Link_1>
{" for any questions you have!"}
</p>
</Box>
</Box>
</Box>
<Link_1
href={"https://webstudio.is/?via=badge"}
target={"_blank"}
className={`w-element cfyrpk4 c2gl1gx c1pd7k79 c1v4vkm5 c1bti4b5 c15392bw cmyjs62 czstdzv c13f4d8e c1ut9lo7 c1mz59p0 c1g0r0c1 cuhk95i c11qj1rn c1aq6eep c18zghtn cr2ujrk c7amdgj cqw36j6 c68ooh8 clgapjo c1q3df6t c1ho4waj c1ea0099 cuz3b7n`}>
<HtmlEmbed
code={"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" width=\"100%\" height=\"100%\" style=\"display: block;\"><path fill-rule=\"evenodd\" d=\"m12.32 12.416 2.62-8.085a1.205 1.205 0 1 0-2.292-.746l-2.62 8.084a1.205 1.205 0 1 0 2.292.747Z\" clip-rule=\"evenodd\"/><path fill-rule=\"evenodd\" d=\"M8 7.624c.297 0 .517.175.704.394.207.243.373.545.514.866.634 1.44.753 3.241.753 3.241a1.206 1.206 0 0 0 1.285 1.122 1.207 1.207 0 0 0 1.12-1.287s-.16-2.25-.952-4.05C10.744 6.364 9.594 5.208 8 5.208c-1.594 0-2.744 1.156-3.424 2.7-.792 1.8-.951 4.05-.951 4.05a1.207 1.207 0 0 0 1.12 1.288 1.206 1.206 0 0 0 1.284-1.122s.119-1.8.753-3.24a3.52 3.52 0 0 1 .514-.867c.187-.22.406-.394.704-.394Z\" clip-rule=\"evenodd\"/><path fill-rule=\"evenodd\" d=\"M5.973 11.669 3.352 3.585a1.205 1.205 0 1 0-2.293.746l2.622 8.084a1.205 1.205 0 1 0 2.292-.746Z\" clip-rule=\"evenodd\"/></svg>"}
className={`w-html-embed c6f08mx c58jkk8 c4bwhth c767uka`} />
<div
className={`w-element`}>
{"Built with Webstudio"}
</div>
</Link_1>
</Body>
}


      export { Page }
    