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
  transform: translateX(calc(100% - 44px));
}

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
`
