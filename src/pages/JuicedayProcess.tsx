import { useParams } from 'react-router-dom'
import CaseLayout from '../components/case/CaseLayout'
import type { Spread } from '../components/Book'
import { Rv } from '../components/Reveal'
import { process01, process02, process03, process04, processImages, type Cut } from '../data/juiceday'
import { useIsDesktop } from '../lib/hooks'
import { DesktopBook, MobileBook, PageNumber, PaperCut } from './Juiceday'
import { PaperImage } from './JuicedayLook'

type Page = { spreads: Spread[]; back: { label: string; to: string }; no: string }

/** A slice of a design, cut out at the given pixels and shown at a fixed height. */
function Strip({ cut, height = 26 }: { cut: Cut; height?: number }) {
  const pos = (at: number, size: number, whole: number) => (whole === size ? 0 : (at / (whole - size)) * 100)
  return (
    <div
      role="img"
      aria-label="Detail from the Juiceday emails"
      className="max-w-full rounded-sm border border-ink/10 shadow-[0_4px_12px_rgba(26,26,26,.1)]"
      style={{
        height: `${height}cqw`,
        aspectRatio: `${cut.w} / ${cut.h}`,
        backgroundImage: `url(${cut.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${(cut.iw / cut.w) * 100}% auto`,
        backgroundPosition: `${pos(cut.x, cut.w, cut.iw)}% ${pos(cut.y, cut.h, cut.ih)}%`,
      }}
    />
  )
}

type Row = (typeof process01.rows)[number]

/** One row: a slice of the first draft, with what changed and why directly under it. */
function changeRow(r: Row, n: number, i: number, top: string) {
  return (
    <Rv key={r.label} i={i + 1} className="absolute" style={{ left: '6cqw', right: '6cqw', top }}>
      <div className="flex items-center gap-[2.4cqw]">
        <span className="label flex size-[4.6cqw] shrink-0 items-center justify-center rounded-full bg-accent tracking-normal text-paper-2">{n}</span>
        <p className="label text-ink/60">{r.label.slice(4)}</p>
      </div>
      <div className="mt-[2cqw]">
        <Strip cut={r.a} height={42} />
      </div>
      <p className="pg-t mt-[2cqw]">{r.text}</p>
    </Rv>
  )
}

/** Email 01: four sections of the first draft (A), two per page, each with its text. */
function email01(): Page {
  const rows = process01.rows
  const page = (side: 'l' | 'r', first: number, n: number) => (
    <div className="pg">
      <Rv i={0} className="label text-accent">
        {side === 'l' ? '01 · Design process · first draft (A)' : 'First draft (A), continued'}
      </Rv>
      {changeRow(rows[first], first + 1, 0, '14cqw')}
      {changeRow(rows[first + 1], first + 2, 1, '80cqw')}
      <PageNumber n={n} side={side} />
    </div>
  )
  return {
    no: '01',
    back: { label: 'Back to Juiceday', to: '/work/juiceday?spread=4' },
    spreads: [{ name: 'Email 01 · Design process', left: page('l', 0, 2), right: page('r', 2, 3) }],
  }
}

/** Email 02: the first layout against the final, with three marked decisions. */
function email02(): Page {
  return {
    no: '02',
    back: { label: 'Back to Juiceday', to: '/work/juiceday?spread=5' },
    spreads: [
      {
        name: 'Email 02 · Design process',
        left: (
          <div className="pg">
            <Rv i={0} className="label text-accent">
              02 · Design process
            </Rv>
            <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
              {process02.headline}
            </Rv>
            <Rv i={2} className="absolute" style={{ left: '7cqw', top: '34cqw', width: '86cqw' }}>
              <p className="label mb-[2cqw] text-ink/60">{process02.beforeLabel}</p>
              <PaperImage {...processImages.email02Before} alt="The first desktop layout, with text beside the product" rotate={-1.2} />
              <p className="pg-t mt-[3cqw]">{process02.beforeCaption}</p>
            </Rv>
            <PageNumber n={2} side="l" />
          </div>
        ),
        right: (
          <div className="pg">
            <Rv i={0} className="label text-accent">
              {process02.afterLabel}
            </Rv>
            <Rv i={1} className="absolute" style={{ left: '19cqw', top: '14cqw', width: '62cqw' }}>
              <PaperCut
                cut={processImages.email02After}
                rotate={1.2}
                markers={[
                  { n: 1, x: 38, y: 82 },
                  { n: 2, x: 82, y: 62 },
                  { n: 3, x: 93, y: 7 },
                ]}
              />
            </Rv>
            <ol className="absolute grid gap-[2cqw]" style={{ left: '6cqw', right: '6cqw', top: '110cqw' }}>
              {process02.notes.map((n, i) => (
                <Rv key={n} as="li" i={i + 2} className="pg-t flex items-baseline gap-[2.4cqw]">
                  <span className="label flex size-[4.6cqw] shrink-0 items-center justify-center rounded-full bg-accent tracking-normal text-paper-2">{i + 1}</span>
                  {n}
                </Rv>
              ))}
            </ol>
            <PageNumber n={3} side="r" />
          </div>
        ),
      },
    ],
  }
}

