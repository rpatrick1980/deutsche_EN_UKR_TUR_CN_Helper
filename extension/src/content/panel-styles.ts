// All panel CSS as a string, injected into the shadow root so page styles can't
// leak in and the panel styles can't leak out.
export const PANEL_STYLES = `
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
`
