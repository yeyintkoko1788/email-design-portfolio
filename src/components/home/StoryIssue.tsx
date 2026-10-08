import { useEffect, useRef, useState, type ReactNode } from 'react'
import FlipStack from '../FlipStack'
import SoundToggle from '../SoundToggle'
import { clamp, useReducedMotion } from '../../lib/hooks'
import { useSound } from '../../lib/soundContext'
import { StoryContext } from '../../lib/storyContext'

/** Viewport heights of scrolling per page turn */
const STEP = 0.85
/** One flip at a time */
const FLIP_GAP = 700
/** A wheel/trackpad gesture has ended after this long without events */
const GESTURE_GAP = 200
/** Momentum that resumes within this long, still shrinking, is the same gesture */
const MOMENTUM_PAUSE = 700

/**
 * The opening story pages (cover, about, how I work). The section is pinned
 * while you scroll; every STEP of scrolling turns one page. Scrolling stays
 * native, so trackpads, keyboards and touch all work.
 */
export default function StoryIssue({
  pages,
  total = pages.length,
  anchors = [],
}: {
  pages: ReactNode[]
  /** Number shown after the slash in the page counter */
  total?: number
  /** Optional id per page, so links like /#process scroll (and turn) to that page */
  anchors?: string[]
}) {
  const ref = useRef<HTMLElement>(null)
  const n = pages.length
  const reduced = useReducedMotion()
  const { flip } = useSound()
  const [target, setTarget] = useState(0)
  const [index, setIndex] = useState(0)
  const lastFlip = useRef(0)

  useEffect(() => {
    // Read the scroll position on every scroll event (React skips the update
    // when the target page hasn't changed), so a turn never waits for a frame.
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const progress = -el.getBoundingClientRect().top
      setTarget(clamp(Math.round(progress / (window.innerHeight * STEP)), 0, n - 1))
    }
    const first = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(first)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [n])

  useEffect(() => {
    if (index === target) return
    // Out of view (e.g. after jumping to the work): no animation, no sound.
    const el = ref.current
    if (el && el.getBoundingClientRect().bottom <= 0) {
      const t = setTimeout(() => setIndex(target), 0)
      return () => clearTimeout(t)
    }
    const wait = Math.max(0, FLIP_GAP - (performance.now() - lastFlip.current))
    const t = setTimeout(() => {
      lastFlip.current = performance.now()
      setIndex((i) => i + Math.sign(target - i))
      flip()
    }, wait)
    return () => clearTimeout(t)
  }, [index, target, flip])

  // One gesture = one page. Inside the pinned pages, wheel/trackpad, swipe
  // and keyboard turn exactly one page and jump straight to that page's
  // scroll position, so momentum can't carry you past a page. Before the
  // first page and after the last one, the page scrolls normally.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const step = () => window.innerHeight * STEP
    const pinned = () => {
      const r = el.getBoundingClientRect()
      return r.top <= 1 && r.bottom >= window.innerHeight - 1
    }
    const current = () => clamp(Math.round(-el.getBoundingClientRect().top / step()), 0, n - 1)
    const canTurn = (dir: number) => pinned() && current() + dir >= 0 && current() + dir <= n - 1
    const turn = (dir: number) => {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top + (current() + dir) * step() + 1, behavior: 'instant' })
    }

    // Wheel / trackpad. A gesture is a run of wheel events without a pause.
    // Each gesture turns at most one page; the rest of it (including the
    // trackpad's momentum) is swallowed while the pages are pinned.
    // macOS momentum can pause and then resume; resumed momentum keeps
    // shrinking, so a "new" gesture that starts smaller than the last event,
    // in the same direction, soon after, is treated as the old one.
    let lastEvent = -Infinity
    let lastDelta = 0
    let lastDir = 0
    let turnedAt = -Infinity
    let armed = false
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      const now = performance.now()
      const d = Math.abs(e.deltaY)
      const dir = e.deltaY > 0 ? 1 : -1
      const gap = now - lastEvent
      if (gap > GESTURE_GAP) {
        const momentumResumed = gap < MOMENTUM_PAUSE && dir === lastDir && d < lastDelta
        armed = now - turnedAt > FLIP_GAP && !momentumResumed
      }
      lastEvent = now
      lastDelta = d
      lastDir = dir

      if (!pinned()) {
        // A gesture that scrolls into the pages from outside stops at their edge.
        armed = false
        return
      }
      if (armed && canTurn(dir)) {
        e.preventDefault()
        if (d < 2) return // wait for the gesture to get going
        armed = false
        turnedAt = now
        turn(dir)
      } else if (!armed) {
        e.preventDefault() // leftover of a gesture that already turned a page
      }
      // armed but can't turn: before the first page or after the last one, scroll normally
    }

    // Touch: a swipe turns one page.
    let startY: number | null = null
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (startY === null) return
      const dir = startY - e.touches[0].clientY > 0 ? 1 : -1
      if (canTurn(dir)) e.preventDefault()
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (startY === null) return
      const dy = startY - e.changedTouches[0].clientY
      startY = null
      const dir = dy > 0 ? 1 : -1
      if (Math.abs(dy) > 40 && canTurn(dir)) turn(dir)
    }

    // Keyboard: arrows, Page Up/Down and Space turn one page.
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element | null)?.closest?.('input, textarea, [contenteditable]')) return
      const down = e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)
      const up = e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)
      const dir = down ? 1 : up ? -1 : 0
      if (!dir || !canTurn(dir)) return
      e.preventDefault()
      turn(dir)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [n])

  const goTo = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + i * window.innerHeight * STEP + 1, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="issue"
      aria-label="The issue"
      style={{ height: `calc(100svh + ${((n - 1) * STEP + 0.4) * 100}vh)` }}
      className="relative"
    >
      {/* Link targets at each page's scroll position. The +64px cancels the
          page's scroll-padding-top, so a jump lands exactly on the page. */}
      {anchors.map((id, i) => (
        <div
          key={id}
          id={id}
          aria-hidden
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `calc(${i * STEP * 100}vh + ${i ? 65 : 0}px)` }}
        />
      ))}
      <div className="sticky top-0 h-svh overflow-hidden">
        <StoryContext.Provider value={{ next: () => goTo(index + 1) }}>
          <FlipStack
            pages={pages}
            index={index}
            onNext={() => goTo(index + 1)}
            className="h-full [perspective:260vw]"
          />
        </StoryContext.Provider>
        <div className="label pointer-events-none absolute bottom-4 left-1/2 z-[300] flex -translate-x-1/2 items-center gap-3">
          <span>
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </span>
          <SoundToggle className="pointer-events-auto" />
        </div>
      </div>
    </section>
  )
}
