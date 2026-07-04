import { SceneMedia } from '../components/SceneMedia'
import { SceneMarker } from '../components/SceneMarker'
import { images } from '../assets/images'

export function Footer() {
  return (
    <footer
      id="contato"
      className="relative overflow-hidden"
      style={{
        background: '#0b0705',
        paddingTop: 'clamp(96px, 16vh, 200px)',
      }}
    >
      <SceneMedia
        image={images.footer}
        alt="Xícara vazia sobre a mesa ao fim do expediente"
        overlay="linear-gradient(180deg, #0b0705, rgba(11,7,5,0.55) 45%, rgba(11,7,5,0.85))"
        brightness={0.7}
        imgOpacity={0.4}
        ken="in"
        kenDuration={28}
      />

      <SceneMarker label="05 · CONTATO" />

      <div
        className="relative z-10"
        style={{ paddingLeft: 'var(--pad-x)', paddingRight: 'var(--pad-x)' }}
      >
        {/* Linha de links */}
        <div
          className="flex flex-wrap items-center justify-between font-text uppercase"
          style={{ gap: 20, fontSize: 11, letterSpacing: '0.28em' }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            INSTAGRAM ↗ @TORRA.CAFE
          </a>
          <a
            href="https://wa.me/5511988880000"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            WHATSAPP ↗ +55 11 98888-0000
          </a>
          <span style={{ color: 'rgba(242,236,225,0.4)' }}>
            RUA DO PONTO, 128 — SP
          </span>
        </div>

        {/* Linha divisória */}
        <div
          aria-hidden="true"
          style={{
            marginTop: 'clamp(36px, 6vw, 72px)',
            height: 1,
            background:
              'linear-gradient(90deg, rgba(201,151,63,0.75), rgba(201,151,63,0.1))',
          }}
        />

        {/* Créditos */}
        <p
          className="font-text uppercase"
          style={{
            marginTop: 'clamp(28px, 4vw, 48px)',
            textAlign: 'center',
            fontSize: 9,
            letterSpacing: '0.3em',
            lineHeight: 1.8,
            color: 'rgba(242,236,225,0.5)',
          }}
        >
          © 2026 TORRA. TORREFAÇÃO E CAFÉ LTDA · CNPJ 00.000.000/0001-00 ·
          PINHEIROS, SÃO PAULO — SP
        </p>

        {/* Crédito de desenvolvimento */}
        <p
          className="font-text uppercase"
          style={{
            marginTop: 14,
            textAlign: 'center',
            fontSize: 9,
            letterSpacing: '0.3em',
            color: 'rgba(242,236,225,0.32)',
          }}
        >
          DESENVOLVIDO POR{' '}
          <a
            href="https://gustavodev.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GUSTAVO DEV
          </a>
        </p>
      </div>

      {/* Assinatura de fechamento — TORRA. cortado pela borda inferior */}
      <div
        aria-hidden="true"
        className="relative z-10 flex justify-center"
        style={{
          marginTop: 'clamp(48px, 8vw, 110px)',
          height: 'clamp(64px, 13vw, 250px)',
          overflow: 'hidden',
        }}
      >
        <div
          className="font-display text-cream"
          style={{
            position: 'relative',
            display: 'inline-block',
            fontSize: 'clamp(120px, 26vw, 500px)',
            lineHeight: 0.78,
            letterSpacing: '-0.015em',
            whiteSpace: 'nowrap',
          }}
        >
          TORRA
          {/* o ponto vira acento sobreposto p/ não deslocar a centralização de "TORRA" */}
          <span
            className="text-gold"
            style={{ position: 'absolute', left: '100%' }}
          >
            .
          </span>
        </div>
      </div>
    </footer>
  )
}
