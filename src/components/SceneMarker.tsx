interface SceneMarkerProps {
  label: string
  /** hero fica mais abaixo por causa da navbar */
  offset?: 'default' | 'hero'
}

/** Marcador "CENA XX · NOME" reutilizável, canto sup. esquerdo. */
export function SceneMarker({ label, offset = 'default' }: SceneMarkerProps) {
  return (
    <div
      className="absolute z-10 flex items-center gap-3"
      style={{
        top: offset === 'hero' ? 96 : 28,
        left: 'var(--pad-x)',
        background: 'rgba(18,13,9,0.5)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        padding: '8px 14px',
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: 30, height: 1, background: 'var(--color-gold)' }}
      />
      <span
        className="font-text text-gold uppercase"
        style={{ fontWeight: 600, fontSize: 9.5, letterSpacing: '0.34em' }}
      >
        {label}
      </span>
    </div>
  )
}
