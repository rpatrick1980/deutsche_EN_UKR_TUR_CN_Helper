import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Standalone visual demo of the injected panel (no extension APIs).
// Output is served through the frontend preview for a quick screenshot.
export default defineConfig({
  root: resolve(__dirname, 'demo'),
  base: './',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../frontend/public/grh-demo'),
    emptyOutDir: true,
  },
})
