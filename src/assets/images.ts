// Cada imagem exporta { webp, jpg } — gerados por scripts/optimize-assets.mjs.
// Usados pelo <picture> do SceneMedia (WebP + fallback JPEG).
import heroWebp from './hero-extracao.webp'
import heroJpg from './hero-extracao.jpg'
import manifestoWebp from './manifesto-vapor.webp'
import manifestoJpg from './manifesto-vapor.jpg'
import espressoWebp from './menu-espresso.webp'
import espressoJpg from './menu-espresso.jpg'
import latteWebp from './menu-latte.webp'
import latteJpg from './menu-latte.jpg'
import coldbrewWebp from './menu-coldbrew.webp'
import coldbrewJpg from './menu-coldbrew.jpg'
import v60Webp from './menu-v60.webp'
import v60Jpg from './menu-v60.jpg'
import origemWebp from './origem-graos.webp'
import origemJpg from './origem-graos.jpg'
import casaWebp from './casa-interior.webp'
import casaJpg from './casa-interior.jpg'
import footerWebp from './footer-xicara.webp'
import footerJpg from './footer-xicara.jpg'

export interface SceneImage {
  webp: string
  jpg: string
}

export const images = {
  hero: { webp: heroWebp, jpg: heroJpg },
  manifesto: { webp: manifestoWebp, jpg: manifestoJpg },
  espresso: { webp: espressoWebp, jpg: espressoJpg },
  latte: { webp: latteWebp, jpg: latteJpg },
  coldbrew: { webp: coldbrewWebp, jpg: coldbrewJpg },
  v60: { webp: v60Webp, jpg: v60Jpg },
  origem: { webp: origemWebp, jpg: origemJpg },
  casa: { webp: casaWebp, jpg: casaJpg },
  footer: { webp: footerWebp, jpg: footerJpg },
} satisfies Record<string, SceneImage>
