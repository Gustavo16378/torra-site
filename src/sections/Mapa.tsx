import { useEffect, useRef } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { SceneMarker } from '../components/SceneMarker'
import { RevealText } from '../components/RevealText'

const CENTRO: [number, number] = [-23.5646, -46.6926]
const ZOOM_INICIAL = 12.4
const ZOOM_ALVO = 16.2

// Marcador customizado: anel pulsante + ponto gold + rótulo "TORRA." à direita.
const MARKER_HTML = `
  <span class="mapa-pulso" style="position:absolute;inset:-13px;border:1px solid rgba(201,151,63,0.55);border-radius:50%"></span>
  <span style="position:absolute;inset:0;background:#c9973f;border-radius:50%;box-shadow:0 0 24px rgba(201,151,63,0.85)"></span>
  <span style="position:absolute;left:30px;top:50%;transform:translateY(-50%);font-family:'Anton','Impact',sans-serif;font-size:17px;letter-spacing:-0.01em;text-transform:uppercase;color:#f2ece1;text-shadow:0 2px 14px rgba(11,7,5,0.9);white-space:nowrap">TORRA.</span>
`

/**
 * Seção MAPA — Leaflet puro (sem react-leaflet). Voo cinematográfico de
 * entrada disparado uma única vez via IntersectionObserver. Lazy-loaded pelo
 * App (React.lazy) para manter o Leaflet fora do bundle inicial.
 */
