import type { ReactNode } from 'react'

// Scrapbook pieces for the About and How I work pages: tape, torn photo
// prints, polaroids, notes and hand-drawn doodles. Keep them small and few.

export function Tape({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 block h-[14%] min-h-3 w-[36%] bg-[#EDE3CF]/85 shadow-[0_1px_2px_rgba(26,26,26,.1)] [clip-path:polygon(0_8%,5%_0,95%_6%,100%_0,98%_92%,93%_100%,4%_94%,0_100%)] ${className}`}
    />
  )
}

const TORN =
  '[clip-path:polygon(0_2%,6%_0,15%_1.5%,26%_0,38%_2%,51%_0.5%,63%_2%,76%_0,88%_1.5%,100%_0.5%,99%_14%,100%_29%,98.5%_44%,100%_59%,99%_74%,100%_88%,98.5%_100%,85%_98.5%,72%_100%,58%_98%,45%_100%,31%_98.5%,18%_100%,6%_98%,0_99.5%,1.5%_84%,0_69%,1%_54%,0_39%,1.5%_24%,0_10%)]'

/** A photo print with torn paper edges. */
export function TornPhoto({ src, alt, className = '', imgClassName = '' }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  return (
    <div className={`drop-shadow-[0_10px_18px_rgba(26,26,26,.16)] ${className}`}>
      <div className={`bg-[#F6F1E7] p-[4%] ${TORN}`}>
        <img src={src} alt={alt} draggable={false} className={`block w-full object-cover ${imgClassName}`} />
      </div>
    </div>
  )
}

/** A small polaroid, optionally pinned with a red dot. */
export function Polaroid({ src, alt = '', pin = false, className = '' }: { src: string; alt?: string; pin?: boolean; className?: string }) {
  return (
    <div className={`relative bg-white p-[7%] pb-[18%] shadow-[0_6px_14px_rgba(26,26,26,.16)] ${className}`}>
      {pin && <span aria-hidden className="absolute -top-[5%] right-[12%] z-10 size-[12%] min-h-2 min-w-2 rounded-full bg-accent shadow-[0_1px_2px_rgba(26,26,26,.3)]" />}
      <img src={src} alt={alt} draggable={false} className="block aspect-square w-full object-cover" />
    </div>
  )
}

/** A note in handwriting: pink sticky note or cream paper scrap. */
export function Note({ children, tone = 'pink', clip = false, className = '' }: { children: ReactNode; tone?: 'pink' | 'paper'; clip?: boolean; className?: string }) {
  return (
    <div
      className={`relative px-[12%] py-[14%] font-[family-name:var(--font-hand)] leading-[1.15] text-ink shadow-[0_6px_14px_rgba(26,26,26,.12)] ${
        tone === 'pink' ? 'bg-[#F6C9CF]' : 'bg-[#F3ECDD]'
      } ${className}`}
    >
      {clip && <PaperClip className="absolute -top-[16%] right-[14%] h-[36%] text-ink/60" />}
      {children}
    </div>
  )
}

export function Checker({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`shadow-[0_4px_10px_rgba(26,26,26,.1)] [background:repeating-conic-gradient(#E7A3A9_0_25%,#F6ECE4_0_50%)_0_0/22%_22%] ${className}`}
    />
  )
}

/** Handwritten red text. */
export function Hand({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`font-[family-name:var(--font-hand)] leading-[1.05] text-accent ${className}`}>{children}</p>
}

/* ── Doodles ──────────────────────────────────────────────────────────── */

const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`text-accent ${className}`} {...stroke} strokeWidth={1.6}>
      <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
    </svg>
  )
}

export function Zigzag({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" aria-hidden className={`text-accent ${className}`} {...stroke} strokeWidth={1.6}>
      <path d="M3 18L12 6L15 16L24 4L27 14L37 8" />
    </svg>
  )
}

export function Scribble({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" aria-hidden className={`text-accent ${className}`} {...stroke} strokeWidth={1.4}>
      <path d="M4 52C40 40 80 24 120 14C150 7 175 6 196 10M30 50C70 36 120 20 170 18C150 30 120 38 90 44" />
    </svg>
  )
}

export function Swoosh({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 20" aria-hidden className={`text-accent ${className}`} {...stroke} strokeWidth={2.2}>
      <path d="M3 14C50 6 120 4 197 9M20 17C70 12 130 11 180 13" />
    </svg>
  )
}

export function Smiley({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`text-accent ${className}`} {...stroke} strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5c1.8 2 5.2 2 7 0M9 9.5h.01M15 9.5h.01" />
    </svg>
  )
}

function PaperClip({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 28" aria-hidden className={className} {...stroke} strokeWidth={1.4}>
      <path d="M9 9v12a3 3 0 0 1-6 0V6a4.5 4.5 0 0 1 9 0v13" />
    </svg>
  )
}
