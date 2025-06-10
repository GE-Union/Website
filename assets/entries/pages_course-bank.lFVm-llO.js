import{j as e,P as s,n as r,a as c,y as x,b as o,O as g,x as w,c as b,M as j,R as y,S as k,$ as v,d as z,e as i,i as m,f as q}from"../chunks/chunk-CP5mfqAD.js";/* empty css                      */const p="GE Union",N=[{id:"2EiFMEG40PBm9_fkelqpo"},{id:"xOnFYyuZv5VkMeeKDLyiu",maxWidth:991},{id:"Uvcw_OJqyPoLioZzUbP1x",maxWidth:767},{id:"eCbcXJaLEKSKcnbAPzNF0",maxWidth:479}],C="Favicon_gtxnE_QXZldwugdMJXAuG.ico",_=["Rubik-VariableFont_wght_rrlmmnwM8xol83_Rm9VjL.ttf"],E=[],S=a=>e.jsxs("body",{className:"w-element c1lzvaoj",children:[e.jsx(s,{code:`<style>
  h1{
    font-family: Tanker;
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
    background-image: url('/cgi/image/icon-background_RyiWP8CNKOfskpwMp_P8Y.svg?width=1080&quality=80&format=auto');
    background-size: 200px 115.4734411085px;
    background-repeat: repeat;
    animation: scrollBg 30s linear infinite;
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
      font-size: 3.7em;
    }
    h2{
      font-size: 32px;
    }
  }
</style>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),e.jsx(s,{code:`<script>
    // file-list.js

// 1) Configuration
const JSON_URL = 'https://raw.githubusercontent.com/GE-Union/CourseBank/main/structure.json';
// or point at your proxy: '/github-file-proxy.php?path=structure.json'
const CACHE_KEY   = 'coursebank_structure_cache';
const CACHE_TTL   = 15 * 60 * 1000; // 15 min

// 2) Extension → color map
const EXT_COLORS = {
  PDF:   '#D32F2F',
  IPYNB: '#F37C2F',
  ZIP:   '#595959',
  DOCX:  '#2A5699',
  XLSX:  '#1D6F42',
  PPTX:  '#D24726',
  TXT:   '#616161',
};

// 3) Helpers

async function fetchStructure() {
  // try cache
  const raw = localStorage.getItem(CACHE_KEY);
  if (false) {
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) {
      return data;
    }
  }
  // otherwise re-fetch
  const res = await fetch(JSON_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load structure.json');
  const data = await res.json();
  localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

function getFolderData(structure, folderPath) {
  const parts = folderPath.split('/');
  let cur = structure;
  for (const p of parts) {
    if (!(p in cur)) return null;
    cur = cur[p];
  }
  return Array.isArray(cur) ? cur : null;
}

function makeFileLink(folder, file) {
  const container = document.createElement('div');
  container.className = 'custom-file-link';
  
  // split name & author
  const [ rawName, rawAuth ] = file.split('-a-');
  const filename = (rawName || file).replace(/_/g, ' ');
  const author   = rawAuth
    ? rawAuth.replace(/_/g, ' ').replace(/\\.[^/.]+$/, '')
    : 'Unknown';

  const ext = file.split('.').pop().toUpperCase();
  const url = \`https://raw.githubusercontent.com/GE-Union/CourseBank/main/\${folder}/\${encodeURIComponent(file)}\`;

  const a = document.createElement('a');
  a.href     = url;
  a.target   = '_blank';
  a.style.display = 'flex';
  a.style.alignItems = 'center';
  a.style.width  = '100%';

  // If it’s one of the “open inline” types, hijack the click
  if (ext === 'PDF' || ext === 'TXT') {
    a.addEventListener('click', async evt => {
      evt.preventDefault();
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(res.statusText);
        const blob = await res.blob();
        // give the blob the correct MIME type
        const mime = {
          PDF:  'application/pdf',
          TXT:  'text/plain'
        }[ext] || 'application/octet-stream';
        const objectUrl = URL.createObjectURL(new Blob([blob], { type: mime }));
        window.open(objectUrl, '_blank');
        // revoke after a few seconds so the tab can load
        setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
      } catch (err) {
        console.error('File fetch failed', err);
        window.open(url, '_blank');  // fallback
      }
    });
  } else {
    // for downloads/other types, let the browser handle them
    a.setAttribute('download', '');
  }

  // icon
  const icon = document.createElement('div');
  icon.className = 'file-icon';
  const img = document.createElement('img');
  img.src = 'https://raw.githubusercontent.com/GE-UNION/CourseBank/main/res/file-icon.svg';
  img.alt = 'File Icon';
  icon.appendChild(img);

  const badge = document.createElement('div');
  badge.className = 'extension-badge';
  badge.textContent = ext;
  badge.style.backgroundColor = EXT_COLORS[ext] || 'var(--global-palette2,#1e73be)';
  icon.appendChild(badge);

  // details
  const details = document.createElement('div');
  details.className = 'file-details';
  details.innerHTML = \`<strong>\${filename}</strong><span>\${author}</span>\`;

  // assemble
  a.appendChild(icon);
  a.appendChild(details);
  container.appendChild(a);
  return container;
}

async function initFileLists() {
  const holders = document.querySelectorAll('.file-list');
  if (!holders.length) return;

  try {
    const structure = await fetchStructure();
    holders.forEach(holder => {
      const folder = holder.dataset.folder;
      holder.innerHTML = '';               // clear “Loading…”
      const files = getFolderData(structure, folder);
      if (!files) {
        holder.textContent = \`Folder not found: \${folder}\`;
        return;
      }
      files.forEach(f => holder.appendChild(makeFileLink(folder, f)));
    });
  } catch (err) {
    console.error(err);
    holders.forEach(holder => {
      holder.textContent = 'Unable to load course structure.';
    });
  }
}

// on first load:
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFileLists);
} else {
  initFileLists();
}
// when page is restored from back/forward cache:
window.addEventListener('pageshow', initFileLists);
window.addEventListener('popstate', initFileLists);
window.onload = function() {initFileLists();};
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),e.jsx(s,{code:`<style>
.custom-file-link {
  margin: 1em 0;
  display: flex;
  align-items: center;
  max-width: 500px;
  transition: transform 0.1s;
  height: 40px;
  width: 100%;
}
.custom-file-link > a {
  text-decoration: none;
}

.custom-file-link:hover {
  transform: translateX(5px);
  cursor: pointer;
}.custom-file-link:hover .file-details strong {
  color: var(--front-red-1) !important;
}

.file-icon {
  margin-right: 10px;
  width: 36px;
  height: 36px;
  position: relative;
}

.file-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.extension-badge {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: 10px;
  font-weight: 500;
  padding: 1px 2px;
  border-radius: 2px;
  margin-top: 13.5px;
  margin-left: 1px;
  pointer-events: none;
}

.file-details {
  display: flex;
  flex-direction: column;
  width: calc(100% - 42px)
}

.file-details strong {
  font-size: 1em;
  font-weight: 500;
  color: var(--front-1);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.file-details span {
  font-size: 0.8em;
  color: var(--front-3);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>`,className:"w-html-embed"}),e.jsxs(r,{className:"w-box cck00sw cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1uz2t7q c4psa79 c1ldi832 icon-background home-top",children:[e.jsxs(r,{className:"w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m",children:[e.jsx(c,{href:"/",className:"w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c3gx87z cqyp7hg c1moglug",children:e.jsx(x,{src:"/assets/GE_Logo_-_Big_AQmTkCh-ue9Xfr1xXdV_k.svg",width:492,height:684,className:"w-image c1g1752z c1l3m6tn c1wjaqd0"})}),e.jsxs(r,{className:"w-box ci03eyw cavbteo c17p08f7 cy2vnym cgykfac c8chaf1 crymv6m ch588tu cd1c1x2 cgjpuuk co3wgvm cjdg5q7",children:[e.jsx(c,{href:"/",className:"w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q",children:e.jsx(o,{className:"w-text",children:"Home"})}),e.jsx(c,{href:"/course-bank",className:"w-link c4qqqhz cr2ujrk c8l261o czgmbqe c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q",children:e.jsx(o,{className:"w-text",children:"Course Bank"})}),e.jsx(c,{href:"/calendar",className:"w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q",children:e.jsx(o,{className:"w-text",children:"Calendar"})}),e.jsx(c,{href:"/about-geu",className:"w-link c4qqqhz cr2ujrk c8l261o c1ozmz5d c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 c1et34yr c1tj415q",children:e.jsx(o,{className:"w-text",children:"About"})})]}),e.jsxs(g,{children:[e.jsx(w,{children:e.jsx(b,{className:"w-button cvuh4zx c1v4vkm5 c1bti4b5 c1jbi97f crebcbz cr2ujrk ciidiay c1kf82bd c7jsqgj ctcp1cq c1r8lktc c1t9gjz2 c7jkqej cn1fibt cnwk8w7 c10ybtws cdxgxee c1wmsojl co1yi26 c1vk95sq c12eb7ae",children:e.jsx(s,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5px" d="M2.667 8h10.666M2.667 4h10.666M2.667 12h10.666"/></svg>',className:"w-html-embed"})})}),e.jsx(j,{className:"w-dialog-overlay c15392bw c12qysi7 c1jkbqq5 ch8lzlo c13hlxg9 c5mlbae c17brv9o cvuh4zx cu8ogtt c8nmv6p cwqnf9o c1bm3fk1 c183bdo0",children:e.jsxs(y,{className:"w-dialog-content c5mlbae ci03eyw cu8ogtt c7na04l ctnx82u cngdgqi cs20kd cnkevhm cpq2gwm cql21mx ck11ylk c1a71d48 c18s1ywe c1log017 cyuvfar ctbdlr1 c1kek3tg c1s3e5c3 c1ort9jz cuvlntl c18vlwwr c17sz26a cng5oj6",children:[e.jsxs(r,{"data-ws-tag":"nav",className:"w-box c39ez8k",children:[e.jsxs(r,{className:"w-box ci03eyw cu8ogtt c15abkx5 cfp2jcf",children:[e.jsx(k,{className:"w-dialog-description cy7nrqp c1ujy25t cdhy4s8 cc02v1c ca2fle4 c1kvebu6",children:"Find any page you want on the site"}),e.jsx("h2",{className:"w-element",children:"Navigation"})]}),e.jsxs(r,{className:"w-box ci03eyw c1rb689p c1hbxsx0 cy2vnym cgykfac cu8ogtt cfx1lak c12zhvo c8chaf1 crymv6m cjdg5q7",children:[e.jsx(c,{href:"/",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:e.jsx(o,{className:"w-text",children:"Home"})}),e.jsx(c,{href:"/course-bank",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:e.jsx(o,{className:"w-text",children:"Course Bank"})}),e.jsx(c,{href:"/calendar",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:e.jsx(o,{className:"w-text",children:"Calendar"})}),e.jsx(c,{href:"/about-geu",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:e.jsx(o,{className:"w-text",children:"About"})})]})]}),e.jsx(v,{className:"w-close-button c58kvwj c9jo736 crviqmx c40fhby c1koy2kb cvrpl4x c1uib4vc ci03eyw c1v4vkm5 c1bti4b5 c1qsi9u3 c1s85o6f c7jkqej cy7nrqp cq3zzid cjdtlt6 cxudh90 c12m3onu",children:e.jsx(s,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.5 3 3 12.5M3 3l9.5 9.5"/></svg>',className:"w-html-embed"})})]})})]})]}),e.jsxs(r,{className:"w-box c65isya ck11ylk c19haj7v ci03eyw cu8ogtt c1bti4b5 cve325e c14k8w3n cjdez0h c4psa79 chvq5aa chtpppz",children:[e.jsx("h1",{className:"w-element cyoo8jj cnurt1a c1wzvl6u",children:"Course bank"}),e.jsx(o,{className:"w-text cg3nt0s c74dsfz czgmbqe cyoo8jj c1wwlxnr cje5w08 c1bck0pu c16hxlzn c1c73s0v c7u4ssh",children:"Stuff for and about courses."})]})]}),e.jsxs("div",{className:"w-element ci03eyw cu8ogtt c1v4vkm5 c1993r1 c1w5mydw cn76a88 c1eeo1qt",children:[e.jsx("div",{className:"w-element cd3toq c17nm8vt c1xymrvd c8yo8yx cngdgqi c1in3n8u c3q79or cqlg791 csphimz c102ag1h c1jfe7vy ce1jmtw",children:e.jsx(s,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/maths1b">
  Loading…
</div>`,executeScriptOnCanvas:!0,className:"w-html-embed"})}),e.jsx("div",{className:"w-element cd3toq c17nm8vt c1xymrvd c8yo8yx cngdgqi c1in3n8u c3q79or cqlg791 csphimz c102ag1h c1jfe7vy ce1jmtw",children:e.jsx(s,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/statistics">
  Loading…
</div>`,executeScriptOnCanvas:!0,className:"w-html-embed"})})]})]}),L=({data:a})=>{const{system:n,resources:l,url:d}=a;return e.jsx(z.Provider,{value:{imageLoader:m,assetBaseUrl:i,resources:l,breakpoints:N,onError:console.error},children:e.jsx(S,{system:n},d)})},T=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"})),F=({data:a})=>{const{pageMeta:n}=a,{origin:l}=new URL(a.url),d={"@context":"https://schema.org","@type":"WebSite",name:p,url:l};let h=n.socialImageUrl;n.socialImageAssetName&&(h=`${l}${m({src:`${i}/${n.socialImageAssetName}`})}`);const u=n.custom.some(t=>t.property==="twitter:card");return e.jsxs(e.Fragment,{children:[a.url&&e.jsx("meta",{property:"og:url",content:a.url}),e.jsx("title",{children:n.title}),e.jsx("meta",{property:"og:title",content:n.title}),n.description&&e.jsxs(e.Fragment,{children:[e.jsx("meta",{name:"description",content:n.description}),e.jsx("meta",{property:"og:description",content:n.description})]}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:site_name",content:p}),h&&e.jsx("meta",{property:"og:image",content:n.socialImageUrl}),e.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(d,null,2)}}),n.excludePageFromSearch&&e.jsx("meta",{name:"robots",content:"noindex, nofollow"}),n.custom.map(({property:t,content:f})=>e.jsx("meta",{property:t,content:f},t)),(n.socialImageAssetName!==void 0||n.socialImageUrl!==void 0)&&u===!1&&e.jsx("meta",{property:"twitter:card",content:"summary_large_image"}),e.jsx("link",{rel:"icon",href:m({src:`${i}${C}`})}),_.map(t=>e.jsx("link",{rel:"preload",href:`${i}${t}`,as:"font",crossOrigin:"anonymous"},t)),E.map(t=>e.jsx("link",{rel:"preload",href:`${i}${t}`,as:"image"},t))]})},U=Object.freeze(Object.defineProperty({__proto__:null,Head:F},Symbol.toStringTag,{value:"Module"})),O={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+onRenderClient.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:q}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/course-bank/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:T}},Head:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/course-bank/+Head.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:U}}};export{O as configValuesSerialized};
