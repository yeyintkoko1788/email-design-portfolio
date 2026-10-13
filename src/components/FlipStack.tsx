import type { MouseEvent, PointerEvent, ReactNode } from 'react'
import { useSettlingSheet, useShownIndex } from '../lib/hooks'

const INTERACTIVE = 'a, button, input, [role="slider"], [data-noflip]'

/**
 * A stack of single pages. Pages before `index` are turned over to the left
 * around the left edge. Used full-screen for the home story pages and for the
 * one-page-at-a-time book on phones.
 *
 * Clicking the page turns it, like a book: the right half goes forward, the
 * left half (when `onPrev` is given) goes back. `onEnd` handles a forward
 * click on the last page.
 */
export default function FlipStack({
  pages,
  index,
  onNext,
  onPrev,
  onEnd,
  className = '',
  pageClassName = '',
}: {
  pages: ReactNode[]
  index: number
  onNext?: () => void
  onPrev?: () => void
  onEnd?: () => void
  className?: string
  pageClassName?: string
}) {
  const shown = useShownIndex(index)
  const settling = useSettlingSheet(index)
  const n = pages.length

  /** What a click at this spot does: forward on the right half, back on the left. */
  const actionAt = (i: number, e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    const forward = !onPrev || e.clientX >= r.left + r.width / 2
    if (forward) return i < n - 1 ? onNext && { go: onNext, label: 'NEXT' } : onEnd && { go: onEnd, label: 'NEXT' }
    return i > 0 ? { go: onPrev, label: 'BACK' } : undefined
  }

  const handleClick = (i: number) => (e: MouseEvent) => {
    if (i !== index) return
    if ((e.target as Element).closest(INTERACTIVE)) return
    actionAt(i, e)?.go()
  }

  // The cursor reads data-cursor, so set it to match the half under the pointer
  const handleMove = (i: number) => (e: PointerEvent) => {
    const label = actionAt(i, e)?.label
    if (label) e.currentTarget.setAttribute('data-cursor', label)
    else e.currentTarget.removeAttribute('data-cursor')
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
              onPointerMove={handleMove(i)}
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
