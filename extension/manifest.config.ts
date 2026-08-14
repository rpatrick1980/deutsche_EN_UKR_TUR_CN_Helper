import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'German Reading Helper',
  version: '1.0.0',
  description:
    'Read German webpages with confidence. Right-click to translate or get compact grammar explanations in a side panel.',
  minimum_chrome_version: '110',
  icons: {
    '16': 'icons/icon-16.png',
    '48': 'icons/icon-48.png',
    '128': 'icons/icon-128.png',
  },
  action: {
    default_title: 'German Reading Helper — open settings',
    default_icon: {
      '16': 'icons/icon-16.png',
      '48': 'icons/icon-48.png',
      '128': 'icons/icon-128.png',
    },
  },
  background: {
    service_worker: 'src/background/service-worker.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/content-main.tsx'],
      run_at: 'document_idle',
    },
  ],
  options_page: 'src/options/options.html',
  // Minimal permissions. Rationale documented in README.
  permissions: ['contextMenus', 'storage', 'activeTab', 'scripting'],
  // Only the OpenAI endpoint is requested as a host permission (v1 direct API).
  host_permissions: ['https://api.openai.com/*'],
})
