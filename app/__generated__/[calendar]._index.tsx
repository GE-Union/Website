/* eslint-disable */
      /* This is a auto generated file for building the project */ 


      import { Fragment, useState } from "react";
      import { useResource, useVariableState } from "@webstudio-is/react-sdk/runtime";
      import { Body as Body, Link as Link, Link as Link_1 } from "@webstudio-is/sdk-components-react-router";
import { Box as Box, Text as Text, HtmlEmbed as HtmlEmbed, Image as Image, Button as Button } from "@webstudio-is/sdk-components-react";
import { Tooltip as Tooltip, TooltipTrigger as TooltipTrigger, TooltipContent as TooltipContent, Dialog as Dialog, DialogTrigger as DialogTrigger, DialogOverlay as DialogOverlay, DialogContent as DialogContent, DialogDescription as DialogDescription, DialogClose as DialogClose } from "@webstudio-is/sdk-components-react-radix";


      export const projectId = "94456f8c-a847-426a-aec8-16de390bd3eb";

      export const lastPublished = "2025-10-31T09:57:28.135Z";

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
code={"<style>\n@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');\n@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');\n  \n  h1{\n    font-family: 'Tanker';\n    font-weight: 500;\n    font-size: 5em;\n    color: var(--background);\n    line-height: 1;\n    margin: 0;\n  }\n  h2{\n    font-weight: 600;\n    font-size: 36px;\n    line-height: 1;\n    margin: 0;\n  }\n  p{\n    margin: 0;\n  }\n  \n  .icon-background{\n    background-color: var(--back-red-1);\n    z-index: 1;\n    overflow: hidden;\n    position: relative;\n  }\n  .icon-background::before{\n    content: \"\";\n    position: absolute;\n    width: 200%; height: 200%;\n    top: -50%; left: -50%;\n    background-image: url('/assets/icon-background_orTDw4lIQEfSgOgF0DBVy.svg?width=1080&quality=80&format=auto');\n    background-size: 200px 115.4734411085px;\n    background-repeat: repeat;\n    animation: scrollBg 20s linear infinite;\n    z-index: -1;\n    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;\n    filter: blur(2px)\n  }\n  \n  .home-top::after{\n    position: absolute;\n    content: \"\";\n    width: 100%;\n    height: 250px;\n    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);\n    z-index: -1;\n  }\n\n  @keyframes scrollBg {\n      0% {\n        background-position: 0 0;\n      }\n      100% {\n        background-position: -200px 115.4734411085px;\n      }\n    }\n\n  .home-top-card:hover .home-top-card-title-icon{\n    width: 38px;\n    padding-left: 3px;\n  }\n\n  @media only screen and (max-width: 767px) {\n    h1{\n      font-size: 4em;\n    }\n    h2{\n      font-size: 32px;\n    }\n  }\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<HtmlEmbed
code={"<script src=\"https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.19/index.global.min.js\"></script>\n<script src=\"https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.19/index.global.min.js\"></script>\n<script src=\"https://cdn.jsdelivr.net/npm/@fullcalendar/google-calendar@6.1.19/index.global.min.js\"></script>\n\n<script>\ndocument.addEventListener('DOMContentLoaded', function() {\n  var calendarEl = document.getElementById('calendar');\n\n  var calendar = new FullCalendar.Calendar(calendarEl, {\n    headerToolbar: {\n        left: 'prev,next today',\n        center: 'title',\n        right: ''\n    },\n    dayMaxEvents: 3,\n    firstDay: 1,\n    contentHeight: 'auto',\n    googleCalendarApiKey: 'AIzaSyDBDJxCyN67h-VrQ53s9vm597mrLUiZgHM',\n    events: '23c6f451e6193a878c5affc55d18b050093a87075c0325964379924db8ee027a@group.calendar.google.com',\n\n    eventContent: function(arg) {\n        // only show the event title, no time or dot\n        return {\n          html: '<div class=\"fc-event-title\" style=\"font-weight:normal;\">'\n                  + arg.event.title +\n                '</div>'\n        };\n    },\n\n    eventDataTransform: function(eventData) {\n      let transData = {...eventData};\n      // Handle events past midnight (until 5am)\n      if (eventData.end) {\n        let start = new Date(eventData.start);\n        let end = new Date(eventData.end);\n        // Save original end time\n        transData.extendedProps = {...eventData.extendedProps, realEnd: end};\n\n        let startDay = new Date(start);\n        startDay.setHours(0,0,0,0);\n        let endDay = new Date(end);\n        endDay.setHours(0,0,0,0);\n        if ((endDay-startDay)/(1000*60*60*24) === 1 && end.getHours() < 5) {\n          let adjusted = new Date(start);\n          adjusted.setHours(23,59,59,999);\n          transData.end = adjusted;\n        }\n      }\n      transData.url = \"\";\n      return transData;\n    },\n\n    eventDidMount: function(info) {\n      info.el.setAttribute(\"title\", info.event.title);\n    },\n\n    eventClick: function(info) {\n      // Prevent default Google Calendar link\n      info.jsEvent.preventDefault();\n      \n      const event = info.event;\n      const elContent = document.getElementById('e-content');\n      const popup = document.getElementById('event-popup');\n      const background = document.getElementById('event-popup-back');\n\n      // Gather content\n      var [eDate, eTime] = formatDate(event.start, event.extendedProps.realEnd);\n      var eLoc = event.extendedProps.location || '';\n      var eDesc = event.extendedProps.description || '';\n\n      // Set content values and visibility\n      document.getElementById('e-title').textContent = event.title;\n      document.getElementById('e-date').textContent = eDate;\n      if (eTime == '') {\n        document.getElementById('e-time-container').style.display = 'none';\n      } else {\n        document.getElementById('e-time-container').style.display = 'flex';\n        document.getElementById('e-time').textContent = eTime;\n      }\n      if (eLoc == '') {\n        document.getElementById('e-loc-container').style.display = 'none';\n      } else {\n        document.getElementById('e-loc-container').style.display = 'flex';\n        document.getElementById('e-loc').textContent = eLoc;\n      }\n      if (eDesc == '') {\n        document.getElementById('e-desc').style.display = 'none';\n        document.getElementById('e-line').style.display = 'none';\n      } else {\n        document.getElementById('e-desc').style.display = 'block';\n        document.getElementById('e-line').style.display = 'block';\n        document.getElementById('e-desc').innerHTML = eDesc;\n      }\n      // TODO Accent colour based on calendar + map\n      \n      \n      // Show popup\n      //background.style.display = 'flex';\n      background.style.opacity = 1;\n      background.style.pointerEvents = \"auto\";\n      popup.style.setProperty(\"--pop-scale\", 1);\n\n      \n      // Hide popup\n      background.addEventListener('click', (e) => {\n        if (e.target === background) {\n          //background.style.display = 'none';\n          background.style.opacity = 0;\n          background.style.pointerEvents = \"none\";\n          popup.style.setProperty(\"--pop-scale\", 0.9);\n        }\n      });\n      background.addEventListener('pointerdown', (e) => {\n        if (e.target === background) {\n          e.preventDefault();            // blocks the selection start\n        }\n      });\n\n      popup.onclick = function(e) {\n          e.stopPropagation(); // prevents the click from reaching background\n        };\n      }\n    \n  });\n  calendar.render();\n});\n\n\n  function formatDate(startDate, endDate) {\n    \n    const locale = 'en-GB';\n    const msDay = 24 * 60 * 60 * 1000;\n  \n    const toMidnight = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());\n    const isMidnight = d => d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0 && d.getMilliseconds() === 0;\n    const sameDay = (a, b) => {\n      const sameDate =\n        a.getFullYear() === b.getFullYear() &&\n        a.getMonth() === b.getMonth() &&\n        a.getDate() === b.getDate();\n    \n      const nextDayBefore5am =\n        b.getFullYear() === a.getFullYear() &&\n        b.getMonth() === a.getMonth() &&\n        b.getDate() === a.getDate() + 1 &&\n        b.getHours() < 5;\n    \n      return sameDate || nextDayBefore5am;\n    };\n  \n    const daySuffix = d => {\n      if (d > 3 && d < 21) return 'th';\n      switch (d % 10) {\n        case 1: return 'st';\n        case 2: return 'nd';\n        case 3: return 'rd';\n        default: return 'th';\n      }\n    };\n  \n    // Build “Friday · 29th August” or “29th August”\n    const formatDay = (date, withWeekday = true) => {\n      const opts = withWeekday\n        ? { weekday: 'long', day: 'numeric', month: 'long' }\n        : { day: 'numeric', month: 'long' };\n    \n      const parts = new Intl.DateTimeFormat(locale, opts).formatToParts(date);\n      const dayNum = date.getDate();\n      const suffixed = `${dayNum}${daySuffix(dayNum)}`;\n    \n      let result = parts.map(p => (p.type === 'day' ? suffixed : p.value)).join('').trim();\n      if (withWeekday) result = result.replace(/^(\\w+),?\\s+/, '$1  ·  ');\n      \n      return result;\n    };\n  \n    const formatTimeHM = d =>\n      new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(d);\n  \n    // Detect single-day all-day (supports ICS: end at 00:00 next day)\n    const isAllDaySingleDay = (start, end) => {\n      if (!start) return false;\n      if (!end) return isMidnight(start); // best effort: no end & midnight start\n      if (sameDay(start, end)) {\n        \n        // All-day if start 00:00 and end is 23:59:59.999-ish (rare) — allow generous check\n        return isMidnight(start) && !isMidnight(end) && end - start >= msDay - 60000;\n      }\n      // ICS typical: start 00:00 of day X, end 00:00 of day X+1 (exclusive)\n      return isMidnight(start) && isMidnight(end) && (end - start === msDay);\n    };\n  \n    // Count unique calendar days touched by the event.\n    // If end is exactly midnight, treat as exclusive (ICS) by shifting back a millisecond.\n    const uniqueDayCount = (start, end) => {\n      if (!end) return 1;\n      const s0 = toMidnight(start);\n      let e0 = toMidnight(end);\n      if (isMidnight(end) && end > start) {\n        e0 = new Date(e0.getTime() - 1); // previous day late night\n      }\n      const e = toMidnight(e0);\n      return Math.floor((e - s0) / msDay) + 1;\n    };\n  \n    const hasEnd = endDate instanceof Date && !isNaN(endDate);\n    const start = startDate;\n    const end = hasEnd ? endDate : null;\n  \n    // === CASES ===\n\n    // Single-day all-day event: \"Friday · 29th August\"\n    if (isAllDaySingleDay(start, end || start)) {\n      return [formatDay(start, true), ''];\n    }\n    \n    // Any multi-day event (dates differ): \"29th August - 3rd September | N days\"\n    if (end && !sameDay(start, end)) {\n      const span = `${formatDay(start, false)} - ${formatDay(end, false)}`;\n      const days = uniqueDayCount(start, end);\n      return [span,  `${days} ${days === 1 ? 'day' : 'days'}`];\n    }\n  \n    // Same-day with start & end times: \"Friday · 29th August | 16:00 - 20:30\"\n    if (end && sameDay(start, end)) {\n      const startT = formatTimeHM(start);\n      const endT = formatTimeHM(end);\n      if (startT !== endT) {\n        const moon = end.getHours() < 5 ? ' 🌙' : '';\n        return [formatDay(start, true), `${startT} - ${endT}${moon}`];\n      }\n      // If times are identical, just show one time\n      return [formatDay(start, true), startT];\n    }\n  \n    // No end time: \"Friday · 29th August | 16:00\"\n    return [formatDay(start, true), formatTimeHM(start)];\n  }\n\n\n</script>\n\n<style>\n  /* Selection and cursor control */\n  .fc-daygrid-day-number {\n    user-select: none;\n  }\n  \n  .fc-button {\n    background-color: var(--back-red-1) !important;\n    border-color: var(--back-red-1) !important;\n    color: #fff !important; /* Optional: Ensures text is visible */\n  }\n  \n  .fc-button:hover {\n    background-color: var(--back-red-1) !important;\n    opacity: 0.9;\n  }\n  \n  /* Change event background colours */\n  .fc-event {\n    background-color: var(--back-red-1) !important;\n    border-color: var(--back-red-1) !important;\n    color: #fff !important;\n    cursor: pointer; /* click cursor */\n  }\n\n  .fc .fc-scrollgrid td {\n    border: 1px solid var(--back-grey-1);\n    border-radius: var(--rad2);\n  }\n\n  .fc .fc-scrollgrid, .fc .fc-col-header-cell, .fc .fc-scrollgrid th {\n    border: none !important;\n  }\n\n  /* Highlight today */\n  .fc .fc-day-today {\n    background-color: rgb(from var(--back-red-1) r g b / 0.17) !important;\n    border-radius: 0 !important;\n    box-shadow: 0 0 80px rgb(from var(--back-red-1) r g b / 0.1);\n  }\n  .fc-day-today .fc-daygrid-day-number{\n    font-weight: 600;\n  }\n\n    .fc .fc-daygrid-day-frame {\n    min-height: 110px;\n  }\n  .calendar-container {\n  overflow-x: auto;\n  width: 100%;\n}\n\n  /* Padding for events in day */\n  .fc-daygrid-day-top{\n    margin-bottom: -7px;\n  }\n  .fc-event-title{\n    margin: -1px 0 -1px 4px;\n  }\n  .fc-daygrid-day-events{\n    margin-bottom: 2px !important;\n  }\n\n  /* Popup Styles */\n  .event-pop-title {\n    margin: -30px 0 -15px 25px;\n    padding: 0;\n  }\n  .event-pop-time {\n    margin-left: -13px;\n    font-size: 18px;\n    opacity: 0.6;\n  }\n  .event-pop-desc {\n    margin: -30px 50px -20px 50px;\n  }\n  .event-pop-loc {\n    margin-left: 25px;\n    margin-top: -23px;\n    font-size: 18px;\n    opacity: 0.6;\n  }\n  .pop-loc-pin {\n    font-weight: 700;\n  }\n\n  /* Prevent darkening when event clicked */\n  .fc-event::before, .fc-event::after {\n  display: none !important;\n}\n\n  /* Mobile: horizontally scroll the month grid, keep toolbar fixed */\n@media (max-width: 767px) {\n  \n  /* Only the grid scrolls sideways */\n  #calendar .fc-view-harness {\n    overflow-x: auto;\n    overflow-y: hidden;\n    -webkit-overflow-scrolling: touch; /* iOS momentum */\n  }\n\n  /* Ensure the grid is wider than the screen so it can scroll */\n  #calendar .fc-scrollgrid {\n    min-width: 600px;\n    margin-left: calc(2 * var(--gap1));\n    padding-right: calc(2 * var(--gap1));\n    \n    -ms-overflow-style: none;  /* Internet Explorer 10+ */\n    scrollbar-width: none;\n  }\n  .fc-header-toolbar {\n    margin: 0 calc(2 * var(--gap1));\n  }\n  #calendar .fc-scrollgrid::-webkit-scrollbar { \n    width: 0;\n    height: 0;\n  }\n\n  /* Grid sizing */\n  #calendar .fc-scrollgrid{\n    font-size: 0.7em;\n  }\n  .fc .fc-daygrid-day-frame {\n    min-height: 75px;\n  }\n  .fc{\n    width: 700px\n  }\n  \n  /* Toolbar sizing */\n  .fc-button {\n    padding: 0 4px !important;\n  }\n  .fc-button * {\n    font-size: 20px !important;\n  }\n  .fc-toolbar-title {\n    font-size: 18px !important;\n    padding-left: 10px;\n    text-align: center;\n  }\n  \n}\n</style>"}
executeScriptOnCanvas={true}
className={`w-html-embed`} />
<Box
className={`w-box cck00sw cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1uz2t7q c4psa79 c1ldi832 ${"icon-background home-top"}`}>
<Box
className={`w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m`}>
<Link
href={"/"}
id={"menu-icon"}
target={"_self"}
className={`w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 cqyp7hg c1moglug`}>
<Image
src={"/assets/logo_GEU(2)_j-Y370XvYH082ggeHwJjA.png"}
width={799}
height={812}
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
{"Calendar"}
</h1>
<Text
className={`w-text cqawzgp c1s7gudn czgmbqe cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu cnurt1a c1wzvl6u c7u4ssh`}>
{"See calendar stuff with times and dates and stuff."}
</Text>
</Box>
</Box>
<div
className={`w-element ci03eyw cu8ogtt c1v4vkm5 czttlll c77vig4 c1kzw9o3 cyjwuv7 c1lzvaoj cnx92zw c1yjp7xb`}>
<div
id={"calendar"}
className={`w-element c4eoysd c2z8j1e c1lmmney`} />
</div>
<div
id={"event-popup-back"}
className={`w-element c15392bw c1jg0tfs c9q7jzv c13w5hsy c1sm4x0m cgqm29d cj1xbu9 c1ehyscn ci03eyw cu8ogtt c1v4vkm5 c1bti4b5 c15ikqm c1vvb0gl crrwaeo c19dg1ud c1jubil0 can6fs5 cnypr8u c16er72m c1qt5xo2`}>
<div
id={"event-popup"}
className={`w-element cdzo1k7 cd3toq c17nm8vt c1xymrvd c8yo8yx c58kvwj c1lz099s clae1ht ci03eyw c1nj86ny c8nmv6p cwqnf9o cz7iu34 ctdzf0s codsd31 c16er72m c1qt5xo2 cdivoul c17ftq5c cuo3nhs`}>
<div
id={"e-content"}
className={`w-element ck11ylk c19haj7v c60uzgv c1tdh0eb clxt11g csp87lc co7yhf8 catlkx8 c1apocds cm7li2w c903noh c18s1ywe c1jyaiat c1988d5w c1d6rcw0 c1fgwlgc`}>
<div
className={`w-element ci03eyw catlkx8 clzcjgo`}>
<div
className={`w-element c1d1pidh c37w5vq c4qqqhz clkydg0 c4oa26n c1w9mrda c1xmjpce c5kcyvg`} />
<h3
id={"e-title"}
className={`w-element ca2fle4 cbw7l1f cc02v1c c8py5un`}>
{"Intro Party"}
</h3>
</div>
<div
className={`w-element ci03eyw catlkx8`}>
<div
className={`w-element c1d1pidh c1xi841l c4qqqhz clkydg0 c1ysnkib c1mxgw9p ceehkft c1k6l3pz c1xoiaui`} />
<p
id={"e-date"}
className={`w-element c1vn0xiq ch7scue`}>
{"Friday  ·  29 August 2025"}
</p>
</div>
<div
id={"e-time-container"}
className={`w-element ci03eyw catlkx8`}>
<div
className={`w-element c1d1pidh c1xi841l c4qqqhz clkydg0 c1ysnkib c1mxgw9p ceehkft c1k6l3pz c1xoiaui`} />
<p
id={"e-time"}
className={`w-element c1vn0xiq ch7scue`}>
{"18:00–23:00"}
</p>
</div>
<div
id={"e-loc-container"}
className={`w-element ci03eyw catlkx8`}>
<div
className={`w-element c1d1pidh c1xi841l c4qqqhz clkydg0 c1ysnkib c1mxgw9p ceehkft c1k6l3pz c1xoiaui`} />
<p
id={"e-loc"}
className={`w-element c1vn0xiq ch7scue`}>
{"DTU Building 101"}
</p>
</div>
<hr
id={"e-line"}
className={`w-element cy8r131 cn1fibt cnwk8w7 c1jeji4x c10ybtws c4nflox c12zhvo c1dsvsvh c1xz83ly c12s4iry c1ixcxvm cct8mvq c14233kc`} />
<div
id={"e-desc"}
className={`w-element`} />
</div>
<Image
src={"/assets/GE_Logo_-_Big_kpMORCHYDLOpQbfBKYwZ7.svg"}
width={492}
height={684}
alt={""}
className={`w-image ct616nu c2dl84m c58kvwj c1w0yra6 ctd5fc5 c1h9ruvf c1sf1e8m c1l6bx4o c1mw7fdl c1k74xht c19dg1ud c1beph0k`} />
</div>
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
    