/** Email 03: four rounds as phones, then the headline choice. */
function email03(): Page {
  const tilt = [-1.2, 1, -0.8, 1.2]
  const phone = (r: (typeof process03.rounds)[number], i: number, left: string, n: number) => (
    <Rv key={r.label} i={i + 2} className="absolute" style={{ left, top: '26cqw', width: '36cqw' }}>
      <PaperImage src={r.src} ratio={r.ratio} alt={`Email 03, round ${r.label}: the hero section`} rotate={tilt[n]} />
      <p className="label mt-[2cqw] text-accent">{r.label}</p>
      <p className="pg-t mt-[0.6cqw]">{r.text}</p>
    </Rv>
  )
  return {
    no: '03',
    back: { label: 'Back to Juiceday', to: '/work/juiceday?spread=6' },
    spreads: [
      {
        name: 'Email 03 · Design process',
        left: (
          <div className="pg">
            <Rv i={0} className="label text-accent">
              03 · Design process
            </Rv>
            <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
              {process03.headline}
            </Rv>
            {phone(process03.rounds[0], 0, '8cqw', 0)}
            {phone(process03.rounds[1], 1, '55cqw', 1)}
            <PageNumber n={2} side="l" />
          </div>
        ),
        right: (
          <div className="pg">
            {phone(process03.rounds[2], 0, '8cqw', 2)}
            {phone(process03.rounds[3], 1, '55cqw', 3)}
            <PageNumber n={3} side="r" />
          </div>
        ),
      },
    ],
  }
}

/** Email 04: the button wording, and the price card with and without its heading. */
function email04(): Page {
  return {
    no: '04',
    back: { label: 'Back to Juiceday', to: '/work/juiceday?spread=7' },
    spreads: [
      {
        name: 'Email 04 · Design process',
        left: (
          <div className="pg">
            <Rv i={0} className="label text-accent">
              04 · Design process
            </Rv>
            <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
              {process04.headline}
            </Rv>
            <Rv i={2} className="absolute" style={{ left: '11cqw', top: '30cqw', width: '78cqw' }}>
              <PaperImage {...process04.firstButton} alt="The first version's button: Claim my free mini" rotate={-1} />
              <p className="label mt-[2.4cqw] text-ink/60">First version</p>
            </Rv>
            <Rv i={3} className="pg-t absolute" style={{ left: '6cqw', right: '6cqw', top: '78cqw' }}>
              {process04.text}
            </Rv>
            <PageNumber n={2} side="l" />
          </div>
        ),
        right: (
          <div className="pg">
            <Rv i={0} className="label text-accent">
              Price card
            </Rv>
            <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
              {process04.cardHeadline}
            </Rv>
            <Rv i={2} className="absolute" style={{ left: '23cqw', top: '30cqw', width: '54cqw' }}>
              <PaperImage {...process04.before} alt="The price card without a heading" rotate={1} />
              <p className="label mt-[2.4cqw] text-ink/60">Before</p>
            </Rv>
            <Rv i={3} className="absolute" style={{ left: '23cqw', top: '77cqw', width: '54cqw' }}>
              <PaperImage {...process04.after} alt="The price card with the heading Two bottles, one price" rotate={-1} />
              <p className="label mt-[2.4cqw] text-ink/60">After</p>
            </Rv>
            <PageNumber n={3} side="r" />
          </div>
        ),
      },
    ],
  }
}

export default function JuicedayProcess() {
  const { id } = useParams()
  const desktop = useIsDesktop()
  const page = id === '04' ? email04() : id === '03' ? email03() : id === '02' ? email02() : email01()

  return (
    <CaseLayout no={page.no} label="Design process" back={page.back.to} backLabel={page.back.label}>
      {desktop ? <DesktopBook spreads={page.spreads} modalOpen={false} endLink={page.back} /> : <MobileBook spreads={page.spreads} endLink={page.back} />}
    </CaseLayout>
  )
}
