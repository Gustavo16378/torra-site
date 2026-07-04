import { SceneMedia } from '../components/SceneMedia'
import { SceneMarker } from '../components/SceneMarker'
import { RevealText } from '../components/RevealText'
import { images } from '../assets/images'

export function Casa() {
  return (
    <section
      id="casa"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden"
      style={{
        paddingTop: 'clamp(90px, 12vh, 160px)',
        paddingBottom: 'clamp(48px, 8vh, 96px)',
        paddingLeft: 'var(--pad-x)',
        paddingRight: 'var(--pad-x)',
      }}
    >
      <SceneMedia
        image={images.casa}
        alt="Interior da cafeteria TORRA em Pinheiros"
        overlay="linear-gradient(180deg, rgba(18,13,9,0.4), rgba(18,13,9,0.2) 45%, rgba(18,13,9,0.78))"
        brightness={0.85}
        ken="out"
        kenDuration={26}
        maskStart="10%"
        maskEnd="92%"
      />

      <SceneMarker label="04 · A CASA" />

      <div className="relative z-10 w-full">
        <RevealText
          className="font-text uppercase text-cream"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(13px, 1.2vw, 16px)',
            letterSpacing: '0.14em',
          }}
        >
          RUA DO PONTO, 128 — PINHEIROS, SÃO PAULO
        </RevealText>

        <RevealText
          as="h2"
          delay={100}
          className="font-display text-cream"
          style={{
            marginTop: 'clamp(14px, 1.6vw, 24px)',
            fontSize: 'clamp(44px, 7.5vw, 140px)',
            lineHeight: 0.98,
            letterSpacing: '-0.015em',
          }}
        >
          SEG–SÁB <span className="text-gold">·</span> 7H–19H
        </RevealText>

        <RevealText
          delay={180}
          className="font-text uppercase"
          style={{
            marginTop: 'clamp(18px, 2.4vw, 32px)',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'rgba(242,236,225,0.55)',
          }}
        >
          DOMINGO · 8H–14H · WI-FI · PET FRIENDLY · CARTÕES E PIX
        </RevealText>
      </div>
    </section>
  )
}
