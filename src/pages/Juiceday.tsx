import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import CaseLayout from '../components/case/CaseLayout'
import Book, { type Spread } from '../components/Book'
import FlipStack from '../components/FlipStack'
import PhoneFrame from '../components/PhoneFrame'
import EmailViewer, { type ViewerEmail } from '../components/EmailViewer'
import { FigCaption, Squares } from '../components/Deco'
import { Rv } from '../components/Reveal'
import { buildPlan, buildRules, cuts, emails, palette, product, sequence, typeSpecs, type Cut, type JuicedayEmail } from '../data/juiceday'
import { clamp, useIsDesktop } from '../lib/hooks'
import { useSound } from '../lib/soundContext'

const FLIP_GAP = 700

/** Placeholder text the owner still needs to fill in. */
export function PageNumber({ n, side }: { n: number; side: 'l' | 'r' }) {
  return <span className={`pg-no label ${side === 'l' ? 'left-[6cqw]' : 'right-[6cqw]'}`}>{String(n).padStart(2, '0')}</span>
}

export function Crop({ src, position, className = '', aspect }: { src: string; position: string; className?: string; aspect?: string }) {
  return (
    <div
      className={`bg-cover ${className}`}
      style={{ backgroundImage: `url(${src})`, backgroundPosition: position, aspectRatio: aspect }}
      role="img"
      aria-label="Detail from the Juiceday emails"
    />
  )
}

/** A region of a stitched email, shown on a paper-edge card. */
export function PaperCut({ cut, rotate = 0, markers = [] }: { cut: Cut; rotate?: number; markers?: { n: number; x: number; y: number }[] }) {
  const pos = (at: number, size: number, whole: number) => (whole === size ? 0 : (at / (whole - size)) * 100)
  return (
    <div className="bg-white p-[1.6cqw] shadow-[0_6px_18px_rgba(26,26,26,.14)]" style={{ transform: `rotate(${rotate}deg)` }}>
      <div className="relative">
        <div
          role="img"
          aria-label="Detail from the Juiceday emails"
          style={{
            aspectRatio: `${cut.w} / ${cut.h}`,
            backgroundImage: `url(${cut.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${(cut.iw / cut.w) * 100}% auto`,
            backgroundPosition: `${pos(cut.x, cut.w, cut.iw)}% ${pos(cut.y, cut.h, cut.ih)}%`,
          }}
        />
        {markers.map((m) => (
          <span
            key={m.n}
            className="label absolute flex size-[5.2cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent tracking-normal text-paper-2 shadow-[0_2px_6px_rgba(26,26,26,.3)]"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            {m.n}
          </span>
        ))}
      </div>
    </div>
  )
}

function emailSpread(e: JuicedayEmail, k: number, open: (e: JuicedayEmail) => void): Spread {
  const page = 8 + k * 2
  return {
    name: `Email ${e.no} · ${e.name}`,
    left: (
      <div className="pg flex flex-col items-center">
        <Rv i={0} className="label self-start">
          {e.no} · {e.name}
        </Rv>
        <Rv i={1} className="mt-[4cqw] flex min-h-0 flex-1 flex-col items-center">
          <PhoneFrame src={e.mobile} alt={`Juiceday ${e.name} email`} onOpen={() => open(e)} motion={e.motionMobile} className="h-[calc(100%-2.5em)]" />
          <FigCaption n={k + 2} className="mt-2">
            {e.name} email
          </FigCaption>
        </Rv>
        <PageNumber n={page} side="l" />
      </div>
    ),
    right: (
      <div className="pg">
        <Rv i={0} className="label text-accent">
          {e.no} / 04 · {e.when}
        </Rv>
        <Rv i={1} as="h2" className="headline pg-h1 mt-[4cqw] mb-[7cqw]">
          {e.name}.
        </Rv>
        {[
          ['Its job', e.job],
          ['The one action', e.action],
          ['Design choice', e.choice],
        ].map(([k2, v], i) => (
          <Rv key={k2} i={i + 2} className="mb-[5cqw]">
            <p className="label text-accent">{k2}</p>
            <p className="pg-t mt-1">{v}</p>
          </Rv>
        ))}
        {e.note && (
          <Rv i={5} className="label text-ink/55">
            {e.note}
          </Rv>
        )}
        {e.process && (
          <Rv i={6} className="mt-[1cqw]">
            <Link to={e.process} onClick={(ev) => ev.stopPropagation()} data-cursor="OPEN" className="label text-accent underline underline-offset-2">
              Process →
            </Link>
          </Rv>
        )}
        <div className="absolute right-[6cqw] bottom-[12cqw] left-[6cqw] h-[22%] opacity-90">
          <Crop src={e.desktop} position="50% 12%" className="size-full rounded-sm" />
        </div>
        <PageNumber n={page + 1} side="r" />
      </div>
    ),
  }
}

