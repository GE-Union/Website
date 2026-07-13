import{j as e,U as i,n as a,g as n,y as c,T as w,C as x,P as y,O as v,x as f,a as j,M as b,R as k,S as q,$ as z,b as N,r as m,c as r,i as d,d as E,e as _,f as S,h as C,k as A}from"../chunks/chunk-LfFDiz3d.js";/* empty css                      */const p="GE Union",T=[{id:"2EiFMEG40PBm9_fkelqpo"},{id:"xOnFYyuZv5VkMeeKDLyiu",maxWidth:991},{id:"Uvcw_OJqyPoLioZzUbP1x",maxWidth:767},{id:"eCbcXJaLEKSKcnbAPzNF0",maxWidth:479}],P="Favicon_gtxnE_QXZldwugdMJXAuG.ico",I=[],D=[],L=s=>e.jsxs("body",{className:"w-element c1lzvaoj c1qux398 ci03eyw cu8ogtt c1qpyqes cm1ds2c",children:[e.jsx(i,{code:`<style>
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
    margin-bottom: 0.5em;
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
</style>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),e.jsx(i,{code:`<script>
  if (typeof window.GE_QA_JSON_URL === 'undefined') {
    window.GE_QA_JSON_URL = "https://raw.githubusercontent.com/GE-Union/WebsiteContent/main/AboutGE/QnA.json";
  }
  if (typeof window.GE_QA_CACHE_KEY === 'undefined') {
    window.GE_QA_CACHE_KEY = "coursebank_structure_cache";
  }
  if (typeof window.CACHE_TTL === 'undefined') {
    window.CACHE_TTL = 90 * 60 * 1000; // 90 min
  }

  async function fetchQnA() {
    // try cache
    const raw = localStorage.getItem(GE_QA_CACHE_KEY);
    if (raw) {
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL) {
        return data;
      }
    }
    // otherwise re-fetch
    const res = await fetch(GE_QA_JSON_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load structure.json");
    const data = await res.json();
    localStorage.setItem(
      GE_QA_CACHE_KEY,
      JSON.stringify({ ts: Date.now(), data }),
    );
    return data;
  }

  function initQnA() {
    var qnaContainer = document.getElementById('qna-container');
    if (!qnaContainer) return;
    qnaContainer.innerHTML = "";

    fetchQnA()
      .then(data => {
        if (!data.categories) {
          qnaContainer.textContent = "No Q&A data found.";
          return;
        }

        data.categories.forEach(category => {
          // Create category title
          const catTitle = document.createElement('h3');
          catTitle.textContent = category.category;
          qnaContainer.appendChild(catTitle);

          // Create list for questions
          const list = document.createElement('div');
          list.className = 'qna-list';
          
          category.questions.forEach(q => {
            const item = document.createElement('div');
            item.className = 'qna-item';
          
            const question = document.createElement('div');
            question.className = 'qna-question';
            
            const questionText = document.createElement('span');
            questionText.textContent = q.question;
            questionText.className = 'qna-question-text';
          
            const arrow = document.createElement('div');
            arrow.className = 'qna-arrow';
            arrow.innerHTML = \`
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="16" height="16" style="display: block;">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m4 6 4 4 4-4"/>
              </svg>
            \`;
          
            question.appendChild(questionText);
            question.appendChild(arrow);
          
            const answer = document.createElement('div');
            answer.className = 'qna-answer';
            answer.textContent = q.answer;
            answer.style.display = 'none';
          
            question.addEventListener('click', () => {
              const isVisible = answer.style.display === 'block';
              answer.style.display = isVisible ? 'none' : 'block';
              arrow.classList.toggle('open', !isVisible);
            });
          
            item.appendChild(question);
            item.appendChild(answer);
            list.appendChild(item);
            const hr = document.createElement("hr");
            list.appendChild(hr);
          });

          list.removeChild(list.lastElementChild);
          qnaContainer.appendChild(list);


        });
      })
      .catch(err => {
        console.error(err);
        qnaContainer.textContent = "Failed to load Q&A data.";
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      initQnA();
    });
  });
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"}),e.jsx(i,{code:`<style>
  .qna-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  padding: 18px 0;
  line-height: 1em;
}
  
.qna-arrow svg {
  width: 20px; height: 20px
}

.qna-arrow {
  display: block;
  align-content: center;
  transition: transform 0.2s ease;
  height: 20px; width: 20px;
  transform-origin: 50% 50%;
  user-select: none; pointer-events: none;
  color: var(--front-3);
}

.qna-arrow.open {
  transform: rotate(180deg);
}

.qna-answer {
  margin: 5px 0 30px 0;
  padding-left: 10px;
  display: none;
  transition: height 0.5s ease;
}

#qna-container hr{
  margin: 0 10px 0 10px;
  border-width: 0.5px;
  border-color: var(--front-3);
  opacity: 0.3;
}

</style>`,className:"w-html-embed"}),e.jsxs(a,{className:"w-box cck00sw cd3toq c17nm8vt c1xymrvd c8yo8yx ci03eyw cu8ogtt cm1ds2c c1fxgukz c3q79or c1fhonxu cqlg791 cji7xkv c40iywk codsd31 c16er72m c1qt5xo2 c1uz2t7q c4psa79 c1ldi832 icon-background home-top",children:[e.jsxs(a,{className:"w-box c19h37rc ci03eyw c1nj86ny c1mz59p0 c13f4d8e c1122adb cx911xm c4qqqhz c2z8j1e c19dc97m",children:[e.jsx(n,{href:"/",target:"_self",id:"menu-icon",className:"w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 cqyp7hg c1moglug",children:e.jsx(c,{src:"/assets/GE_Logo_-_Big_kpMORCHYDLOpQbfBKYwZ7.svg",width:492,height:684,loading:"eager",alt:"",className:"w-image cy2rpkp c1l3m6tn c1vsv73g c1wjaqd0"})}),e.jsxs(a,{className:"w-box ci03eyw c5zf3td c1bdekej cy2vnym cgykfac c8chaf1 crymv6m ch588tu cd1c1x2 cgjpuuk co3wgvm cjdg5q7",children:[e.jsx(n,{href:"/",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q cycv0tm",children:"Home"}),e.jsxs(n,{href:"/course-bank",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q",children:[e.jsx("span",{className:"w-element cycv0tm",children:"Course "}),"Bank"]}),e.jsx(n,{href:"/calendar",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cevhq7u c1tj415q",children:"Calendar"}),e.jsxs(w,{delayDuration:0,children:[e.jsx(x,{children:e.jsx("div",{className:"w-element c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn c1llv2ju c1tj415q",children:"About"})}),e.jsxs(y,{className:"w-tooltip-content c5mlbae cm1ds2c c1fxgukz cdzo1k7 c1lp7lun c3ryv7d c1t11c95 c1kz25wt c1jbi97f crebcbz c1q4zcxv ci03eyw cu8ogtt c4bgnbx cj82r57 c14a5ioc cm4j335",children:[e.jsx(n,{href:"/about-ge",className:"w-link c4qqqhz c1l00ka2 c8l261o c8qj03j c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q",children:"General Engineering"}),e.jsx(n,{href:"/about-dtu",className:"w-element c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht cz03vb2 cqo7rnh cz5lin5 c1tj415q",children:"DTU"}),e.jsx(n,{href:"/about-geu",className:"w-link c4qqqhz c1l00ka2 c8l261o cp711zw c1ho4waj c1k74xht c1122adb ch9rsc5 c10pf28n c1w0lkxn cz5lin5 c1tj415q",children:"GE Union"})]})]})]}),e.jsxs(v,{open:!1,children:[e.jsx(f,{children:e.jsx(j,{className:"w-button cvuh4zx c1v4vkm5 c1bti4b5 c1jbi97f crebcbz cr2ujrk ciidiay c1kf82bd c7jsqgj ctcp1cq c1r8lktc c1t9gjz2 c7jkqej cn1fibt cnwk8w7 c10ybtws cdxgxee c1wmsojl co1yi26 c1vk95sq c12eb7ae",children:e.jsx(i,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5px" d="M2.667 8h10.666M2.667 4h10.666M2.667 12h10.666"/></svg>',className:"w-html-embed"})})}),e.jsx(b,{className:"w-dialog-overlay c15392bw c12qysi7 c1jkbqq5 ch8lzlo c13hlxg9 c5mlbae c1qqxt5d cvuh4zx cu8ogtt c8nmv6p cwqnf9o c1bm3fk1 c183bdo0",children:e.jsxs(k,{className:"w-dialog-content c5mlbae ci03eyw cu8ogtt c7na04l ctnx82u cg4tsss c1e09nnv cnkevhm cpq2gwm cql21mx ck11ylk c1a71d48 c18s1ywe c1log017 cyuvfar cvy6q1l c1kek3tg c1s3e5c3 c1ort9jz cuvlntl c18vlwwr c17sz26a cng5oj6",children:[e.jsxs(a,{"data-ws-tag":"nav",className:"w-box c39ez8k",children:[e.jsxs(a,{className:"w-box ci03eyw cu8ogtt c15abkx5 cfp2jcf",children:[e.jsx(q,{className:"w-dialog-description cy7nrqp c1ujy25t cdhy4s8 cc02v1c ca2fle4 c1kvebu6",children:"Find any page you want on the site"}),e.jsx("h2",{className:"w-element",children:"Navigation"})]}),e.jsxs(a,{className:"w-box ci03eyw c1rb689p c1hbxsx0 cy2vnym cgykfac cu8ogtt cfx1lak c12zhvo c8chaf1 crymv6m cjdg5q7",children:[e.jsx(n,{href:"/",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Home"}),e.jsx(n,{href:"/course-bank",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Course Bank"}),e.jsx(n,{href:"/calendar",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Calendar"}),e.jsx(n,{href:"/introduction",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"Dashboard"}),e.jsx(n,{href:"/about-ge",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About GE"}),e.jsx(n,{href:"/about-dtu",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About DTU"}),e.jsx(n,{href:"/about-geu",className:"w-link c1sy2opm cr2ujrk c8l261o cy7nrqp c1ho4waj c1122adb c10pf28n c1w0lkxn ch9rsc5 cz5lin5",children:"About GE Union"})]})]}),e.jsx(z,{className:"w-close-button c58kvwj c9jo736 crviqmx c40fhby c1koy2kb cvrpl4x c1uib4vc ci03eyw c1v4vkm5 c1bti4b5 c1qsi9u3 c1s85o6f c7jkqej cy7nrqp cq3zzid cjdtlt6 cxudh90 c14y8ie2",children:e.jsx(i,{code:'<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" height="100%" style="display: block;"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.5 3 3 12.5M3 3l9.5 9.5"/></svg>',className:"w-html-embed"})})]})})]})]}),e.jsxs(a,{className:"w-box c65isya ck11ylk c19haj7v ci03eyw cu8ogtt c1bti4b5 cve325e c14k8w3n cjdez0h c4psa79 chvq5aa chtpppz",children:[e.jsx("h1",{className:"w-element cyoo8jj c1k74xht cnurt1a c1wzvl6u",children:"about GE"}),e.jsx(N,{className:"w-text cqawzgp c1s7gudn c1vkmm90 cyoo8jj c1wwlxnr cje5w08 c1k74xht c1bck0pu cnurt1a c1wzvl6u c7u4ssh",children:"Information about the Studyline and Future Opportunities"})]})]}),e.jsxs("div",{className:"w-element ci03eyw c1rwubzf c1log017 c1nj86ny cpq2gwm c1w0yra6 cj7bt5u c19dg1ud cbbmghh c1k74xht c9au2ch cyuvfar c1wjiq3p c19dst95 c18fbvuf c1x3epop",children:[e.jsx(c,{src:"/assets/S-Advanced-Icon_1_WAQFozAAYDN85UOJBjcGw.svg",alt:"",loading:"eager",width:4167,height:4167,optimize:!1,className:"w-image cqb6n9z c1fo9mp9 c1k3gxy3"}),e.jsx(c,{src:"/assets/S-Cyber-Icon_1_fIL8LjjPw8kUgIjK9k4lA.svg",alt:"",loading:"eager",width:4167,height:4167,optimize:!1,className:"w-image cqb6n9z c1fo9mp9 c1k3gxy3"}),e.jsx(c,{src:"/assets/S-Living-Icon_1_HCmIDHSqU5Ugss3mk1aRq.svg",alt:"",loading:"eager",width:4167,height:4167,optimize:!1,className:"w-image cqb6n9z c1fo9mp9 c1k3gxy3"}),e.jsx(c,{src:"/assets/S-Energy-Icon_1_l_ehl9l9wBIuE34ATzvBV.svg",alt:"",loading:"eager",width:4167,height:4167,optimize:!1,className:"w-image cqb6n9z c1fo9mp9 c1k3gxy3"})]}),e.jsxs("div",{className:"w-element c1w0yra6 cpq2gwm cj7bt5u c4qqqhz c1f0lefa c1dsvsvh c1nixf1k c17i4kqy c1hhefcr c6jvbv7",children:[e.jsx("p",{className:"w-element cyoo8jj c1l00ka2 ca8r8od c1twkhmw c1pkzl4t csju6l8 c1q6vwwy c1iwy39r",children:"The Bachelor of Science in General Engineering at DTU"}),e.jsxs("p",{className:"w-element cd1g2e5 cyoo8jj csju6l8",children:["But we like to call it ",e.jsx("b",{className:"w-element",children:"GE"}),"."]}),e.jsx("p",{className:"w-element",children:"It's a three-year international programme that gives you a strong foundation in mathematics, physics, chemistry, and biotechnology. It teaches you to collaborate across disciplines and apply engineering skills to real-world challenges. Through practical design-build projects, you will develop problem-solving abilities and learn how to work effectively in diverse teams. Studying in an international environment with courses taught in English, you’ll gain the broad competences needed to become an innovative engineer ready to shape the future."})]}),e.jsxs("div",{className:"w-element c1w0yra6 cpq2gwm cj7bt5u c4qqqhz c1f0lefa c1dsvsvh ci03eyw cs5vl0c c1s1dhpt c1nixf1k c17i4kqy c1hhefcr c6jvbv7",children:[e.jsxs("div",{className:"w-element",children:[e.jsx("h2",{className:"w-element",children:"Curriculum"}),e.jsxs("h3",{className:"w-element",children:["Polytechnical Foundations ",e.jsx("span",{className:"w-element c1vn0xiq cr2ujrk c8py5un cycv0tm cf92qlo c1p20m63",children:"The Core Stuff"})]}),e.jsx("p",{className:"w-element",children:"The polytechnical foundation is basically all the main general subjects every GE student will have to take, which include Chemistry, Bioengineering, Physics, Programming, Statistics, and Mathematics. Some are more of a pain than others, but the main point is to bring all students to a general standard across all these base subjects. "})]}),e.jsx(c,{src:"https://student.dtu.dk/-/media/subsites/studieordninger/general-engineering/ge-ects-fordeling.png",optimize:!0,loading:"lazy",className:"w-image c1tpjvk7 cjxjfnc ce30i2p cbg59jt"})]}),e.jsx(c,{src:"https://student.dtu.dk/-/media/subsites/studieordninger/general-engineering/ge-ects-fordeling.png",optimize:!1,loading:"lazy",className:"w-image c1tpjvk7 c4qqqhz cvuh4zx ce30i2p c14e6dcj cri3ouj cr2180h cpgn581 c1sucy14 c1e7x5sb c1eiysop c1pv9cz1"}),e.jsxs("div",{className:"w-element c1w0yra6 cpq2gwm c12zhvo c4qqqhz c1f0lefa c1dsvsvh cwkfinq c17i4kqy c1hhefcr c6jvbv7",children:[e.jsxs("h3",{className:"w-element",children:["Specialisations ",e.jsx("span",{className:"w-element c1vn0xiq cr2ujrk c8py5un cycv0tm cf92qlo c1p20m63",children:"The Branches"})]}),e.jsx("p",{className:"w-element",children:"After completing the core courses in General Engineering, you can choose to specialise in one of four areas. Each specialisation builds on your broad engineering foundation and prepares you for specific industries and career paths:"}),e.jsxs("div",{className:"w-element ci03eyw c1vi0mt cqaj6f4 c16lfnyl c1bti4b5 cc4bk5j",children:[e.jsxs("div",{className:"w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q",children:[e.jsx(c,{src:"/assets/S-Advanced-Icon_1_WAQFozAAYDN85UOJBjcGw.svg",width:4167,height:4167,alt:"",optimize:!1,className:"w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo"}),e.jsxs("h3",{className:"w-element c1r67alc",children:["Advanced Materials ",e.jsx("br",{}),""]}),e.jsx("p",{className:"w-element",children:"Focus on developing new sustainable and functional materials for manufacturing, nanotechnology, acoustics, and physics. This track prepares you to innovate in creating materials that will shape industries and future technologies."})]}),e.jsxs("div",{className:"w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q",children:[e.jsx(c,{src:"/assets/S-Cyber-Icon_1_fIL8LjjPw8kUgIjK9k4lA.svg",width:4167,height:4167,alt:"",optimize:!1,className:"w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo"}),e.jsx("h3",{className:"w-element c1r67alc",children:"Cyber Systems"}),e.jsx("p",{className:"w-element",children:"Dive into computers, artificial intelligence, data analytics, modelling, software and hardware development. This specialisation equips you to work with cutting-edge technologies in computing and digital systems."})]}),e.jsxs("div",{className:"w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q",children:[e.jsx(c,{src:"/assets/S-Living-Icon_1_HCmIDHSqU5Ugss3mk1aRq.svg",width:4167,height:4167,alt:"",optimize:!1,className:"w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo"}),e.jsx("h3",{className:"w-element c1r67alc",children:"Living Systems"}),e.jsx("p",{className:"w-element",children:"Explore engineering related to all living things including aquatic systems, medicine, healthcare, and food production. This specialisation connects biology, chemistry, and technology to create sustainable solutions that improve health and protect the environment."})]}),e.jsxs("div",{className:"w-element cr9ub4b c153lglm ck11ylk c19haj7v c6775s7 ct2w13i c3brmnq cd3toq c17nm8vt c1xymrvd c8yo8yx c1io07hm ci03eyw cu8ogtt cq67jvo c1n9f9m4 cqxegdb cgrcr0q",children:[e.jsx(c,{src:"/assets/S-Energy-Icon_1_l_ehl9l9wBIuE34ATzvBV.svg",width:4167,height:4167,alt:"",optimize:!1,className:"w-image c58kvwj c1oqdnpz c1d1pidh cj8tshh c1iwmpjl co345il c12zhvo"}),e.jsx("h3",{className:"w-element c1r67alc",children:"Future Energy"}),e.jsx("p",{className:"w-element",children:"Work on creating a sustainable world by developing renewable energy technologies such as wind and solar power, electrolysis, applied chemistry, and entrepreneurship. This specialisation focuses on the energy solutions of tomorrow."})]})]})]}),e.jsxs("div",{className:"w-element c1w0yra6 cpq2gwm clrom7z c4qqqhz c1f0lefa c1duohc3 c1nixf1k c17i4kqy c1hhefcr c6jvbv7",children:[e.jsx("h2",{className:"w-element",children:"DTU Course Analyzer"}),e.jsxs("p",{className:"w-element",children:[e.jsx("span",{className:"w-element",children:"If you wish to learn more about different courses and what previous students thought of them, you can check out "}),e.jsx(n,{href:"https://dtucourseanalyzer.pythonanywhere.com/",className:"w-element cz03vb2 c1xb9loe ck11ylk c767uka c1sy2opm",children:"DTU Course Analyzer"}),e.jsx("span",{className:"w-element",children:". It is a student made website that gives a lot of info about courses like pass rate, average grades but most importantly student opinions on lecturers :D (very important)"})]})]}),e.jsx(a,{className:"w-box c9esr7v cm1ds2c c1fxgukz cd3toq c17nm8vt c1xymrvd c8yo8yx csaxvfs ce1jmtw c1m7qrvj c1o7c5y4 c1ndanu0 icon-background",children:e.jsxs("div",{className:"w-element ci03eyw c1nj86ny c4jnp6s c1l3m6tn c1w0yra6 cpq2gwm c1v4vkm5 c16pnwu4 cypyahl cs11lv9 c1njbxf1",children:[e.jsx(n,{href:"/",className:"w-link cmvyqw5 cz7iu34 c40iywk codsd31 c16er72m c1qt5xo2 c1dohq8s c3gx87z cqyp7hg c1moglug",children:e.jsx(c,{src:"/assets/GEU_Icon_1_qa8eLWu5EKj0C18RuAmQB.svg",width:256,height:238,alt:"",className:"w-image c1l3m6tn ct616nu cmvyqw5 cqw0qi cc5htwv"})}),e.jsxs("div",{className:"w-element ci03eyw c1is6v5c co8t7od c1nj86ny c74dsfz c1jwuvkp cezuxvu",children:[e.jsx(n,{href:"https://www.instagram.com/ge.union/",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(c,{src:"/assets/soc-insta_3EK2yfeQrKO1VBcKS5CMG.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),e.jsx(n,{href:"https://www.facebook.com/people/GE-Union/61573069635006/?_rdr",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(c,{src:"/assets/soc-facebook_dRtaC2-32UMM-Zp4wCSDO.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),e.jsx(n,{href:"https://www.linkedin.com/groups/10061020/",target:"_blank",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(c,{src:"/assets/soc-linkedin_JewsOzbBNtsSePfOyCp1_.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})}),e.jsx(n,{href:"https://www.reddit.com/r/DTU/",className:"w-element c1d1pidh cda4yqq c767uka c1l3m6tn cqb6n9z c8ao5vx c1tf1rtc c1erptst",children:e.jsx(c,{src:"/assets/soc-reddit_YIY3q3bmqs_8zl81uxYxk.svg",width:417,height:417,alt:"",loading:"lazy",className:"w-image"})})]})]})}),e.jsx(i,{code:`<style>
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
<\/script>`,executeScriptOnCanvas:!0,className:"w-html-embed"})]}),U=s=>{const{origin:t,pathname:l,search:o}=new URL(s);return`${t}${l}${o}`},B=m.memo(({pageKey:s,system:t})=>e.jsx(L,{system:t},s),(s,t)=>s.pageKey===t.pageKey),O=({data:s})=>{const{system:t,resources:l,url:o,pageMeta:h}=s,g=U(o),u=m.useMemo(()=>({imageLoader:d,assetBaseUrl:r,resources:l,breakpoints:T,onError:console.error}),[l]);return e.jsxs(E.Provider,{value:u,children:[e.jsx(_.Provider,{value:o,children:e.jsx(B,{pageKey:g,system:t})}),e.jsx(S,{url:o,pageMeta:h,siteName:p,imageLoader:d,assetBaseUrl:r}),e.jsx(C,{children:h.title})]})},M=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"})),G=({})=>{const s={"@context":"https://schema.org","@type":"WebSite",name:p};return e.jsxs(e.Fragment,{children:[e.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(s,null,2)}}),e.jsx("link",{rel:"icon",href:d({src:`${r}${P}`})}),I.map(t=>e.jsx("link",{rel:"preload",href:`${r}${t}`,as:"font",crossOrigin:"anonymous"},t)),D.map(t=>e.jsx("link",{rel:"preload",href:`${r}${t}`,as:"image"},t))]})},F=Object.freeze(Object.defineProperty({__proto__:null,Head:G},Symbol.toStringTag,{value:"Module"})),Y={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+onRenderClient.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:A}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/about-ge/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:M}},Head:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/about-ge/+Head.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:F}}};export{Y as configValuesSerialized};
