import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { useScrollSpy } from '../hooks/useScrollSpy'

const LINKS = [
  { id: 'menu', label: 'MENU' },
  { id: 'origem', label: 'ORIGEM' },
  { id: 'casa', label: 'CASA' },
  { id: 'contato', label: 'CONTATO' },
] as const

const SPY_IDS = ['hero', 'manifesto', 'menu', 'origem', 'casa', 'contato']

export function Navbar() {
  const { visible, scrolled } = useScrollDirection()
  const active = useScrollSpy(SPY_IDS)
  const [open, setOpen] = useState(false)

  // Scroll lock estilo iOS: position:fixed + top:-scrollY (nunca overflow:hidden,
  // que no Safari iOS não trava e a página continua rolando por trás).
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'

    return () => {
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [open])

  // Fecha no Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // espera o unlock do scroll (2 frames) antes de rolar até a seção
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  }

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          background: scrolled
            ? 'rgba(18,13,9,0.85)'
            : 'linear-gradient(180deg, rgba(18,13,9,0.72), rgba(18,13,9,0))',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          // NUNCA transition-all — só o que realmente anima
          transitionProperty: 'transform, background-color, backdrop-filter',
          transitionDuration: '0.6s',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <nav
          className="flex items-center justify-between"
          style={{
            height: 74,
            paddingLeft: 'var(--pad-x)',
            paddingRight: 'var(--pad-x)',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              go('hero')
            }}
            className="font-display text-cream select-none"
            style={{ fontSize: 24, lineHeight: 1, letterSpacing: '-0.01em' }}
            aria-label="TORRA — início"
          >
            TORRA<span className="text-gold">.</span>
          </a>

          {/* Links desktop — mobile-first: escondidos por padrão, aparecem ≥861px */}
          <ul
            className="hidden items-center min-[861px]:flex"
            style={{ gap: 44 }}
          >
            {LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(link.id)
                    }}
                    className="font-text transition-colors"
                    style={{
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: '0.3em',
                      transitionDuration: '0.6s',
                      color: isActive
                        ? 'var(--color-gold)'
                        : 'rgba(242,236,225,0.75)',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Hambúrguer mobile — visível por padrão, some ≥861px */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-col justify-center min-[861px]:hidden"
            style={{ width: 28, height: 20, gap: 7 }}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <span style={{ display: 'block', width: 28, height: 2, background: 'var(--color-cream)' }} />
            <span style={{ display: 'block', width: 28, height: 2, background: 'var(--color-cream)' }} />
          </button>
        </nav>
      </header>

      {/* Menu mobile via portal — overlay (9998) + panel (9999), inline styles */}
      {open &&
        createPortal(
          <>
            {/* Overlay: fundo sólido fullscreen */}
            <div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9998,
                background: '#120d09',
              }}
            />

            {/* Panel: conteúdo do menu */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                pointerEvents: 'none', // deixa cliques vazios caírem no overlay p/ fechar
              }}
            >
              {/* Botão FECHAR bordado, canto sup. direito */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-text"
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 'var(--pad-x)',
                  pointerEvents: 'auto',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.3em',
                  color: 'rgba(242,236,225,0.75)',
                  background: 'transparent',
                  border: '1px solid rgba(242,236,225,0.25)',
                  padding: '11px 20px',
                  cursor: 'pointer',
                }}
              >
                FECHAR
              </button>

              {/* Links empilhados */}
              <nav
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingLeft: 'var(--pad-x)',
                  paddingRight: 'var(--pad-x)',
                  alignItems: 'flex-start',
                  // container não captura clique — só os links (auto), o vazio
                  // cai no overlay atrás e fecha o menu
                }}
              >
                {LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(link.id)
                    }}
                    className="font-display text-cream"
                    style={{
                      pointerEvents: 'auto',
                      fontSize: '14vw',
                      lineHeight: 1.02,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Tagline */}
              <div
                className="font-text text-gold"
                style={{
                  paddingLeft: 'var(--pad-x)',
                  paddingBottom: 40,
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.34em',
                }}
              >
                TORREFAÇÃO E CAFÉ · PINHEIROS, SP
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
