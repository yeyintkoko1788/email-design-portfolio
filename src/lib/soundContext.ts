import { createContext, useContext } from 'react'

export type SoundState = {
  enabled: boolean
  toggle: () => void
  /** Plays the page-flip sound if sound is on and audio is unlocked. */
  flip: () => void
}

export const SoundContext = createContext<SoundState>({
  enabled: false,
  toggle: () => {},
  flip: () => {},
})

export const useSound = () => useContext(SoundContext)
