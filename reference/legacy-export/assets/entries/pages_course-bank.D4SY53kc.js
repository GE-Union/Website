import{l as W,r as h,j as c,u as Nc,m as Z,o as qc,p as I,q as C,s as Q,t as zc,v as Cc,w as cc,U as e,n,g as w,y as F,T as Sc,C as Lc,P as Fc,O as Ec,x as Ic,a as Tc,M as Pc,R as Oc,S as Bc,$ as _c,b as t,c as B,i as K,d as Rc,e as Ac,f as Dc,h as Mc,k as Uc}from"../chunks/chunk-LfFDiz3d.js";import{m as y}from"../chunks/chunk-Dy3NOGr2.js";import{c as Gc,u as ec,S as T,$ as i,k as l,w as r,y as o}from"../chunks/chunk-C5__Zvjk.js";/* empty css                      */var H="rovingFocusGroup.onEntryFocus",$c={bubbles:!1,cancelable:!0},_="RovingFocusGroup",[Y,sc,Hc]=Gc(_),[Kc,nc]=W(_,[Hc]),[Yc,Vc]=Kc(_),tc=h.forwardRef((s,a)=>c.jsx(Y.Provider,{scope:s.__scopeRovingFocusGroup,children:c.jsx(Y.Slot,{scope:s.__scopeRovingFocusGroup,children:c.jsx(Xc,{...s,ref:a})})}));tc.displayName=_;var Xc=h.forwardRef((s,a)=>{const{__scopeRovingFocusGroup:m,orientation:d,loop:u=!1,dir:p,currentTabStopId:x,defaultCurrentTabStopId:b,onCurrentTabStopIdChange:z,onEntryFocus:f,preventScrollOnEntryFocus:g=!1,...v}=s,N=h.useRef(null),R=Nc(a,N),A=ec(p),[D,j]=Z({prop:x,defaultProp:b??null,onChange:z,caller:_}),[S,U]=h.useState(!1),q=qc(f),L=sc(m),G=h.useRef(!1),[jc,X]=h.useState(0);return h.useEffect(()=>{const k=N.current;if(k)return k.addEventListener(H,q),()=>k.removeEventListener(H,q)},[q]),c.jsx(Yc,{scope:m,orientation:d,dir:A,loop:u,currentTabStopId:D,onItemFocus:h.useCallback(k=>j(k),[j]),onItemShiftTab:h.useCallback(()=>U(!0),[]),onFocusableItemAdd:h.useCallback(()=>X(k=>k+1),[]),onFocusableItemRemove:h.useCallback(()=>X(k=>k-1),[]),children:c.jsx(I.div,{tabIndex:S||jc===0?-1:0,"data-orientation":d,...v,ref:R,style:{outline:"none",...s.style},onMouseDown:C(s.onMouseDown,()=>{G.current=!0}),onFocus:C(s.onFocus,k=>{const bc=!G.current;if(k.target===k.currentTarget&&bc&&!S){const J=new CustomEvent(H,$c);if(k.currentTarget.dispatchEvent(J),!J.defaultPrevented){const $=L().filter(E=>E.focusable),yc=$.find(E=>E.active),kc=$.find(E=>E.id===D),fc=[yc,kc,...$].filter(Boolean).map(E=>E.ref.current);lc(fc,g)}}G.current=!1}),onBlur:C(s.onBlur,()=>U(!1))})})}),ac="RovingFocusGroupItem",ic=h.forwardRef((s,a)=>{const{__scopeRovingFocusGroup:m,focusable:d=!0,active:u=!1,tabStopId:p,children:x,...b}=s,z=Q(),f=p||z,g=Vc(ac,m),v=g.currentTabStopId===f,N=sc(m),{onFocusableItemAdd:R,onFocusableItemRemove:A,currentTabStopId:D}=g;return h.useEffect(()=>{if(d)return R(),()=>A()},[d,R,A]),c.jsx(Y.ItemSlot,{scope:m,id:f,focusable:d,active:u,children:c.jsx(I.span,{tabIndex:v?0:-1,"data-orientation":g.orientation,...b,ref:a,onMouseDown:C(s.onMouseDown,j=>{d?g.onItemFocus(f):j.preventDefault()}),onFocus:C(s.onFocus,()=>g.onItemFocus(f)),onKeyDown:C(s.onKeyDown,j=>{if(j.key==="Tab"&&j.shiftKey){g.onItemShiftTab();return}if(j.target!==j.currentTarget)return;const S=Zc(j,g.orientation,g.dir);if(S!==void 0){if(j.metaKey||j.ctrlKey||j.altKey||j.shiftKey)return;j.preventDefault();let q=N().filter(L=>L.focusable).map(L=>L.ref.current);if(S==="last")q.reverse();else if(S==="prev"||S==="next"){S==="prev"&&q.reverse();const L=q.indexOf(j.currentTarget);q=g.loop?Qc(q,L+1):q.slice(L+1)}setTimeout(()=>lc(q))}}),children:typeof x=="function"?x({isCurrentTabStop:v,hasTabStop:D!=null}):x})})});ic.displayName=ac;var Jc={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Wc(s,a){return a!=="rtl"?s:s==="ArrowLeft"?"ArrowRight":s==="ArrowRight"?"ArrowLeft":s}function Zc(s,a,m){const d=Wc(s.key,m);if(!(a==="vertical"&&["ArrowLeft","ArrowRight"].includes(d))&&!(a==="horizontal"&&["ArrowUp","ArrowDown"].includes(d)))return Jc[d]}function lc(s,a=!1){const m=document.activeElement;for(const d of s)if(d===m||(d.focus({preventScroll:a}),document.activeElement!==m))return}function Qc(s,a){return s.map((m,d)=>s[(a+d)%s.length])}var ce=tc,ee=ic,M="Tabs",[se,ze]=W(M,[nc]),rc=nc(),[ne,V]=se(M),oc=h.forwardRef((s,a)=>{const{__scopeTabs:m,value:d,onValueChange:u,defaultValue:p,orientation:x="horizontal",dir:b,activationMode:z="automatic",...f}=s,g=ec(b),[v,N]=Z({prop:d,onChange:u,defaultProp:p??"",caller:M});return c.jsx(ne,{scope:m,baseId:Q(),value:v,onValueChange:N,orientation:x,dir:g,activationMode:z,children:c.jsx(I.div,{dir:g,"data-orientation":x,...f,ref:a})})});oc.displayName=M;var dc="TabsList",mc=h.forwardRef((s,a)=>{const{__scopeTabs:m,loop:d=!0,...u}=s,p=V(dc,m),x=rc(m);return c.jsx(ce,{asChild:!0,...x,orientation:p.orientation,dir:p.dir,loop:d,children:c.jsx(I.div,{role:"tablist","aria-orientation":p.orientation,...u,ref:a})})});mc.displayName=dc;var hc="TabsTrigger",xc=h.forwardRef((s,a)=>{const{__scopeTabs:m,value:d,disabled:u=!1,...p}=s,x=V(hc,m),b=rc(m),z=uc(x.baseId,d),f=pc(x.baseId,d),g=d===x.value;return c.jsx(ee,{asChild:!0,...b,focusable:!u,active:g,children:c.jsx(I.button,{type:"button",role:"tab","aria-selected":g,"aria-controls":f,"data-state":g?"active":"inactive","data-disabled":u?"":void 0,disabled:u,id:z,...p,ref:a,onMouseDown:C(s.onMouseDown,v=>{!u&&v.button===0&&v.ctrlKey===!1?x.onValueChange(d):v.preventDefault()}),onKeyDown:C(s.onKeyDown,v=>{[" ","Enter"].includes(v.key)&&x.onValueChange(d)}),onFocus:C(s.onFocus,()=>{const v=x.activationMode!=="manual";!g&&!u&&v&&x.onValueChange(d)})})})});xc.displayName=hc;var gc="TabsContent",wc=h.forwardRef((s,a)=>{const{__scopeTabs:m,value:d,forceMount:u,children:p,...x}=s,b=V(gc,m),z=uc(b.baseId,d),f=pc(b.baseId,d),g=d===b.value,v=h.useRef(g);return h.useEffect(()=>{const N=requestAnimationFrame(()=>v.current=!1);return()=>cancelAnimationFrame(N)},[]),c.jsx(zc,{present:u||g,children:({present:N})=>c.jsx(I.div,{"data-state":g?"active":"inactive","data-orientation":b.orientation,role:"tabpanel","aria-labelledby":z,hidden:!N,id:f,tabIndex:0,...x,ref:a,style:{...s.style,animationDuration:v.current?"0s":void 0},children:N&&p})})});wc.displayName=gc;function uc(s,a){return`${s}-trigger-${a}`}function pc(s,a){return`${s}-content-${a}`}var te=oc,ae=mc,ie=xc,le=wc;const re=h.forwardRef(({defaultValue:s,...a},m)=>{const d=a.value??s??"",[u,p]=h.useState(d);h.useEffect(()=>p(d),[d]);const x=h.useCallback(async b=>{await Cc(),p(b)},[]);return c.jsx(te,{ref:m,...a,value:u,onValueChange:x})}),oe=ae,P=h.forwardRef(({value:s,...a},m)=>{const d=cc(a);return c.jsx(ie,{ref:m,value:s??d??"",...a})}),O=h.forwardRef(({value:s,...a},m)=>{const d=cc(a);return c.jsx(le,{ref:m,value:s??d??"",...a})}),vc="GE Union",de=[{id:"2EiFMEG40PBm9_fkelqpo"},{id:"xOnFYyuZv5VkMeeKDLyiu",maxWidth:991},{id:"Uvcw_OJqyPoLioZzUbP1x",maxWidth:767},{id:"eCbcXJaLEKSKcnbAPzNF0",maxWidth:479}],me="Favicon_gtxnE_QXZldwugdMJXAuG.ico",he=[],xe=[],ge=s=>c.jsxs("body",{className:"w-element c1lzvaoj c1qux398 cm1ds2c",children:[c.jsx(e,{code:`<style>
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
</style>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),c.jsx(e,{code:`<script>
  // 1) Configuration
  if (typeof window.JSON_URL === 'undefined') {
    window.JSON_URL = "https://raw.githubusercontent.com/GE-Union/CourseBank/main/structure.json";
  }
  if (typeof window.CACHE_KEY === 'undefined') {
    window.CACHE_KEY = "coursebank_structure_cache";
  }
  if (typeof window.CACHE_TTL === 'undefined') {
    window.CACHE_TTL = 90 * 60 * 1000 * 0; // 90 min
  }
  if (typeof window.EXT_COLORS === 'undefined') {
    window.EXT_COLORS = {
      PDF: "#D32F2F",
      IPYNB: "#F37C2F",
      ZIP: "#595959",
      DOCX: "#2A5699",
      XLSX: "#1D6F42",
      PPTX: "#D24726",
      TXT: "#616161",
    };
  }












  // Utility: fetch a file from GitHub RAW and return a Blob with a guessed MIME
  async function fetchGitHubBlob(pathInRepo) {

    const url = \`https://raw.githubusercontent.com/GE-Union/CourseBank/main/\${pathInRepo}\`;
    const res = await fetch(url); // CORS must be allowed by GitHub (usually is on raw.githubusercontent.com)
    if (!res.ok) throw new Error(\`Failed to fetch: \${res.status} \${res.statusText}\`);

    const ext = (pathInRepo.split(".").pop() || "").toLowerCase();
    const buf = await res.arrayBuffer();

    // Minimal MIME mapping
    const mimeByExt = {
      pdf: "application/pdf",
      ipynb: "application/json",    // notebooks are JSON; download will use filename anyway
      txt: "text/plain",
      json: "application/json",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      svg: "image/svg+xml",
      html: "text/html",
      csv: "text/csv"
    };
    const type = mimeByExt[ext] || (res.headers.get("content-type") || "application/octet-stream");
    return new Blob([buf], { type });
  }

  // Open PDF inline in a new tab using the browser’s viewer
  async function openPdfInline(pathInRepo) {
    // Open a tab immediately to avoid popup blockers
    const win = window.open("", "_blank");
    try {
      const blob = await fetchGitHubBlob(pathInRepo);
      const url = URL.createObjectURL(blob);
      win.location = url;

      // revoke after the new tab finishes loading
      // (can't reliably know, so do a delayed revoke)
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      if (win) win.close();
      console.error(err);
      alert("Could not open PDF.");
    }
  }

  // Force download (works for .ipynb and anything else you want to download)
  async function downloadFile(pathInRepo) {
    try {
      const blob = await fetchGitHubBlob(pathInRepo);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = decodeURIComponent(pathInRepo.split("/").pop() || "file");
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (err) {
      console.error(err);
      alert("Could not download file.");
    }
  }

  // wiring for anchors
  function wireDownloadLink(a, pathInRepo) {
    const lower = pathInRepo.toLowerCase();
    if (lower.endsWith(".pdf")) {
      a.href = "#";
      a.onclick = (e) => { e.preventDefault(); openPdfInline(pathInRepo); };
      a.target = "_blank";
      a.rel = "noopener";
    } else if (lower.endsWith(".ipynb")) {
      a.href = "#";
      a.onclick = (e) => { e.preventDefault(); downloadFile(pathInRepo); };
      a.removeAttribute("target");
    } else {
      // default: point directly to RAW
      a.href = \`https://raw.githubusercontent.com/GE-Union/CourseBank/main/\${encodeURI(pathInRepo)}\`;
    }
  }










  

  
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
    const res = await fetch(JSON_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load structure.json");
    const data = await res.json();
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ ts: Date.now(), data }),
    );
    return data;
  }
  
  function getFolderData(structure, folderPath) {
    const parts = folderPath.split("/");
    let cur = structure;
    for (const p of parts) {
      if (!(p in cur)) return null;
      cur = cur[p];
    }
    return Array.isArray(cur) ? cur : null;
  }
  
  function makeFileLink(folder, file) {
    const container = document.createElement("div");
    container.className = "custom-file-link";
  
    // split name & author
    const [rawName, rawAuth] = file.split("-a-");
    const filename = (rawName || file).replace(/_/g, " ");
    const author = rawAuth
      ? rawAuth.replace(/_/g, " ").replace(/\\.[^/.]+$/, "")
      : "Unknown";
  
    const ext = file.split(".").pop().toUpperCase();
  
    const fullPath = \`\${folder}/\${file}\`;
    const encodedPath = fullPath
      .split('/')
      .map(seg => encodeURIComponent(seg))
      .join('/');
  
    const a = document.createElement('a');
    /*if (['PDF'].includes(ext)) {
      a.target = '_blank';
      a.href = \`https://raw.githubusercontent.com/GE-Union/CourseBank/main/\${encodedPath}\`;
    } else {
      a.setAttribute('download', "");
      a.href = \`https://raw.githubusercontent.com/GE-Union/CourseBank/main/\${encodedPath}\`; // direct download
      //a.href = \`https://geunion.dk/coursebank/\${encodedPath}\`;  // proxy script
    }*/
    wireDownloadLink(a, encodedPath);
    a.style.display = 'flex';
    a.style.alignItems = 'center';
    a.style.width = '100%';
    a.style.lineHeight = "1.2";
  
    // icon
    const icon = document.createElement("div");
    icon.className = "file-icon";
    const img = document.createElement("img");
    img.src =
      "https://raw.githubusercontent.com/GE-Union/CourseBank/main/res/file-icon.svg";
    img.alt = "File Icon";
    icon.appendChild(img);
  
    const badge = document.createElement("div");
    badge.className = "extension-badge";
    badge.textContent = ext;
    badge.style.backgroundColor =
      EXT_COLORS[ext] || "var(--global-palette2,#1e73be)";
    icon.appendChild(badge);
  
    // details
    const details = document.createElement("div");
    details.className = "file-details";
    details.innerHTML = \`<strong>\${filename}</strong><span>\${author}</span>\`;
  
    // assemble
    a.appendChild(icon);
    a.appendChild(details);
    container.appendChild(a);
    return container;
  }
  
  async function initFileLists() {
    const holders = document.querySelectorAll(".file-list");
    console.log(holders);
    if (!holders.length) return;
  
    try {
      const structure = await fetchStructure();
      holders.forEach((holder) => {
        const folder = holder.dataset.folder;
        holder.innerHTML = ""; // clear “Loading…”
        const files = getFolderData(structure, folder);
        if (!files) {
          holder.textContent = "No notes found";
          return;
        }
        files.forEach((f) => holder.appendChild(makeFileLink(folder, f)));
        console.log(\`Populated \${folder}\`);
      });
    } catch (err) {
      console.error(err);
      holders.forEach((holder) => {
        holder.textContent = "Unable to load course structure.";
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      setTimeout(function() {initFileLists();}, 500)
    });
  });
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),c.jsx(e,{code:`<style>
.file-list{
  display: flex;
  flex-wrap: wrap;
  max-width: 850px
}
  
.custom-file-link {
  margin: 1em 0;
  display: flex;
  align-items: center;
  max-width: 500px;
  min-width: 300px;
  transition: transform 0.1s;
  height: 40px;
  width: 50%;
  flex-shrink: 0; flex-grow: 1;
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
  flex-shrink: 0;
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
  margin-top: 14px;
  margin-left: 1px;
  pointer-events: none;
}

.file-details {
  display: flex;
  flex-direction: column;
  width: calc(100% - 58px);
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
</style>`,className:"w-html-embed"}),c.jsxs(n,{className:"w-box cck00sw cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1uz2t7q c4psa79 c1ldi832 icon-background home-top",children:[c.jsxs(n,{className:"w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m",children:[c.jsx(w,{href:"/",id:"menu-icon",target:"_self",className:"w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 cqyp7hg c1moglug",children:c.jsx(F,{src:"/assets/GE_Logo_-_Big_kpMORCHYDLOpQbfBKYwZ7.svg",width:492,height:684,loading:"eager",alt:"",className:"w-image c1wjaqd0 c1vsv73g ccps616 cy2rpkp c1l3m6tn"})}),c.jsxs(n,{className:"w-box ci03eyw c5zf3td c1bdekej cy2vnym cgykfac c8chaf1 crymv6m ch588tu cd1c1x2 cgjpuuk co3wgvm cjdg5q7",children:[c.jsx(w,{href:"/",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q cycv0tm",children:"Home"}),c.jsxs(w,{href:"/course-bank",className:"w-link c4qqqhz c1l00ka2 c8l261o c1wmsojl c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q",children:[c.jsx("span",{className:"w-element cycv0tm",children:"Course "}),"Bank"]}),c.jsx(w,{href:"/calendar",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q",children:"Calendar"}),c.jsxs(Sc,{delayDuration:0,children:[c.jsx(Lc,{children:c.jsx("div",{className:"w-element c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1llv2ju c1tj415q",children:"About"})}),c.jsxs(Fc,{className:"w-tooltip-content c5mlbae cm1ds2c c1fxgukz cdzo1k7 c1lp7lun c3ryv7d c1t11c95 c1kz25wt c1jbi97f crebcbz c1q4zcxv ci03eyw cu8ogtt c4bgnbx cj82r57 c14a5ioc cm4j335",children:[c.jsx(w,{href:"/about-ge",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q",children:"General Engineering"}),c.jsx(w,{href:"/about-dtu",className:"w-element c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht cz03vb2 cqo7rnh cz5lin5 c1tj415q",children:"DTU"}),c.jsx(w,{href:"/about-geu",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q",children:"GE Union"})]})]})]}),c.jsxs(Ec,{open:!1,children:[c.jsx(Ic,{children:c.jsx(Tc,{className:"w-button cvuh4zx c1v4vkm5 c1bti4b5 c1jbi97f crebcbz cr2ujrk ciidiay c1kf82bd c7jsqgj ctcp1cq c1r8lktc c1t9gjz2 c7jkqej cn1fibt cnwk8w7 c10ybtws cdxgxee c1wmsojl co1yi26 c1vk95sq c12eb7ae",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5px" d="M2.667 8h10.666M2.667 4h10.666M2.667 12h10.666"/></svg>',className:"w-html-embed"})})}),c.jsx(Pc,{className:"w-dialog-overlay c15392bw c12qysi7 c1jkbqq5 ch8lzlo c13hlxg9 c5mlbae c1qqxt5d cvuh4zx cu8ogtt c8nmv6p cwqnf9o c1bm3fk1 c183bdo0",children:c.jsxs(Oc,{className:"w-dialog-content c5mlbae ci03eyw cu8ogtt c7na04l ctnx82u cg4tsss c1e09nnv cnkevhm cpq2gwm cql21mx ck11ylk c1a71d48 c18s1ywe c1log017 cyuvfar cvy6q1l c1kek3tg c1s3e5c3 c1ort9jz cuvlntl c18vlwwr c17sz26a cng5oj6",children:[c.jsxs(n,{"data-ws-tag":"nav",className:"w-box c39ez8k",children:[c.jsxs(n,{className:"w-box ci03eyw cu8ogtt c15abkx5 cfp2jcf",children:[c.jsx(Bc,{className:"w-dialog-description cy7nrqp c1ujy25t cdhy4s8 cc02v1c ca2fle4 c1kvebu6",children:"Find any page you want on the site"}),c.jsx("h2",{className:"w-element",children:"Navigation"})]}),c.jsxs(n,{className:"w-box ci03eyw c1rb689p c1hbxsx0 cy2vnym cgykfac cu8ogtt cfx1lak c12zhvo c8chaf1 crymv6m cjdg5q7",children:[c.jsx(w,{href:"/",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Home"}),c.jsx(w,{href:"/course-bank",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Course Bank"}),c.jsx(w,{href:"/calendar",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Calendar"}),c.jsx(w,{href:"/introduction",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Dashboard"}),c.jsx(w,{href:"/about-ge",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About GE"}),c.jsx(w,{href:"/about-dtu",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About DTU"}),c.jsx(w,{href:"/about-geu",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About GE Union"})]})]}),c.jsx(_c,{className:"w-close-button c58kvwj c9jo736 crviqmx c40fhby c1koy2kb cvrpl4x c1uib4vc ci03eyw c1v4vkm5 c1bti4b5 c1qsi9u3 c1s85o6f c7jkqej cy7nrqp cq3zzid cjdtlt6 cxudh90 c14y8ie2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.5 3 3 12.5M3 3l9.5 9.5"/></svg>',className:"w-html-embed"})})]})})]})]}),c.jsxs(n,{className:"w-box c65isya ck11ylk c19haj7v ci03eyw cu8ogtt c1bti4b5 cve325e c14k8w3n cjdez0h c4psa79 chvq5aa chtpppz",children:[c.jsx("h1",{className:"w-element cyoo8jj c1k74xht cnurt1a c1wzvl6u",children:"Course bank"}),c.jsx(t,{className:"w-text cqawzgp c1s7gudn c1vkmm90 cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu cnurt1a c1wzvl6u c7u4ssh",children:"Find your relevant courses and notes - from students for students!"})]})]}),c.jsxs(re,{value:"0",className:"w-tabs cu8ogtt c1v4vkm5 c3q79or cqlg791 cbeiaob ci03eyw",children:[c.jsxs(oe,{className:"w-tabs-list cfyrpk4 c1qpyqes c1bti4b5 cd3toq c17nm8vt c8yo8yx c1xymrvd c1n9f9m4 c1jbi97f c1lgzutd c1s5tu31 c1lvtt9b c12gpzk6 c1jsmjku c1cshlcb cde37yz ca1ntyv cwsyfmt cgmjq0a c1xmffmh c142qj80 c15igavi",children:[c.jsxs(P,{"data-ws-index":"0",className:"w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c14y8ie2 cxbwblh co1yi26 c1vk95sq c152v1c8 clljqx0 c13s8e34 c1aqe4zi c1kvgv3n",children:[c.jsx("span",{className:"w-element c426or5 cycv0tm ckiq6wr",children:"Polytechnical "}),"Foundations"]}),c.jsxs(P,{"data-ws-index":"1",className:"w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c14y8ie2 cxbwblh co1yi26 c1vk95sq c152v1c8 clljqx0 c13s8e34 c1aqe4zi c1kvgv3n",children:["Advanced",c.jsx(y,{className:"w-text-1 cwti2ho cvuh4zx ckiq6wr",children:"Systems"})]}),c.jsxs(P,{"data-ws-index":"2",className:"w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c14y8ie2 cxbwblh co1yi26 c1vk95sq c152v1c8 clljqx0 c13s8e34 c1aqe4zi c1kvgv3n",children:["Cyber",c.jsx(y,{className:"w-text-1 cwti2ho cvuh4zx ckiq6wr",children:"Systems"})]}),c.jsxs(P,{"data-ws-index":"3",className:"w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c14y8ie2 cxbwblh co1yi26 c1vk95sq c152v1c8 clljqx0 c13s8e34 c1aqe4zi c1kvgv3n",children:["Living",c.jsx(y,{className:"w-text-1 cwti2ho cvuh4zx ckiq6wr",children:"Systems"})]}),c.jsxs(P,{"data-ws-index":"4",className:"w-tab-trigger cfyrpk4 c1v4vkm5 c1bti4b5 c1sm0mvf cbfwnla c3fz80x c6pfjtb c1lp7lun c3ryv7d c1t11c95 c1kz25wt cr2ujrk c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 ck08swj cuz3b7n c5atcat c13yk87r c14y8ie2 cxbwblh co1yi26 c1vk95sq c152v1c8 clljqx0 c13s8e34 c1aqe4zi c1kvgv3n",children:["Future",c.jsx(y,{className:"w-text-1 cwti2ho cvuh4zx ckiq6wr",children:"Energy"})]})]}),c.jsxs(O,{"data-ws-index":"0",className:"w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f",children:[c.jsxs("p",{className:"w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2",children:["The ",c.jsx("b",{className:"w-element",children:"Polytechnical Foundations"})," are a set of courses all at DTU are required to take. They cover a wide variety of stuffs and suck sometimes. They are still cool in general tho."]}),c.jsxs(T,{collapsible:!0,className:"w-accordion",children:[c.jsxs(i,{"data-ws-index":"0",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text c1kzhrg",children:["Mathematics 1a",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"01003"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Covers logic, complex numbers, polynomials, linear algebra, and differential equations, combining theory with computation. Strengthens problem-solving through reasoning, thematic exercises, and computer-based methods."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/maths1a">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"1",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Mathematics 1b",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"01004"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Focuses on multivariable calculus, including gradients, Jacobians, Taylor expansions, optimization, and vector fields. Combines theory and computation with integrals, parameterizations, and the spectral theorem. Develops skills through thematic exercises, group projects, and computer-based methods."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/maths1b">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"2",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Chemistry",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"26020"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Covers atomic structure, bonding, thermodynamics, equilibrium, kinetics, acids/bases, and redox reactions. Connects chemistry to materials, catalysis, and element cycles with focus on technology and sustainability."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/chemistry">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"3",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Computer Programming",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02003"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Learn the basics of Python programming while solving real problems with code. You’ll practice everything from loops and functions to working with data, and even try out simple projects. A hands-on way to build the coding skills every engineer needs."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/computer-programming">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"4",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Physics",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"10063"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Covers the big three of engineering physics: mechanics, thermodynamics, and electromagnetism: plus  experiments. You’ll learn to model real systems, crunch data in Python, and see how physics explains (almost) everything around you."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/physics1">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"5",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Statistics",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02402"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Learn how to make sense of data with graphs, probability, and statistical models. You’ll try out tools like Python to test ideas, run regressions, and check if results actually make sense."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/statistics">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"6",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Interdisciplinary Bioengineering",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"27020"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Get an intro to biology and biotechnology and see how they connect to engineering. From DNA and proteins to ecosystems and data science, you’ll explore how biology can inspire tech. Finish with a group project solving a real-world problem."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/interdisciplinary-bioengineering">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"7",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Science, Technology and Society",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"42620"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"Explore how technology shapes society and sustainability from ethics and the SDGs to public debates about innovation. You’ll analyze real cases, tackle dilemmas, and learn tools to think critically about the role of engineers in the world."}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="polytechnical-foundations/science-technology-and-society">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsx("hr",{className:"w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue"}),c.jsxs(i,{"data-ws-index":"8",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Mathematics 2",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"01034"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsxs("span",{className:"w-element",children:["Takes math to the next level with differential equations, infinite series, and Fourier series. You’ll learn how to solve complex systems, test stability, and approximate functions.","",c.jsx("br",{}),""]}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="rest-of-obligatory-courses/maths2">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]})]})]}),c.jsxs(O,{"data-ws-index":"1",className:"w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f",children:[c.jsxs("p",{className:"w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2",children:["The ",c.jsx("b",{className:"w-element",children:"Advanced Materials"})," specialization is about creating sustainable and functional materials for the future. From nanotechnology and modeling to acoustics, physics, and manufacturing, it opens doors across cutting-edge engineering fields."]}),c.jsxs(T,{collapsible:!0,className:"w-accordion cyoabi7",children:[c.jsxs(i,{"data-ws-index":"0",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text c1kzhrg",children:["Introduction to Advanced Materials",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"41680"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/introduction-to-advanced-materials">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"1",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to Numerical Algorithms",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02601"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/introduction-to-numerical-algorithms">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"2",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Resource Engineering",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"12139"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/resource-engineering">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"3",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Physics for Materials and Energy",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"10080"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/physics-for-materials-and-energy">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"4",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Materials Technology",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"41684"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/materials-technology">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"5",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Materials Characterization and Testing",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"41685"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/materials-characterization-and-testing">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsx("hr",{className:"w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue"}),c.jsxs(i,{"data-ws-index":"6",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to Machine Learning",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02451"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/introduction-to-machine-learning">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"7",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Image Analysis",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02503"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/image-analysis">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"8",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Mathematical Modelling",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02526"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/mathematical-modelling">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"9",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to 3D printing",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"41789"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/introduction-to-3d-printing">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"10",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Computer Simulation of Materials",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"47212"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="advanced-materials/computer-simulations-of-materials">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]})]})]}),c.jsxs(O,{"data-ws-index":"2",className:"w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f",children:[c.jsxs("p",{className:"w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2",children:["The ",c.jsx("b",{className:"w-element",children:"Cyber Systems"})," specialization is about computers and integrated systems. It is objectively the best specialization for the best people."]}),c.jsxs(T,{collapsible:!0,className:"w-accordion",children:[c.jsxs(i,{"data-ws-index":"0",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text c1kzhrg",children:["Introduction to Cyber Systems",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02135"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="cyber-systems/introduction-to-cyber-systems">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"1",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Discrete Mathematics",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"01017"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="cyber-systems/discrete-mathematics">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"2",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Algorithms and Data Structures 1",c.jsx(y,{className:"w-text-1 chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"26020"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="cyber-systems/algorithms-and-data-structures1">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"3",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Computer Science Modelling",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02141"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="cyber-systems/computer-science-modelling">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"4",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Functional Programming",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02157"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="cyber-systems/functional-programming">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"5",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Agile Object-oriented Software Development",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02160"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="cyber-systems/agile-object-oriented-software-development">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]})]})]}),c.jsxs(O,{"data-ws-index":"3",className:"w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f",children:[c.jsxs("p",{className:"w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2",children:["The ",c.jsx("b",{className:"w-element",children:"Living Systems"})," specialization covers everything from food and aquatic engineering to healthcare, medicine, and chemicals. It’s a gateway to Denmark’s world-leading biotech and pharma scene, with strong links to companies like Novo Nordisk."]}),c.jsxs(T,{collapsible:!0,className:"w-accordion",children:[c.jsxs(i,{"data-ws-index":"0",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text c1kzhrg",children:["Introduction to Living Systems",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"12701"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/introduction-to-living-systems">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"1",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to Genetic Methods in Engineering",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"25106"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/introduction-to-genetic-methods-in-engineering">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"2",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Biochemistry",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"27022"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/biochemistry">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"3",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Experimental Molecular Microbiology",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"27027"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/experimental-molecular-microbiology">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsx("hr",{className:"w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue"}),c.jsxs(i,{"data-ws-index":"4",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to Bioinformatics",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"22111"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/introduction-to-bioinformatics">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"5",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Ecology",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"25105"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/ecology">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"6",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Fisheries and Aquaculture",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"25107"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/fisheries-and-aquaculture">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"7",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Applied Molecular Techniques",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"25108"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/applied-molecular-techniques">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"8",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Biophysics and Biophysical Chemistry",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"26211"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/biophysics-and-biophysical-chemistry">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"9",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Molecular Biology",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"27026"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/molecular-biology">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"10",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Fermentation Technology",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"27034"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/fermentation-technology">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"11",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Bio Process Technology",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"28025"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="living-systems/bio-process-technology">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]})]})]}),c.jsxs(O,{"data-ws-index":"4",className:"w-tab-content ci03eyw cu8ogtt c1qpyqes c7wcowi ch5gnkm c1ive82f",children:[c.jsxs("p",{className:"w-element cyoo8jj czga5yl c197srfe cc02v1c c19b7rd2",children:["The ",c.jsx("b",{className:"w-element",children:"Future Energy"})," specialization focuses on the green transition, from wind and solar power to electrolysis, applied chemistry, and sustainable entrepreneurship. It opens doors to careers in Denmark’s energy sector, with leading companies like Vestas driving innovation worldwide."]}),c.jsxs(T,{collapsible:!0,className:"w-accordion",children:[c.jsxs(i,{"data-ws-index":"0",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text c1kzhrg",children:["Introduction to Future Energy",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"47202"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/introduction-to-future-energy">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"1",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to Numerical Algorithms",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"02601"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/introduction-to-numerical-algorithms">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"2",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Physics for Materials and Energy",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"10080"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/physics-for-materials-and-energy">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"3",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["General Electrical Engineering",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"46055"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/general-electrical-engineering">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"4",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Engineering Thermodynamics",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"47201"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/engineering-thermodynamics">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsx("hr",{className:"w-element c1vn0xiq cn1fibt cnwk8w7 c1jeji4x c10ybtws c1og6ug8 c1yzzewo c1cck0k8 c1l807ik c189xzjf c10n22ue"}),c.jsxs(i,{"data-ws-index":"5",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Physics of Solar Energy and Energy Storage",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"10260"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/physics-of-solar-energy-and-energy-storage">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"6",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Climate Change",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"12205"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/climate-change">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"7",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to Wind Energy",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"46000"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/introduction-to-wind-energy">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"8",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Introduction to Energy Analytics",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"46040"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/introduction-to-energy-analytics">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"9",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Electrochemical Energy Technologies",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"47205"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/electrochemical-energy-technologies">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]}),c.jsxs(i,{"data-ws-index":"10",className:"w-item",children:[c.jsx(l,{className:"w-item-header ci03eyw",children:c.jsxs(r,{className:"w-item-trigger ci03eyw ck11ylk c19haj7v c1ehv6bb c1v4vkm5 cr2ujrk c18uv5ha camisri c15oj64s chfgnq1 c4bgnbx cj82r57 c14a5ioc cm4j335 c1nj86ny cy7nrqp c8l261o c13u1sx6 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1yyg526 c4vngu5 cqo7rnh ci1qamt cgt2byq cvstnbo cyou3x7 c1qa96js cdz972a c74re8a",children:[c.jsxs(t,{className:"w-text",children:["Electrochemical Energy Storage and Power2X",c.jsx("span",{className:"w-element chpvhw5 c1br4k3t c1vn0xiq c17g3f7v cgjpuuk",children:"47211"})]}),c.jsx(n,{className:"w-box coxlzp3 c178lpvj cbg292c c767uka c1tmykg6 c40iywk c1efnbdc c14hahek c1qt5xo2",children:c.jsx(e,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/></svg>',className:"w-html-embed"})})]})}),c.jsxs(o,{className:"w-item-content cm1ds2c c1fxgukz c1jbi97f crebcbz c1tmykg6 ctdzf0s c1efnbdc c14hahek c1qt5xo2 c984udg c15qt4h4 c11ua5hp",children:[c.jsx("span",{className:"w-element",children:"No description"}),c.jsx("h3",{className:"w-element cc02v1c",children:"Notes"}),c.jsx(e,{code:`<div class="file-list"
     data-folder="future-energy/electrochemical-energy-storage-and-power2x">
  Loading…
</div>
<script>
  initFileLists();
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]})]})]})]}),c.jsxs("div",{className:"w-element c1aa51lf ci03eyw c1sxsgjp cqaj6f4 c16lfnyl c1fri8go c1jj1apw",children:[c.jsxs("div",{className:"w-element ci03eyw c1v4vkm5 c1svdh6y cft5z6j c156d1ag c1uw2bda cnd6e42 col1yiq corpumv c1q3q0jq c1rdt54o c6775s7 c5v0tdv c5wuwv0 c8nmv6p cwqnf9o cgam0gy c1lvim05",children:[c.jsx("h4",{className:"w-element ca2fle4 cc02v1c c5fuofq cuz3b7n",children:"See more on"}),c.jsxs(w,{href:"https://www.studocu.com/da/institution/danmarks-tekniske-universitet/2833",target:"_blank",className:"w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c4u8rnv cxlc7u9 cqs9um0 c1ldtmq9 c1ho4waj c1vkmm90 c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c143l1dc cbazxvp c1ydztro cpyan2s c15o04ri",children:[c.jsx(t,{className:"w-text",children:"Studocu"}),c.jsx(F,{src:"/assets/Arrow_exgLm9zGXPhywmuQ3p_EH.svg",width:25,height:24,alt:"",className:"w-image c1nfcmlw cqb6n9z"})]})]}),c.jsxs("div",{className:"w-element ci03eyw c1v4vkm5 cui8ecu c1qvvqb3 c156d1ag c1uw2bda cnd6e42 col1yiq corpumv c1q3q0jq c1rdt54o c6775s7 c5v0tdv c5wuwv0 c8nmv6p cwqnf9o cgam0gy c1lvim05",children:[c.jsx("h4",{className:"w-element ca2fle4 cc02v1c c5fuofq cuz3b7n",children:"Upload notes"}),c.jsxs(w,{href:"https://docs.google.com/forms/d/e/1FAIpQLScRXlMZhGqmZ9dPn71PonKcp-LJXH2vlWVxcZ1EDnoZ1hH96Q/viewform?usp=header",target:"_blank",className:"w-link c10pf28n c6775s7 ct2w13i c1kmtbg4 c4u8rnv cxlc7u9 cqs9um0 c1ldtmq9 c1ho4waj c1vkmm90 c8l261o cr2ujrk ci03eyw c1pd7k79 c2gl1gx cda4yqq c767uka c1x65yvk cv1qn8j c1jon836 co5x0w6 c5sx8jk c1122adb c1bti4b5 c1tmykg6 ctdzf0s codsd31 c16er72m c1qt5xo2 c1bf26ov cbazxvp c1ydztro cpyan2s c15o04ri",children:[c.jsx(t,{className:"w-text",children:"Here"}),c.jsx(F,{src:"/assets/Arrow_exgLm9zGXPhywmuQ3p_EH.svg",width:25,height:24,alt:"",className:"w-image c1nfcmlw cqb6n9z"})]})]})]})]}),c.jsx(n,{className:"w-box c9esr7v cm1ds2c c1fxgukz cd3toq c17nm8vt c1xymrvd c8yo8yx csaxvfs ce1jmtw c1m7qrvj c1o7c5y4 c1ndanu0 icon-background",children:c.jsxs("div",{className:"w-element ci03eyw c1nj86ny c4jnp6s c1l3m6tn c1w0yra6 cpq2gwm c1v4vkm5 c16pnwu4 cypyahl cs11lv9 c1njbxf1",children:[c.jsx(w,{href:"/",className:"w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1dohq8s c3gx87z cqyp7hg c1moglug",children:c.jsx(F,{src:"/assets/GEU_Icon_1_qa8eLWu5EKj0C18RuAmQB.svg",width:256,height:238,alt:"",className:"w-image c1l3m6tn ct616nu cmvyqw5 cqw0qi cc5htwv"})}),c.jsxs("div",{className:"w-element ci03eyw c1is6v5c co8t7od c1nj86ny c74dsfz c1jwuvkp cezuxvu",children:[c.jsx(w,{href:"https://www.instagram.com/ge.union/",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:c.jsx(F,{src:"/assets/soc-insta_3EK2yfeQrKO1VBcKS5CMG.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),c.jsx(w,{href:"https://www.facebook.com/people/GE-Union/61573069635006/?_rdr",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:c.jsx(F,{src:"/assets/soc-facebook_dRtaC2-32UMM-Zp4wCSDO.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),c.jsx(w,{href:"https://www.linkedin.com/groups/10061020/",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:c.jsx(F,{src:"/assets/soc-linkedin_JewsOzbBNtsSePfOyCp1_.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),c.jsx(w,{href:"https://www.reddit.com/r/DTU/",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:c.jsx(F,{src:"/assets/soc-reddit_YIY3q3bmqs_8zl81uxYxk.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})})]})]})}),c.jsx(e,{code:`<style>
  /* Optional quality-of-life styles */
  #menu-icon {
    touch-action: none;   /* allow smooth touch drag */
    will-change: transform;
    
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
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]}),we=s=>{const{origin:a,pathname:m,search:d}=new URL(s);return`${a}${m}${d}`},ue=h.memo(({pageKey:s,system:a})=>c.jsx(ge,{system:a},s),(s,a)=>s.pageKey===a.pageKey),pe=({data:s})=>{const{system:a,resources:m,url:d,pageMeta:u}=s,p=we(d),x=h.useMemo(()=>({imageLoader:K,assetBaseUrl:B,resources:m,breakpoints:de,onError:console.error}),[m]);return c.jsxs(Rc.Provider,{value:x,children:[c.jsx(Ac.Provider,{value:d,children:c.jsx(ue,{pageKey:p,system:a})}),c.jsx(Dc,{url:d,pageMeta:u,siteName:vc,imageLoader:K,assetBaseUrl:B}),c.jsx(Mc,{children:u.title})]})},ve=Object.freeze(Object.defineProperty({__proto__:null,default:pe},Symbol.toStringTag,{value:"Module"})),je=({})=>{const s={"@context":"https://schema.org","@type":"WebSite",name:vc};return c.jsxs(c.Fragment,{children:[c.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(s,null,2)}}),c.jsx("link",{rel:"icon",href:K({src:`${B}${me}`})}),he.map(a=>c.jsx("link",{rel:"preload",href:`${B}${a}`,as:"font",crossOrigin:"anonymous"},a)),xe.map(a=>c.jsx("link",{rel:"preload",href:`${B}${a}`,as:"image"},a))]})},be=Object.freeze(Object.defineProperty({__proto__:null,Head:je},Symbol.toStringTag,{value:"Module"})),Ce={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+onRenderClient.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:Uc}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/course-bank/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:ve}},Head:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/course-bank/+Head.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:be}}};export{Ce as configValuesSerialized};
