import { defineConfig } from 'vite'
import ssr from 'vite-plugin-ssr/plugin'

export default defineConfig({
  plugins: [
    ssr({
      // Pre-render every page at `vite build`
      prerender: true
    })
  ]
})
