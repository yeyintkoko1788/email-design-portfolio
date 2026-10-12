import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHead from '../SectionHead'
import { Reveal, Rv } from '../Reveal'
import { categories, projects } from '../../data/projects'

/** Tiny dots at the four corners of a block, like a layout grid. */
function GridDots() {
  const dot = 'absolute size-[3px] rounded-full bg-ink/70'
  return (
    <>
      <span aria-hidden className={`${dot} -top-3 -left-3`} />
      <span aria-hidden className={`${dot} -top-3 -right-3`} />
      <span aria-hidden className={`${dot} -bottom-3 -left-3`} />
      <span aria-hidden className={`${dot} -right-3 -bottom-3`} />
    </>
  )
}

/**
 * 04 · Work, laid out like a contact sheet: one featured card, then five
 * same-size cards stepping down and up in a zigzag; below, a numbered index
 * grouped by category. Hovering a card highlights its row in the index, and
 * the other way round.
 */
/**
 * The featured card first, then the rest alternate between sitting low and
 * high. Desktop: one row, bottom- / top-aligned to the featured card.
 * Phones: three columns (featured takes two), low cards dropped a little.
 */
function zigzag(i: number, featured?: boolean) {
  if (featured) return 'col-span-2 md:col-span-1 md:self-start'
  if (i % 2 === 0) return 'self-start'
  return i === 1 ? 'self-end' : 'mt-8 md:mt-0 md:self-end'
}

export default function Work() {
  const [active, setActive] = useState<string | null>(null)
  const dim = (no: string) => (active && active !== no ? 'opacity-45' : 'opacity-100')

  return (
    <Reveal as="section" id="work" amount={0.1} className="page-px bg-paper-2 py-20 md:py-28">
      <SectionHead title="Work" n={4} />

      <Rv i={0} className="label mt-10 flex justify-between md:mt-16">
        <span>Email work</span>
        <span className="hidden sm:inline">Sequences · Redesigns · Concepts</span>
        <span>{String(projects.length).padStart(2, '0')} projects</span>
      </Rv>

      <Rv i={1} as="h2" className="headline mt-4 text-[13vw] md:mt-6 md:text-[min(7vw,112px)]">
        Selected <em className="text-accent">emails.</em>
      </Rv>

      {/* Thumbnails */}
      <div className="relative mt-10 md:mt-16">
        <GridDots />
        <ol className="grid grid-cols-3 gap-x-3 gap-y-6 md:grid-cols-[1.5fr_repeat(5,minmax(0,1fr))] md:gap-x-[2.6vw]">
          {projects.map((p, i) => (
            <Rv key={p.no} as="li" i={2 + i} className={zigzag(i, p.featured)}>
              <Link
                to={p.href}
                data-cursor="OPEN"
                onPointerEnter={() => setActive(p.no)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(p.no)}
                onBlur={() => setActive(null)}
                className={`group block transition-opacity duration-300 ${dim(p.no)}`}
                aria-label={`${p.title}: ${p.line}`}
              >
                <p className="label text-accent">{p.no}</p>
                <div
                  className="relative mt-1.5 overflow-hidden shadow-[0_0_0_1px_rgba(26,26,26,.14),0_2px_4px_rgba(26,26,26,.08),0_12px_28px_rgba(26,26,26,.14)] transition-[translate,box-shadow] duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1.5 group-hover:shadow-[0_0_0_1px_rgba(26,26,26,.16),0_4px_8px_rgba(26,26,26,.1),0_22px_44px_rgba(26,26,26,.2)] md:mt-2"
                  style={{ aspectRatio: 4 / 5, background: p.color }}
                >
                  {p.image ? (
                    <img src={p.image} alt="" draggable={false} className="size-full object-cover object-top" loading="lazy" />
                  ) : (
                    <span className="label absolute inset-0 flex items-center justify-center text-ink/40">
                      EML-{p.no}
                    </span>
                  )}
                </div>
              </Link>
            </Rv>
          ))}
        </ol>
      </div>

      {/* Index + note */}
      <div className="relative mt-14 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-7">
          {categories.map((c, k) => (
            <Rv key={c} i={10 + k} className="mb-8 last:mb-0">
              <p className="label text-accent">{c}</p>
              <ul className="mt-2 border-t border-ink/15">
                {projects
                  .filter((p) => p.category === c)
                  .map((p) => (
                    <li key={p.no}>
                      <Link
                        to={p.href}
                        data-cursor="OPEN"
                        onPointerEnter={() => setActive(p.no)}
                        onPointerLeave={() => setActive(null)}
                        className={`grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 border-b border-ink/15 py-2.5 transition-[color,opacity,padding] duration-300 ease-[var(--ease-spring)] sm:grid-cols-[2.25rem_minmax(0,1fr)_auto] ${dim(p.no)} ${
                          active === p.no ? 'pl-2.5 text-accent' : ''
                        }`}
                      >
                        <span className="label text-accent">{p.no}</span>
                        <span className="font-serif text-[19px] leading-tight md:text-[22px]">
                          {p.title}
                          {p.coded && <span className="label ml-3 align-middle text-accent">HTML + Klaviyo ✓</span>}
                        </span>
                        <span className="hidden text-[14px] text-ink/60 sm:inline">{p.line}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </Rv>
          ))}
        </div>

        <Rv i={13} className="flex flex-col justify-end md:col-span-4 md:col-start-9">
          <p className="text-[15px] leading-relaxed text-ink/80 md:text-[17px]">
            Launch sequences, customer journeys, unofficial redesigns and self-initiated concepts.
          </p>
          <p className="label mt-4 text-accent">Choose a project to open it</p>
        </Rv>
      </div>
    </Reveal>
  )
}
