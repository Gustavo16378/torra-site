import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealTextProps {
  children?: ReactNode
  /** elemento renderizado (div, h2, p, span…) */
  as?: ElementType
  /** delay escalonado em ms */
  delay?: number
  className?: string
  style?: CSSProperties
  'aria-hidden'?: boolean | 'true' | 'false'
}

/** Wrapper de reveal on scroll (opacity + translateY). */
export function RevealText({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  style,
  'aria-hidden': ariaHidden,
}: RevealTextProps) {
  const { ref, inView, armed } = useReveal<HTMLElement>()

  const revealClass = armed ? (inView ? 'reveal is-in' : 'reveal') : ''

  return (
    <Tag
      ref={ref}
      aria-hidden={ariaHidden}
      className={`${revealClass} ${className}`.trim()}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
