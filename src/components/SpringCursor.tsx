import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../lib/hooks'

const CLICKABLE = '[data-cursor], a, button, [role="button"], [role="slider"]'

/**
 * Red dot that follows the mouse on a spring. Over clickable things it grows,
 * and shows the element's data-cursor label (NEXT, BACK, OPEN, VIEW, MAIL).
 * Off on touch devices and with reduced motion.
 */
export default function SpringCursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const enabled = fine && !reduced
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const label = labelRef.current
    if (!enabled || !dot || !label) return
    const root = document.documentElement
    root.classList.add('spring-cursor')

    let tx = 0, ty = 0, px = 0, py = 0, vx = 0, vy = 0
    let started = false
    let raf = 0

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tx = e.clientX
      ty = e.clientY
      if (!started) {
        px = tx
        py = ty
        started = true
      }
      dot.style.opacity = '1'
      const target = (e.target as Element | null)?.closest?.(CLICKABLE) as HTMLElement | null
      const text = target?.dataset.cursor ?? ''
      dot.classList.toggle('big', !!text)
      dot.classList.toggle('hover', !!target && !text)
      if (text) label.textContent = text
    }
    const onLeave = () => {
      dot.style.opacity = '0'
    }
    const loop = () => {
      vx += (tx - px) * 0.18
      vy += (ty - py) * 0.18
      vx *= 0.68
      vy *= 0.68
      px += vx
      py += vy
      dot.style.transform = `translate3d(${px}px, ${py}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      root.classList.remove('spring-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={dotRef} className="spring-cursor-dot" aria-hidden>
      <span ref={labelRef} />
    </div>
  )
}
