import { Volume2, VolumeX } from 'lucide-react'
import { useSound } from '../lib/soundContext'

export default function SoundToggle({ className = '' }: { className?: string }) {
  const { enabled, toggle } = useSound()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      className={`label inline-flex items-center gap-1.5 rounded-full border border-ink/25 bg-paper/85 px-3 py-1.5 backdrop-blur transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {enabled ? <Volume2 size={12} aria-hidden /> : <VolumeX size={12} aria-hidden />}
      Sound {enabled ? 'on' : 'off'}
    </button>
  )
}
