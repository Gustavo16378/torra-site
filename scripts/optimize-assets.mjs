// Otimiza as fotos de torra-assets/ → src/assets/ (AVIF + WebP + JPEG em 4 larguras).
// Gera também public/og-image.jpg a partir do hero. Rodar: npm run assets
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join, parse } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const SRC = join(root, 'torra-assets')
const OUT = join(root, 'src', 'assets')
const PUBLIC = join(root, 'public')

const WIDTHS = [480, 800, 1200, 1920]

await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /.jpe?g$/i.test(f))

for (const file of files) {
  const { name } = parse(file)
  const input = join(SRC, file)
  const { width: srcW } = await sharp(input).rotate().metadata()
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, srcW)))]

  for (const w of widths) {
    const base = sharp(input).rotate().resize({ width: w, withoutEnlargement: true })
    await base.clone().avif({ quality: 50, effort: 6 }).toFile(join(OUT, `${name}-${w}.avif`))
    await base.clone().webp({ quality: 76, effort: 6 }).toFile(join(OUT, `${name}-${w}.webp`))
    await base.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(join(OUT, `${name}-${w}.jpg`))
  }
  console.log(`✓ ${name} → ${widths.join('/')} (avif + webp + jpg)`)
}

// OG image (1200x630) — usa o render do hero com o "TORRA." embutido
// (torra-cafe-desktop-hero.png), que rende melhor no preview do link
await sharp(join(SRC, 'torra-cafe-desktop-hero.png'))
  .rotate()
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(PUBLIC, 'og-image.jpg'))

console.log('✓ og-image.jpg')
console.log(`\nPronto — ${files.length} imagens otimizadas em src/assets/`)
