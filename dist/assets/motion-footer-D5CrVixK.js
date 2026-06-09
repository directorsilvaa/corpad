import{c as d,r as s,j as e,M as k}from"./index-DsqjSuly.js";import{g as o,S as j}from"./ScrollTrigger-CiEuWA-R.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=d("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=d("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=d("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=d("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);function _(...l){return l.filter(Boolean).join(" ")}typeof window<"u"&&o.registerPlugin(j);const T=`
.cinematic-footer-wrapper {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  --footer-cyan: #69e8ff;
  --footer-blue: #3c73ff;
  --footer-white: #f7feff;
  --pill-bg-1: rgba(105, 232, 255, 0.22);
  --pill-bg-2: rgba(255, 255, 255, 0.08);
  --pill-shadow: rgba(105, 232, 255, 0.3);
  --pill-highlight: rgba(255, 255, 255, 0.34);
  --pill-inset-shadow: rgba(0, 0, 0, 0.45);
  --pill-border: rgba(105, 232, 255, 0.58);
  --pill-bg-1-hover: rgba(105, 232, 255, 0.34);
  --pill-bg-2-hover: rgba(60, 115, 255, 0.18);
  --pill-border-hover: rgba(141, 240, 255, 0.95);
  --pill-shadow-hover: rgba(105, 232, 255, 0.5);
  --pill-highlight-hover: rgba(255, 255, 255, 0.56);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255, 82, 119, 0.55)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(255, 82, 119, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(105, 232, 255, 0.16) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(105, 232, 255, 0.11) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(105, 232, 255, 0.36) 0%,
    rgba(60, 115, 255, 0.24) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 24vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(105, 232, 255, 0.4);
  background: linear-gradient(180deg, rgba(105, 232, 255, 0.28) 0%, rgba(60, 115, 255, 0.08) 45%, transparent 72%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, #9af4ff 44%, rgba(255, 255, 255, 0.72) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 30px rgba(105, 232, 255, 0.48));
}
`,i=s.forwardRef(({className:l,children:x,as:m="button",...g},r)=>{const n=s.useRef(null);return s.useEffect(()=>{if(typeof window>"u")return;const t=n.current;if(!t)return;const c=o.context(()=>{const p=h=>{const f=t.getBoundingClientRect(),v=f.width/2,y=f.height/2,u=h.clientX-f.left-v,b=h.clientY-f.top-y;o.to(t,{x:u*.4,y:b*.4,rotationX:-b*.15,rotationY:u*.15,scale:1.05,ease:"power2.out",duration:.4})},a=()=>{o.to(t,{x:0,y:0,rotationX:0,rotationY:0,scale:1,ease:"elastic.out(1, 0.3)",duration:1.2})};return t.addEventListener("mousemove",p),t.addEventListener("mouseleave",a),()=>{t.removeEventListener("mousemove",p),t.removeEventListener("mouseleave",a)}},t);return()=>c.revert()},[]),e.jsx(m,{ref:t=>{n.current=t,typeof r=="function"?r(t):r&&(r.current=t)},className:_("cursor-pointer",l),...g,children:x})});i.displayName="MagneticButton";const w=()=>e.jsxs("div",{className:"flex items-center space-x-12 px-6",children:[e.jsx("span",{children:"Sites profissionais"})," ",e.jsx("span",{className:"text-primary/60",children:"✦"}),e.jsx("span",{children:"Tráfego pago"})," ",e.jsx("span",{className:"text-secondary/60",children:"✦"}),e.jsx("span",{children:"E-commerce"})," ",e.jsx("span",{className:"text-primary/60",children:"✦"}),e.jsx("span",{children:"Automação"})," ",e.jsx("span",{className:"text-secondary/60",children:"✦"}),e.jsx("span",{children:"Hospedagem segura"})," ",e.jsx("span",{className:"text-primary/60",children:"✦"})]}),z=`https://wa.me/5516996094649?text=${encodeURIComponent("Ola, tudo bem? Acessei o site da CORPAD e gostaria de falar com um especialista para entender qual solucao faz mais sentido para minha empresa.")}`,M=[{label:"Soluções",href:"#solucoes"},{label:"Projetos",href:"#projetos"},{label:"Clientes",href:"/clientes"},{label:"Sobre",href:"#sobre"}];function L({heading:l="Pronto para crescer?",solutionLabel:x="Ver soluções",solutionHref:m="#servicos",links:g=M}){const r=s.useRef(null),n=s.useRef(null),t=s.useRef(null),c=s.useRef(null);s.useEffect(()=>{if(typeof window>"u"||!r.current)return;const a=o.context(()=>{o.fromTo(n.current,{y:"10vh",scale:.8,opacity:0},{y:"0vh",scale:1,opacity:1,ease:"power1.out",scrollTrigger:{trigger:r.current,start:"top 80%",end:"bottom bottom",scrub:1}}),o.fromTo([t.current,c.current],{y:50,opacity:0},{y:0,opacity:1,stagger:.15,ease:"power3.out",scrollTrigger:{trigger:r.current,start:"top 40%",end:"bottom bottom",scrub:1}})},r);return()=>a.revert()},[]);const p=()=>{window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs(e.Fragment,{children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:T}}),e.jsx("div",{ref:r,className:"relative h-screen w-screen",style:{clipPath:"polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",marginLeft:"calc(50% - 50vw)"},children:e.jsxs("footer",{className:"cinematic-footer-wrapper fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#07141a] text-white",children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_45%,rgba(105,232,255,0.12),transparent_34rem),linear-gradient(180deg,rgba(12,34,44,0.95),#07141a_58%,#061116)]"}),e.jsx("div",{className:"footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[68vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[70px]"}),e.jsx("div",{className:"footer-bg-grid pointer-events-none absolute inset-0 z-0"}),e.jsx("div",{ref:n,className:"footer-giant-bg-text pointer-events-none absolute -bottom-[5vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap",children:"CORPAD"}),e.jsx("div",{className:"absolute left-0 top-12 z-10 w-full scale-110 -rotate-2 overflow-hidden border-y border-[#69e8ff]/55 bg-[#69e8ff]/14 py-4 shadow-[0_0_70px_rgba(105,232,255,0.22)] backdrop-blur-md",children:e.jsxs("div",{className:"flex w-max animate-footer-scroll-marquee text-xs font-black uppercase tracking-[0.3em] text-white md:text-sm",children:[e.jsx(w,{}),e.jsx(w,{})]})}),e.jsxs("div",{className:"relative z-10 mx-auto mt-20 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6",children:[e.jsx("h2",{ref:t,className:"footer-text-glow mb-12 text-center text-5xl font-black tracking-tighter md:text-8xl",children:l}),e.jsxs("div",{ref:c,className:"flex w-full flex-col items-center gap-6",children:[e.jsxs("div",{className:"flex w-full flex-wrap justify-center gap-4",children:[e.jsxs(i,{as:"a",href:z,target:"_blank",rel:"noreferrer",className:"footer-glass-pill group flex items-center gap-3 rounded-full bg-[#69e8ff]/20 px-10 py-5 text-sm font-black text-white shadow-[0_0_35px_rgba(105,232,255,0.22)] md:text-base",children:[e.jsx(k,{className:"h-6 w-6 text-primary transition-colors group-hover:text-white"}),"Falar pelo WhatsApp"]}),e.jsxs(i,{as:"a",href:m,className:"footer-glass-pill group flex items-center gap-3 rounded-full bg-[#69e8ff]/20 px-10 py-5 text-sm font-black text-white shadow-[0_0_35px_rgba(105,232,255,0.22)] md:text-base",children:[e.jsx(R,{className:"h-6 w-6 text-primary transition-colors group-hover:text-white"}),x]})]}),e.jsx("div",{className:"mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6",children:g.map(a=>e.jsx(i,{as:"a",href:a.href,className:"footer-glass-pill rounded-full px-6 py-3 text-xs font-bold text-white/86 hover:text-white md:text-sm",children:a.label},a.href))})]})]}),e.jsxs("div",{className:"relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12",children:[e.jsx("div",{className:"order-2 text-[10px] font-bold uppercase tracking-widest text-white/78 md:order-1 md:text-xs",children:"© 2026 CORPAD Digital. Todos os direitos reservados."}),e.jsxs("div",{className:"footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full border-[#69e8ff]/60 bg-[#69e8ff]/12 px-6 py-3 md:order-2",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-white/78 md:text-xs",children:"Criado com"}),e.jsx("span",{className:"animate-footer-heartbeat text-sm text-destructive md:text-base",children:"❤"}),e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-widest text-white/78 md:text-xs",children:"pela"}),e.jsx("span",{className:"ml-1 text-xs font-black tracking-normal text-white md:text-sm",children:"CORPAD"})]}),e.jsx(i,{as:"button",onClick:p,className:"footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-primary hover:text-white","aria-label":"Voltar ao topo",children:e.jsx(N,{className:"h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5"})})]})]})})]})}export{L as C,A as R,E as T};
