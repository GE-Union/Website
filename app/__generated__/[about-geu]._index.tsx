/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, Text as Text, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button } from "@webstudio-is/sdk-components-react";
import { Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-10-29T16:47:32.850Z";

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
className={`w-element c1lzvaoj c1qux398 cm1ds2c`}>
<HtmlEmbed
code={"<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');\n@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');\n  \n  h1{\n    font-family: 'Tanker';\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n    margin-bottom: 0.3em;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_orTDw4lIQEfSgOgF0DBVy.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
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
className={`w-element c4qqqhz c1l00ka2 c8l261o c1ozmz5d c1ho4waj c1k74xht cz03vb2 cqo7rnh cz5lin5 c1tj415q`}>
{"DTU"}
</Link_1>
<Link
href={"/about-geu"}
className={`w-link c4qqqhz c1l00ka2 c8l261o c8qj03j c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q`}>
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
{"about GE Union"}
</h1>
<Text
className={`w-text cqawzgp c1s7gudn czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu cnurt1a c1wzvl6u c7u4ssh`}>
{"Who are we and why are we here?"}
</Text>
</Box>
</Box>
<div
className={`w-element ci03eyw c1bti4b5 c1ubxcee c16fkvsp c1aa51lf c1v4vkm5 cuqkdit c1bzjoez c1ac3qw6 cc356ws c3knbg7`}>
<div
className={`w-element ck11ylk c767uka cxn45mh c1dsvsvh c11cmzdu cvuh4zx c14e6dcj cngynuq c14r7o8r c1fsw25j c12tny8 cly6kwb cnaoejs`}>
<p
className={`w-element cyoo8jj cu7mlpt cy7nrqp c1nndd8u c8h98z5 c1ai6gqv`}>
{"GEU is a student-led community hub "}
<br />
{"  "}
<span
className={`w-element cly2rzj cr2ujrk c1lt64h c1f9u155 c1lhrjj6 c1xrfqic`}>
{"by GE students "}
<br />
{"for GE students"}
</span>
{""}
<br />
{""}
</p>
</div>
<div
className={`w-element cy2b8wa cd3toq c17nm8vt c1xymrvd c8yo8yx cc96m4b ci03eyw cu8ogtt c5t1rtw c87opo9 c5sx8jk ct6fd0n c19raolx c1ouh616 c1sdo29q c1fgu9om cbg59jt ${"icon-background\n"}`}>
<div
className={`w-element c1o49hcl ci03eyw c1dgy9if c1a10q77 c1v4vkm5 c6d6cak c5dclxw c7tvdys cgiudld c1xj8ubg`}>
<div
className={`w-element cx80e38 c9iyznh c1xsuntc cez05na cr2fx1c c1ydphkn cpy5f0q c119ibn4 cqmovsy`} />
<h2
className={`w-element cx80e38 c9iyznh c1lt64h c1jzivuf chpvhw5 c125l1v1 c1k74xht cc02v1c`}>
{"who we are"}
</h2>
</div>
<div
className={`w-element ck11ylk c767uka cxn45mh cvku5ok c11cmzdu c15oj64s`}>
<p
className={`w-element cyoo8jj cu7mlpt c1wmsojl czeluz0 c1nndd8u cqphno7`}>
{"GEU is a student-led community hub "}
<br />
{"  "}
<span
className={`w-element c1syq5xc cr2ujrk c1lt64h c1f9u155 casuw30 cdzgsn1`}>
{"by GE students "}
<br />
{"for GE students"}
</span>
{""}
<br />
{""}
</p>
</div>
</div>
<div
className={`w-element ct0y9nq c1mkam2s c1or6680 c1g5kku5`}>
<h2
className={`w-element`}>
{"Our Goal"}
</h2>
<p
className={`w-element`}>
{"Our goal is to turn GE into one close, supportive community. We want to create connections across all three years, helping you meet people you wouldn’t normally meet, showing you the academic opportunities DTU offers, and keeping you updated on all that is relevant for a GE student. All in all, we want to better your social and academic life as a student in GE."}
{""}
<br />
{""}
</p>
</div>
</div>
<Image
src={"/assets/GE_Logo_-_Small_rkpu_74a2VYBJut58034f.svg"}
width={498}
height={618}
alt={""}
className={`w-image c1shgpg6 c7hwif1 cbbmghh c1w0yra6 cpq2gwm cj7bt5u c1k74xht c19dg1ud`} />
<div
className={`w-element cyoo8jj cxa4mkp cy2vnym`}>
<h2
className={`w-element`}>
{"What We Do"}
</h2>
<div
className={`w-element ci03eyw c1vi0mt cqaj6f4 c16lfnyl c1bti4b5 cc4bk5j`}>
<div
className={`w-element c1o50h06 c1et1u9b ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm c1n9f9m4 cqxegdb cgrcr0q`}>
<h3
className={`w-element`}>
{"Events 🎫  "}
<br />
{""}
</h3>
<p
className={`w-element`}>
{"From Exam Brush-Up sessions to Grill Parties, we host all sorts of events to save your exams, help unwind, and help you bond across years. All events are designed to help us meet new people, open doors of opportunity, and build a strong social community."}
</p>
</div>
<div
className={`w-element c1o50h06 c1et1u9b ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm c1n9f9m4 cqxegdb cgrcr0q`}>
<h3
className={`w-element`}>
{"Website 🌐 "}
</h3>
<p
className={`w-element`}>
{"All the knowledge about GE – no fluff. We’ve bundled the hacks we wish we had into one place: honest takes on the four specialisations, past exams, revised notes, formula booklets, and a deadline calendar. Most importantly, it’s about sharing and supporting each other so no one has to study alone."}
</p>
</div>
<div
className={`w-element c1o50h06 c1et1u9b ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm c1n9f9m4 cqxegdb cgrcr0q`}>
<h3
className={`w-element`}>
{"Career 💼 "}
</h3>
<p
className={`w-element`}>
{"From company visits to career tips, we connect you with opportunities worth grabbing. You’ll meet industry professionals, hear what companies actually look for, and get a feel for different fields. Along the way, you build a network that could kickstart your career, while picking up the tools to stand out."}
</p>
</div>
</div>
</div>
<Image
src={"/assets/GE_Logo_-_Small_rkpu_74a2VYBJut58034f.svg"}
width={498}
height={618}
alt={""}
className={`w-image c1shgpg6 c7hwif1 cbbmghh c1w0yra6 cpq2gwm cj7bt5u c1k74xht c19dg1ud`} />
<div
className={`w-element cyoo8jj cxa4mkp cy2vnym c4jdyrv ci03eyw cu8ogtt c1v4vkm5 c1dgy9if cqaj6f4 c16lfnyl`}>
<h2
className={`w-element`}>
{"Want to Join?"}
</h2>
<p
className={`w-element c1km7ytz cwfxmkq cyoo8jj cvqaoy8 c5dvuwy crwgjbx c1j13thr clafu7i`}>
{"GEU is always looking for new people to join our team "}
<span
className={`w-element c1vn0xiq`}>
{"(especially first years)"}
</span>
{", so if you like what we do and want to help, or maybe want to use this as a safe space to gain experience, don't hesitate to send in an application! Whether you are interested in IT, event planning, marketing, social media, or contact with industry, we have a team that you will fit right into "}
<span
className={`w-element c1vn0xiq`}>
{"(all while making sure to have lots of fun)"}
</span>
{". So what are you waiting for??"}
</p>
<Link
href={"https://docs.google.com/forms/d/e/1FAIpQLScu14PgRWRO-iJ6uEs9s8lNS5QsuPb0HNvI8OY9KIkB9he5VQ/viewform?usp=header"}
className={`w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c341g64 c11h9c5s c17hd63g cnrv5xy c1ho4waj czgmbqe c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1swt08u cmvyqw5 c1582rzp cpyan2s`}>
<Text
className={`w-text`}>
{"Submit your application "}
</Text>
<Image
src={"/assets/Arrow_exgLm9zGXPhywmuQ3p_EH.svg"}
width={25}
height={24}
alt={""}
className={`w-image c1nfcmlw cqb6n9z`} />
</Link>
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
    