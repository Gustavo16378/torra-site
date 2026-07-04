import { SceneMedia } from '../components/SceneMedia'
import { SceneMarker } from '../components/SceneMarker'
import { RevealText } from '../components/RevealText'
import { images } from '../assets/images'

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="relative flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: '96vh',
        paddingTop: 'clamp(80px, 12vh, 160px)',
        paddingBottom: 'clamp(80px, 12vh, 160px)',
        paddingLeft: 'var(--pad-x)',
        paddingRight: 'var(--pad-x)',
      }}
    >
      <SceneMedia
        image={images.manifesto}
        alt="Vapor subindo de um café recém extraído"
        overlay="linear-gradient(90deg, rgba(18,13,9,0.72), rgba(18,13,9,0.35) 60%, rgba(18,13,9,0.55))"
        brightness={0.82}
        ken="out"
        kenDuration={22}
        maskStart="4%"
        maskEnd="96%"
      />

      <SceneMarker label="01 · SOBRE NÓS" />

      <div className="relative z-10 w-full">
        <RevealText
          as="h2"
          className="font-display text-cream"
          style={{
            fontSize: 'clamp(42px, 7.2vw, 134px)',
            lineHeight: 0.98,
            letterSpacing: '-0.015em',
          }}
        >
          TORRAMOS AQUI.
          <br />
          MOEMOS NA HORA.
          <br />
          SERVIMOS NO PONTO.
        </RevealText>

        <RevealText
          delay={120}
          aria-hidden="true"
          style={{
            marginTop: 'clamp(24px, 3vw, 40px)',
            width: 64,
            height: 2,
            background: 'var(--color-gold)',
          }}
        />

        <RevealText
          as="p"
          delay={180}
          className="font-text"
          style={{
            marginTop: 'clamp(28px, 4vw, 48px)',
            marginLeft: 'auto',
            maxWidth: 400,
            textAlign: 'right',
            fontWeight: 300,
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.75,
            color: 'rgba(242,236,225,0.78)',
          }}
        >
          Somos uma torrefação e cafeteria em Pinheiros. Torramos pequenos
          lotes toda semana e servimos cada grão no auge do frescor — do
          espresso ao coado.
        </RevealText>
      </div>
    </section>
  )
}
