import{j as e,U as r,n as a,g as t,y as s,T as y,C as x,P as f,O as w,x as v,a as b,M as k,R as j,S as q,$ as z,b as D,r as p,c as i,i as d,d as N,e as E,f as S,h as P,k as M}from"../chunks/chunk-LfFDiz3d.js";/* empty css                      */const u="GE Union",T=[{id:"2EiFMEG40PBm9_fkelqpo"},{id:"xOnFYyuZv5VkMeeKDLyiu",maxWidth:991},{id:"Uvcw_OJqyPoLioZzUbP1x",maxWidth:767},{id:"eCbcXJaLEKSKcnbAPzNF0",maxWidth:479}],I="Favicon_gtxnE_QXZldwugdMJXAuG.ico",C=[],B=[],_=c=>e.jsxs("body",{className:"w-element c1lzvaoj c1qux398 cm1ds2c",children:[e.jsx(r,{code:`<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&amp;display=swap');
  
  h1{
    font-family: 'Tanker';
    font-weight: 500;
    font-size: 5em;
    color: var(--background);
    line-height: 1;
    margin: 0;
  }
  h2{
    font-weight: 600;
    font-size: 36px;
    line-height: 1;
    margin: 0;
  }
  p{
    margin: 0;
  }
  
  .icon-background{
    background-color: var(--back-red-1);
    z-index: 1;
    overflow: hidden;
    position: relative;
  }
  .icon-background::before{
    content: "";
    position: absolute;
    width: 200%; height: 200%;
    top: -50%; left: -50%;
    background-image: url('/assets/icon-background_orTDw4lIQEfSgOgF0DBVy.svg?width=1080&quality=80&format=auto');
    background-size: 200px 115.4734411085px;
    background-repeat: repeat;
    animation: scrollBg 20s linear infinite;
    z-index: -1;
    opacity: var(--icon-background-opacity, 3%); mix-blend-mode: luminosity;
    filter: blur(2px)
  }
  
  .home-top::after{
    position: absolute;
    content: "";
    width: 100%;
    height: 250px;
    background: linear-gradient(180deg, hsl(from var(--back-red-1) h s l / 0.65) 15%, hsl(from var(--back-red-1) h s l / 0) 100%);
    z-index: -1;
  }

  @keyframes scrollBg {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -200px 115.4734411085px;
      }
    }

  .home-top-card:hover .home-top-card-title-icon{
    width: 38px;
    padding-left: 3px;
  }

  @media only screen and (max-width: 767px) {
    h1{
      font-size: 4em;
    }
    h2{
      font-size: 32px;
    }
  }
</style>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),e.jsx(r,{code:`<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.19/index.global.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.19/index.global.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@6.1.19/index.global.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/google-calendar@6.1.19/index.global.min.js"><\/script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
    },
    dayMaxEvents: 3,
    firstDay: 1,
    contentHeight: 'auto',
    googleCalendarApiKey: 'AIzaSyDBDJxCyN67h-VrQ53s9vm597mrLUiZgHM',
    events: '23c6f451e6193a878c5affc55d18b050093a87075c0325964379924db8ee027a@group.calendar.google.com',

    eventContent: function(arg) {
        // only show the event title, no time or dot
        return {
          html: '<div class="fc-event-title" style="font-weight:normal;">'
                  + arg.event.title +
                '</div>'
        };
    },

    eventDataTransform: function(eventData) {
      let transData = {...eventData};
      // Handle events past midnight (until 5am)
      if (eventData.end) {
        let start = new Date(eventData.start);
        let end = new Date(eventData.end);
        // Save original end time
        transData.extendedProps = {...eventData.extendedProps, realEnd: end};

        let startDay = new Date(start);
        startDay.setHours(0,0,0,0);
        let endDay = new Date(end);
        endDay.setHours(0,0,0,0);
        if ((endDay-startDay)/(1000*60*60*24) === 1 && end.getHours() < 5) {
          let adjusted = new Date(start);
          adjusted.setHours(23,59,59,999);
          transData.end = adjusted;
        }
      }
      transData.url = "";
      return transData;
    },

    eventDidMount: function(info) {
      info.el.setAttribute("title", info.event.title);
    },

    eventClick: function(info) {
      // Prevent default Google Calendar link
      info.jsEvent.preventDefault();
      
      const event = info.event;
      const elContent = document.getElementById('e-content');
      const popup = document.getElementById('event-popup');
      const background = document.getElementById('event-popup-back');

      // Gather content
      var [eDate, eTime] = formatDate(event.start, event.extendedProps.realEnd);
      var eLoc = event.extendedProps.location || '';
      var eDesc = event.extendedProps.description || '';

      // Set content values and visibility
      document.getElementById('e-title').textContent = event.title;
      document.getElementById('e-date').textContent = eDate;
      if (eTime == '') {
        document.getElementById('e-time-container').style.display = 'none';
      } else {
        document.getElementById('e-time-container').style.display = 'flex';
        document.getElementById('e-time').textContent = eTime;
      }
      if (eLoc == '') {
        document.getElementById('e-loc-container').style.display = 'none';
      } else {
        document.getElementById('e-loc-container').style.display = 'flex';
        document.getElementById('e-loc').textContent = eLoc;
      }
      if (eDesc == '') {
        document.getElementById('e-desc').style.display = 'none';
        document.getElementById('e-line').style.display = 'none';
      } else {
        document.getElementById('e-desc').style.display = 'block';
        document.getElementById('e-line').style.display = 'block';
        document.getElementById('e-desc').innerHTML = eDesc;
      }
      // TODO Accent colour based on calendar + map
      
      
      // Show popup
      //background.style.display = 'flex';
      background.style.opacity = 1;
      background.style.pointerEvents = "auto";
      popup.style.setProperty("--pop-scale", 1);

      
      // Hide popup
      background.addEventListener('click', (e) => {
        if (e.target === background) {
          //background.style.display = 'none';
          background.style.opacity = 0;
          background.style.pointerEvents = "none";
          popup.style.setProperty("--pop-scale", 0.9);
        }
      });
      background.addEventListener('pointerdown', (e) => {
        if (e.target === background) {
          e.preventDefault();            // blocks the selection start
        }
      });

      popup.onclick = function(e) {
          e.stopPropagation(); // prevents the click from reaching background
        };
      }
    
  });
  calendar.render();
});


  function formatDate(startDate, endDate) {
    
    const locale = 'en-GB';
    const msDay = 24 * 60 * 60 * 1000;
  
    const toMidnight = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const isMidnight = d => d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0 && d.getMilliseconds() === 0;
    const sameDay = (a, b) => {
      const sameDate =
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
    
      const nextDayBefore5am =
        b.getFullYear() === a.getFullYear() &&
        b.getMonth() === a.getMonth() &&
        b.getDate() === a.getDate() + 1 &&
        b.getHours() < 5;
    
      return sameDate || nextDayBefore5am;
    };
  
    const daySuffix = d => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    // Build “Friday · 29th August” or “29th August”
    const formatDay = (date, withWeekday = true) => {
      const opts = withWeekday
        ? { weekday: 'long', day: 'numeric', month: 'long' }
        : { day: 'numeric', month: 'long' };
    
      const parts = new Intl.DateTimeFormat(locale, opts).formatToParts(date);
      const dayNum = date.getDate();
      const suffixed = \`\${dayNum}\${daySuffix(dayNum)}\`;
    
      let result = parts.map(p => (p.type === 'day' ? suffixed : p.value)).join('').trim();
      if (withWeekday) result = result.replace(/^(\\w+),?\\s+/, '$1  ·  ');
      
      return result;
    };
  
    const formatTimeHM = d =>
      new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(d);
  
    // Detect single-day all-day (supports ICS: end at 00:00 next day)
    const isAllDaySingleDay = (start, end) => {
      if (!start) return false;
      if (!end) return isMidnight(start); // best effort: no end & midnight start
      if (sameDay(start, end)) {
        
        // All-day if start 00:00 and end is 23:59:59.999-ish (rare) — allow generous check
        return isMidnight(start) && !isMidnight(end) && end - start >= msDay - 60000;
      }
      // ICS typical: start 00:00 of day X, end 00:00 of day X+1 (exclusive)
      return isMidnight(start) && isMidnight(end) && (end - start === msDay);
    };
  
    // Count unique calendar days touched by the event.
    // If end is exactly midnight, treat as exclusive (ICS) by shifting back a millisecond.
    const uniqueDayCount = (start, end) => {
      if (!end) return 1;
      const s0 = toMidnight(start);
      let e0 = toMidnight(end);
      if (isMidnight(end) && end > start) {
        e0 = new Date(e0.getTime() - 1); // previous day late night
      }
      const e = toMidnight(e0);
      return Math.floor((e - s0) / msDay) + 1;
    };
  
    const hasEnd = endDate instanceof Date && !isNaN(endDate);
    const start = startDate;
    const end = hasEnd ? endDate : null;
  
    // === CASES ===

    // Single-day all-day event: "Friday · 29th August"
    if (isAllDaySingleDay(start, end || start)) {
      return [formatDay(start, true), ''];
    }
    
    // Any multi-day event (dates differ): "29th August - 3rd September | N days"
    if (end && !sameDay(start, end)) {
      const span = \`\${formatDay(start, false)} - \${formatDay(end, false)}\`;
      const days = uniqueDayCount(start, end);
      return [span,  \`\${days} \${days === 1 ? 'day' : 'days'}\`];
    }
  
    // Same-day with start & end times: "Friday · 29th August | 16:00 - 20:30"
    if (end && sameDay(start, end)) {
      const startT = formatTimeHM(start);
      const endT = formatTimeHM(end);
      if (startT !== endT) {
        const moon = end.getHours() < 5 ? ' 🌙' : '';
        return [formatDay(start, true), \`\${startT} - \${endT}\${moon}\`];
      }
      // If times are identical, just show one time
      return [formatDay(start, true), startT];
    }
  
    // No end time: "Friday · 29th August | 16:00"
    return [formatDay(start, true), formatTimeHM(start)];
  }


<\/script>

<style>
  /* Selection and cursor control */
  .fc-daygrid-day-number {
    user-select: none;
  }
  
  .fc-button {
    background-color: var(--back-red-1) !important;
    border-color: var(--back-red-1) !important;
    color: #fff !important; /* Optional: Ensures text is visible */
  }
  
  .fc-button:hover {
    background-color: var(--back-red-1) !important;
    opacity: 0.9;
  }
  
  /* Change event background colours */
  .fc-event {
    background-color: var(--back-red-1) !important;
    border-color: var(--back-red-1) !important;
    color: #fff !important;
    cursor: pointer; /* click cursor */
  }

  .fc .fc-scrollgrid td {
    border: 1px solid var(--back-grey-1);
    border-radius: var(--rad2);
  }

  .fc .fc-scrollgrid, .fc .fc-col-header-cell, .fc .fc-scrollgrid th {
    border: none !important;
  }

  /* Highlight today */
  .fc .fc-day-today {
    background-color: rgb(from var(--back-red-1) r g b / 0.17) !important;
    border-radius: 0 !important;
    box-shadow: 0 0 80px rgb(from var(--back-red-1) r g b / 0.1);
  }
  .fc-day-today .fc-daygrid-day-number{
    font-weight: 600;
  }

    .fc .fc-daygrid-day-frame {
    min-height: 110px;
  }
  .calendar-container {
  overflow-x: auto;
  width: 100%;
}

  /* Padding for events in day */
  .fc-daygrid-day-top{
    margin-bottom: -7px;
  }
  .fc-event-title{
    margin: -1px 0 -1px 4px;
  }
  .fc-daygrid-day-events{
    margin-bottom: 2px !important;
  }

  /* Popup Styles */
  .event-pop-title {
    margin: -30px 0 -15px 25px;
    padding: 0;
  }
  .event-pop-time {
    margin-left: -13px;
    font-size: 18px;
    opacity: 0.6;
  }
  .event-pop-desc {
    margin: -30px 50px -20px 50px;
  }
  .event-pop-loc {
    margin-left: 25px;
    margin-top: -23px;
    font-size: 18px;
    opacity: 0.6;
  }
  .pop-loc-pin {
    font-weight: 700;
  }

  /* Prevent darkening when event clicked */
  .fc-event::before, .fc-event::after {
  display: none !important;
}

  /* Mobile: horizontally scroll the month grid, keep toolbar fixed */
@media (max-width: 767px) {
  
  /* Only the grid scrolls sideways */
  #calendar .fc-view-harness {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch; /* iOS momentum */
  }

  /* Ensure the grid is wider than the screen so it can scroll */
  #calendar .fc-scrollgrid {
    min-width: 600px;
    margin-left: calc(2 * var(--gap1));
    padding-right: calc(2 * var(--gap1));
    
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
  }
  .fc-header-toolbar {
    margin: 0 calc(2 * var(--gap1));
  }
  #calendar .fc-scrollgrid::-webkit-scrollbar { 
    width: 0;
    height: 0;
  }

  /* Grid sizing */
  #calendar .fc-scrollgrid{
    font-size: 0.7em;
  }
  .fc .fc-daygrid-day-frame {
    min-height: 75px;
  }
  .fc{
    width: 700px
  }
  
  /* Toolbar sizing */
  .fc-button {
    padding: 0 4px !important;
  }
  .fc-button * {
    font-size: 20px !important;
  }
  .fc-toolbar-title {
    font-size: 18px !important;
    padding-left: 10px;
    text-align: center;
  }
  
}
</style>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),e.jsxs(a,{className:"w-box cck00sw cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1uz2t7q c4psa79 c1ldi832 icon-background home-top",children:[e.jsxs(a,{className:"w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m",children:[e.jsx(t,{href:"/",id:"menu-icon",target:"_self",className:"w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 cqyp7hg c1moglug",children:e.jsx(s,{src:"/assets/GE_Logo_-_Big_kpMORCHYDLOpQbfBKYwZ7.svg",width:492,height:684,loading:"eager",alt:"",className:"w-image c1l3m6tn c1vsv73g cy2rpkp c1wjaqd0"})}),e.jsxs(a,{className:"w-box ci03eyw c5zf3td c1bdekej cy2vnym cgykfac c8chaf1 crymv6m ch588tu cd1c1x2 cgjpuuk co3wgvm cjdg5q7",children:[e.jsx(t,{href:"/",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q cycv0tm",children:"Home"}),e.jsxs(t,{href:"/course-bank",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q",children:[e.jsx("span",{className:"w-element cycv0tm",children:"Course "}),"Bank"]}),e.jsx(t,{href:"/calendar",className:"w-link c4qqqhz c1l00ka2 c8l261o c1wmsojl c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q",children:"Calendar"}),e.jsxs(y,{delayDuration:0,children:[e.jsx(x,{children:e.jsx("div",{className:"w-element c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1llv2ju c1tj415q",children:"About"})}),e.jsxs(f,{className:"w-tooltip-content c5mlbae cm1ds2c c1fxgukz cdzo1k7 c1lp7lun c3ryv7d c1t11c95 c1kz25wt c1jbi97f crebcbz c1q4zcxv ci03eyw cu8ogtt c4bgnbx cj82r57 c14a5ioc cm4j335",children:[e.jsx(t,{href:"/about-ge",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q",children:"General Engineering"}),e.jsx(t,{href:"/about-dtu",className:"w-element c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht cz03vb2 cqo7rnh cz5lin5 c1tj415q",children:"DTU"}),e.jsx(t,{href:"/about-geu",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q",children:"GE Union"})]})]})]}),e.jsxs(w,{open:!1,children:[e.jsx(v,{children:e.jsx(b,{className:"w-button cvuh4zx c1v4vkm5 c1bti4b5 c1jbi97f crebcbz cr2ujrk ciidiay c1kf82bd c7jsqgj ctcp1cq c1r8lktc c1t9gjz2 c7jkqej cn1fibt cnwk8w7 c10ybtws cdxgxee c1wmsojl co1yi26 c1vk95sq c12eb7ae",children:e.jsx(r,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5px" d="M2.667 8h10.666M2.667 4h10.666M2.667 12h10.666"/></svg>',className:"w-html-embed"})})}),e.jsx(k,{className:"w-dialog-overlay c15392bw c12qysi7 c1jkbqq5 ch8lzlo c13hlxg9 c5mlbae c1qqxt5d cvuh4zx cu8ogtt c8nmv6p cwqnf9o c1bm3fk1 c183bdo0",children:e.jsxs(j,{className:"w-dialog-content c5mlbae ci03eyw cu8ogtt c7na04l ctnx82u cg4tsss c1e09nnv cnkevhm cpq2gwm cql21mx ck11ylk c1a71d48 c18s1ywe c1log017 cyuvfar cvy6q1l c1kek3tg c1s3e5c3 c1ort9jz cuvlntl c18vlwwr c17sz26a cng5oj6",children:[e.jsxs(a,{"data-ws-tag":"nav",className:"w-box c39ez8k",children:[e.jsxs(a,{className:"w-box ci03eyw cu8ogtt c15abkx5 cfp2jcf",children:[e.jsx(q,{className:"w-dialog-description cy7nrqp c1ujy25t cdhy4s8 cc02v1c ca2fle4 c1kvebu6",children:"Find any page you want on the site"}),e.jsx("h2",{className:"w-element",children:"Navigation"})]}),e.jsxs(a,{className:"w-box ci03eyw c1rb689p c1hbxsx0 cy2vnym cgykfac cu8ogtt cfx1lak c12zhvo c8chaf1 crymv6m cjdg5q7",children:[e.jsx(t,{href:"/",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Home"}),e.jsx(t,{href:"/course-bank",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Course Bank"}),e.jsx(t,{href:"/calendar",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Calendar"}),e.jsx(t,{href:"/introduction",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Dashboard"}),e.jsx(t,{href:"/about-ge",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About GE"}),e.jsx(t,{href:"/about-dtu",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About DTU"}),e.jsx(t,{href:"/about-geu",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About GE Union"})]})]}),e.jsx(z,{className:"w-close-button c58kvwj c9jo736 crviqmx c40fhby c1koy2kb cvrpl4x c1uib4vc ci03eyw c1v4vkm5 c1bti4b5 c1qsi9u3 c1s85o6f c7jkqej cy7nrqp cq3zzid cjdtlt6 cxudh90 c14y8ie2",children:e.jsx(r,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.5 3 3 12.5M3 3l9.5 9.5"/></svg>',className:"w-html-embed"})})]})})]})]}),e.jsxs(a,{className:"w-box c65isya ck11ylk c19haj7v ci03eyw cu8ogtt c1bti4b5 cve325e c14k8w3n cjdez0h c4psa79 chvq5aa chtpppz",children:[e.jsx("h1",{className:"w-element cyoo8jj c1k74xht cnurt1a c1wzvl6u",children:"Calendar"}),e.jsx(D,{className:"w-text cqawzgp c1s7gudn c1vkmm90 cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu cnurt1a c1wzvl6u c7u4ssh",children:"Find events, parties and meetings - both on and off campus."})]})]}),e.jsx("div",{className:"w-element ci03eyw cu8ogtt c1v4vkm5 czttlll c77vig4 c1kzw9o3 cyjwuv7 c1lzvaoj cnx92zw c1yjp7xb",children:e.jsx("div",{id:"calendar",className:"w-element c4eoysd c2z8j1e c1lmmney"})}),e.jsx("div",{id:"event-popup-back",className:"w-element c15392bw c1jg0tfs c9q7jzv c13w5hsy c1sm4x0m c2tyy68 cj1xbu9 c1ehyscn ci03eyw cu8ogtt c1v4vkm5 c1bti4b5 c15ikqm c1vvb0gl crrwaeo c19dg1ud c1jubil0 can6fs5 cnypr8u c16er72m c1qt5xo2",children:e.jsxs("div",{id:"event-popup",className:"w-element cdzo1k7 cd3toq c17nm8vt c1xymrvd c8yo8yx c58kvwj c1lz099s cdmea0s ci03eyw c1nj86ny c8nmv6p cwqnf9o cz7iu34 ctdzf0s codsd31 c16er72m c1qt5xo2 cdivoul c17ftq5c cuo3nhs",children:[e.jsxs("div",{id:"e-content",className:"w-element ck11ylk c19haj7v c60uzgv c1tdh0eb clxt11g csp87lc co7yhf8 catlkx8 c1apocds cm7li2w c903noh c18s1ywe c1jyaiat c1988d5w c1d6rcw0 c1fgwlgc",children:[e.jsxs("div",{className:"w-element ci03eyw catlkx8 clzcjgo",children:[e.jsx("div",{className:"w-element c1d1pidh c37w5vq c4qqqhz clkydg0 c4oa26n c1w9mrda c1xmjpce c5kcyvg"}),e.jsx("h3",{id:"e-title",className:"w-element ca2fle4 cbw7l1f cc02v1c c8py5un",children:"Intro Party"})]}),e.jsxs("div",{className:"w-element ci03eyw catlkx8",children:[e.jsx("div",{className:"w-element c1d1pidh c1xi841l c4qqqhz clkydg0 c1ysnkib c1mxgw9p ceehkft c1k6l3pz c1xoiaui"}),e.jsx("p",{id:"e-date",className:"w-element c1vn0xiq ch7scue",children:"Friday  ·  29 August 2025"})]}),e.jsxs("div",{id:"e-time-container",className:"w-element ci03eyw catlkx8",children:[e.jsx("div",{className:"w-element c1d1pidh c1xi841l c4qqqhz clkydg0 c1ysnkib c1mxgw9p ceehkft c1k6l3pz c1xoiaui"}),e.jsx("p",{id:"e-time",className:"w-element c1vn0xiq ch7scue",children:"18:00–23:00"})]}),e.jsxs("div",{id:"e-loc-container",className:"w-element ci03eyw catlkx8",children:[e.jsx("div",{className:"w-element c1d1pidh c1xi841l c4qqqhz clkydg0 c1ysnkib c1mxgw9p ceehkft c1k6l3pz c1xoiaui"}),e.jsx("p",{id:"e-loc",className:"w-element c1vn0xiq ch7scue",children:"DTU Building 101"})]}),e.jsx("hr",{id:"e-line",className:"w-element cy8r131 cn1fibt cnwk8w7 c1jeji4x c10ybtws c4nflox c12zhvo c1dsvsvh c1xz83ly c12s4iry c1ixcxvm cct8mvq c14233kc"}),e.jsx("div",{id:"e-desc",className:"w-element"})]}),e.jsx(s,{src:"/assets/GE_Logo_-_Big_kpMORCHYDLOpQbfBKYwZ7.svg",width:492,height:684,alt:"",className:"w-image ct616nu c2dl84m c58kvwj c1w0yra6 ctd5fc5 c1h9ruvf c1sf1e8m c1l6bx4o c1mw7fdl c1k74xht c19dg1ud c1beph0k"})]})}),e.jsx(a,{className:"w-box c9esr7v cm1ds2c c1fxgukz cd3toq c17nm8vt c1xymrvd c8yo8yx csaxvfs ce1jmtw c1m7qrvj c1o7c5y4 c1ndanu0 icon-background",children:e.jsxs("div",{className:"w-element ci03eyw c1nj86ny c4jnp6s c1l3m6tn c1w0yra6 cpq2gwm c1v4vkm5 c16pnwu4 cypyahl cs11lv9 c1njbxf1",children:[e.jsx(t,{href:"/",className:"w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1dohq8s c3gx87z cqyp7hg c1moglug",children:e.jsx(s,{src:"/assets/GEU_Icon_1_qa8eLWu5EKj0C18RuAmQB.svg",width:256,height:238,alt:"",className:"w-image c1l3m6tn ct616nu cmvyqw5 cqw0qi cc5htwv"})}),e.jsxs("div",{className:"w-element ci03eyw c1is6v5c co8t7od c1nj86ny c74dsfz c1jwuvkp cezuxvu",children:[e.jsx(t,{href:"https://www.instagram.com/ge.union/",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(s,{src:"/assets/soc-insta_3EK2yfeQrKO1VBcKS5CMG.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),e.jsx(t,{href:"https://www.facebook.com/people/GE-Union/61573069635006/?_rdr",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(s,{src:"/assets/soc-facebook_dRtaC2-32UMM-Zp4wCSDO.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),e.jsx(t,{href:"https://www.linkedin.com/groups/10061020/",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(s,{src:"/assets/soc-linkedin_JewsOzbBNtsSePfOyCp1_.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),e.jsx(t,{href:"https://www.reddit.com/r/DTU/",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(s,{src:"/assets/soc-reddit_YIY3q3bmqs_8zl81uxYxk.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})})]})]})}),e.jsx(r,{code:`<style>
  /* Optional quality-of-life styles */
  #menu-icon {
    cursor: grab;
    touch-action: none;   /* allow smooth touch drag */
    will-change: transform;
    
    uuser-drag: none;
    -webkit-uuser-drag: none;
    -moz-uuser-drag: none;
    user-select: none;    /* avoid text selection while dragging */
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  #menu-icon.dragging { cursor: grabbing; }
</style>

<script>
(() => {
  const icon = document.getElementById('menu-icon');
  if (!icon) return;

  // position is managed purely via transform so layout doesn't shift
  let pointerID = null;
  let tx = 0, ty = 0;               // current translation
  let vx = 0, vy = 0;               // current velocity (px/s)
  let dragging = false;
  let startX = 0, startY = 0;       // pointer-down position
  let lastPx = 0, lastPy = 0;       // last pointer position (for velocity)
  let lastT = 0;                    // last timestamp

  // Spring params: tweak for feel
  const STIFFNESS = 300;   // spring constant (higher = snappier)
  const DAMPING   = 15;   // damping (lower = bouncier)
  const EPS_POS   = 0.5;  // stop threshold (position, px)
  const EPS_VEL   = 0.5;  // stop threshold (velocity, px/s)

  const originalHref = icon.href;

  
  const setTransform = () => {
    icon.style.transform = \`translate(\${tx}px, \${ty}px)\`;
  };

  const onPointerDown = (e) => {
    curPointerID = e.pointerId;
    startX = e.clientX - tx;
    startY = e.clientY - ty;

    lastPx = e.clientX;
    lastPy = e.clientY;
    lastT  = performance.now();
    vx = 0; vy = 0; // reset; we'll accumulate movement velocity
  }
  
  const onDragStart = (e) => {
    e.preventDefault();
    icon.removeAttribute('href');
    dragging = true;
    icon.classList.add('dragging');
    icon.setPointerCapture?.(curPointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;

    const now = performance.now();
    const dt  = (now - lastT) / 1000;
    tx = e.clientX - startX;
    ty = e.clientY - startY;

    // simple low-pass filtered velocity estimate for spring kick
    if (dt > 0) {
      const instVx = (e.clientX - lastPx) / dt;
      const instVy = (e.clientY - lastPy) / dt;
      vx = 0.8 * vx + 0.2 * instVx;
      vy = 0.8 * vy + 0.2 * instVy;
    }
    lastPx = e.clientX;
    lastPy = e.clientY;
    lastT  = now;

    setTransform();
  };

  const onPointerUp = (e) => {
    if (!dragging) return;
    e.preventDefault();
    e.stopPropagation()
    e.stopImmediatePropagation();
    dragging = false;
    icon.classList.remove('dragging');
    icon.releasePointerCapture?.(e.pointerId);
    animateBack(); // start spring home
    return;
  };

  function animateBack() {
    let prev = performance.now();
    function step(now) {
      const dt = Math.min((now - prev) / 1000, 0.032); // clamp dt for stability
      prev = now;

      // Hooke's law: F = -k*x - c*v (mass=1)
      const ax = -STIFFNESS * tx - DAMPING * vx;
      const ay = -STIFFNESS * ty - DAMPING * vy;

      vx += ax * dt;
      vy += ay * dt;
      tx += vx * dt;
      ty += vy * dt;

      setTransform();

      const nearOrigin = Math.hypot(tx, ty) < EPS_POS;
      const slowEnough = Math.hypot(vx, vy) < EPS_VEL;

      if (nearOrigin && slowEnough) {
        // snap exactly home to avoid subpixel fuzz
        tx = ty = vx = vy = 0;
        setTransform();
        icon.setAttribute('href', originalHref);
        return;
      }
      // If user grabbed again, stop the spring.
      if (dragging) return;

      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Keep it floating above other content while dragging (no layout changes)
  icon.style.zIndex = (parseInt(getComputedStyle(icon).zIndex) || 1).toString();

  // Bind events
  icon.addEventListener('dragstart', onDragStart);
  icon.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
})();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]}),A=c=>{const{origin:n,pathname:l,search:o}=new URL(c);return`${n}${l}${o}`},O=p.memo(({pageKey:c,system:n})=>e.jsx(_,{system:n},c),(c,n)=>c.pageKey===n.pageKey),F=({data:c})=>{const{system:n,resources:l,url:o,pageMeta:m}=c,g=A(o),h=p.useMemo(()=>({imageLoader:d,assetBaseUrl:i,resources:l,breakpoints:T,onError:console.error}),[l]);return e.jsxs(N.Provider,{value:h,children:[e.jsx(E.Provider,{value:o,children:e.jsx(O,{pageKey:g,system:n})}),e.jsx(S,{url:o,pageMeta:m,siteName:u,imageLoader:d,assetBaseUrl:i}),e.jsx(P,{children:m.title})]})},L=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"})),H=({})=>{const c={"@context":"https://schema.org","@type":"WebSite",name:u};return e.jsxs(e.Fragment,{children:[e.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(c,null,2)}}),e.jsx("link",{rel:"icon",href:d({src:`${i}${I}`})}),C.map(n=>e.jsx("link",{rel:"preload",href:`${i}${n}`,as:"font",crossOrigin:"anonymous"},n)),B.map(n=>e.jsx("link",{rel:"preload",href:`${i}${n}`,as:"image"},n))]})},$=Object.freeze(Object.defineProperty({__proto__:null,Head:H},Symbol.toStringTag,{value:"Module"})),G={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+onRenderClient.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:M}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/calendar/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:L}},Head:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/calendar/+Head.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:$}}};export{G as configValuesSerialized};
