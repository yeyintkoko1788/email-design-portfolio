import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import CaseLayout from '../components/case/CaseLayout'
import Book, { type Spread } from '../components/Book'
import FlipStack from '../components/FlipStack'
import PhoneFrame from '../components/PhoneFrame'
import EmailViewer, { type ViewerEmail } from '../components/EmailViewer'
import { FigCaption, Squares } from '../components/Deco'
import { Rv } from '../components/Reveal'
import { emails, palette, product, type JuicedayEmail } from '../data/juiceday'
import { clamp, useIsDesktop } from '../lib/hooks'
import { useSound } from '../lib/soundContext'

const FLIP_GAP = 700

/** Placeholder text the owner still needs to fill in. */
function PageNumber({ n, side }: { n: number; side: 'l' | 'r' }) {
  return <span className={`pg-no label ${side === 'l' ? 'left-[6cqw]' : 'right-[6cqw]'}`}>{String(n).padStart(2, '0')}</span>
}

function Crop({ src, position, className = '' }: { src: string; position: string; className?: string }) {
  return (
    <div
      className={`bg-cover ${className}`}
      style={{ backgroundImage: `url(${src})`, backgroundPosition: position }}
      role="img"
      aria-label="Detail from the Juiceday emails"
    />
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
          <PhoneFrame src={e.mobile} alt={`Juiceday ${e.name} email`} onOpen={() => open(e)} motion={e.motion} className="h-[calc(100%-2.5em)]" />
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
            01 · Case study
          </Rv>
          <Rv i={1} as="h1" className="headline pg-xl mt-auto leading-[0.82] text-accent">
            JUICE
            <br />
            DAY.
          </Rv>
          <Rv i={2} className="label mt-[6cqw] grid grid-cols-2 gap-1">
            <span>Role · Email designer</span>
            <span>Type · Launch sequence</span>
            <span>Tools · Figma</span>
            <span>Year · 2026</span>
          </Rv>
        </div>
      ),
      right: (
        <div className="pg flex items-center justify-center">
          <Rv i={1} className="h-[88%]">
            <PhoneFrame src={emails[1].mobile} alt="Juiceday launch email" onOpen={() => open(emails[1])} motion={emails[1].motion} className="h-full" />
          </Rv>
        </div>
      ),
    },
    {
      name: 'Step 1 · The brief',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Step 01 · The brand
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h1 mt-[3cqw]">
            Meet Juiceday.
          </Rv>
          <Rv i={2} className="pg-t mt-[3cqw]">
            A playful skincare brand launching <em>{product.name}</em>: {product.what}.
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
            The business goal
          </Rv>
          <Rv i={1} className="pg-h3 mt-1 mb-[6cqw] font-serif">
            Launch a new product.
          </Rv>
          <Rv i={2} className="label text-accent">
            My job
          </Rv>
          <Rv i={3} className="pg-h3 mt-1 font-serif">
            Get people excited before it drops.
          </Rv>
          <Rv i={4} className="label absolute bottom-[8cqw] left-[6cqw] w-[38%]">
            Pastels
            <br />
            Fraunces
            <br />
            No seriousness
          </Rv>
          <Rv i={5} className="absolute right-[6cqw] bottom-[8cqw] w-[46%] rotate-3 bg-white p-[3cqw] shadow-[0_6px_18px_rgba(26,26,26,.12)]">
            <div className="grid grid-cols-3 gap-[1.5cqw]">
              {palette.map((c) => (
                <div key={c.hex} className="aspect-square rounded-sm border border-ink/10" style={{ background: c.hex }} title={c.name} />
              ))}
            </div>
            <p className="mt-[2cqw] font-serif text-[6cqw] leading-none font-semibold text-[#24346B]">Aa Fraunces</p>
          </Rv>
          <PageNumber n={3} side="r" />
        </div>
      ),
    },
    {
      name: 'Step 2 · Strategy',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Step 02 · The strategy
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
            Who is this for?
          </Rv>
          <Rv i={2} className="mt-[4cqw] h-[34%]">
            <Crop src="/images/juiceday/sunny-drop-ad.jpg" position="50% 45%" className="size-full rounded-sm" />
          </Rv>
          <Rv i={3} className="pg-t mt-[4cqw]">
            Busy early risers, 20 to 35, who already own a vitamin C serum and a sunscreen but rarely have time for both. They find new skincare on Instagram and TikTok, and trust real reviews over ads.
          </Rv>
          <PageNumber n={4} side="l" />
        </div>
      ),
      right: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Why would they care?
          </Rv>
          <Rv i={1} className="pg-t mt-1 mb-[5cqw]">
            {product.name} turns two morning steps into one: glow and SPF 30 in a single squeeze. It feels like a shortcut that still counts as self-care.
          </Rv>
          <Rv i={2} className="label text-accent">
            What do we want them to do?
          </Rv>
          <Rv i={3} className="pg-t mt-1 mb-[5cqw]">
            Sign up for the drop, then buy on launch day. Every email points to one of these two actions.
          </Rv>
          <Rv i={4} className="label text-accent">
            How the emails get them there
          </Rv>
          <Rv i={5} className="pg-t mt-1">
            Curiosity builds the list. The launch converts it. Social proof wins the doubters. Last chance catches the rest.
          </Rv>
          <PageNumber n={5} side="r" />
        </div>
      ),
    },
    {
      name: 'Step 3 · The plan',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Step 03 · The plan
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw] mb-[7cqw]">
            4 emails, one story.
          </Rv>
          <ol className="ml-[1.5cqw] grid gap-[4.5cqw] border-l border-ink pl-[5cqw]">
            {emails.map((e, i) => (
              <Rv key={e.no} as="li" i={i + 2} className="label">
                <span className="text-accent">
                  {e.no} · {e.when}
                </span>
                <br />
                <span className="pg-t font-serif normal-case tracking-normal">{e.name}</span>
              </Rv>
            ))}
          </ol>
          <PageNumber n={6} side="l" />
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
          <PageNumber n={7} side="r" />
        </div>
      ),
    },
    ...emails.map((e, k) => emailSpread(e, k, open)),
    {
      name: 'Wrap up',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            What I learned
          </Rv>
          <Rv i={1} className="pg-h3 mt-[4cqw] font-serif italic">
            A launch is a story, not four emails: each one only works because of the one before it.
          </Rv>
          <Rv i={2} className="absolute right-[6cqw] bottom-[12cqw] left-[6cqw] flex h-[46%] gap-[3cqw]">
            {emails.map((e) => (
              <Crop key={e.no} src={e.mobile} position="50% 0%" className="h-full flex-1 rounded-sm" />
            ))}
          </Rv>
          <PageNumber n={16} side="l" />
        </div>
      ),
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

