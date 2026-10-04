import{j as t,c as f}from"./client-gxHn_UGl.js";import{M as p,g as b,c as y,d as w,e as m,A as v,f as k}from"./storage-DJq_2oDv.js";function N({reason:r}){return t.jsxs("div",{className:"grh-error","data-testid":"panel-error",children:[t.jsx("b",{children:"Couldn't process this"}),r||"Something went wrong. Please try again."]})}function j({text:r}){const e=r.split(`
`).map(a=>a.replace(/^\s*[-•]\s?/,"").trim()).filter(Boolean);return t.jsx("div",{className:"grh-explain","data-testid":"grammar-explanation",children:t.jsx("ul",{children:e.map((a,s)=>t.jsx("li",{children:a},s))})})}function T({card:r,onPin:e,onClose:a}){return t.jsxs("div",{className:"grh-card","data-testid":`card-${r.action}`,children:[t.jsxs("div",{className:"grh-card-head",children:[t.jsx("span",{className:`grh-pill ${r.action==="grammar"?"grh-grammar":""}`,children:r.action==="translate"?"Translate":"Grammar"}),t.jsx("span",{className:"grh-spacer"}),t.jsx("button",{className:"grh-iconbtn",title:r.pinned?"Unpin":"Pin this result","data-testid":"card-pin-button",onClick:()=>e(r.id),children:r.pinned?"📌":"📍"}),t.jsx("button",{className:"grh-iconbtn",title:"Dismiss","data-testid":"card-close-button",onClick:()=>a(r.id),children:"✕"})]}),t.jsxs("div",{className:"grh-card-body",children:[t.jsx("div",{className:"grh-source",title:r.sourceText,children:r.sourceText}),r.status==="loading"&&t.jsxs("div",{className:"grh-loading","data-testid":"panel-loading",children:[t.jsx("span",{className:"grh-spinner"}),r.action==="translate"?"Translating…":"Analysing grammar…"]}),r.status==="error"&&t.jsx(N,{reason:r.reason}),r.status==="result"&&r.action==="translate"&&t.jsx("div",{"data-testid":"translation-result",children:r.languages.map(s=>t.jsxs("div",{className:"grh-lang-row",children:[t.jsx("div",{className:"grh-lang-label",children:s}),t.jsx("div",{className:"grh-lang-text",children:r.translations?.[s]??"—"})]},s))}),r.status==="result"&&r.action==="grammar"&&t.jsx(j,{text:r.explanation??""})]})]})}function P(r){const{theme:e,collapsed:a,mode:s,width:o,cards:i,history:n,historyOpen:d}=r,h=s==="compact";if(a)return t.jsx("div",{className:"grh-root grh-collapsed","data-theme":e,"data-testid":"grh-panel",children:t.jsxs("button",{className:"grh-reopen",title:"Expand German Reading Helper","data-testid":"panel-collapse-button",onClick:r.onToggleCollapse,children:[t.jsx("span",{className:"grh-dot",children:"ä"}),t.jsx("span",{className:"grh-reopen-label",children:"German Reading Helper"}),t.jsx("span",{className:"grh-reopen-chevron",children:"‹"})]})});const c={width:h?300:o,minWidth:h?260:320,maxWidth:h?320:760};return t.jsxs("div",{className:`grh-root${h?" grh-compact":""}`,"data-theme":e,"data-testid":"grh-panel",style:c,children:[!h&&t.jsx("div",{className:"grh-resize","data-testid":"panel-resize-handle",title:"Drag to resize",onPointerDown:r.onResizeStart}),t.jsxs("div",{className:"grh-header",children:[t.jsxs("div",{className:"grh-brand",children:[t.jsx("span",{className:"grh-dot",children:"ä"}),t.jsx("span",{className:"grh-brand-name",children:"German Reading Helper"})]}),t.jsx("span",{className:"grh-spacer"}),t.jsx("button",{className:"grh-iconbtn",title:h?"Switch to expanded mode":"Switch to compact mode","data-testid":"panel-mode-button",onClick:r.onToggleMode,children:h?"⤢":"⤡"}),t.jsx("button",{className:"grh-iconbtn",title:"Settings","data-testid":"panel-settings-button",onClick:r.onOpenSettings,children:"⚙"}),t.jsx("button",{className:"grh-iconbtn",title:"Collapse to side","data-testid":"panel-collapse-button",onClick:r.onToggleCollapse,children:"›"}),t.jsx("button",{className:"grh-iconbtn",title:"Close","data-testid":"panel-close-button",onClick:r.onClose,children:"✕"})]}),t.jsx("div",{className:"grh-body","data-testid":"panel-body",children:i.length===0?t.jsxs("div",{className:"grh-empty","data-testid":"panel-empty",children:[t.jsx("span",{className:"grh-emoji",children:"📖"}),"Select German text on the page, then right-click and choose",t.jsx("b",{children:" Translate"})," or ",t.jsx("b",{children:" Explain Grammar"}),"."]}):i.map(l=>t.jsx(T,{card:l,onPin:r.onPinCard,onClose:r.onCloseCard},l.id))}),t.jsxs("div",{className:"grh-history","data-testid":"panel-history",children:[t.jsxs("div",{className:"grh-hist-head",onClick:r.onToggleHistory,"data-testid":"history-toggle",children:[t.jsx("span",{children:d?"▾":"▸"}),t.jsxs("span",{children:["Recent (",n.length,")"]}),t.jsx("span",{className:"grh-spacer"}),n.length>0&&t.jsx("button",{className:"grh-linkbtn","data-testid":"history-clear-button",onClick:l=>{l.stopPropagation(),r.onClearHistory()},children:"Clear"})]}),d&&t.jsxs("div",{className:"grh-hist-list",children:[n.length===0&&t.jsx("div",{className:"grh-empty",style:{padding:"14px"},children:"No lookups yet."}),n.map(l=>t.jsxs("button",{className:"grh-hist-item","data-testid":"history-item",onClick:()=>r.onOpenHistory(l),children:[t.jsxs("div",{className:"grh-hist-meta",children:[l.action==="translate"?"Translate":"Grammar"," ·"," ",new Date(l.ts).toLocaleDateString()]}),t.jsx("div",{className:"grh-hist-text",children:l.sourceText})]},l.id))]})]})]})}const z=`
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
  overflow: hidden;
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
  flex: 0 0 auto;
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
  min-width: 0;
  overflow: hidden;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.2px;
}
.grh-brand-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
/* Children must keep their natural height so the body can overflow and scroll. */
.grh-body > * { flex: 0 0 auto; }

/* Always-visible custom scrollbars (macOS overlay scrollbars hide otherwise). */
.grh-body::-webkit-scrollbar,
.grh-hist-list::-webkit-scrollbar,
.grh-source::-webkit-scrollbar { width: 10px; height: 10px; }
.grh-body::-webkit-scrollbar-track,
.grh-hist-list::-webkit-scrollbar-track,
.grh-source::-webkit-scrollbar-track { background: var(--grh-surface-2); border-radius: 8px; }
.grh-body::-webkit-scrollbar-thumb,
.grh-hist-list::-webkit-scrollbar-thumb,
.grh-source::-webkit-scrollbar-thumb {
  background: var(--grh-muted); border-radius: 8px;
  border: 2px solid var(--grh-surface-2); background-clip: padding-box;
}
.grh-body::-webkit-scrollbar-thumb:hover,
.grh-hist-list::-webkit-scrollbar-thumb:hover,
.grh-source::-webkit-scrollbar-thumb:hover { background: var(--grh-accent); background-clip: padding-box; }
.grh-source::-webkit-scrollbar { width: 6px; }

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

.grh-history { flex: 0 0 auto; border-top: 1px solid var(--grh-border); }
.grh-hist-head {
  display: flex; align-items: center; gap: 8px; padding: 11px 14px;
  font-family: sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.4px;
  text-transform: uppercase; color: var(--grh-muted); cursor: pointer; user-select: none;
}
.grh-hist-list { padding: 0 10px 12px; display: flex; flex-direction: column; gap: 6px; max-height: 30vh; overflow-y: auto; overscroll-behavior: contain; }
.grh-hist-list > * { flex: 0 0 auto; }
.grh-body { overscroll-behavior: contain; }
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
`,S=new Set(["der","die","das","und","ist","nicht","ich","du","er","sie","es","ein","eine","einen","einem","einer","mit","von","zu","zum","zur","auf","für","dass","werden","wird","wurde","haben","hat","hatte","sein","sind","war","waren","aber","oder","auch","noch","schon","wenn","weil","als","wie","was","wer","wo","wann","durch","über","unter","vor","nach","bei","im","am","beim","ins","vom","man","mich","dich","sich","uns","euch","ihn","ihm","ihr","ihre","kein","keine","nur","sehr","mehr","immer","wieder","hier","dort","jetzt","dann","ja","nein","doch","ganz","gut"]),x=new Set(["the","and","is","are","you","this","that","with","for","have","not","was","were","they","his","her","from","what","which","would","there","their","about","will","your"]);function C(r){const e=r.toLowerCase(),a=/[äöüß]/.test(e),s=e.split(/[^a-zäöüß]+/).filter(Boolean);if(s.length===0)return{isGerman:!1,score:0};let o=0,i=0;for(const l of s)S.has(l)&&o++,x.has(l)&&i++;const n=o/s.length,d=i/s.length,h=n*3+(a?.5:0);return s.length<=3?{isGerman:!(s.length===1&&x.has(s[0])),score:h}:{isGerman:(a||n>=.06)&&n+.1>=d,score:h}}const E=new Set(["P","DIV","LI","ARTICLE","SECTION","BLOCKQUOTE","TD","TH","FIGCAPTION","H1","H2","H3","H4","H5","H6","SPAN","A","STRONG","EM"]),O=new Set(["CANVAS","IMG","SVG","VIDEO","AUDIO","IFRAME","EMBED","OBJECT"]);function A(){return(window.getSelection?.()?.toString()??"").trim()}function G(r){if(!r)return{text:null,reason:"No text was found near your click. Please select German text and try again."};if(O.has(r.tagName))return{text:null,reason:"This looks like an image, canvas, or embedded content. Text here cannot be read automatically — please select visible German text manually."};if(document.contentType==="application/pdf"||document.querySelector('embed[type="application/pdf"]'))return{text:null,reason:"PDF viewers do not expose selectable text to extensions here. Please select the text manually if possible."};let e=r,a=r;for(;e&&e!==document.body;){if(E.has(e.tagName)){a=e;const i=e.innerText?.trim();if(i&&i.split(/\s+/).length>=2)break}e=e.parentElement}const o=(a?.innerText??"").replace(/\s+/g," ").trim();return o?{text:o}:{text:null,reason:"No readable text was found near your click. Please select German text manually."}}function R(r){const e=r.replace(/\s+/g," ").trim();if(!e)return{ok:!1,text:e,reason:"No text found. Please select German text manually and try again."};const a=e.split(/\s+/).filter(Boolean);if(a.length>p)return{ok:!1,text:e,reason:`That selection is too long (${a.length} words). Please select a shorter German passage — under ${p} words.`};const s=(e.match(/[a-zA-ZäöüÄÖÜß]/g)??[]).length,o=s/e.length;return s<2||o<.4?{ok:!1,text:e,reason:"This does not look like readable text (too many symbols or numbers). Please select clean German text."}:C(e).isGerman?{ok:!0,text:e}:{ok:!1,text:e,reason:"This does not look like German. This tool only supports German source text."}}let u=null;document.addEventListener("contextmenu",r=>{u=r.target},!0);const g={NO_API_KEY:"No OpenAI API key set. Open Settings (gear icon) and paste your key to start.",INVALID_API_KEY:"Your OpenAI API key was rejected. Please check it in Settings.",RATE_LIMIT:"OpenAI is rate-limiting or out of quota right now. Please wait a moment and try again.",TIMEOUT:"The request timed out. Please check your connection and try again.",NETWORK:"Network error reaching OpenAI. Please try again.",BAD_RESPONSE:"The AI returned an unexpected response. Please try again.",NOT_GERMAN:"The AI could not read this as German. This tool only supports German source text.",NO_LANG:"No target languages are enabled. Open Settings and enable at least one language."};class I{host=null;root=null;settings=null;state={open:!1,collapsed:!1,mode:"expanded",theme:"light",widthPct:25,widthPx:380,cards:[],history:[],historyOpen:!0,resizing:!1};async ensureMounted(){if(this.settings=await b(),this.state.theme=this.settings.darkMode?"dark":"light",this.state.widthPct=this.settings.panelWidthPct,this.state.widthPx=this.clampWidth(Math.round(window.innerWidth*this.settings.panelWidthPct/100)),this.state.mode=this.settings.panelMode,this.state.history=await y(),this.host)return;const e=document.createElement("div");e.id="grh-panel-host",e.style.all="initial";const a=e.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=z,a.appendChild(s);const o=document.createElement("div");a.appendChild(o),document.documentElement.appendChild(e),this.host=e,this.root=f(o)}clampWidth(e){const a=Math.min(760,Math.round(window.innerWidth*.8));return Math.max(320,Math.min(a,e))}startResize=e=>{e.preventDefault(),this.state.resizing=!0,this.host&&this.host.shadowRoot?.querySelector(".grh-root")?.classList.add("grh-resizing");const a=document.body.style.userSelect;document.body.style.userSelect="none",document.body.style.cursor="ew-resize";const s=i=>{this.state.widthPx=this.clampWidth(window.innerWidth-i.clientX),this.render()},o=()=>{this.state.resizing=!1,document.removeEventListener("pointermove",s),document.removeEventListener("pointerup",o),document.body.style.userSelect=a,document.body.style.cursor="",this.host&&this.host.shadowRoot?.querySelector(".grh-root")?.classList.remove("grh-resizing"),this.settings&&(this.settings.panelWidthPct=Math.round(this.state.widthPx/window.innerWidth*100),this.state.widthPct=this.settings.panelWidthPct,m(this.settings)),this.render()};document.addEventListener("pointermove",s),document.addEventListener("pointerup",o)};applyPushContent(){if(!this.settings?.pushContent)return;document.documentElement.style.transition="margin-right 0.28s ease";const e=this.state.collapsed?"46px":this.state.mode==="compact"?"300px":`${this.state.widthPx}px`;document.documentElement.style.marginRight=this.state.open?e:""}render(){if(this.root){if(!this.state.open){this.root.render(t.jsx(t.Fragment,{})),this.host&&(this.host.style.display="none"),document.documentElement.style.marginRight="";return}this.host&&(this.host.style.display=""),this.applyPushContent(),this.root.render(t.jsx(P,{theme:this.state.theme,collapsed:this.state.collapsed,mode:this.state.mode,width:this.state.widthPx,cards:this.state.cards,history:this.state.history,historyOpen:this.state.historyOpen,onClose:()=>{this.state.open=!1,this.render()},onToggleCollapse:()=>{this.state.collapsed=!this.state.collapsed,this.render()},onResizeStart:this.startResize,onToggleMode:()=>{this.state.mode=this.state.mode==="compact"?"expanded":"compact",this.settings&&(this.settings.panelMode=this.state.mode,m(this.settings)),this.render()},onToggleHistory:()=>{this.state.historyOpen=!this.state.historyOpen,this.render()},onPinCard:e=>{const a=this.state.cards.find(s=>s.id===e);a&&(a.pinned=!a.pinned),this.render()},onCloseCard:e=>{this.state.cards=this.state.cards.filter(a=>a.id!==e),this.render()},onOpenHistory:e=>this.openFromHistory(e),onClearHistory:async()=>{await w(),this.state.history=[],this.render()},onOpenSettings:()=>chrome.runtime.sendMessage({type:"OPEN_OPTIONS"})}))}}enabledLanguages(){const e=this.settings?.enabledLanguages;return v.filter(a=>e?.[a])}openFromHistory(e){const a={id:`card_${Date.now()}`,action:e.action,sourceText:e.sourceText,languages:e.languages,status:"result",translations:e.translations,explanation:e.explanation,pinned:!1,ts:e.ts};this.addCard(a),this.render()}addCard(e){this.state.cards=this.state.cards.filter(a=>a.pinned),this.state.cards.unshift(e)}async run(e,a){await this.ensureMounted(),this.state.open=!0,this.state.collapsed=!1;let s=a||A(),o;if(!s){const l=G(u);l.text?s=l.text:o=l.reason}const i=this.enabledLanguages(),n={id:`card_${Date.now()}`,action:e,sourceText:s||"(no text found)",languages:i,status:"loading",pinned:!1,ts:Date.now()};if(this.addCard(n),this.render(),!s){n.status="error",n.reason=o||g.NO_API_KEY,this.render();return}const d=R(s);if(n.sourceText=d.text,!d.ok){n.status="error",n.reason=d.reason,this.render();return}if(e==="translate"&&i.length===0){n.status="error",n.reason=g.NO_LANG,this.render();return}const h=await chrome.runtime.sendMessage({type:"OPENAI_REQUEST",action:e,text:d.text,languages:i});if(!h?.ok){n.status="error",n.reason=g[h?.error??"NETWORK"]||"Something went wrong. Please try again.",this.render();return}n.status="result",n.translations=h.translations,n.explanation=h.explanation,this.render();const c={id:n.id,ts:n.ts,action:e,sourceText:d.text,languages:i,translations:h.translations,explanation:h.explanation};this.state.history=await k(c),this.render()}}const L=new I;chrome.runtime.onMessage.addListener(r=>{r?.type==="RUN_ACTION"&&L.run(r.action,r.selectionText)});