function buildSpreads(open: (e: JuicedayEmail) => void): Spread[] {
  return [
    {
      name: 'Cover',
      left: (
        <div className="pg flex flex-col">
          <Rv i={0} className="label">
            01 · Case study · Self-initiated concept
          </Rv>
          <Rv i={1} as="h1" className="headline pg-xl mt-auto leading-[0.82] text-accent">
            JUICE
            <br />
            DAY.
          </Rv>
          <Rv i={2} className="label mt-[6cqw] grid grid-cols-2 gap-1">
            <span>Role · Email designer</span>
            <span>Type · Launch sequence</span>
            <span>Tools · Figma, Klaviyo</span>
            <span>Year · 2026</span>
          </Rv>
        </div>
      ),
      right: (
        <div className="pg flex items-center justify-center">
          <Rv i={1} className="h-[88%]">
            <PhoneFrame src={emails[1].mobile} alt="Juiceday launch email" motion={emails[1].motionMobile} className="h-full" />
          </Rv>
        </div>
      ),
    },
    {
      name: 'The brief',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            The idea
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h1 mt-[3cqw]">
            Meet Juiceday.
          </Rv>
          <Rv i={2} className="pg-t mt-[3cqw]">
            A launch sequence for <em>{product.name}</em>, a {product.what}, from a playful skincare brand.
          </Rv>
          <Rv i={3} className="absolute right-[6cqw] bottom-[6cqw] left-[6cqw] h-[48%]">
            <Crop src={emails[1].mobile} position="50% 7%" className="size-full rounded-sm" />
          </Rv>
          <PageNumber n={2} side="l" />
        </div>
      ),
      right: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            The challenge
          </Rv>
          <Rv i={1} className="pg-t mt-1 mb-[4.5cqw] font-serif">
            Get people excited before launch, then turn the excitement into orders.
          </Rv>
          <Rv i={2} className="label text-accent">
            The business goal
          </Rv>
          <Rv i={3} className="pg-t mt-1 mb-[4.5cqw] font-serif">
            Launch a new product.
          </Rv>
          <Rv i={4} className="label text-accent">
            The audience
          </Rv>
          <Rv i={5} className="pg-t mt-1 mb-[4.5cqw]">
            Busy early risers, 20 to 35, who own a vitamin C serum and a sunscreen but rarely have time for both. They find new skincare on Instagram and TikTok, and trust real reviews over ads.
          </Rv>
          <Rv i={6} className="label text-accent">
            The action
          </Rv>
          <Rv i={7} className="pg-t mt-1">
            Sign up for the drop, then buy on launch day. Every email points to one of these two actions.
          </Rv>
          <Rv i={8} className="absolute right-[6cqw] bottom-[8cqw] left-[6cqw] h-[30%]">
            <Crop src="/images/juiceday/sunny-drop-ad.jpg" position="50% 45%" className="size-full rounded-sm" />
          </Rv>
          <PageNumber n={3} side="r" />
        </div>
      ),
    },
    {
      name: 'The sequence',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            The sequence
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw] mb-[7cqw]">
            4 emails, one story.
          </Rv>
          <ol className="ml-[1.5cqw] grid gap-[4.5cqw] border-l border-ink pl-[5cqw]">
            {sequence.map((s, i) => (
              <Rv key={s.no} as="li" i={i + 2} className="label">
                <span className="text-accent">
                  {s.no} · {s.day}
                </span>
                <br />
                <span className="pg-t font-serif normal-case tracking-normal">{s.name}</span>
                {s.note && (
                  <>
                    <br />
                    <span className="text-ink/60">{s.note}</span>
                  </>
                )}
              </Rv>
            ))}
          </ol>
          <PageNumber n={4} side="l" />
        </div>
      ),
      right: (
        <div className="pg flex flex-col justify-center">
          <Rv i={0}>
            <Squares />
          </Rv>
          <Rv i={1} as="blockquote" className="headline pg-h2 mt-[5cqw] leading-tight italic">
            “Each email has one job and one action.”
          </Rv>
          <Rv i={2} className="pg-t mt-[6cqw] text-ink/80">
            The button can repeat, but it always asks for the same thing. No cross-sell modules competing with it.
          </Rv>
          <PageNumber n={5} side="r" />
        </div>
      ),
    },
    {
      name: 'The system',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            The system
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
            One system, four emails.
          </Rv>
          <Rv i={2} className="pg-t mt-[3cqw]">
            Same palette, same buttons, same card shapes.
          </Rv>
          <Rv i={2} className="mt-[2.4cqw]">
            <Link to="/work/juiceday/look" onClick={(e) => e.stopPropagation()} data-cursor="OPEN" className="label text-accent underline underline-offset-2">
              Process →
            </Link>
          </Rv>
          <Rv i={3} className="absolute bg-white p-[3cqw] shadow-[0_6px_18px_rgba(26,26,26,.14)]" style={{ left: '7cqw', top: '47cqw', width: '56cqw', transform: 'rotate(-2.5deg)' }}>
            <div className="grid grid-cols-3 gap-[1.5cqw]">
              {palette.map((c) => (
                <div key={c.hex} className="aspect-square rounded-sm border border-ink/10" style={{ background: c.hex }} title={c.name} />
              ))}
            </div>
            <p className="label mt-[2cqw] text-ink/60">Palette</p>
          </Rv>
          <Rv i={4} className="absolute" style={{ left: '22cqw', top: '95cqw', width: '68cqw' }}>
            <PaperCut cut={cuts.headline} rotate={2} />
            <p className="label mt-[2.4cqw] text-ink/60">Headlines · Fraunces 800</p>
            <p className="label text-ink/60">Body · DM Sans</p>
          </Rv>
          <PageNumber n={6} side="l" />
        </div>
      ),
      right: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Components
          </Rv>
          <Rv i={1} className="absolute" style={{ left: '6cqw', top: '15cqw', width: '40cqw' }}>
            <PaperCut cut={cuts.clue} rotate={-2} />
            <p className="label mt-[2cqw] text-ink/60">Clue card</p>
          </Rv>
          <Rv i={2} className="absolute" style={{ left: '53cqw', top: '11cqw', width: '40cqw' }}>
            <PaperCut cut={cuts.review} rotate={2.5} />
            <p className="label mt-[2cqw] text-ink/60">Review card</p>
          </Rv>
          <Rv i={3} className="absolute" style={{ left: '8cqw', top: '66cqw', width: '42cqw' }}>
            <PaperCut cut={cuts.price} rotate={-1.5} />
            <p className="label mt-[2cqw] text-ink/60">Price card</p>
          </Rv>
          <Rv i={4} className="absolute" style={{ left: '52cqw', top: '62cqw', width: '42cqw' }}>
            <PaperCut cut={cuts.strip} rotate={2} />
            <p className="label mt-[2cqw] text-ink/60">Deadline strip</p>
          </Rv>
          <Rv i={5} className="absolute" style={{ left: '56cqw', top: '90cqw', width: '34cqw' }}>
            <PaperCut cut={cuts.button} rotate={-2} />
            <p className="label mt-[2cqw] text-ink/60">Button, in every email</p>
          </Rv>
          <PageNumber n={7} side="r" />
        </div>
      ),
    },
    ...emails.map((e, k) => emailSpread(e, k, open)),
    {
      name: 'The build plan',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Built in Klaviyo
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
            Images and live text.
          </Rv>
          <Rv i={2} className="pg-t mt-[3cqw] mb-[4cqw]">
            Art and exact type are images. Everything else stays live, editable text in Klaviyo.
          </Rv>
          <div className="grid gap-[3.4cqw]">
            {buildPlan.map((b, i) => (
              <Rv key={b.no} i={i + 3}>
                <p className="label text-accent">
                  {b.no} · {b.name}
                </p>
                <p className="pg-t mt-[0.6cqw]">
                  <span className="text-ink/60">Images.</span> {b.images}
                </p>
                <p className="pg-t">
                  <span className="text-ink/60">Live.</span> {b.live}
                </p>
              </Rv>
            ))}
          </div>
          <PageNumber n={16} side="l" />
        </div>
      ),
      right: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Kept the same across the sequence
          </Rv>
          <ul className="mt-[3cqw] grid gap-[3cqw]">
            {buildRules.map((r, i) => (
              <Rv key={r} as="li" i={i + 1} className="pg-t">
                {r}
              </Rv>
            ))}
          </ul>
          <Rv i={5} className="label mt-[7cqw] text-accent">
            Type in Figma, at half size
          </Rv>
          <dl className="mt-[3cqw] grid gap-[2.4cqw]">
            {typeSpecs.map(([term, text], i) => (
              <Rv key={term} i={i + 6} className="grid grid-cols-[34%_1fr] items-baseline gap-[3cqw]">
                <dt className="label text-ink/60">{term}</dt>
                <dd className="pg-t">{text}</dd>
              </Rv>
            ))}
          </dl>
          <PageNumber n={17} side="r" />
        </div>
      ),
    },
    {
      name: 'Wrap up',
      left: <div className="pg bg-night" />,
      right: (
        <Link to="/work/vivaia" data-cursor="NEXT" className="pg group flex flex-col justify-between bg-night text-paper-2">
          <Rv i={0} className="label">
            Next project
          </Rv>
          <Rv i={1} className="headline pg-h1 transition-colors group-hover:text-accent">
            Vivaia. <span className="font-sans text-[0.5em]">→</span>
          </Rv>
        </Link>
      ),
    },
  ]
}

