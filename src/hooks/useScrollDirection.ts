import { useEffect, useState } from 'react'

export interface ScrollState {
  /** true = navbar deve aparecer (scroll pra cima ou topo) */
  visible: boolean
  /** true = já saiu do topo (aplica fundo sólido/blur) */
  scrolled: boolean
}

/**
 * Esconde a navbar ao scrollar pra baixo, mostra ao subir.
 * `lastY` só é atualizado quando o movimento passa do threshold, então
 * micro-scrolls (trackpad / smooth) acumulam até virar uma direção real —
 * evita a navbar "tentar sumir e não conseguir".
 */
export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    visible: true,
    scrolled: false,
  })

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      ticking = false
      const y = window.scrollY
      const scrolled = y > 8

      // perto do topo: sempre visível
      if (y < 90) {
        lastY = y
        setState((prev) =>
          prev.visible && prev.scrolled === scrolled
            ? prev
            : { visible: true, scrolled },
        )
        return
      }

      const diff = y - lastY
      // ignora jitter, mas NÃO força visível — deixa acumular
      if (Math.abs(diff) < 6) return

      const visible = diff < 0 // subindo = mostra
      lastY = y
      setState((prev) =>
        prev.visible === visible && prev.scrolled === scrolled
          ? prev
          : { visible, scrolled },
      )
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
