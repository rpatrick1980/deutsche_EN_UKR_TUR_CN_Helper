import{j as r,R as b,r as w,c as y}from"./client-gxHn_UGl.js";import{M as p,g as v,d as m,A as k}from"./storage-DeMVG-BP.js";import{d as u}from"./prompts-DIT7VE1v.js";function N({reason:e}){return r.jsxs("div",{className:"grh-error","data-testid":"panel-error",children:[r.jsx("b",{children:"Couldn't process this"}),e||"Something went wrong. Please try again."]})}function j({card:e}){return r.jsx("div",{"data-testid":"translation-result",children:e.languages.map(t=>r.jsxs("div",{className:"grh-lang-row",children:[r.jsx("div",{className:"grh-lang-label",children:t}),r.jsx("div",{className:"grh-lang-text",children:e.translations?.[t]??"—"})]},t))})}function S({entry:e}){const t=[e.wordType,e.inflection].filter(Boolean).join(" · "),a=[["Artikel",e.article],["Plural",e.plural],["Formen",e.forms]];return r.jsxs("div",{className:"grh-dict","data-testid":"dictionary-entry",children:[r.jsxs("div",{className:"grh-dict-head",children:[r.jsx("span",{className:"grh-dict-lemma","data-testid":"dictionary-lemma",children:e.lemma}),t&&r.jsx("span",{className:"grh-dict-meta",children:t})]}),r.jsx("dl",{className:"grh-dict-facts",children:a.filter(([,s])=>s).map(([s,o])=>r.jsxs(b.Fragment,{children:[r.jsx("dt",{children:s}),r.jsx("dd",{children:o})]},s))}),e.notes.length>0&&r.jsx("ul",{className:"grh-dict-notes","data-testid":"dictionary-notes",children:e.notes.map((s,o)=>r.jsx("li",{children:s},o))}),e.examples.length>0&&r.jsxs("div",{className:"grh-dict-examples","data-testid":"dictionary-examples",children:[r.jsx("div",{className:"grh-lang-label",children:"Beispiele"}),r.jsx("ol",{children:e.examples.map((s,o)=>r.jsx("li",{children:s},o))})]})]})}function z({card:e,onSend:t}){const[a,s]=w.useState(""),o=e.chatStatus==="loading",n=()=>{!a.trim()||o||(t(a),s(""))};return r.jsxs("div",{className:"grh-chat","data-testid":"chat-box",children:[r.jsx("div",{className:"grh-lang-label",children:"Nachfragen"}),e.chat.length>0&&r.jsxs("div",{className:"grh-chat-log","data-testid":"chat-log",children:[e.chat.map((i,d)=>r.jsx("div",{className:`grh-msg grh-msg-${i.role}${i.error?" grh-msg-error":""}`,"data-testid":`chat-message-${i.role}`,children:i.content},d)),o&&r.jsxs("div",{className:"grh-msg grh-msg-assistant grh-msg-typing","data-testid":"chat-typing",children:[r.jsx("span",{className:"grh-spinner"})," Denkt nach…"]})]}),r.jsxs("div",{className:"grh-chat-row",children:[r.jsx("input",{className:"grh-chat-input",placeholder:"Frag die KI zu diesem Text…",value:a,disabled:o,"data-testid":"chat-input",onChange:i=>s(i.target.value),onKeyDown:i=>{i.key==="Enter"&&(i.preventDefault(),n())}}),r.jsx("button",{className:"grh-chat-send",title:"Send",disabled:o||!a.trim(),"data-testid":"chat-send-button",onClick:n,children:"➤"})]})]})}function T({card:e,onSpeak:t}){const a=e.ttsStatus==="loading";return r.jsx("button",{className:`grh-iconbtn${e.speaking?" grh-active":""}`,title:e.speaking?"Stop":"Play pronunciation","data-testid":"card-speak-button",disabled:a,onClick:t,children:a?r.jsx("span",{className:"grh-spinner grh-spinner-sm"}):e.speaking?"■":"🔊"})}function E({card:e,onPin:t,onClose:a,onSendChat:s,onSpeak:o}){const n=e.status==="result";return r.jsxs("div",{className:"grh-card","data-testid":`card-${e.mode}`,children:[r.jsxs("div",{className:"grh-card-head",children:[r.jsx("span",{className:`grh-pill ${e.mode==="word"?"grh-grammar":""}`,children:e.mode==="word"?"Wort":"Text"}),r.jsx("span",{className:"grh-spacer"}),n&&r.jsx(T,{card:e,onSpeak:()=>o(e.id)}),r.jsx("button",{className:"grh-iconbtn",title:e.pinned?"Unpin":"Pin this result","data-testid":"card-pin-button",onClick:()=>t(e.id),children:e.pinned?"📌":"📍"}),r.jsx("button",{className:"grh-iconbtn",title:"Dismiss","data-testid":"card-close-button",onClick:()=>a(e.id),children:"✕"})]}),r.jsxs("div",{className:"grh-card-body",children:[r.jsx("div",{className:"grh-source",title:e.sourceText,children:e.sourceText}),e.ttsError&&r.jsx("div",{className:"grh-tts-error","data-testid":"tts-error",children:e.ttsError}),e.status==="loading"&&r.jsxs("div",{className:"grh-loading","data-testid":"panel-loading",children:[r.jsx("span",{className:"grh-spinner"}),"Translating & explaining…"]}),e.status==="error"&&r.jsx(N,{reason:e.reason}),n&&r.jsx(j,{card:e}),n&&e.entry&&r.jsx(S,{entry:e.entry}),n&&r.jsx(z,{card:e,onSend:i=>s(e.id,i)})]})]})}function P(e){const{theme:t,collapsed:a,mode:s,width:o,cards:n}=e,i=s==="compact";if(a)return r.jsx("div",{className:"grh-root grh-collapsed","data-theme":t,"data-testid":"grh-panel",children:r.jsxs("button",{className:"grh-reopen",title:"Expand German Reading Helper","data-testid":"panel-collapse-button",onClick:e.onToggleCollapse,children:[r.jsx("span",{className:"grh-dot",children:"ä"}),r.jsx("span",{className:"grh-reopen-label",children:"German Reading Helper"}),r.jsx("span",{className:"grh-reopen-chevron",children:"‹"})]})});const d={width:i?300:o,minWidth:i?260:320,maxWidth:i?320:760};return r.jsxs("div",{className:`grh-root${i?" grh-compact":""}`,"data-theme":t,"data-testid":"grh-panel",style:d,children:[!i&&r.jsx("div",{className:"grh-resize","data-testid":"panel-resize-handle",title:"Drag to resize",onPointerDown:e.onResizeStart}),r.jsxs("div",{className:"grh-header",children:[r.jsxs("div",{className:"grh-brand",children:[r.jsx("span",{className:"grh-dot",children:"ä"}),r.jsx("span",{className:"grh-brand-name",children:"German Reading Helper"})]}),r.jsx("span",{className:"grh-spacer"}),r.jsx("button",{className:"grh-iconbtn",title:i?"Switch to expanded mode":"Switch to compact mode","data-testid":"panel-mode-button",onClick:e.onToggleMode,children:i?"⤢":"⤡"}),r.jsx("button",{className:"grh-iconbtn",title:"Settings","data-testid":"panel-settings-button",onClick:e.onOpenSettings,children:"⚙"}),r.jsx("button",{className:"grh-iconbtn",title:"Collapse to side","data-testid":"panel-collapse-button",onClick:e.onToggleCollapse,children:"›"}),r.jsx("button",{className:"grh-iconbtn",title:"Close","data-testid":"panel-close-button",onClick:e.onClose,children:"✕"})]}),r.jsx("div",{className:"grh-body","data-testid":"panel-body",children:n.length===0?r.jsxs("div",{className:"grh-empty","data-testid":"panel-empty",children:[r.jsx("span",{className:"grh-emoji",children:"📖"}),"Select German text on the page, then right-click and choose",r.jsx("b",{children:" Translate and Explain"}),"."]}):n.map(l=>r.jsx(E,{card:l,onPin:e.onPinCard,onClose:e.onCloseCard,onSendChat:e.onSendChat,onSpeak:e.onSpeak},l.id))})]})}const C=`
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
`,A=new Set(["der","die","das","und","ist","nicht","ich","du","er","sie","es","ein","eine","einen","einem","einer","mit","von","zu","zum","zur","auf","für","dass","werden","wird","wurde","haben","hat","hatte","sein","sind","war","waren","aber","oder","auch","noch","schon","wenn","weil","als","wie","was","wer","wo","wann","durch","über","unter","vor","nach","bei","im","am","beim","ins","vom","man","mich","dich","sich","uns","euch","ihn","ihm","ihr","ihre","kein","keine","nur","sehr","mehr","immer","wieder","hier","dort","jetzt","dann","ja","nein","doch","ganz","gut"]),x=new Set(["the","and","is","are","you","this","that","with","for","have","not","was","were","they","his","her","from","what","which","would","there","their","about","will","your"]);function O(e){const t=e.toLowerCase(),a=/[äöüß]/.test(t),s=t.split(/[^a-zäöüß]+/).filter(Boolean);if(s.length===0)return{isGerman:!1,score:0};let o=0,n=0;for(const h of s)A.has(h)&&o++,x.has(h)&&n++;const i=o/s.length,d=n/s.length,l=i*3+(a?.5:0);return s.length<=3?{isGerman:!(s.length===1&&x.has(s[0])),score:l}:{isGerman:(a||i>=.06)&&i+.1>=d,score:l}}const R=new Set(["P","DIV","LI","ARTICLE","SECTION","BLOCKQUOTE","TD","TH","FIGCAPTION","H1","H2","H3","H4","H5","H6","SPAN","A","STRONG","EM"]),G=new Set(["CANVAS","IMG","SVG","VIDEO","AUDIO","IFRAME","EMBED","OBJECT"]);function I(){return(window.getSelection?.()?.toString()??"").trim()}function M(e){if(!e)return{text:null,reason:"No text was found near your click. Please select German text and try again."};if(G.has(e.tagName))return{text:null,reason:"This looks like an image, canvas, or embedded content. Text here cannot be read automatically — please select visible German text manually."};if(document.contentType==="application/pdf"||document.querySelector('embed[type="application/pdf"]'))return{text:null,reason:"PDF viewers do not expose selectable text to extensions here. Please select the text manually if possible."};let t=e,a=e;for(;t&&t!==document.body;){if(R.has(t.tagName)){a=t;const n=t.innerText?.trim();if(n&&n.split(/\s+/).length>=2)break}t=t.parentElement}const o=(a?.innerText??"").replace(/\s+/g," ").trim();return o?{text:o}:{text:null,reason:"No readable text was found near your click. Please select German text manually."}}function L(e){const t=e.replace(/\s+/g," ").trim();if(!t)return{ok:!1,text:t,reason:"No text found. Please select German text manually and try again."};const a=t.split(/\s+/).filter(Boolean);if(a.length>p)return{ok:!1,text:t,reason:`That selection is too long (${a.length} words). Please select a shorter German passage — under ${p} words.`};const s=(t.match(/[a-zA-ZäöüÄÖÜß]/g)??[]).length,o=s/t.length;return s<2||o<.4?{ok:!1,text:t,reason:"This does not look like readable text (too many symbols or numbers). Please select clean German text."}:O(t).isGerman?{ok:!0,text:t}:{ok:!1,text:t,reason:"This does not look like German. This tool only supports German source text."}}let f=null;document.addEventListener("contextmenu",e=>{f=e.target},!0);const g={NO_API_KEY:"No OpenAI API key set. Open Settings (gear icon) and paste your key to start.",INVALID_API_KEY:"Your OpenAI API key was rejected. Please check it in Settings.",RATE_LIMIT:"OpenAI is rate-limiting or out of quota right now. Please wait a moment and try again.",TIMEOUT:"The request timed out. Please check your connection and try again.",NETWORK:"Network error reaching OpenAI. Please try again.",BAD_RESPONSE:"The AI returned an unexpected response. Please try again.",NOT_GERMAN:"The AI could not read this as German. This tool only supports German source text.",NO_LANG:"No target languages are enabled. Open Settings and enable at least one language."},c=e=>g[e??"NETWORK"]||"Something went wrong. Please try again.";class _{host=null;root=null;settings=null;audio=null;state={open:!1,collapsed:!1,mode:"expanded",theme:"light",widthPct:25,widthPx:380,cards:[],resizing:!1};async ensureMounted(){if(this.settings=await v(),this.state.theme=this.settings.darkMode?"dark":"light",this.state.widthPct=this.settings.panelWidthPct,this.state.widthPx=this.clampWidth(Math.round(window.innerWidth*this.settings.panelWidthPct/100)),this.state.mode=this.settings.panelMode,this.host)return;const t=document.createElement("div");t.id="grh-panel-host",t.style.all="initial";const a=t.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=C,a.appendChild(s);const o=document.createElement("div");a.appendChild(o),document.documentElement.appendChild(t),this.host=t,this.root=y(o)}clampWidth(t){const a=Math.min(760,Math.round(window.innerWidth*.8));return Math.max(320,Math.min(a,t))}setResizing(t){this.host?.shadowRoot?.querySelector(".grh-root")?.classList.toggle("grh-resizing",t)}startResize=t=>{t.preventDefault(),this.state.resizing=!0,this.setResizing(!0);const a=document.body.style.userSelect;document.body.style.userSelect="none",document.body.style.cursor="ew-resize";const s=n=>{this.state.widthPx=this.clampWidth(window.innerWidth-n.clientX),this.render()},o=()=>{this.state.resizing=!1,document.removeEventListener("pointermove",s),document.removeEventListener("pointerup",o),document.body.style.userSelect=a,document.body.style.cursor="",this.setResizing(!1),this.settings&&(this.settings.panelWidthPct=Math.round(this.state.widthPx/window.innerWidth*100),this.state.widthPct=this.settings.panelWidthPct,m(this.settings)),this.render()};document.addEventListener("pointermove",s),document.addEventListener("pointerup",o)};applyPushContent(){if(!this.settings?.pushContent)return;document.documentElement.style.transition="margin-right 0.28s ease";const t=this.state.collapsed?"46px":this.state.mode==="compact"?"300px":`${this.state.widthPx}px`;document.documentElement.style.marginRight=this.state.open?t:""}render(){if(this.root){if(!this.state.open){this.root.render(r.jsx(r.Fragment,{})),this.host&&(this.host.style.display="none"),document.documentElement.style.marginRight="",this.stopAudio();return}this.host&&(this.host.style.display=""),this.applyPushContent(),this.root.render(r.jsx(P,{theme:this.state.theme,collapsed:this.state.collapsed,mode:this.state.mode,width:this.state.widthPx,cards:this.state.cards,onClose:()=>{this.state.open=!1,this.render()},onToggleCollapse:()=>{this.state.collapsed=!this.state.collapsed,this.render()},onResizeStart:this.startResize,onToggleMode:()=>{this.state.mode=this.state.mode==="compact"?"expanded":"compact",this.settings&&(this.settings.panelMode=this.state.mode,m(this.settings)),this.render()},onPinCard:t=>{const a=this.state.cards.find(s=>s.id===t);a&&(a.pinned=!a.pinned),this.render()},onCloseCard:t=>{this.state.cards.find(s=>s.id===t)?.speaking&&this.stopAudio(),this.state.cards=this.state.cards.filter(s=>s.id!==t),this.render()},onSendChat:(t,a)=>this.sendChat(t,a),onSpeak:t=>this.speak(t),onOpenSettings:()=>chrome.runtime.sendMessage({type:"OPEN_OPTIONS"})}))}}enabledLanguages(){const t=this.settings?.enabledLanguages;return k.filter(a=>t?.[a])}addCard(t){this.state.cards.find(s=>!s.pinned)?.speaking&&this.stopAudio(),this.state.cards=this.state.cards.filter(s=>s.pinned),this.state.cards.unshift(t)}stopAudio(){this.audio&&(this.audio.pause(),this.audio=null),this.state.cards.forEach(t=>t.speaking=!1)}async speak(t){const a=this.state.cards.find(n=>n.id===t);if(!a)return;if(a.speaking){this.stopAudio(),this.render();return}if(this.stopAudio(),!a.audio){a.ttsStatus="loading",a.ttsError=void 0,this.render();const n=await chrome.runtime.sendMessage({type:"TTS_REQUEST",text:a.sourceText});if(!n?.ok||!n.audio){a.ttsStatus="error",a.ttsError=c(n?.error),this.render();return}a.audio=n.audio}a.ttsStatus="idle";const s=new Audio(`data:audio/mpeg;base64,${a.audio}`);this.audio=s,a.speaking=!0,this.render();const o=()=>{this.audio===s&&(this.audio=null),a.speaking=!1,this.render()};s.onended=o,s.onerror=()=>{a.ttsStatus="error",a.ttsError="Could not play the audio. Please try again.",o()},s.play().catch(()=>{a.ttsStatus="error",a.ttsError="Playback was blocked by the browser. Click the speaker again.",o()})}async sendChat(t,a){const s=this.state.cards.find(i=>i.id===t),o=a.trim();if(!s||!o||s.chatStatus==="loading")return;s.chat.push({role:"user",content:o}),s.chatStatus="loading",this.render();const n=await chrome.runtime.sendMessage({type:"CHAT_REQUEST",sourceText:s.sourceText,translations:s.translations,entry:s.entry,messages:s.chat});n?.ok&&n.reply?s.chat.push({role:"assistant",content:n.reply}):s.chat.push({role:"assistant",content:c(n?.error),error:!0}),s.chatStatus="idle",this.render()}async run(t){await this.ensureMounted(),this.state.open=!0,this.state.collapsed=!1;let a=t||I(),s;if(!a){const l=M(f);l.text?a=l.text:s=l.reason}const o=this.enabledLanguages(),n={id:`card_${Date.now()}`,mode:u(a||""),sourceText:a||"(no text found)",languages:o,status:"loading",pinned:!1,chat:[],chatStatus:"idle",ttsStatus:"idle",speaking:!1,ts:Date.now()};if(this.addCard(n),this.render(),!a){n.status="error",n.reason=s||g.NO_API_KEY,this.render();return}const i=L(a);if(n.sourceText=i.text,n.mode=u(i.text),!i.ok){n.status="error",n.reason=i.reason,this.render();return}if(o.length===0){n.status="error",n.reason=g.NO_LANG,this.render();return}const d=await chrome.runtime.sendMessage({type:"LOOKUP_REQUEST",mode:n.mode,text:i.text,languages:o});if(!d?.ok){n.status="error",n.reason=c(d?.error),this.render();return}n.status="result",n.translations=d.translations,n.entry=d.entry,this.render()}}const D=new _;chrome.runtime.onMessage.addListener(e=>{e?.type==="RUN_ACTION"&&D.run(e.selectionText)});export{g as ERROR_COPY};