function useFlipControls(count: number, initial = 0) {
  const [index, setIndex] = useState(initial)
  const current = useRef(initial)
  const last = useRef(0)
  const { flip } = useSound()
  const go = useCallback(
    (d: number) => {
      const now = performance.now()
      const next = clamp(current.current + d, 0, count - 1)
      if (now - last.current < FLIP_GAP || next === current.current) return
      current.current = next
      last.current = now
      setIndex(next)
      flip()
    },
    [count, flip],
  )
  return [index, go] as const
}

type EndLink = { label: string; to: string }

function Controls({ index, count, name, go, endLink }: { index: number; count: number; name: string; go: (d: number) => void; endLink?: EndLink }) {
  const btn = 'rounded-full border border-ink/30 p-2 transition-colors hover:border-accent hover:text-accent disabled:opacity-30'
  return (
    <div className="mt-5 flex items-center justify-center gap-4">
      <button type="button" className={btn} onClick={() => go(-1)} disabled={index === 0} aria-label="Previous page" data-cursor="BACK">
        <ArrowLeft size={16} />
      </button>
      <p className="label min-w-[220px] text-center" aria-live="polite">
        <span className="text-accent">{index + 1}</span> / {count} · {name}
      </p>
      {endLink && index === count - 1 ? (
        <Link to={endLink.to} data-cursor="BACK" className="label rounded-full border border-accent px-4 py-2 text-accent transition-colors hover:bg-accent hover:text-paper-2">
          {endLink.label} →
        </Link>
      ) : (
        <button type="button" className={btn} onClick={() => go(1)} disabled={index === count - 1} aria-label="Next page" data-cursor="NEXT">
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  )
}

/** Desktop / iPad: two-page spreads. Click a page, use the arrows, keys or wheel. */
export function DesktopBook({ spreads, modalOpen, start = 0, endLink }: { spreads: Spread[]; modalOpen: boolean; start?: number; endLink?: EndLink }) {
  const [index, go] = useFlipControls(spreads.length, start)
  const bookRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    // One flip per wheel gesture: wait for the trackpad's momentum to stop.
    let quietTimer = 0
    let locked = false
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      window.clearTimeout(quietTimer)
      quietTimer = window.setTimeout(() => (locked = false), 220)
      if (locked || Math.abs(e.deltaY) < 4) return
      locked = true
      go(e.deltaY > 0 ? 1 : -1)
    }
    const book = bookRef.current
    window.addEventListener('keydown', onKey)
    book?.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.clearTimeout(quietTimer)
      window.removeEventListener('keydown', onKey)
      book?.removeEventListener('wheel', onWheel)
    }
  }, [go, modalOpen])

  return (
    <div className="flex min-h-[calc(100svh-56px)] flex-col items-center justify-center py-6">
      <div ref={bookRef} className="w-[min(94vw,calc((100svh-190px)*1.45),1240px)] aspect-[1.45] shadow-[0_20px_50px_rgba(26,26,26,.14)]">
        <Book spreads={spreads} index={index} onNext={() => go(1)} onPrev={() => go(-1)} className="size-full border border-line" />
      </div>
      <Controls index={index} count={spreads.length} name={spreads[index].name} go={go} endLink={endLink} />
    </div>
  )
}

