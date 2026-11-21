import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Two pages: the main narrative (index.html) and How It Works
// (how-it-works/index.html, served at /how-it-works/).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        howItWorks: resolve(import.meta.dirname, 'how-it-works/index.html'),
      },
    },
  },
})
