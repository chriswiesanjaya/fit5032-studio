import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CF_PAGES
    ? '/' // For Cloudflare Pages
    : process.env.GITHUB_ACTIONS
      ? '/fit-5032/' // For GitHub Pages
      : '/', // For local debugging
  build: {
    outDir: 'dist'
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
