import type { CSSProperties } from 'react'
import type { SceneImage } from '../assets/images'

interface SceneMediaProps {
  image: SceneImage
  alt: string
  /** gradiente de overlay (CSS background) */
  overlay: string
  /** brightness do filtro da imagem, ex 0.82 */
  brightness: number
  saturate?: number
  /** direção do Ken Burns; omitir = sem Ken Burns (ex: menu usa parallax) */
  ken?: 'in' | 'out'
  /** duração do Ken Burns em segundos */
  kenDuration?: number
  /** stops do mask fade (ex '10%' / '90%'); omitir = sem mask */
  maskStart?: string
  maskEnd?: string
  /** hero carrega eager + alta prioridade */
  eager?: boolean
  /** opacidade da imagem (footer usa 0.4) */
  imgOpacity?: number
  /** liga o parallax scroll-driven (só menu) */
  parallax?: boolean
  /** habilita zoom no hover (menu, desktop) */
  hoverScale?: boolean
  /** estado de hover controlado pelo container */
  hovered?: boolean
  /** object-position da imagem (ex '50% 70%' p/ subir o assunto) */
  objectPosition?: string
}

export function SceneMedia({
  image,
  alt,
  overlay,
  brightness,
  saturate,
  ken,
  kenDuration = 22,
  maskStart,
  maskEnd,
  eager = false,
  imgOpacity,
  parallax = false,
  hoverScale = false,
  hovered = false,
  objectPosition,
}: SceneMediaProps) {
  const maskValue =
    maskStart && maskEnd
      ? `linear-gradient(180deg, transparent 0%, #000 ${maskStart}, #000 ${maskEnd}, transparent 100%)`
      : undefined

  const wrapperStyle: CSSProperties = maskValue
    ? { maskImage: maskValue, WebkitMaskImage: maskValue }
    : {}

  const filter = `brightness(${brightness})${
    saturate !== undefined ? ` saturate(${saturate})` : ''
  }`

  // Ken Burns e hover-scale são mutuamente exclusivos e vivem no mesmo elemento.
  const motionStyle: CSSProperties = ken
    ? { animationName: ken === 'in' ? 'kbIn' : 'kbOut', animationDuration: `${kenDuration}s` }
    : hoverScale
      ? {
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 1s var(--ease-cine)',
          willChange: 'transform',
        }
      : {}

  const media = (
    <div className={`absolute inset-0${ken ? ' ken' : ''}`} style={motionStyle}>
      <picture className="block h-full w-full">
        <source srcSet={image.webp} type="image/webp" />
        <img
          src={image.jpg}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ filter, opacity: imgOpacity, objectPosition }}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : 'auto'}
          draggable={false}
        />
      </picture>
    </div>
  )

  return (
    <div className="absolute inset-0 overflow-hidden" style={wrapperStyle}>
      {parallax ? <div className="par">{media}</div> : media}
      <div
        className="absolute inset-0"
        style={{ background: overlay }}
        aria-hidden="true"
      />
    </div>
  )
}