function useFlipControls(count: number) {
  const [index, setIndex] = useState(0)
  const current = useRef(0)
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

function Controls({ index, count, name, go }: { index: number; count: number; name: string; go: (d: number) => void }) {
  const btn = 'rounded-full border border-ink/30 p-2 transition-colors hover:border-accent hover:text-accent disabled:opacity-30'
  return (
    <div className="mt-5 flex items-center justify-center gap-4">
      <button type="button" className={btn} onClick={() => go(-1)} disabled={index === 0} aria-label="Previous page" data-cursor="BACK">
        <ArrowLeft size={16} />
      </button>
      <p className="label min-w-[220px] text-center" aria-live="polite">
        <span className="text-accent">{index + 1}</span> / {count} · {name}
      </p>
      <button type="button" className={btn} onClick={() => go(1)} disabled={index === count - 1} aria-label="Next page" data-cursor="NEXT">
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

/** Desktop / iPad: two-page spreads. Click a page, use the arrows, keys or wheel. */
function DesktopBook({ spreads, modalOpen }: { spreads: Spread[]; modalOpen: boolean }) {
  const [index, go] = useFlipControls(spreads.length)
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
      <Controls index={index} count={spreads.length} name={spreads[index].name} go={go} />
    </div>
  )
}

/** Phones: one page at a time. Tap or swipe to turn. */
function MobileBook({ spreads }: { spreads: Spread[] }) {
  const pages = spreads.flatMap((s) => [s.left, s.right])
  const names = spreads.flatMap((s) => [s.name, s.name])
  const [index, go] = useFlipControls(pages.length)
  const start = useRef<{ x: number; y: number } | null>(null)

  return (
    <div className="flex min-h-[calc(100svh-56px)] flex-col items-center justify-center px-4 py-5">
      <div
        className="aspect-[0.72] w-[min(100%,calc((100svh-180px)*0.72))] touch-pan-y border border-line shadow-[0_14px_36px_rgba(26,26,26,.14)]"
        onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={(e) => {
          const s = start.current
          start.current = null
          if (!s) return
          const dx = e.clientX - s.x
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(dx < 0 ? 1 : -1)
        }}
      >
        <FlipStack pages={pages} index={index} onNext={() => go(1)} className="size-full overflow-hidden" />
      </div>
      <Controls index={index} count={pages.length} name={names[index]} go={go} />
    </div>
  )
}

export default function Juiceday() {
  const desktop = useIsDesktop()
  const [viewing, setViewing] = useState<ViewerEmail | null>(null)
  const open = useCallback(
    (e: JuicedayEmail) => setViewing({ title: `Juiceday · ${e.no} ${e.name}`, mobile: e.mobile, desktop: e.desktop, motion: e.motion }),
    [],
  )
  const [spreads] = useState(() => buildSpreads(open))
  const close = useCallback(() => setViewing(null), [])

  return (
    <CaseLayout no="01" label="Launch sequence">
      {desktop ? <DesktopBook spreads={spreads} modalOpen={!!viewing} /> : <MobileBook spreads={spreads} />}
      {viewing && <EmailViewer email={viewing} onClose={close} />}
    </CaseLayout>
  )
}
