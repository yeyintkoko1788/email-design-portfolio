import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Reveal, Rv } from './Reveal'
import { Tape } from './Collage'
import type { CreativePiece } from '../data/creative'

/** Paper edge + soft shadow, the same as the Work cards. */
const EDGE =
  'shadow-[0_0_0_1px_rgba(26,26,26,.14),0_2px_4px_rgba(26,26,26,.08),0_12px_28px_rgba(26,26,26,.14)]'

/**
 * Where each static poster hangs. Desktop: one large on the left, two
 * smaller ones stepping down on the right. Phones: the first full width,
 * the next two side by side, the second a little lower.
 */
const HANG = [
  'col-span-2 md:col-span-5',
  'md:col-span-3 md:col-start-7 md:mt-24',
  'mt-12 md:col-span-3 md:col-start-10 md:mt-48',
]

/** Museum-style label under a piece: number, title, line, medium, colours. */
function Label({ n, piece, dark }: { n: number; piece: CreativePiece; dark?: boolean }) {
  return (
    <figcaption className="mt-4">
      <div className="label flex items-center justify-between">
        <span className="text-accent">{String(n).padStart(2, '0')}</span>
        {piece.palette && (
          <span className="flex gap-1" aria-hidden>
            {piece.palette.map((c) => (
              <span key={c} className="size-2.5 rounded-full shadow-[0_0_0_1px_rgba(26,26,26,.12)]" style={{ background: c }} />
            ))}
          </span>
        )}
      </div>
      <p className="mt-2 font-serif text-[20px] leading-tight md:text-[22px]">{piece.title}</p>
      <p className={`mt-1 text-[14px] leading-relaxed ${dark ? 'text-paper-2/70' : 'text-ink/70'}`}>{piece.note}</p>
      {piece.medium && (
        <p className={`label mt-2 ${dark ? 'text-paper-2/50' : 'text-ink/50'}`}>
          {piece.medium}
          {piece.year && ` · ${piece.year}`}
        </p>
      )}
    </figcaption>
  )
}

/** Full-size view of one poster. Esc, the close button or a click outside closes it. */
function Lightbox({ piece, onClose }: { piece: CreativePiece; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      onClick={onClose}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm md:p-10"
    >
      <img
        src={piece.src}
        alt={piece.title}
        onClick={(e) => e.stopPropagation()}
        className={`max-h-full max-w-full object-contain ${EDGE}`}
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-paper-2 text-ink transition-colors hover:bg-accent hover:text-paper"
      >
        <X size={18} />
      </button>
    </div>
  )
}

/** The posters page: static posters hung like a small exhibition, then the moving ones on a dark band. */
export default function PosterWall({ pieces }: { pieces: CreativePiece[] }) {
  const [open, setOpen] = useState<CreativePiece | null>(null)
  const stills = pieces.filter((p) => !p.video)
  const motion = pieces.filter((p) => p.video)

  return (
    <>
      <Reveal amount={0.08} className="page-px grid grid-cols-2 gap-x-4 gap-y-14 pb-24 md:grid-cols-12 md:gap-x-8 md:pb-36">
        {stills.map((p, i) => (
          <Rv key={p.title} i={i} as="figure" className={HANG[i % HANG.length]}>
            <button
              type="button"
              onClick={() => p.src && setOpen(p)}
              data-cursor="VIEW"
              aria-label={`View ${p.title} full size`}
              className={`group relative block w-full transition-[translate,box-shadow] duration-500 ease-[var(--ease-spring)] hover:-translate-y-1.5 ${EDGE}`}
            >
              {i === 1 && <Tape className="-top-[4%] left-[32%] -rotate-3" />}
              <span className="block aspect-[4/5] overflow-hidden" style={{ background: p.color }}>
                {p.src && <img src={p.src} alt={p.title} loading="lazy" className="size-full object-cover" />}
              </span>
            </button>
            <Label n={i + 1} piece={p} />
          </Rv>
        ))}
      </Reveal>

      {motion.length > 0 && (
        <Reveal amount={0.1} as="section" className="page-px bg-night py-20 text-paper-2 md:py-28">
          <Rv i={0} className="label flex justify-between border-b border-paper-2/20 pb-2">
            <span>In motion</span>
            <span>{String(motion.length).padStart(2, '0')} pieces</span>
          </Rv>
          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-14 md:grid-cols-12">
            {motion.map((p, i) => (
              <Rv
                key={p.title}
                i={1 + i}
                as="figure"
                className={i === 0 ? 'md:col-span-4 md:col-start-2' : 'md:col-span-4 md:col-start-8 md:mt-24'}
              >
                <div className="aspect-[4/5] overflow-hidden shadow-[0_0_0_1px_rgba(244,238,227,.12),0_18px_40px_rgba(0,0,0,.3)]" style={{ background: p.color }}>
                  {p.src && <video src={p.src} poster={p.poster} className="size-full object-cover" autoPlay muted loop playsInline aria-label={p.title} />}
                </div>
                <Label n={stills.length + i + 1} piece={p} dark />
              </Rv>
            ))}
          </div>
        </Reveal>
      )}

      {open && <Lightbox piece={open} onClose={() => setOpen(null)} />}
    </>
  )
}
