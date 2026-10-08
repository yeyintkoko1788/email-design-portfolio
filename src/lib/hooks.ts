import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const m = window.matchMedia(query)
      m.addEventListener('change', onChange)
      return () => m.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
/** Desktop and iPad: horizontal gallery and two-page book */
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)')

/** True once the element has scrolled into view (or every time, with once = false). */
export function useInView<T extends Element>(amount = 0.25, once = true) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: amount },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [amount, once])
  return [ref, inView] as const
}

/**
 * Index of the page whose content should reveal. Lags behind `index` so text
 * springs in after the page has mostly turned (and shortly after first mount).
 */
export function useShownIndex(index: number) {
  const [shown, setShown] = useState(-1)
  useEffect(() => {
    if (shown === index) return
    const t = setTimeout(() => setShown(index), shown === -1 ? 60 : 550)
    return () => clearTimeout(t)
  }, [index, shown])
  return shown
}

/**
 * When turning back, the sheet that is returning must stay on top until it
 * lands. Returns that sheet's index for ~650ms after a backwards flip.
 */
export function useSettlingSheet(index: number) {
  const [prev, setPrev] = useState(index)
  const [settling, setSettling] = useState<number | null>(null)
  if (index !== prev) {
    setPrev(index)
    setSettling(index < prev ? index : null)
  }
  useEffect(() => {
    if (settling === null) return
    const t = setTimeout(() => setSettling(null), 650)
    return () => clearTimeout(t)
  }, [settling])
  return settling
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
