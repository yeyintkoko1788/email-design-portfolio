import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CreativePiece } from '../data/creative'

/** One piece of creative work: image, looping video, or a placeholder until the file is added. */
export default function CreativeTile({ piece, aspect }: { piece: CreativePiece; aspect: string }) {
  const tile = (
    <figure className="group">
      <div
        className={`relative overflow-hidden ${aspect} ${piece.href ? 'transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1.5' : ''}`} style={{ background: piece.color }}>
        {piece.video && piece.src && (
          <span className="label absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-paper/90 px-2 py-0.5">
            <Play size={9} aria-hidden /> Motion
          </span>
        )}
        {piece.src ? (
          piece.video ? (
            <video src={piece.src} poster={piece.poster} className="size-full object-cover" autoPlay muted loop playsInline />
          ) : (
            <img src={piece.src} alt={piece.title} loading="lazy" className="size-full object-cover" />
          )
        ) : (
          <span className="label absolute inset-0 flex items-center justify-center gap-1.5 text-ink/45">
            {piece.video && <Play size={11} aria-hidden />}
            {piece.video ? 'Motion' : 'Image'}
          </span>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="font-serif text-[18px] leading-tight transition-colors group-hover:text-accent">
          {piece.title}
          {piece.href && <span className="ml-2 font-sans text-[0.8em]">→</span>}
        </p>
        <p className="mt-1 text-[14px] text-ink/65">{piece.note}</p>
      </figcaption>
    </figure>
  )
  return piece.href ? (
    <Link to={piece.href} data-cursor="OPEN" className="block">
      {tile}
    </Link>
  ) : (
    tile
  )
}
