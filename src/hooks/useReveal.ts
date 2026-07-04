import { useLayoutEffect, useRef, useState } from 'react'

interface RevealState {
  /** true quando o elemento deve estar visível */
  inView: boolean
  /** true quando o reveal está armado (estado inicial escondido aplicado) */
  armed: boolean
}

/**
 * IntersectionObserver para reveals on scroll.
 * A decisão de armar acontece em useLayoutEffect (antes do paint) para não
 * piscar: só arma se o elemento estiver abaixo de 92% da viewport; caso
 * contrário nasce visível.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [state, setState] = useState<RevealState>({ inView: false, armed: false })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const top = el.getBoundingClientRect().top
    if (top < window.innerHeight * 0.92) {
      // já visível no load → nasce visível, sem armar
      setState({ inView: true, armed: false })
      return
    }

    setState({ inView: false, armed: true })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState({ inView: true, armed: true })
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, ...state }
}
