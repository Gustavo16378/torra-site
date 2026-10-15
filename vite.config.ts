import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Build only: inlines the main CSS in <head> (no render-blocking request) and
// preloads the hero image (AVIF srcset) so it doesn't wait for the JS to mount.
function criticalHead(): Plugin {
  return {
    name: 'torra-critical-head',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html

        const cssLink = /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/
        const m = html.match(cssLink)
        if (m) {
          const asset = bundle[m[1]]
          if (asset && asset.type === 'asset') {
            html = html.replace(cssLink, `<style>${String(asset.source)}</style>`)
            delete bundle[m[1]]
          }
        }

        const hero = Object.keys(bundle)
          .filter((f) => /^assets\/hero-extracao-\d+-.+\.avif$/.test(f))
          .map((f) => ({ f, w: Number(f.match(/hero-extracao-(\d+)-/)![1]) }))
          .sort((a, b) => a.w - b.w)
        if (hero.length) {
          const srcset = hero.map(({ f, w }) => `/${f} ${w}w`).join(', ')
          const tag = `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset}" imagesizes="max(100vw, 150vh)" fetchpriority="high" />`
          html = html.replace('</head>', `    ${tag}\n  </head>`)
        }
        return html
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), criticalHead()],
})
