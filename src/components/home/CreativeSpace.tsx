import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHead from '../SectionHead'
import { Reveal, Rv } from '../Reveal'
import { creative, type CreativePiece } from '../../data/creative'

/** The thumb on top, with two other pieces fanned behind it (never the thumb's own piece twice). */
function thumbStack(pieces: CreativePiece[], thumb: string) {
  const rest = pieces.filter((p) => p.poster !== thumb && p.src !== thumb)
  const front = pieces.find((p) => p.poster === thumb || p.src === thumb) ?? rest[0]
  return [rest[0], { ...front, src: thumb, video: false }, rest[1]].filter(Boolean)
}

/** 05 · My creative space: one card per category; each opens its own page. */
export default function CreativeSpace() {
  return (
    <section id="creative" className="page-px bg-paper py-20 md:py-28">
      <SectionHead title="My creative space" n={5} />
      <Reveal className="mt-10 grid gap-4 md:mt-16 md:grid-cols-12 md:items-end md:gap-x-8">
        <Rv i={0} as="h2" className="headline text-[10vw] md:col-span-7 md:text-[min(4.4vw,68px)]">
          Outside the <em className="text-accent">inbox.</em>
        </Rv>
        <Rv i={1} as="p" className="text-[15px] leading-relaxed text-ink/80 md:col-span-4 md:col-start-9 md:text-[17px]">
          Interfaces, ads in motion and a book cover.
        </Rv>
      </Reveal>

      <Reveal amount={0.15} className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-6 md:mt-16 md:w-3/4 md:gap-8">
        {creative.map((c, i) => (
          <Rv key={c.slug} i={i + 2}>
            <Link to={`/creative/${c.slug}`} data-cursor="OPEN" className="group block">
              <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden bg-paper-back">
                {/* A small stack of the category's pieces, portrait, in the middle */}
                <div className="relative aspect-[4/5] h-[70%] transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-[1.04]">
                  {(c.thumb ? thumbStack(c.pieces, c.thumb) : c.pieces.slice(0, 3)).map((p, k) => (
                    <div
                      key={k}
                      className="absolute inset-0 shadow-[0_0_0_1px_rgba(26,26,26,.06),0_6px_18px_rgba(26,26,26,.14)] transition-transform duration-500 ease-[var(--ease-spring)]"
                      style={{
                        background: p.color,
                        transform: `rotate(${(k - 1) * 5}deg) translate(${(k - 1) * 6}%, ${(1 - k) * 2}%)`,
                        zIndex: 3 - Math.abs(k - 1),
                      }}
                    >
                      {(p.video ? p.poster : p.src) && <img src={p.video ? p.poster : p.src} alt="" className="size-full object-cover" loading="lazy" />}
                    </div>
                  ))}
                </div>
                <span className="label absolute top-3 left-3 rounded-full bg-paper px-2 py-0.5 text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink pt-3">
                <h3 className="headline text-[24px] transition-colors group-hover:text-accent md:text-[26px]">{c.title}</h3>
                <span className="label inline-flex shrink-0 items-center gap-1 text-ink/60 transition-colors group-hover:text-accent">
                  {c.pieces.length === 1 ? 'View' : `${String(c.pieces.length).padStart(2, '0')} pieces`} <ArrowUpRight size={12} aria-hidden />
                </span>
              </div>
              <p className="mt-2 text-[14px] text-ink/70 md:text-[15px]">{c.line}</p>
              {c.tag && <p className="label mt-2 text-accent">{c.tag}</p>}
            </Link>
          </Rv>
        ))}
      </Reveal>
    </section>
  )
}
