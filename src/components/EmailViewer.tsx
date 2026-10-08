import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { MotionOverlay, type Motion } from './case/EmailFrame'

export type ViewerEmail = {
  title: string
  mobile: string
  desktop?: string
  motion?: Motion
}

/** Full-height email in a scrollable phone (or desktop) frame. */
export default function EmailViewer({ email, onClose }: { email: ViewerEmail; onClose: () => void }) {
  const [mode, setMode] = useState<'mobile' | 'desktop'>('mobile')
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  const desktop = mode === 'desktop' && email.desktop
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={email.title}
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center gap-4 bg-ink/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      data-cursor="CLOSE"
    >
      <div className="flex w-full max-w-[900px] items-center justify-between text-paper" onClick={(e) => e.stopPropagation()} data-cursor="">
        <p className="label">{email.title}</p>
        <div className="flex items-center gap-3">
          {email.desktop && (
            <div className="label inline-flex overflow-hidden rounded-full border border-paper/60">
              {(['mobile', 'desktop'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`px-3 py-1 transition-colors ${mode === m ? 'bg-paper text-ink' : ''}`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 hover:text-accent">
            <X size={20} />
          </button>
        </div>
      </div>
      <div
        className={`no-scrollbar overflow-y-auto bg-white ${
          desktop
            ? 'h-[80svh] w-full max-w-[900px] rounded-md'
            : 'h-[80svh] w-[min(390px,100%)] rounded-[28px] border-[6px] border-ink'
        }`}
        onClick={(e) => e.stopPropagation()}
        data-cursor=""
      >
        <div className="relative">
          <img src={desktop ? email.desktop : email.mobile} alt={email.title} className="block w-full" />
          {email.motion && <MotionOverlay motion={email.motion} />}
        </div>
      </div>
    </div>
  )
}
