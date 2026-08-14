import React from 'react'
import { createRoot } from 'react-dom/client'
import '../src/options/options.css'

// Stub the chrome.storage API so the real Options component renders in a plain
// browser for screenshot capture. Seed a realistic key so the field isn't empty.
const mem: Record<string, any> = {
  grh_settings: {
    apiKey: 'sk-proj-demo-xxxxxxxxxxxxxxxxxxxxxxxx',
    model: 'gpt-4o-mini',
    enabledLanguages: { English: true, Ukrainian: true, Turkish: true, Chinese: true },
    darkMode: false,
    pushContent: false,
    panelMode: 'expanded',
    panelWidthPct: 26,
    historyAutoExpireDays: 30,
    historyLimit: 50,
  },
}
;(globalThis as any).chrome = {
  storage: {
    local: {
      get: async (k: any) => (typeof k === 'string' ? { [k]: mem[k] } : {}),
      set: async (o: any) => {
        Object.assign(mem, o)
      },
    },
  },
  runtime: { openOptionsPage() {}, sendMessage() {} },
}

const { Options } = await import('../src/options/OptionsApp')
createRoot(document.getElementById('root')!).render(<Options />)
