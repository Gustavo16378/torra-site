// Fotos geradas por scripts/optimize-assets.mjs: 4 larguras × (avif, webp, jpg).
// Cada SceneImage carrega os srcsets prontos pro <picture> do SceneMedia.
const urls = import.meta.glob<string>('./*-*.{avif,webp,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export interface SceneImage {
  avif: string
  webp: string
  jpg: string
  /** fallback do <img> (jpg médio) */
  src: string
  /** largura/altura intrínsecas — evitam layout shift */
  width: number
  height: number
  /** `sizes` — a foto cobre o container com object-cover */
  sizes: string
}

const WIDTHS = [480, 800, 1200]

function scene(name: string, max: number, ratio: number): SceneImage {
  const widths = [...WIDTHS, max]
  const set = (ext: string) =>
    widths.map((w) => `${urls[`./${name}-${w}.${ext}`]} ${w}w`).join(', ')
  return {
    avif: set('avif'),
    webp: set('webp'),
    jpg: set('jpg'),
    src: urls[`./${name}-1200.jpg`],
    width: max,
    height: Math.round(max / ratio),
    // object-cover: a imagem precisa cobrir largura E altura da seção (min 100vh)
    sizes: ratio > 1 ? `max(100vw, ${Math.round(ratio * 100)}vh)` : '100vw',
  }
}

export const images = {
  hero: scene('hero-extracao', 1920, 1920 / 1280),
  manifesto: scene('manifesto-vapor', 1920, 1920 / 1260),
  espresso: scene('menu-espresso', 1600, 1600 / 2400),
  latte: scene('menu-latte', 1600, 1600 / 2399),
  coldbrew: scene('menu-coldbrew', 1600, 1600 / 1064),
  v60: scene('menu-v60', 1600, 1600 / 2400),
  origem: scene('origem-graos', 1920, 1920 / 1282),
  casa: scene('casa-interior', 1920, 1920 / 1280),
  footer: scene('footer-xicara', 1920, 1920 / 2880),
}
