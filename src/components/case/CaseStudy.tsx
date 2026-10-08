import { Reveal, Rv } from '../Reveal'
import type { CaseStudy, CaseSection, Img } from '../../data/uiux'

const shot = 'block w-full shadow-[0_0_0_1px_rgba(26,26,26,.12),0_10px_30px_rgba(26,26,26,.1)]'

/** Images side by side at one shared height: each column is as wide as its image's shape. */
function Pair({ images }: { images: Img[] }) {
  return (
    <div
      className="grid items-start gap-3 md:gap-5"
      style={{ gridTemplateColumns: images.map((m) => `${m.w / m.h}fr`).join(' ') }}
    >
      {images.map((img) => (
        <figure key={img.src}>
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading="lazy"
            className={`${shot} h-auto ${img.stroke ? 'outline outline-1 -outline-offset-1 outline-[#2b2a26]' : ''}`}
          />
          {img.caption && <figcaption className="label mt-3 text-ink/55">{img.caption}</figcaption>}
        </figure>
      ))}
    </div>
  )
}

/** Numbered section header: "01 · The problem", with a rule. */
function Head({ n, title }: { n: number; title: string }) {
  return (
    <Rv i={0}>
      <div className="label flex justify-between pb-2">
        <span className="text-accent">{String(n).padStart(2, '0')}</span>
        <span>{title}</span>
      </div>
      <div className="h-px bg-ink/15" />
      <h2 className="headline mt-8 text-[11vw] md:mt-10 md:text-[min(5vw,72px)]">{title}.</h2>
    </Rv>
  )
}

