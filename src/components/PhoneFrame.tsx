import { MotionOverlay, type Motion } from './case/EmailFrame'

type Props = {
  src: string
  alt: string
  onOpen?: () => void
  className?: string
  /** A looping animation over part of the email */
  motion?: Motion
}

/** Shows the top of a tall email in a phone. Click opens the full email. */
export default function PhoneFrame({ src, alt, onOpen, className = '', motion }: Props) {
  const body = (
    <>
      {/* Full-width email, top-aligned; the phone shows its first screen */}
      <div className="absolute inset-x-0 top-0">
        <img src={src} alt={alt} draggable={false} className="block w-full" loading="lazy" />
        {motion && <MotionOverlay motion={motion} />}
      </div>
      {onOpen && (
        <span className="label absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-night px-2.5 py-1 text-paper">
          Tap to view full
        </span>
      )}
    </>
  )
  const frame = `relative block aspect-[9/18] overflow-hidden rounded-[7%/3.5%] border-[5px] border-ink bg-white shadow-[0_10px_30px_rgba(26,26,26,.18)] ${className}`
  if (!onOpen) return <div className={frame}>{body}</div>
  return (
    <button type="button" onClick={onOpen} data-cursor="VIEW" className={`${frame} text-left`} aria-label={`View full email: ${alt}`}>
      {body}
    </button>
  )
}
