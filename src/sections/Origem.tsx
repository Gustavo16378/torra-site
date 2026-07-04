import { SceneMedia } from '../components/SceneMedia'
import { SceneMarker } from '../components/SceneMarker'
import { RevealText } from '../components/RevealText'
import { images } from '../assets/images'

const STATS = [
  { value: '12', label: 'DIAS DA COLHEITA À TORRA' },
  { value: '100%', label: 'ARÁBICA' },
  { value: '86', label: 'PONTOS ESCALA SCA' },
]

export function Origem() {
  return (
    <section
      id="origem"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      style={{
        paddingTop: 'clamp(90px, 12vh, 160px)',
        paddingBottom: 'clamp(90px, 12vh, 160px)',
        paddingLeft: 'var(--pad-x)',
        paddingRight: 'var(--pad-x)',
      }}
    >
      <SceneMedia
        image={images.origem}
        alt="Grãos de café verde do Cerrado Mineiro"
        overlay="linear-gradient(90deg, rgba(18,13,9,0.75), rgba(18,13,9,0.3) 55%, rgba(18,13,9,0.55))"
        brightness={0.78}
        ken="in"
        kenDuration={24}
        maskStart="10%"
        maskEnd="90%"
      />

      <SceneMarker label="03 · ORIGEM" />

      <div className="relative z-10 w-full" style={{ maxWidth: 1120 }}>
        <RevealText
          className="font-text text-gold uppercase"
          style={{ fontWeight: 600, fontSize: 10, letterSpacing: '0.34em' }}
        >
          DO CERRADO À XÍCARA
        </RevealText>

        <RevealText
          as="h2"
          delay={80}
          className="font-display text-cream"
          style={{
            marginTop: 'clamp(18px, 2vw, 28px)',
            fontSize: 'clamp(40px, 5.4vw, 100px)',
            lineHeight: 1,
            letterSpacing: '-0.015em',
          }}
        >
          TORRA PRÓPRIA,
          <br />
          TODO DIA.
        </RevealText>

        <RevealText
          as="p"
          delay={140}
          className="font-text"
          style={{
            marginTop: 'clamp(22px, 3vw, 36px)',
            maxWidth: 480,
            fontWeight: 300,
            fontSize: 'clamp(15px, 1.15vw, 18px)',
            lineHeight: 1.75,
            color: 'rgba(242,236,225,0.78)',
          }}
        >
          Grão único do Cerrado Mineiro, colhido maduro e torrado no fundo da
          casa em lotes pequenos. A gente acompanha da fazenda à moagem — e
          torra escuro porque gosta, não porque precisa.
        </RevealText>

        {/* Grid de estatísticas — espalhado por toda a largura */}
        <div
          className="flex flex-wrap"
          style={{
            marginTop: 'clamp(40px, 6vw, 72px)',
            justifyContent: 'space-between',
            gap: 'clamp(28px, 5vw, 64px)',
            borderTop: '1px solid rgba(242,236,225,0.16)',
            paddingTop: 'clamp(28px, 3vw, 44px)',
          }}
        >
          {STATS.map((stat, i) => (
            <RevealText key={stat.label} delay={i * 120} style={{ minWidth: 120 }}>
              <div
                className="font-display text-cream"
                style={{
                  fontSize: 'clamp(56px, 7vw, 120px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {stat.value}
              </div>
              <div
                className="font-text text-gold uppercase"
                style={{
                  marginTop: 12,
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.22em',
                }}
              >
                {stat.label}
              </div>
            </RevealText>
          ))}
        </div>

        <RevealText
          delay={300}
          className="font-text uppercase"
          style={{
            marginTop: 'clamp(28px, 3vw, 40px)',
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: '0.24em',
            color: 'rgba(242,236,225,0.45)',
          }}
        >
          FAZENDA SANTA FÉ — CERRADO MINEIRO, MG
        </RevealText>
      </div>
    </section>
  )
}
