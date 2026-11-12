import{c as E}from"./client-BwxAIwQ6.js";import{j as e,R as F,r as x}from"./jsx-runtime-CFCE4xZu.js";function D({reason:r}){return e.jsxs("div",{className:"grh-error","data-testid":"panel-error",children:[e.jsx("b",{children:"Couldn't process this"}),r||"Something went wrong. Please try again."]})}function P({card:r}){return e.jsx("div",{"data-testid":"translation-result",children:r.languages.map(a=>e.jsxs("div",{className:"grh-lang-row",children:[e.jsx("div",{className:"grh-lang-label",children:a}),e.jsx("div",{className:"grh-lang-text",children:r.translations?.[a]??"—"})]},a))})}function M({entry:r}){const a=[r.wordType,r.inflection].filter(Boolean).join(" · "),s=[["Artikel",r.article],["Plural",r.plural],["Formen",r.forms]];return e.jsxs("div",{className:"grh-dict","data-testid":"dictionary-entry",children:[e.jsxs("div",{className:"grh-dict-head",children:[e.jsx("span",{className:"grh-dict-lemma","data-testid":"dictionary-lemma",children:r.lemma}),a&&e.jsx("span",{className:"grh-dict-meta",children:a})]}),e.jsx("dl",{className:"grh-dict-facts",children:s.filter(([,o])=>o).map(([o,i])=>e.jsxs(F.Fragment,{children:[e.jsx("dt",{children:o}),e.jsx("dd",{children:i})]},o))}),r.notes.length>0&&e.jsx("ul",{className:"grh-dict-notes","data-testid":"dictionary-notes",children:r.notes.map((o,i)=>e.jsx("li",{children:o},i))}),r.examples.length>0&&e.jsxs("div",{className:"grh-dict-examples","data-testid":"dictionary-examples",children:[e.jsx("div",{className:"grh-lang-label",children:"Beispiele"}),e.jsx("ol",{children:r.examples.map((o,i)=>e.jsx("li",{children:o},i))})]})]})}function G({card:r,onSend:a}){const[s,o]=x.useState(""),i=r.chatStatus==="loading",l=()=>{!s.trim()||i||(a(s),o(""))};return e.jsxs("div",{className:"grh-chat","data-testid":"chat-box",children:[e.jsx("div",{className:"grh-lang-label",children:"Nachfragen"}),r.chat.length>0&&e.jsxs("div",{className:"grh-chat-log","data-testid":"chat-log",children:[r.chat.map((t,p)=>e.jsx("div",{className:`grh-msg grh-msg-${t.role}${t.error?" grh-msg-error":""}`,"data-testid":`chat-message-${t.role}`,children:t.content},p)),i&&e.jsxs("div",{className:"grh-msg grh-msg-assistant grh-msg-typing","data-testid":"chat-typing",children:[e.jsx("span",{className:"grh-spinner"})," Denkt nach…"]})]}),e.jsxs("div",{className:"grh-chat-row",children:[e.jsx("input",{className:"grh-chat-input",placeholder:"Frag die KI zu diesem Text…",value:s,disabled:i,"data-testid":"chat-input",onChange:t=>o(t.target.value),onKeyDown:t=>{t.key==="Enter"&&(t.preventDefault(),l())}}),e.jsx("button",{className:"grh-chat-send",title:"Send",disabled:i||!s.trim(),"data-testid":"chat-send-button",onClick:l,children:"➤"})]})]})}function R({card:r,onSpeak:a}){const s=r.ttsStatus==="loading";return e.jsx("button",{className:`grh-iconbtn${r.speaking?" grh-active":""}`,title:r.speaking?"Stop":"Play pronunciation","data-testid":"card-speak-button",disabled:s,onClick:a,children:s?e.jsx("span",{className:"grh-spinner grh-spinner-sm"}):r.speaking?"■":"🔊"})}function U({card:r,onPin:a,onClose:s,onSendChat:o,onSpeak:i}){const l=r.status==="result";return e.jsxs("div",{className:"grh-card","data-testid":`card-${r.mode}`,children:[e.jsxs("div",{className:"grh-card-head",children:[e.jsx("span",{className:`grh-pill ${r.mode==="word"?"grh-grammar":""}`,children:r.mode==="word"?"Wort":"Text"}),e.jsx("span",{className:"grh-spacer"}),l&&e.jsx(R,{card:r,onSpeak:()=>i(r.id)}),e.jsx("button",{className:"grh-iconbtn",title:r.pinned?"Unpin":"Pin this result","data-testid":"card-pin-button",onClick:()=>a(r.id),children:r.pinned?"📌":"📍"}),e.jsx("button",{className:"grh-iconbtn",title:"Dismiss","data-testid":"card-close-button",onClick:()=>s(r.id),children:"✕"})]}),e.jsxs("div",{className:"grh-card-body",children:[e.jsx("div",{className:"grh-source",title:r.sourceText,children:r.sourceText}),r.ttsError&&e.jsx("div",{className:"grh-tts-error","data-testid":"tts-error",children:r.ttsError}),r.status==="loading"&&e.jsxs("div",{className:"grh-loading","data-testid":"panel-loading",children:[e.jsx("span",{className:"grh-spinner"}),"Translating & explaining…"]}),r.status==="error"&&e.jsx(D,{reason:r.reason}),l&&e.jsx(P,{card:r}),l&&r.entry&&e.jsx(M,{entry:r.entry}),l&&e.jsx(G,{card:r,onSend:t=>o(r.id,t)})]})]})}function L(r){const{theme:a,collapsed:s,mode:o,width:i,cards:l}=r,t=o==="compact";if(s)return e.jsx("div",{className:"grh-root grh-collapsed","data-theme":a,"data-testid":"grh-panel",children:e.jsxs("button",{className:"grh-reopen",title:"Expand German Reading Helper","data-testid":"panel-collapse-button",onClick:r.onToggleCollapse,children:[e.jsx("span",{className:"grh-dot",children:"ä"}),e.jsx("span",{className:"grh-reopen-label",children:"German Reading Helper"}),e.jsx("span",{className:"grh-reopen-chevron",children:"‹"})]})});const p={width:t?300:i,minWidth:t?260:320,maxWidth:t?320:760};return e.jsxs("div",{className:`grh-root${t?" grh-compact":""}`,"data-theme":a,"data-testid":"grh-panel",style:p,children:[!t&&e.jsx("div",{className:"grh-resize","data-testid":"panel-resize-handle",title:"Drag to resize",onPointerDown:r.onResizeStart}),e.jsxs("div",{className:"grh-header",children:[e.jsxs("div",{className:"grh-brand",children:[e.jsx("span",{className:"grh-dot",children:"ä"}),e.jsx("span",{className:"grh-brand-name",children:"German Reading Helper"})]}),e.jsx("span",{className:"grh-spacer"}),e.jsx("button",{className:"grh-iconbtn",title:t?"Switch to expanded mode":"Switch to compact mode","data-testid":"panel-mode-button",onClick:r.onToggleMode,children:t?"⤢":"⤡"}),e.jsx("button",{className:"grh-iconbtn",title:"Settings","data-testid":"panel-settings-button",onClick:r.onOpenSettings,children:"⚙"}),e.jsx("button",{className:"grh-iconbtn",title:"Collapse to side","data-testid":"panel-collapse-button",onClick:r.onToggleCollapse,children:"›"}),e.jsx("button",{className:"grh-iconbtn",title:"Close","data-testid":"panel-close-button",onClick:r.onClose,children:"✕"})]}),e.jsx("div",{className:"grh-body","data-testid":"panel-body",children:l.length===0?e.jsxs("div",{className:"grh-empty","data-testid":"panel-empty",children:[e.jsx("span",{className:"grh-emoji",children:"📖"}),"Select German text on the page, then right-click and choose",e.jsx("b",{children:" Translate and Explain"}),"."]}):l.map(u=>e.jsx(U,{card:u,onPin:r.onPinCard,onClose:r.onCloseCard,onSendChat:r.onSendChat,onSpeak:r.onSpeak},u.id))})]})}const A=`
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
.grh-source::-webkit-scrollbar { width: 10px; height: 10px; }
.grh-body::-webkit-scrollbar-track,
.grh-source::-webkit-scrollbar-track { background: var(--grh-surface-2); border-radius: 8px; }
.grh-body::-webkit-scrollbar-thumb,
.grh-source::-webkit-scrollbar-thumb {
  background: var(--grh-muted); border-radius: 8px;
  border: 2px solid var(--grh-surface-2); background-clip: padding-box;
}
.grh-body::-webkit-scrollbar-thumb:hover,
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

.grh-body { overscroll-behavior: contain; }

/* Dictionary entry (word mode) */
.grh-dict {
  margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--grh-border);
}
.grh-dict-head { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-bottom: 8px; }
.grh-dict-lemma { font-size: 19px; font-weight: 700; color: var(--grh-text); }
.grh-dict-meta {
  font-family: sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
  text-transform: uppercase; color: var(--grh-accent-2);
}
.grh-dict-facts {
  display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; margin: 0 0 10px;
  font-size: 13.5px; line-height: 1.45;
}
.grh-dict-facts dt { font-family: sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; color: var(--grh-muted); padding-top: 2px; }
.grh-dict-facts dd { margin: 0; }
.grh-dict-notes { margin: 0 0 10px; padding-left: 18px; font-size: 14px; line-height: 1.55; }
.grh-dict-notes li { margin-bottom: 4px; }
.grh-dict-examples ol { margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.55; }
.grh-dict-examples li { margin-bottom: 5px; }

/* Follow-up chat */
.grh-chat { margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--grh-border); }
.grh-chat-log { display: flex; flex-direction: column; gap: 7px; margin: 6px 0 10px; }
.grh-msg {
  max-width: 92%; padding: 8px 11px; border-radius: 12px; font-size: 13.5px; line-height: 1.5;
  white-space: pre-wrap; word-break: break-word; animation: grh-in 0.2s ease;
}
.grh-msg-user { align-self: flex-end; background: var(--grh-accent); color: #fff; border-bottom-right-radius: 4px; }
.grh-msg-assistant { align-self: flex-start; background: var(--grh-surface-2); border: 1px solid var(--grh-border); border-bottom-left-radius: 4px; }
.grh-msg-error { border-color: rgba(214, 69, 69, 0.45); color: var(--grh-danger); }
.grh-msg-typing { display: flex; align-items: center; gap: 8px; color: var(--grh-muted); font-family: sans-serif; font-size: 12.5px; }
.grh-chat-row { display: flex; gap: 6px; margin-top: 6px; }
.grh-chat-input {
  flex: 1; min-width: 0; font-family: inherit; font-size: 13.5px; color: var(--grh-text);
  background: var(--grh-bg); border: 1px solid var(--grh-border); border-radius: 10px; padding: 8px 11px;
  outline: none; transition: border-color 0.15s ease;
}
.grh-chat-input:focus { border-color: var(--grh-accent); }
.grh-chat-input:disabled { opacity: 0.6; }
.grh-chat-send {
  width: 36px; height: 36px; flex: 0 0 auto; border-radius: 10px; border: none; cursor: pointer;
  background: var(--grh-accent); color: #fff; font-size: 14px; font-family: sans-serif;
  display: flex; align-items: center; justify-content: center; transition: opacity 0.15s ease, transform 0.1s ease;
}
.grh-chat-send:hover { opacity: 0.9; }
.grh-chat-send:active { transform: scale(0.94); }
.grh-chat-send:disabled { opacity: 0.4; cursor: default; }

/* Pronunciation */
.grh-iconbtn.grh-active { background: var(--grh-accent); color: #fff; border-color: var(--grh-accent); }
.grh-iconbtn:disabled { cursor: default; opacity: 0.7; }
.grh-spinner-sm { width: 14px; height: 14px; border-width: 2px; }
.grh-tts-error { font-family: sans-serif; font-size: 12px; color: var(--grh-danger); margin: -4px 0 10px; }

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
.grh-root.grh-compact .grh-dict-lemma { font-size: 16px; }
.grh-root.grh-compact .grh-dict-notes, .grh-root.grh-compact .grh-dict-examples ol { font-size: 12.8px; }
.grh-root.grh-compact .grh-msg { font-size: 12.5px; }
`,W=new URLSearchParams(location.search),h=W.get("v")||"",$=h==="dark"?"dark":"light",I=h==="compact"?"compact":"expanded",k=document.createElement("div"),j=k.attachShadow({mode:"open"}),N=document.createElement("style");N.textContent=A;j.appendChild(N);const z=document.createElement("div");j.appendChild(z);document.body.appendChild(k);const v={languages:["English","Ukrainian","Turkish"],status:"result",pinned:!1,chat:[],chatStatus:"idle",ttsStatus:"idle",speaking:!1,ts:Date.now()},w={...v,id:"w1",mode:"word",sourceText:"Fürsten",translations:{English:"princes",Ukrainian:"князі",Turkish:"prensler"},entry:{lemma:"der Fürst",wordType:"Nomen",article:"der",plural:"die Fürsten",inflection:"schwach",forms:"des Fürsten",notes:["Bedeutung: ein adliger Herrscher über ein Gebiet (Fürstentum).","Schwache Deklination (n-Deklination): alle Formen außer Nominativ Singular enden auf -en.",'„Fürsten" = hier Nominativ Plural (Subjekt des Satzes).'],examples:["Der Fürst regierte das kleine Land viele Jahre.","Im Mittelalter hatten die Fürsten viel Macht.","Das Schloss gehörte einem reichen Fürsten."]}},g={...v,id:"t1",mode:"text",sourceText:"Im Mittelalter kontrollierten zahlreiche Fürsten den Handel entlang des Flusses.",translations:{English:"In the Middle Ages, numerous princes controlled trade along the river.",Ukrainian:"У середні віки численні князі контролювали торгівлю вздовж річки.",Turkish:"Orta Çağ’da çok sayıda prens nehir boyunca ticareti kontrol ediyordu."},chat:[{role:"user",content:'Why is it "des Flusses"?'},{role:"assistant",content:`„Des Flusses" ist Genitiv Singular.
- Die Präposition „entlang" steht hier mit Genitiv.
- „der Fluss" → Genitiv: „des Flusses" (starkes Nomen, Endung -es).`}]},b=(r,a)=>Array.from({length:a},()=>r).join(" "),O={...g,id:"p1",chat:[],sourceText:b(g.sourceText,4),translations:{English:b(g.translations.English,6),Ukrainian:b(g.translations.Ukrainian,6),Turkish:b(g.translations.Turkish,6)}},B={...v,id:"l1",mode:"text",status:"loading",sourceText:"Viele Städte wurden an seinen Ufern gegründet."},H={...v,id:"e1",mode:"text",status:"error",sourceText:"Viele Städte wurden an seinen Ufern gegründet.",reason:"No OpenAI API key set. Open Settings (gear icon) and paste your key to start."},V=h==="word"?[w]:h==="text"?[g]:h==="paragraph"?[O]:h==="loading"?[B]:h==="error"?[H]:[w,{...g,pinned:!0}],y=()=>{};function K(){const[r,a]=x.useState(I),[s,o]=x.useState(!1),[i,l]=x.useState(Math.round(window.innerWidth*.26)),[t,p]=x.useState(V),u=n=>Math.max(320,Math.min(Math.min(760,window.innerWidth*.8),n)),S=n=>{n.preventDefault();const d=m=>l(u(window.innerWidth-m.clientX)),c=()=>{document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",c)};document.addEventListener("pointermove",d),document.addEventListener("pointerup",c)},f=(n,d)=>p(c=>c.map(m=>m.id===n?d(m):m)),C=(n,d)=>{f(n,c=>({...c,chat:[...c.chat,{role:"user",content:d}],chatStatus:"loading"})),setTimeout(()=>{f(n,c=>({...c,chatStatus:"idle",chat:[...c.chat,{role:"assistant",content:`Gute Frage! (Demo-Antwort auf: „${d}")`}]}))},600)},T=n=>f(n,d=>({...d,speaking:!d.speaking}));return e.jsx(L,{theme:$,collapsed:s,mode:r,width:i,cards:t,onClose:y,onToggleCollapse:()=>o(n=>!n),onToggleMode:()=>a(n=>n==="compact"?"expanded":"compact"),onResizeStart:S,onPinCard:n=>f(n,d=>({...d,pinned:!d.pinned})),onCloseCard:n=>p(d=>d.filter(c=>c.id!==n)),onSendChat:C,onSpeak:T,onOpenSettings:y})}E(z).render(e.jsx(K,{}));