/** Phones: one page at a time. Tap or swipe to turn. */
export function MobileBook({ spreads, start = 0, endLink }: { spreads: Spread[]; start?: number; endLink?: EndLink }) {
  const pages = spreads.flatMap((s) => [s.left, s.right])
  const names = spreads.flatMap((s) => [s.name, s.name])
  const [index, go] = useFlipControls(pages.length, start * 2)
  const swipe = useRef<{ x: number; y: number } | null>(null)

  return (
    <div className="flex min-h-[calc(100svh-56px)] flex-col items-center justify-center px-4 py-5">
      <div
        className="aspect-[0.72] w-[min(100%,calc((100svh-180px)*0.72))] touch-pan-y border border-line shadow-[0_14px_36px_rgba(26,26,26,.14)]"
        onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={(e) => {
          const s = swipe.current
          swipe.current = null
          if (!s) return
          const dx = e.clientX - s.x
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(dx < 0 ? 1 : -1)
        }}
      >
        <FlipStack pages={pages} index={index} onNext={() => go(1)} className="size-full overflow-hidden" />
      </div>
      <Controls index={index} count={pages.length} name={names[index]} go={go} endLink={endLink} />
    </div>
  )
}

export default function Juiceday() {
  const desktop = useIsDesktop()
  const [viewing, setViewing] = useState<ViewerEmail | null>(null)
  const open = useCallback(
    (e: JuicedayEmail) => setViewing({ title: `Juiceday · ${e.no} ${e.name}`, mobile: e.mobile, desktop: e.desktop, motion: e.motion, motionMobile: e.motionMobile }),
    [],
  )
  const [spreads] = useState(() => buildSpreads(open))
  const close = useCallback(() => setViewing(null), [])
  // Coming back from "Design process" lands on the spread that linked to it.
  const [params] = useSearchParams()
  const start = clamp(Number(params.get('spread')) || 0, 0, spreads.length - 1)

  return (
    <CaseLayout no="01" label="Launch sequence">
      {desktop ? <DesktopBook spreads={spreads} modalOpen={!!viewing} start={start} /> : <MobileBook spreads={spreads} start={start} />}
      {viewing && <EmailViewer email={viewing} onClose={close} />}
    </CaseLayout>
  )
}
