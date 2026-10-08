import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { SoundContext } from '../lib/soundContext'
import { playFlip, unlockAudio } from '../lib/sound'

const STORAGE_KEY = 'nang-sound'

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

export default function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(readStored)

  useEffect(() => {
    const unlock = () => unlockAudio()
    const events = ['pointerdown', 'keydown', 'touchend'] as const
    events.forEach((e) => window.addEventListener(e, unlock, { passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, unlock))
  }, [])

  const toggle = useCallback(() => {
    unlockAudio()
    setEnabled((on) => {
      try {
        localStorage.setItem(STORAGE_KEY, on ? 'off' : 'on')
      } catch {
        // Storage can be blocked; the toggle still works for this visit.
      }
      return !on
    })
  }, [])

  const flip = useCallback(() => {
    if (enabled) playFlip()
  }, [enabled])

  const value = useMemo(() => ({ enabled, toggle, flip }), [enabled, toggle, flip])
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
