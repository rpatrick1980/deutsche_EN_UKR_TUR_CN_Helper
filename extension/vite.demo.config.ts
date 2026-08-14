import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Standalone visual demo of the injected panel + settings page (no extension APIs).
// Output is served through the frontend preview for real screenshot capture.
export default defineConfig({
  root: resolve(__dirname, 'demo'),
  base: './',
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: resolve(__dirname, '../frontend/public/grh-demo'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'demo/index.html'),
        settings: resolve(__dirname, 'demo/settings.html'),
      },
    },
  },
})
