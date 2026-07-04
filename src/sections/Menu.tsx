import { useState } from 'react'
import { SceneMedia } from '../components/SceneMedia'
import { SceneMarker } from '../components/SceneMarker'
import { CardapioCompleto } from './CardapioCompleto'
import { images, type SceneImage } from '../assets/images'

interface Tomada {
  n: string
  name: string
  image: SceneImage
  alt: string
  price: string
  desc: string
  /** enquadramento — sobe o assunto que fica na parte baixa da foto */
  objPos: string
}

const TOMADAS: Tomada[] = [
  {
    n: '01',
    name: 'ESPRESSO',
    image: images.espresso,
    alt: 'Espresso curto com crema dourada',
    price: 'R$ 8',
    desc: 'Blend da casa, moído na hora. 30ml.',
    objPos: '50% 72%',
  },
  {
    n: '02',
    name: 'LATTE',
    image: images.latte,
    alt: 'Latte com arte em microespuma',
    price: 'R$ 14',
    desc: 'Espresso duplo, leite vaporizado e microespuma. 300ml.',
    objPos: '50% 66%',
  },
  {
    n: '03',
    name: 'COLD BREW',
    image: images.coldbrew,
    alt: 'Cold brew servido gelado',
    price: 'R$ 16',
    desc: 'Infusão a frio por 18 horas. Servido gelado. 250ml.',
    objPos: '50% 52%',
  },
  {
    n: '04',
    name: 'V60',
    image: images.v60,
    alt: 'Método V60 em despejo lento',
    price: 'R$ 18',
    desc: 'Coado manual com o grão do dia. 240ml.',
    objPos: '50% 58%',
  },
]

function isDesktopHover() {
  return window.matchMedia('(hover: hover) and (min-width: 861px)').matches
}

function MenuStrip({ tomada }: { tomada: Tomada }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(340px, 64vh, 700px)' }}
      onMouseEnter={() => isDesktopHover() && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SceneMedia
        image={tomada.image}
        alt={tomada.alt}
        overlay="linear-gradient(180deg, rgba(18,13,9,0.32), rgba(18,13,9,0.1) 42%, rgba(18,13,9,0.66))"
        brightness={0.92}
        maskStart="7%"
        maskEnd="93%"
        objectPosition={tomada.objPos}
        parallax
        hoverScale
        hovered={hovered}
      />

      {/* Label TOMADA 0X */}
      <div
        className="absolute z-10 flex items-center gap-3"
        style={{ top: 26, left: 'var(--pad-x)' }}
      >
        <span
          aria-hidden="true"
          style={{ width: 24, height: 1, background: 'var(--color-gold)' }}
        />
        <span
          className="font-text text-gold uppercase"
          style={{ fontWeight: 600, fontSize: 10, letterSpacing: '0.34em' }}
        >
          DESTAQUE {tomada.n}
        </span>
      </div>

      {/* Conteúdo no rodapé: nome à esquerda, preço+descrição à direita */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4"
        style={{
          padding: 'clamp(24px, 3.5vw, 52px) var(--pad-x)',
        }}
      >
        <h3
          className="font-display text-cream"
          style={{
            fontSize: 'clamp(48px, 8.5vw, 150px)',
            lineHeight: 0.95,
            letterSpacing: '-0.015em',
            transform: hovered ? 'translateX(22px)' : 'translateX(0)',
            transition: 'transform 0.9s var(--ease-cine)',
          }}
        >
          {tomada.name}
        </h3>

        <div className="ml-auto text-right" style={{ maxWidth: 320 }}>
          <div
            className="font-text text-gold"
            style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.3em' }}
          >
            {tomada.price}
          </div>
          <p
            className="font-text"
            style={{
              marginTop: 12,
              fontWeight: 300,
              fontSize: 'clamp(14px, 1vw, 16px)',
              lineHeight: 1.65,
              color: 'rgba(242,236,225,0.75)',
            }}
          >
            {tomada.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Menu() {
  return (
    <section id="menu" className="relative">
      <SceneMarker label="02 · DESTAQUES DA CASA" />

      {/* Título cortado pela borda superior */}
      <div
        className="menu-titulo overflow-hidden"
        style={{ paddingLeft: 'var(--pad-x)' }}
      >
        <h2
          className="font-display text-cream"
          style={{
            fontSize: 'clamp(120px, 24vw, 460px)',
            lineHeight: 0.85,
            letterSpacing: '-0.015em',
            marginTop: '-0.31em',
            whiteSpace: 'nowrap',
          }}
        >
          MENU
        </h2>
      </div>

      {TOMADAS.map((tomada) => (
        <MenuStrip key={tomada.n} tomada={tomada} />
      ))}

      <CardapioCompleto />
    </section>
  )
}
