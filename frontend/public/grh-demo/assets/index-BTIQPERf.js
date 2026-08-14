import{c as k}from"./client-BvDw4T0q.js";import{j as e,r as c}from"./jsx-runtime-BVBiHVO-.js";function N({reason:r}){return e.jsxs("div",{className:"grh-error","data-testid":"panel-error",children:[e.jsx("b",{children:"Couldn't process this"}),r||"Something went wrong. Please try again."]})}function z({text:r}){const i=r.split(`
`).map(a=>a.replace(/^\s*[-•]\s?/,"").trim()).filter(Boolean);return e.jsx("div",{className:"grh-explain","data-testid":"grammar-explanation",children:e.jsx("ul",{children:i.map((a,n)=>e.jsx("li",{children:a},n))})})}function C({card:r,onPin:i,onClose:a}){return e.jsxs("div",{className:"grh-card","data-testid":`card-${r.action}`,children:[e.jsxs("div",{className:"grh-card-head",children:[e.jsx("span",{className:`grh-pill ${r.action==="grammar"?"grh-grammar":""}`,children:r.action==="translate"?"Translate":"Grammar"}),e.jsx("span",{className:"grh-spacer"}),e.jsx("button",{className:"grh-iconbtn",title:r.pinned?"Unpin":"Pin this result","data-testid":"card-pin-button",onClick:()=>i(r.id),children:r.pinned?"📌":"📍"}),e.jsx("button",{className:"grh-iconbtn",title:"Dismiss","data-testid":"card-close-button",onClick:()=>a(r.id),children:"✕"})]}),e.jsxs("div",{className:"grh-card-body",children:[e.jsx("div",{className:"grh-source",title:r.sourceText,children:r.sourceText}),r.status==="loading"&&e.jsxs("div",{className:"grh-loading","data-testid":"panel-loading",children:[e.jsx("span",{className:"grh-spinner"}),r.action==="translate"?"Translating…":"Analysing grammar…"]}),r.status==="error"&&e.jsx(N,{reason:r.reason}),r.status==="result"&&r.action==="translate"&&e.jsx("div",{"data-testid":"translation-result",children:r.languages.map(n=>e.jsxs("div",{className:"grh-lang-row",children:[e.jsx("div",{className:"grh-lang-label",children:n}),e.jsx("div",{className:"grh-lang-text",children:r.translations?.[n]??"—"})]},n))}),r.status==="result"&&r.action==="grammar"&&e.jsx(z,{text:r.explanation??""})]})]})}function T(r){const{theme:i,collapsed:a,mode:n,width:h,cards:d,history:s,historyOpen:g}=r,o=n==="compact";if(a)return e.jsx("div",{className:"grh-root grh-collapsed","data-theme":i,"data-testid":"grh-panel",children:e.jsxs("button",{className:"grh-reopen",title:"Expand German Reading Helper","data-testid":"panel-collapse-button",onClick:r.onToggleCollapse,children:[e.jsx("span",{className:"grh-dot",children:"ä"}),e.jsx("span",{className:"grh-reopen-label",children:"German Reading Helper"}),e.jsx("span",{className:"grh-reopen-chevron",children:"‹"})]})});const p={width:o?300:h,minWidth:o?260:320,maxWidth:o?320:760};return e.jsxs("div",{className:`grh-root${o?" grh-compact":""}`,"data-theme":i,"data-testid":"grh-panel",style:p,children:[!o&&e.jsx("div",{className:"grh-resize","data-testid":"panel-resize-handle",title:"Drag to resize",onPointerDown:r.onResizeStart}),e.jsxs("div",{className:"grh-header",children:[e.jsxs("div",{className:"grh-brand",children:[e.jsx("span",{className:"grh-dot",children:"ä"}),e.jsx("span",{className:"grh-brand-name",children:"German Reading Helper"})]}),e.jsx("span",{className:"grh-spacer"}),e.jsx("button",{className:"grh-iconbtn",title:o?"Switch to expanded mode":"Switch to compact mode","data-testid":"panel-mode-button",onClick:r.onToggleMode,children:o?"⤢":"⤡"}),e.jsx("button",{className:"grh-iconbtn",title:"Settings","data-testid":"panel-settings-button",onClick:r.onOpenSettings,children:"⚙"}),e.jsx("button",{className:"grh-iconbtn",title:"Collapse to side","data-testid":"panel-collapse-button",onClick:r.onToggleCollapse,children:"›"}),e.jsx("button",{className:"grh-iconbtn",title:"Close","data-testid":"panel-close-button",onClick:r.onClose,children:"✕"})]}),e.jsx("div",{className:"grh-body",children:d.length===0?e.jsxs("div",{className:"grh-empty","data-testid":"panel-empty",children:[e.jsx("span",{className:"grh-emoji",children:"📖"}),"Select German text on the page, then right-click and choose",e.jsx("b",{children:" Translate"})," or ",e.jsx("b",{children:" Explain Grammar"}),"."]}):d.map(t=>e.jsx(C,{card:t,onPin:r.onPinCard,onClose:r.onCloseCard},t.id))}),e.jsxs("div",{className:"grh-history","data-testid":"panel-history",children:[e.jsxs("div",{className:"grh-hist-head",onClick:r.onToggleHistory,"data-testid":"history-toggle",children:[e.jsx("span",{children:g?"▾":"▸"}),e.jsxs("span",{children:["Recent (",s.length,")"]}),e.jsx("span",{className:"grh-spacer"}),s.length>0&&e.jsx("button",{className:"grh-linkbtn","data-testid":"history-clear-button",onClick:t=>{t.stopPropagation(),r.onClearHistory()},children:"Clear"})]}),g&&e.jsxs("div",{className:"grh-hist-list",children:[s.length===0&&e.jsx("div",{className:"grh-empty",style:{padding:"14px"},children:"No lookups yet."}),s.map(t=>e.jsxs("button",{className:"grh-hist-item","data-testid":"history-item",onClick:()=>r.onOpenHistory(t),children:[e.jsxs("div",{className:"grh-hist-meta",children:[t.action==="translate"?"Translate":"Grammar"," ·"," ",new Date(t.ts).toLocaleDateString()]}),e.jsx("div",{className:"grh-hist-text",children:t.sourceText})]},t.id))]})]})]})}const E=`
:host, * { box-sizing: border-box; }

.grh-root {
  --grh-bg: #ffffff;
  --grh-surface: #f6f7fb;
  --grh-surface-2: #eef0f7;
  --grh-border: #e2e5ef;
  --grh-text: #16181d;
  --grh-muted: #6b7280;
  --grh-accent: #3b4cca;
  --grh-accent-2: #0e9f9a;
  --grh-danger: #d64545;
  --grh-shadow: 0 8px 40px rgba(20, 24, 45, 0.18);

  font-family: 'Georgia', 'Iowan Old Style', 'Palatino Linotype', serif;
  color: var(--grh-text);
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 2147483000;
  display: flex;
  flex-direction: column;
  background: var(--grh-bg);
  border-left: 1px solid var(--grh-border);
  box-shadow: var(--grh-shadow);
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.2s ease;
  transform: translateX(0);
}

.grh-root[data-theme='dark'] {
  --grh-bg: #14161c;
  --grh-surface: #1b1e26;
  --grh-surface-2: #232734;
  --grh-border: #2c3140;
  --grh-text: #e8eaf2;
  --grh-muted: #9aa2b5;
  --grh-accent: #7c8cff;
  --grh-accent-2: #38d3cb;
  --grh-shadow: 0 8px 40px rgba(0, 0, 0, 0.55);
}

.grh-root.grh-collapsed {
  width: 46px !important;
  min-width: 46px !important;
  max-width: 46px !important;
  overflow: hidden;
  background: linear-gradient(160deg, var(--grh-accent), var(--grh-accent-2));
  border-left: none;
}
.grh-root.grh-resizing { transition: none; user-select: none; }

.grh-resize {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 7px;
  cursor: ew-resize;
  z-index: 5;
  background: transparent;
  transition: background-color 0.15s ease;
}
.grh-resize:hover, .grh-resize:active { background: var(--grh-accent); opacity: 0.55; }

.grh-reopen {
  all: unset;
  box-sizing: border-box;
  width: 46px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-top: 16px;
  cursor: pointer;
  color: #fff;
}
.grh-reopen .grh-dot {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.5);
}
.grh-reopen-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: sans-serif;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.6px;
  opacity: 0.95;
}
.grh-reopen-chevron { font-family: sans-serif; font-size: 20px; font-weight: 800; margin-top: auto; padding-bottom: 16px; }

.grh-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--grh-border);
  background: var(--grh-surface);
}
.grh-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.2px;
}
.grh-dot {
  width: 22px; height: 22px; border-radius: 7px; flex: 0 0 auto;
  background: linear-gradient(135deg, var(--grh-accent), var(--grh-accent-2));
  color: #fff; font-family: sans-serif; font-weight: 800;
  display: flex; align-items: center; justify-content: center; font-size: 13px;
}
.grh-spacer { flex: 1; }

.grh-iconbtn {
  border: 1px solid var(--grh-border);
  background: var(--grh-bg);
  color: var(--grh-text);
  width: 30px; height: 30px; border-radius: 8px;
  cursor: pointer; font-size: 15px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
  font-family: sans-serif;
}
.grh-iconbtn:hover { background: var(--grh-surface-2); border-color: var(--grh-accent); }
.grh-iconbtn:active { transform: scale(0.94); }

.grh-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.grh-card {
  border: 1px solid var(--grh-border);
  border-radius: 12px;
  background: var(--grh-surface);
  overflow: hidden;
  animation: grh-in 0.25s ease;
}
@keyframes grh-in { from { opacity: 0; transform: translateY(6px);} to { opacity: 1; transform: none; } }

.grh-card-head {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 11px; border-bottom: 1px solid var(--grh-border);
  background: var(--grh-surface-2);
}
.grh-pill {
  font-family: sans-serif; font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px;
  text-transform: uppercase; padding: 3px 8px; border-radius: 999px;
  color: #fff; background: var(--grh-accent);
}
.grh-pill.grh-grammar { background: var(--grh-accent-2); }
.grh-card-body { padding: 11px 13px; }

.grh-source {
  font-size: 13px; color: var(--grh-muted); font-style: italic;
  border-left: 3px solid var(--grh-accent); padding-left: 9px; margin-bottom: 10px;
  max-height: 76px; overflow: auto;
}

.grh-lang-row { margin-bottom: 11px; }
.grh-lang-row:last-child { margin-bottom: 0; }
.grh-lang-label {
  font-family: sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
  text-transform: uppercase; color: var(--grh-accent); margin-bottom: 3px;
}
.grh-lang-text { font-size: 15px; line-height: 1.5; }

.grh-explain { font-size: 14px; line-height: 1.6; }
.grh-explain ul { margin: 0; padding-left: 18px; }
.grh-explain li { margin-bottom: 5px; }

.grh-loading { display: flex; align-items: center; gap: 10px; color: var(--grh-muted); font-size: 14px; padding: 6px 2px; }
.grh-spinner {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2.5px solid var(--grh-surface-2); border-top-color: var(--grh-accent);
  animation: grh-spin 0.8s linear infinite; flex: 0 0 auto;
}
@keyframes grh-spin { to { transform: rotate(360deg); } }

.grh-error {
  font-size: 14px; line-height: 1.55; color: var(--grh-text);
  background: rgba(214, 69, 69, 0.08); border: 1px solid rgba(214, 69, 69, 0.35);
  border-radius: 10px; padding: 11px 13px;
}
.grh-error b { color: var(--grh-danger); font-family: sans-serif; display: block; margin-bottom: 3px; font-size: 12.5px; letter-spacing: 0.3px; }

.grh-empty { color: var(--grh-muted); font-size: 14px; text-align: center; padding: 40px 16px; line-height: 1.6; }
.grh-empty .grh-emoji { font-size: 30px; display:block; margin-bottom: 10px; }

.grh-history { border-top: 1px solid var(--grh-border); }
.grh-hist-head {
  display: flex; align-items: center; gap: 8px; padding: 11px 14px;
  font-family: sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.4px;
  text-transform: uppercase; color: var(--grh-muted); cursor: pointer; user-select: none;
}
.grh-hist-list { padding: 0 10px 12px; display: flex; flex-direction: column; gap: 6px; }
.grh-hist-item {
  text-align: left; border: 1px solid var(--grh-border); background: var(--grh-surface);
  border-radius: 9px; padding: 8px 10px; cursor: pointer; font-family: inherit;
  color: var(--grh-text); transition: border-color 0.15s ease, background 0.15s ease;
}
.grh-hist-item:hover { border-color: var(--grh-accent); background: var(--grh-surface-2); }
.grh-hist-meta { font-family: sans-serif; font-size: 10px; letter-spacing: 0.3px; text-transform: uppercase; color: var(--grh-muted); margin-bottom: 2px; }
.grh-hist-text { font-size: 13px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.grh-linkbtn {
  font-family: sans-serif; background: none; border: none; color: var(--grh-accent);
  cursor: pointer; font-size: 11.5px; font-weight: 600; padding: 2px 4px;
}
.grh-linkbtn:hover { text-decoration: underline; }

.grh-tab { transform: rotate(180deg); writing-mode: vertical-rl; }

/* Compact mode: denser layout, hide source quote + brand name, smaller type. */
.grh-root.grh-compact .grh-header { padding: 9px 10px; }
.grh-root.grh-compact .grh-brand-name { display: none; }
.grh-root.grh-compact .grh-body { padding: 10px; gap: 9px; }
.grh-root.grh-compact .grh-card-head { padding: 7px 9px; }
.grh-root.grh-compact .grh-card-body { padding: 9px 10px; }
.grh-root.grh-compact .grh-source { display: none; }
.grh-root.grh-compact .grh-lang-row { margin-bottom: 8px; }
.grh-root.grh-compact .grh-lang-text { font-size: 13.5px; line-height: 1.4; }
.grh-root.grh-compact .grh-lang-label { font-size: 10px; }
.grh-root.grh-compact .grh-explain { font-size: 12.8px; line-height: 1.5; }
.grh-root.grh-compact .grh-explain ul { padding-left: 15px; }
.grh-root.grh-compact .grh-hist-head { padding: 9px 11px; font-size: 11px; }
.grh-root.grh-compact .grh-hist-text { font-size: 12px; }
`,S=new URLSearchParams(location.search),x=S.get("v")||"",D=x==="dark"?"dark":"light",H=x==="compact"?"compact":"expanded",P=x==="grammar",b=document.createElement("div"),v=b.attachShadow({mode:"open"}),y=document.createElement("style");y.textContent=E;v.appendChild(y);const j=document.createElement("div");v.appendChild(j);document.body.appendChild(b);const R={id:"c1",action:"translate",sourceText:"Der Rhein ist einer der längsten Flüsse Europas.",languages:["English","Ukrainian","Turkish","Chinese"],status:"result",pinned:!0,ts:Date.now(),translations:{English:"The Rhine is one of the longest rivers in Europe.",Ukrainian:"Рейн — одна з найдовших річок Європи.",Turkish:"Ren, Avrupa’nın en uzun nehirlerinden biridir.",Chinese:"萊茵河是歐洲最長的河流之一。"}},u={id:"c2",action:"grammar",sourceText:"kontrollierten zahlreiche Fürsten den Handel",languages:[],status:"result",pinned:!1,ts:Date.now(),explanation:`- "kontrollierten" = verb, 3rd person plural, simple past (Präteritum)
- Infinitive: kontrollieren (to control); weak verb, stem + -ten
- Active voice, indicative mood
- "zahlreiche Fürsten" = subject (nominative, plural)
- "den Handel" = direct object (accusative, masculine singular)`},L=P?[u]:[R,u],M=[{id:"h1",ts:Date.now()-864e5,action:"translate",sourceText:"Viele Städte wurden an seinen Ufern gegründet.",languages:["English"]},{id:"h2",ts:Date.now()-2*864e5,action:"grammar",sourceText:"erhoben",languages:[]}],l=()=>{};function O(){const[r,i]=c.useState(H),[a,n]=c.useState(!0),[h,d]=c.useState(!1),[s,g]=c.useState(Math.round(window.innerWidth*.26)),o=t=>Math.max(320,Math.min(Math.min(760,window.innerWidth*.8),t)),p=t=>{t.preventDefault();const m=w=>g(o(window.innerWidth-w.clientX)),f=()=>{document.removeEventListener("pointermove",m),document.removeEventListener("pointerup",f)};document.addEventListener("pointermove",m),document.addEventListener("pointerup",f)};return e.jsx(T,{theme:D,collapsed:h,mode:r,width:s,cards:L,history:M,historyOpen:a,onClose:l,onToggleCollapse:()=>d(t=>!t),onToggleMode:()=>i(t=>t==="compact"?"expanded":"compact"),onResizeStart:p,onToggleHistory:()=>n(t=>!t),onPinCard:l,onCloseCard:l,onOpenHistory:l,onClearHistory:l,onOpenSettings:l})}k(j).render(e.jsx(O,{}));