function Section({ s, n }: { s: CaseSection; n: number }) {
  return (
    <Reveal as="section" amount={0.08} className="page-px py-16 md:py-24">
      <Head n={n} title={s.title} />

      {s.kind === 'text' && (
        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-x-8">
          <div className="space-y-4 md:col-span-6">
            {s.body.map((p, i) => (
              <Rv key={i} i={1 + i} as="p" className="text-[15px] leading-relaxed text-ink/80 md:text-[17px]">
                {p}
              </Rv>
            ))}
          </div>
          {s.question && (
            <Rv i={3} className="md:col-span-5 md:col-start-8 md:self-end">
              <p className="label text-accent">The question</p>
              <p className="mt-3 font-serif text-[22px] leading-snug italic md:text-[28px]">{s.question}</p>
            </Rv>
          )}
          {s.images && (
            <Rv i={4} className="md:col-span-12">
              <Pair images={s.images} />
            </Rv>
          )}
        </div>
      )}

      {s.kind === 'table' && (
        <div className="mt-8 md:mt-12">
          {s.intro && (
            <Rv i={1} as="p" className="max-w-2xl text-[15px] leading-relaxed text-ink/80 md:text-[17px]">
              {s.intro}
            </Rv>
          )}
          <Rv i={2} as="table" className="mt-10 w-full border-collapse text-left">
            <thead>
              <tr className="label border-b border-ink/15">
                <th className="w-1/2 pb-2 font-normal">{s.head[0]}</th>
                <th className="pb-2 font-normal text-accent">{s.head[1]}</th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map(([a, b]) => (
                <tr key={a} className="border-b border-ink/15 align-baseline">
                  <td className="py-3 pr-6 text-[14px] text-ink/65 md:text-[16px]">{a}</td>
                  <td className="py-3 font-serif text-[17px] leading-snug md:text-[21px]">{b}</td>
                </tr>
              ))}
            </tbody>
          </Rv>
        </div>
      )}

      {s.kind === 'screens' && (
        <div className="mt-8 md:mt-12">
          {s.intro && (
            <Rv i={1} as="p" className="max-w-2xl text-[15px] leading-relaxed text-ink/80 md:text-[17px]">
              {s.intro}
            </Rv>
          )}
          <div className="mt-10 space-y-16 md:mt-14 md:space-y-24">
            {s.items.map((it, k) => (
              <Reveal key={it.name} amount={0.1} className="grid gap-6 md:grid-cols-12 md:gap-x-8">
                <Rv i={0} className="md:col-span-3">
                  <p className="label text-accent">{String(k + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-serif text-[22px] leading-tight md:text-[26px]">{it.name}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/75 md:text-[15px]">{it.text}</p>
                </Rv>
                <Rv i={1} className="md:col-span-9">
                  <Pair images={it.images} />
                </Rv>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {s.kind === 'diagram' && (
        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-x-8">
          <Rv i={1} as="p" className="text-[15px] leading-relaxed text-ink/80 md:col-span-4 md:text-[17px]">
            {s.body}
          </Rv>
          <Rv i={2} className="md:col-span-7 md:col-start-6">
            <img src={s.image.src} alt={s.image.alt} width={s.image.w} height={s.image.h} loading="lazy" className="block h-auto w-full" />
          </Rv>
        </div>
      )}

      {s.kind === 'score' && (
        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-x-8">
          <Rv i={1} as="p" className="text-[15px] leading-relaxed text-ink/80 md:col-span-5 md:text-[17px]">
            {s.body}
          </Rv>
          <Rv i={2} className="md:col-span-6 md:col-start-7">
            <ul className="border-t border-ink/15">
              {s.weights.map(([name, w]) => (
                <li key={name} className="grid grid-cols-[8.5rem_1fr_2.5rem] items-center gap-4 border-b border-ink/15 py-3">
                  <span className="text-[14px] md:text-[15px]">{name}</span>
                  <span className="h-1.5 bg-ink/10">
                    <span className="block h-full bg-accent" style={{ width: `${(w / 35) * 100}%` }} />
                  </span>
                  <span className="label text-right">{w}%</span>
                </li>
              ))}
            </ul>
            <p className="label mt-4 text-ink/60">e.g. {s.example}</p>
          </Rv>
        </div>
      )}

      {s.kind === 'points' && (
        <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-12 md:gap-x-8">
          {s.intro && (
            <Rv i={1} as="p" className="text-[15px] leading-relaxed text-ink/80 md:col-span-4 md:text-[17px]">
              {s.intro}
            </Rv>
          )}
          <ol className={`border-t border-ink/15 ${s.intro ? 'md:col-span-7 md:col-start-6' : 'md:col-span-8'}`}>
            {s.points.map((p, i) => (
              <Rv key={i} i={2 + i} as="li" className="grid grid-cols-[2.25rem_1fr] items-baseline gap-x-3 border-b border-ink/15 py-4">
                <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] leading-relaxed md:text-[17px]">{p}</span>
              </Rv>
            ))}
          </ol>
        </div>
      )}
    </Reveal>
  )
}

/** Everything below the intro: cover with facts and numbers, the numbered sections, and the closing quote. */
export default function CaseStudyBody({ p }: { p: CaseStudy }) {
  return (
    <>
      {/* Portrait cover (4:5, same image as the home card), with role / timeline / tools, the link and the numbers beside it */}
      <Reveal amount={0.1} className="page-px grid gap-10 md:grid-cols-12 md:gap-x-8">
        <Rv i={0} className="md:col-span-6">
          <img src={p.cover} alt={p.coverAlt ?? `${p.title}, shown on screens`} className={`${shot} aspect-[4/5] object-cover`} />
        </Rv>
        <div className="md:col-span-5 md:col-start-8 md:self-end">
          <Rv i={1} as="dl" className="border-t border-ink/15">
            {p.meta.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] items-baseline border-b border-ink/15 py-3">
                <dt className="label text-ink/55">{k}</dt>
                <dd className="text-[15px]">{v}</dd>
              </div>
            ))}
          </Rv>
          {p.stats && (
            <dl className="mt-10 space-y-6">
              {p.stats.map(([big, small], i) => (
                <Rv key={big} i={2 + i} className="flex items-baseline gap-4">
                  <dt className="headline w-[5.5em] shrink-0 text-[34px] text-accent md:text-[44px]">{big}</dt>
                  <dd className="text-[14px] leading-snug text-ink/65 md:text-[15px]">{small}</dd>
                </Rv>
              ))}
            </dl>
          )}
          {p.link && (
            <Rv i={5} className="mt-10">
              <a
                href={p.link.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
                className="label inline-block rounded-full border border-ink/25 px-4 py-2 transition-colors hover:border-accent hover:bg-accent hover:text-paper"
              >
                {p.link.label} ↗
              </a>
            </Rv>
          )}
        </div>
      </Reveal>

      {p.sections.map((s, i) => (
        <Section key={s.title} s={s} n={i + 1} />
      ))}

      {p.quote && (
        <Reveal className="page-px pb-24 md:pb-36">
          <Rv as="blockquote" className="mx-auto max-w-3xl border-t border-ink/15 pt-12 text-center font-serif text-[26px] leading-snug italic md:text-[40px]">
            “{p.quote}”
          </Rv>
        </Reveal>
      )}
      {!p.quote && <div className="pb-12 md:pb-20" />}
    </>
  )
}
