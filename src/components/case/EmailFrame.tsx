/**
 * Where a looping video sits on top of the email image, in % of the image.
 * `fit: 'contain'` letterboxes it on `bg` (for an animation whose shape
 * differs from the still it replaces).
 */
export type Motion = { src: string; x: number; y: number; w: number; h: number; fit?: 'cover' | 'contain'; bg?: string }

/** The looping video itself, placed over its email image (which must sit in a relative box). */
export function MotionOverlay({ motion }: { motion: Motion }) {
  return (
    <video
      src={motion.src}
      className={`absolute ${motion.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
      style={{ left: `${motion.x}%`, top: `${motion.y}%`, width: `${motion.w}%`, height: `${motion.h}%`, background: motion.bg }}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden
    />
  )
}

/**
 * One full email in a frame of fixed height: scroll inside it to read the
 * whole thing. A `motion` video plays over the still image where the email
 * has a GIF. Without a `src`, a placeholder shows until the image is added.
 */
export default function EmailFrame({
  src,
  label,
  note,
  accent,
  motion,
}: {
  src?: string
  label: string
  /** Small text on the right of the label, e.g. the email's length */
  note?: string
  accent?: boolean
  motion?: Motion
}) {
  return (
    <figure>
      <div className="label flex items-baseline justify-between gap-2">
        <span className={accent ? 'text-accent' : ''}>{label}</span>
        {note && <span className="text-right text-ink/55">{note}</span>}
      </div>
      <div
        className="no-scrollbar mt-2 h-[520px] overflow-y-auto bg-white shadow-[0_0_0_1px_rgba(26,26,26,.12),0_10px_30px_rgba(26,26,26,.1)] md:h-[640px]"
        data-cursor={src ? 'SCROLL' : undefined}
      >
        {src ? (
          <div className="relative">
            <img src={src} alt={label} className="block w-full" loading="lazy" />
            {motion && <MotionOverlay motion={motion} />}
          </div>
        ) : (
          <div className="label flex h-full items-center justify-center bg-paper-back text-ink/45">{label}</div>
        )}
      </div>
    </figure>
  )
}
