// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CLOUDFLARE_PAGES
    ? '/' // For Cloudflare Pages
    : process.env.GITHUB_ACTIONS
      ? '/fit5032-studio/fit5032-week11/' // For GitHub Pages
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