export default function Mapa() {
  const mapEl = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    const el = mapEl.current
    const section = sectionRef.current
    if (!el || !section) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const mapa = L.map(el, {
      center: CENTRO,
      zoom: ZOOM_INICIAL,
      zoomSnap: 0.2,
      minZoom: 10,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false, // nunca sequestrar o scroll da página
      dragging: !isMobile, // mobile: arrastar desabilitado (não travar scroll)
    })
    mapRef.current = mapa

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(mapa)

    const icon = L.divIcon({
      className: '',
      iconSize: [18, 18],
      iconAnchor: [9, 9],
      html: MARKER_HTML,
    })
    L.marker(CENTRO, { icon, keyboard: false, interactive: false }).addTo(mapa)

    const invalidate = window.setTimeout(() => mapa.invalidateSize(), 300)

    const voar = () => {
      // recalcula o tamanho real do container ANTES de projetar — sem isso, no
      // mobile o getSize pode vir defasado e o deslocamento joga o pin pra fora
      mapa.invalidateSize()
      const size = mapa.getSize()
      const narrow = size.x < 700
      // no mobile o card ocupa a largura toda embaixo: nada de empurrão lateral,
      // só sobe o pin pro terço superior (sempre visível acima do card)
      const fx = narrow ? 0 : 0.2
      const fy = narrow ? 0.22 : 0.16
      const p = mapa.project(CENTRO, ZOOM_ALVO)
      const alvo = mapa.unproject(
        p.subtract(L.point(size.x * fx, -size.y * fy)),
        ZOOM_ALVO,
      )
      if (reduce) {
        mapa.setView(alvo, ZOOM_ALVO)
      } else {
        mapa.flyTo(alvo, ZOOM_ALVO, { duration: 4, easeLinearity: 0.15 })
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            voar()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(section)

    return () => {
      window.clearTimeout(invalidate)
      observer.disconnect()
      mapa.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <section
      id="mapa"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#120d09' }}
    >
      {/* Container do Leaflet — isolation cria stacking context próprio,
          mantendo os panes internos abaixo dos overlays/UI */}
      <div
        ref={mapEl}
        style={{
          height: 'clamp(520px, 92vh, 940px)',
          background: '#0b0705',
          isolation: 'isolate',
        }}
      />

      {/* Costura visual — dois gradientes por cima do mapa */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, #120d09, rgba(18,13,9,0) 16%, rgba(18,13,9,0) 80%, #120d09)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(18,13,9,0.5), rgba(18,13,9,0) 28%, rgba(18,13,9,0) 74%, rgba(18,13,9,0.4))',
        }}
      />

      {/* Marcador da seção — canto sup. esquerdo */}
      <SceneMarker label="04 · COMO CHEGAR" />

      {/* Badge de coordenadas + controles de zoom — canto sup. direito */}
      <div
        className="absolute flex flex-col items-end"
        style={{ zIndex: 3, top: 28, right: 'var(--pad-x)', gap: 10 }}
      >
        <span
          className="mapa-coords font-text uppercase"
          style={{
            fontWeight: 600,
            fontSize: 9.5,
            letterSpacing: '0.22em',
            color: 'rgba(242,236,225,0.55)',
            background: 'rgba(18,13,9,0.5)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: '8px 14px',
          }}
        >
          23°33'53"S · 46°41'33"W
        </span>

        <div className="flex flex-col" style={{ gap: 8 }}>
          {(
            [
              { label: 'Aproximar', glyph: '+', fn: () => mapRef.current?.zoomIn() },
              { label: 'Afastar', glyph: '−', fn: () => mapRef.current?.zoomOut() },
            ] as const
          ).map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.fn}
              aria-label={btn.label}
              className="zoom-btn font-text flex items-center justify-center text-cream"
              style={{
                width: 38,
                height: 38,
                fontSize: 20,
                lineHeight: 1,
                background: 'rgba(18,13,9,0.65)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(242,236,225,0.22)',
                cursor: 'pointer',
              }}
            >
              {btn.glyph}
            </button>
          ))}
        </div>
      </div>

      {/* Card de endereço — canto inf. esquerdo */}
      <RevealText
        className="absolute"
        style={{
          zIndex: 3,
          left: 'var(--pad-x)',
          bottom: 'clamp(28px, 6vh, 64px)',
          maxWidth: 400,
          width: 'calc(100% - var(--pad-x) * 2)',
          background: 'rgba(18,13,9,0.82)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(242,236,225,0.14)',
          padding: 'clamp(24px, 3.4vw, 36px)',
        }}
      >
        <span
          className="font-text text-gold uppercase"
          style={{ fontWeight: 600, fontSize: 9.5, letterSpacing: '0.32em' }}
        >
          TORRA. — TORREFAÇÃO E CAFÉ
        </span>

        <div
          className="font-display text-cream"
          style={{
            marginTop: 'clamp(12px, 1.4vw, 18px)',
            fontSize: 'clamp(28px, 3.4vw, 52px)',
            lineHeight: 0.98,
            letterSpacing: '-0.015em',
          }}
        >
          RUA DO PONTO, 128
        </div>

        <div
          className="font-text"
          style={{
            marginTop: 8,
            fontWeight: 300,
            fontSize: 13,
            color: 'rgba(242,236,225,0.7)',
          }}
        >
          Pinheiros · São Paulo — SP
        </div>

        <div
          aria-hidden="true"
          style={{
            marginTop: 'clamp(18px, 2.2vw, 26px)',
            height: 1,
            background: 'rgba(242,236,225,0.14)',
          }}
        />

        <div
          className="font-text uppercase"
          style={{
            marginTop: 'clamp(16px, 2vw, 22px)',
            fontSize: 10,
            letterSpacing: '0.24em',
            lineHeight: 2,
            color: 'rgba(242,236,225,0.62)',
          }}
        >
          SEG–SÁB · 7H–19H — DOM · 8H–14H
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=-23.5646,-46.6926"
          target="_blank"
          rel="noopener noreferrer"
          className="rota-cta font-text uppercase"
          style={{
            marginTop: 'clamp(20px, 2.6vw, 30px)',
            padding: '13px 26px',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.26em',
          }}
        >
          TRAÇAR ROTA ↗
        </a>
      </RevealText>

      {/* Crédito do mapa — canto inf. direito */}
      <span
        className="absolute font-text uppercase"
        style={{
          zIndex: 3,
          right: 'var(--pad-x)',
          bottom: 16,
          fontSize: 8.5,
          letterSpacing: '0.18em',
          color: 'rgba(242,236,225,0.35)',
        }}
      >
        MAPA © OPENSTREETMAP · © CARTO
      </span>
    </section>
  )
}
