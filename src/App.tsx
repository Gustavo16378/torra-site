import { lazy, Suspense } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { Menu } from './sections/Menu'
import { Origem } from './sections/Origem'
import { Casa } from './sections/Casa'
import { Footer } from './sections/Footer'

// Leaflet (~41KB) fica fora do bundle inicial — carrega só quando o mapa monta.
const Mapa = lazy(() => import('./sections/Mapa'))

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
        <Suspense
          fallback={
            <div
              aria-hidden="true"
              style={{ height: 'clamp(520px, 92vh, 940px)', background: '#0b0705' }}
            />
          }
        >
          <Mapa />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
