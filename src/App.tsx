import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Menu } from './sections/Menu'
import { Origem } from './sections/Origem'
import { Casa } from './sections/Casa'
import { Footer } from './sections/Footer'

// Leaflet (~41KB) fica fora do bundle inicial — o chunk e os tiles só são
// pedidos quando o placeholder chega perto da viewport (não competem com o LCP).
const Mapa = lazy(() => import('./sections/Mapa'))

const MAPA_H = 'clamp(520px, 92vh, 940px)'

function MapaLazy() {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const placeholder = (
    <div
      id="mapa"
      ref={ref}
      aria-hidden="true"
      style={{ height: MAPA_H, background: '#0b0705' }}
    />
  )
  if (!near) return placeholder
  return (
    <Suspense fallback={placeholder}>
      <Mapa />
    </Suspense>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Menu />
        <Origem />
        <Casa />
        <MapaLazy />
      </main>
      <Footer />
    </>
  )
}
