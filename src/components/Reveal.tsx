import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../lib/hooks'

/** Wrapper that adds .show when scrolled into view, so its .rv children spring in. */
export function Reveal({
  as: Tag = 'div',
  className = '',
  amount = 0.25,
  id,
  children,
}: {
  as?: ElementType
  className?: string
  amount?: number
  id?: string
  children: ReactNode
}) {
  const [ref, inView] = useInView<HTMLElement>(amount)
  return (
    <Tag ref={ref} id={id} className={`${className} ${inView ? 'show' : ''}`}>
      {children}
    </Tag>
  )
}

/** One staggered reveal item: i = position in the stagger (0.1s each). */
export function Rv({
  as: Tag = 'div',
  i = 0,
  className = '',
  style,
  children,
}: {
  as?: ElementType
  i?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <Tag className={`rv ${className}`} style={{ '--i': i, ...style } as CSSProperties}>
      {children}
    </Tag>
  )
}
