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
className={`w-element c1lzvaoj c1qux398`}>
<HtmlEmbed
code={"<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');\n@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');\n  \n  h1{\n    font-family: 'Tanker';\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_RyiWP8CNKOfskpwMp_P8Y.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script src=\"https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.17/index.global.min.js\"></script>\n<script src=\"https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.17/index.global.min.js\"></script>\n<script src=\"https://cdn.jsdelivr.net/npm/@fullcalendar/google-calendar@6.1.17/index.global.min.js\"></script>\n\n<script>\ndocument.addEventListener('DOMContentLoaded', function() {\n  var calendarEl = document.getElementById('calendar');\n\n  var calendar = new FullCalendar.Calendar(calendarEl, {\n    headerToolbar: {\n        left: 'prev,next today',\n        center: 'title',\n        right: ''\n    },\n    dayMaxEvents: 3,\n    firstDay: 1,\n    contentHeight: 'auto',\n    googleCalendarApiKey: 'AIzaSyDBDJxCyN67h-VrQ53s9vm597mrLUiZgHM',\n    events: '23c6f451e6193a878c5affc55d18b050093a87075c0325964379924db8ee027a@group.calendar.google.com',\n\n    eventContent: function(arg) {\n        // only show the event title, no time or dot\n        return {\n          html: '<div class=\"fc-event-title\" style=\"font-weight:normal;\">'\n                  + arg.event.title +\n                '</div>'\n        };\n    },\n\n    eventClick: function(info) {\n      // Prevent default Google Calendar link\n      info.jsEvent.preventDefault();\n      \n      const event = info.event;\n      const popup = document.getElementById('event-popup');\n      const background = document.getElementById('event-popup-back');\n\n      var eLoc = event.extendedProps.location || '';\n      if (eLoc != '') eLoc = \"<span class='pop-loc-pin'>⚲</span> \" + eLoc;\n      \n      // Set the content\n      popup.innerHTML = `\n        <h2 class='event-pop-title'>${event.title}</h2>\n        <span class='event-pop-time'>${formatDate(event.start)}</span>\n        <p class='event-pop-loc'>${eLoc || ''}</p>\n        <p class='event-pop-desc'>${event.extendedProps.description || ''}</p>\n      `;\n      \n      // Position and show popup\n      background.style.display = 'flex';\n\n      background.onclick = function(){\n        const myself = document.getElementById('event-popup-back');\n        myself.style.display = 'none';\n      };\n      popup.onclick = function(e) {\n        e.stopPropagation(); // prevents the click from reaching background\n      };\n    },\n\n    eventDataTransform: function(event) {\n        event.url = \"\";\n        return event;\n    }\n    \n  });\n  calendar.render();\n});\n\n\n\n  function formatDate(date) {\n  const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };\n  let formatted = new Intl.DateTimeFormat('en-GB', options).format(date);\n\n  // Add suffix to day (1st, 2nd, 3rd, 4th…)\n  const day = date.getDate();\n  const suffix = (d => {\n    if (d > 3 && d < 21) return 'th';\n    switch (d % 10) {\n      case 1: return 'st';\n      case 2: return 'nd';\n      case 3: return 'rd';\n      default: return 'th';\n    }\n  })(day);\n\n  formatted = formatted.replace(day, `${day}${suffix}`);\n  return formatted;\n}\n\n</script>\n\n<style>\n  .fc-button {\n    background-color: var(--back-red-1) !important;\n    border-color: var(--back-red-1) !important;\n    color: #fff !important; /* Optional: Ensures text is visible */\n  }\n  \n  .fc-button:hover {\n    background-color: var(--back-red-1) !important;\n    opacity: 0.9;\n  }\n  \n  /* Change event background colours */\n  .fc-event {\n    background-color: var(--back-red-1) !important;\n    border-color: var(--back-red-1) !important;\n    color: #fff !important;\n  }\n\n  .fc .fc-scrollgrid td {\n    border: 1px solid var(--back-grey-1);\n    border-radius: var(--rad2);\n  }\n\n  .fc .fc-scrollgrid, .fc .fc-col-header-cell, .fc .fc-scrollgrid th {\n    border: none !important;\n  }\n\n  /* Highlight today */\n  .fc .fc-day-today {\n    background-color: rgb(from var(--back-red-1) r g b / 0.17) !important;\n    border-radius: 0 !important;\n    box-shadow: 0 0 80px rgb(from var(--back-red-1) r g b / 0.1);\n  }\n  .fc-day-today .fc-daygrid-day-number{\n    font-weight: 600;\n  }\n\n    .fc .fc-daygrid-day-frame {\n    min-height: 110px;\n  }\n  .calendar-container {\n  overflow-x: auto;\n  width: 100%;\n}\n\n  /* Pading for events in day */\n  .fc-daygrid-day-top{\n    margin-bottom: -7px;\n  }\n  .fc-event-title{\n    margin: -1px 0 -1px 4px;\n  }\n  .fc-daygrid-day-events{\n    margin-bottom: 2px !important;\n  }\n\n  /* Popup Styles */\n  .event-pop-title {\n    margin: -30px 0 -15px 25px;\n    padding: 0;\n  }\n  .event-pop-time {\n    margin-left: -13px;\n    font-size: 18px;\n    opacity: 0.6;\n  }\n  .event-pop-desc {\n    margin: -30px 50px -20px 50px;\n  }\n  .event-pop-loc {\n    margin-left: 25px;\n    margin-top: -23px;\n    font-size: 18px;\n    opacity: 0.6;\n  }\n  .pop-loc-pin {\n    font-weight: 700;\n  }\n</style>"}
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
className={`w-link c4qqqhz c1l00ka2 c8l261o c1wmsojl c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1et34yr c1tj415q`}>
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
{"Calendar"}
</h1>
<Text
className={`w-text cg3nt0s c74dsfz czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu c16hxlzn c1c73s0v c7u4ssh`}>
{"See calendar stuff with times and dates and stuff."}
</Text>
</Box>
</Box>
<div
className={`w-element ci03eyw cu8ogtt c1v4vkm5 c3q79or cqlg791 c16e72yc cbeiaob`}>
<div
id={"calendar"}
className={`w-element c4eoysd c2z8j1e`} />
</div>
<div
id={"event-popup-back"}
className={`w-element c15392bw c1jg0tfs c9q7jzv c13w5hsy c1sm4x0m cgqm29d cj1xbu9 c1ehyscn cvuh4zx cu8ogtt c1v4vkm5 c1bti4b5 ce0cz3j c15ikqm`}>
<div
id={"event-popup"}
className={`w-element cxkmob3 cdjqerl cbeiaob c16e72yc cy3hgi9 ch5gnkm cdzo1k7 cd3toq c17nm8vt c1xymrvd c8yo8yx c58kvwj c1lz099s ce0cz3j cdmn2c9`} />
</div>
</Body>
}


      export { Page }
    