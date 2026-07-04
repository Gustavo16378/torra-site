// Otimiza as fotos de torra-assets/ → src/assets/ (WebP + JPEG, max-width 1920px).
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

const MAX_WIDTH = 1920

await mkdir(OUT, { recursive: true })

const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f))

for (const file of files) {
  const { name } = parse(file)
  const input = join(SRC, file)

  const base = sharp(input).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  })

  await base
    .clone()
    .webp({ quality: 78, effort: 6 })
    .toFile(join(OUT, `${name}.webp`))

  await base
    .clone()
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(join(OUT, `${name}.jpg`))

  console.log(`✓ ${name} → webp + jpg`)
}

// OG image (1200x630) a partir do hero
await sharp(join(SRC, 'hero-extracao.jpg'))
  .rotate()
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(PUBLIC, 'og-image.jpg'))

console.log('✓ og-image.jpg')
console.log(`\nPronto — ${files.length} imagens otimizadas em src/assets/`)
