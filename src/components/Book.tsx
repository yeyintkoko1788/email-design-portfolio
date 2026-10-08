import type { MouseEvent, ReactNode } from 'react'
import { useSettlingSheet, useShownIndex } from '../lib/hooks'

export type Spread = { name: string; left: ReactNode; right: ReactNode }

const INTERACTIVE = 'a, button, input, [role="slider"], [data-noflip]'

/**
 * Two-page book. Each sheet sits on the right half: its front is spread i's
 * right page, its back is spread i+1's left page. Turning a sheet rotates it
 * -180deg around the spine.
 */
export default function Book({
  spreads,
  index,
  onNext,
  onPrev,
  className = '',
}: {
  spreads: Spread[]
  index: number
  onNext: () => void
  onPrev: () => void
  className?: string
}) {
  const shown = useShownIndex(index)
  const settling = useSettlingSheet(index)
  const n = spreads.length
  const sheets = spreads.slice(0, -1)
  const last = spreads[n - 1]

  const turn = (go: () => void) => (e: MouseEvent) => {
    if ((e.target as Element).closest(INTERACTIVE)) return
    go()
  }
  const show = (spread: number) => (spread === shown ? 'show' : '')

  return (
    <div className={`flip-stack ${className}`}>
      <div
        className={`book-static-left spine-l ${show(0)}`}
        aria-hidden={index !== 0}
        inert={index !== 0}
      >
        {spreads[0].left}
      </div>
      <div
        className={`book-static-right spine-r ${show(n - 1)}`}
        aria-hidden={index !== n - 1}
        inert={index !== n - 1}
      >
        {last.right}
      </div>
      {sheets.map((spread, i) => {
        const flipped = i < index
        const raised = flipped || i === settling
        return (
          <div
            key={spread.name}
            className={`flip-sheet book-sheet ${flipped ? 'is-flipped' : ''}`}
            style={{ zIndex: raised ? 100 + i : n - i }}
          >
            <div
              className={`flip-face spine-r ${show(i)}`}
              onClick={turn(onNext)}
              data-cursor="NEXT"
              aria-hidden={i !== index}
              inert={i !== index}
            >
              {spread.right}
            </div>
            <div
              className={`flip-face flip-back spine-l ${show(i + 1)}`}
              onClick={turn(onPrev)}
              data-cursor="BACK"
              aria-hidden={i + 1 !== index}
              inert={i + 1 !== index}
            >
              {spreads[i + 1].left}
            </div>
          </div>
        )
      })}
    </div>
  )
}
