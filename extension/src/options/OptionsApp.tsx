import React, { useEffect, useState } from 'react'
import { Settings, ALL_LANGUAGES, TargetLanguage } from '../shared/types'
import { getSettings, saveSettings, clearHistory, clearCache } from '../services/storage'

const MODEL_OPTIONS = [
  { value: 'gpt-4o-mini', label: 'gpt-4o-mini — fast & low cost (default)' },
  { value: 'gpt-4o', label: 'gpt-4o — higher quality' },
  { value: 'gpt-4.1-mini', label: 'gpt-4.1-mini' },
]

export function Options() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [saved, setSaved] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [cleared, setCleared] = useState('')

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  useEffect(() => {
    if (settings) {
      document.documentElement.dataset.theme = settings.darkMode ? 'dark' : 'light'
    }
  }, [settings?.darkMode])

  if (!settings) return null

  const update = (patch: Partial<Settings>) => {
    setSettings({ ...settings, ...patch })
    setSaved(false)
  }

  const toggleLang = (lang: TargetLanguage) => {
    update({
      enabledLanguages: {
        ...settings.enabledLanguages,
        [lang]: !settings.enabledLanguages[lang],
      },
    })
  }

  const onSave = async () => {
    await saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="opt-wrap" data-theme={settings.darkMode ? 'dark' : 'light'} data-testid="options-page">
      <header className="opt-header">
        <div className="opt-brand">
          <span className="opt-dot">ä</span>
          <div>
            <h1>German Reading Helper</h1>
            <p>Settings</p>
          </div>
        </div>
      </header>

      <main className="opt-main">
        <section className="opt-card">
          <h2>OpenAI API key</h2>
          <p className="opt-hint">
            Your key is stored locally in Chrome storage and used to call OpenAI directly.
            Get one at{' '}
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">
              platform.openai.com/api-keys
            </a>
            .
          </p>
          <div className="opt-keyrow">
            <input
              type={showKey ? 'text' : 'password'}
              className="opt-input"
              placeholder="sk-..."
              value={settings.apiKey}
              data-testid="settings-apikey-input"
              onChange={(e) => update({ apiKey: e.target.value.trim() })}
            />
            <button className="opt-btn ghost" onClick={() => setShowKey((s) => !s)} data-testid="settings-toggle-key">
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>

          <label className="opt-field">
            <span>Model</span>
            <select
              className="opt-input"
              value={settings.model}
              data-testid="settings-model-select"
              onChange={(e) => update({ model: e.target.value })}
            >
              {MODEL_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="opt-card">
          <h2>Target languages</h2>
          <p className="opt-hint">German is translated into every enabled language.</p>
          <div className="opt-langs">
            {ALL_LANGUAGES.map((lang) => (
              <label key={lang} className="opt-check" data-testid={`settings-lang-${lang}`}>
                <input
                  type="checkbox"
                  checked={!!settings.enabledLanguages[lang]}
                  onChange={() => toggleLang(lang)}
                />
                <span>{lang}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="opt-card">
          <h2>Appearance & panel</h2>
          <label className="opt-check big" data-testid="settings-darkmode">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => update({ darkMode: e.target.checked })}
            />
            <span>Dark mode</span>
          </label>
          <label className="opt-check big" data-testid="settings-pushcontent">
            <input
              type="checkbox"
              checked={settings.pushContent}
              onChange={(e) => update({ pushContent: e.target.checked })}
            />
            <span>Push page content aside (instead of overlaying it)</span>
          </label>
          <label className="opt-field">
            <span>Panel width: {settings.panelWidthPct}% of viewport</span>
            <input
              type="range"
              min={20}
              max={40}
              value={settings.panelWidthPct}
              data-testid="settings-width-range"
              onChange={(e) => update({ panelWidthPct: Number(e.target.value) })}
            />
          </label>
        </section>

        <section className="opt-card">
          <h2>History & cache</h2>
          <label className="opt-field">
            <span>Auto-expire history after {settings.historyAutoExpireDays} days</span>
            <input
              type="range"
              min={1}
              max={90}
              value={settings.historyAutoExpireDays}
              data-testid="settings-expire-range"
              onChange={(e) => update({ historyAutoExpireDays: Number(e.target.value) })}
            />
          </label>
          <div className="opt-btnrow">
            <button
              className="opt-btn ghost"
              data-testid="settings-clear-history"
              onClick={async () => {
                await clearHistory()
                setCleared('History cleared.')
                setTimeout(() => setCleared(''), 2000)
              }}
            >
              Clear history
            </button>
            <button
              className="opt-btn ghost"
              data-testid="settings-clear-cache"
              onClick={async () => {
                await clearCache()
                setCleared('Cache cleared.')
                setTimeout(() => setCleared(''), 2000)
              }}
            >
              Clear cache
            </button>
            {cleared && <span className="opt-flash">{cleared}</span>}
          </div>
        </section>

        <div className="opt-save">
          <button className="opt-btn primary" onClick={onSave} data-testid="settings-save-button">
            Save settings
          </button>
          {saved && <span className="opt-flash" data-testid="settings-saved-flash">Saved ✓</span>}
        </div>

        <p className="opt-privacy">
          Privacy: selected German text is sent to the OpenAI API only when you choose
          Translate or Explain Grammar. Nothing is read automatically and no data is sent
          to any other server. History and cache stay on this device.
        </p>
      </main>
    </div>
  )
}
