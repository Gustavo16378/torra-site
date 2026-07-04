import { SceneMedia } from '../components/SceneMedia'
import { SceneMarker } from '../components/SceneMarker'
import { images } from '../assets/images'

export function Hero() {
  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center"
    >
      <SceneMedia
        image={images.hero}
        alt="Extração de espresso em xícara branca sobre pedra escura"
        overlay="linear-gradient(180deg, rgba(18,13,9,0.45), rgba(18,13,9,0.22) 45%, rgba(18,13,9,0.7))"
        brightness={0.88}
        saturate={0.95}
        ken="in"
        kenDuration={20}
        eager
      />

      {/* faixa inferior fundindo para o fundo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '22vh',
          background: 'linear-gradient(180deg, transparent, #120d09)',
        }}
      />

      <SceneMarker label="TORREFAÇÃO PRÓPRIA · PINHEIROS, SP" offset="hero" />

      <div
        className="relative z-10 flex flex-col items-center"
        style={{ paddingLeft: 'var(--pad-x)', paddingRight: 'var(--pad-x)' }}
      >
        <h1
          className="font-display text-cream"
          style={{
            fontSize: 'clamp(64px, 18vw, 400px)',
            lineHeight: 0.92,
            letterSpacing: '-0.015em',
          }}
        >
          TORRA<span className="text-gold">.</span>
        </h1>

        <p
          className="font-text text-cream"
          style={{
            marginTop: 'clamp(16px, 2.5vw, 34px)',
            fontWeight: 600,
            fontSize: 'clamp(10px, 1vw, 13px)',
            letterSpacing: '0.44em',
          }}
        >
          CAFÉS ESPECIAIS · TORRA PRÓPRIA · DESDE 2019
        </p>

        <a
          href="#menu"
          onClick={scrollToMenu}
          className="ghost-cta font-text"
          style={{ marginTop: 'clamp(32px, 4vw, 52px)', fontSize: 11 }}
        >
          VER O MENU
        </a>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden="true"
        className="absolute z-10 flex flex-col items-center"
        style={{ bottom: 34, gap: 14 }}
      >
        <span
          className="font-text text-cream"
          style={{
            fontWeight: 600,
            fontSize: 9.5,
            letterSpacing: '0.34em',
            opacity: 0.6,
          }}
        >
          SCROLL
        </span>
        <span className="scroll-track">
          <span className="scroll-fiber" />
        </span>
      </div>
    </section>
  )
}
