import type { MouseEvent, ReactNode } from 'react'
import { useSettlingSheet, useShownIndex } from '../lib/hooks'

const INTERACTIVE = 'a, button, input, [role="slider"], [data-noflip]'

/**
 * A stack of single pages. Pages before `index` are turned over to the left
 * around the left edge. Used full-screen for the home story pages and for the
 * one-page-at-a-time book on phones.
 */
export default function FlipStack({
  pages,
  index,
  onNext,
  className = '',
  pageClassName = '',
}: {
  pages: ReactNode[]
  index: number
  onNext?: () => void
  className?: string
  pageClassName?: string
}) {
  const shown = useShownIndex(index)
  const settling = useSettlingSheet(index)
  const n = pages.length

  const handleClick = (i: number) => (e: MouseEvent) => {
    if (i !== index || i >= n - 1 || !onNext) return
    if ((e.target as Element).closest(INTERACTIVE)) return
    onNext()
  }

  return (
    <div className={`flip-stack ${className}`}>
      {pages.map((page, i) => {
        const flipped = i < index
        const raised = flipped || i === settling
        return (
          <div
            key={i}
            className={`flip-sheet ${flipped ? 'is-flipped' : ''}`}
            style={{ zIndex: raised ? 100 + i : n - i }}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div
              className={`flip-face ${pageClassName} ${i === shown ? 'show' : ''}`}
              onClick={handleClick(i)}
              data-cursor={onNext && i < n - 1 ? 'NEXT' : undefined}
            >
              {page}
            </div>
            <div className="flip-face flip-back flip-back-blank" />
          </div>
        )
      })}
    </div>
  )
}
