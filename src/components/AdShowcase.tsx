import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, Bookmark, ChevronRight, Clapperboard, Heart, Home, MessageCircle, MoreHorizontal, Search, Send, SquarePlus, UserRound } from 'lucide-react'
import { Reveal, Rv } from './Reveal'
import { Tape } from './Collage'
import type { CreativePiece, EmailMock, FeedMock } from '../data/creative'

/** A looping, muted video with its still frame until it plays. */
function Clip({ piece, className = '' }: { piece: CreativePiece; className?: string }) {
  return (
    <video
      src={piece.src}
      poster={piece.poster}
      className={`block size-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      aria-label={piece.title}
    />
  )
}

/** Small four-petal clover, the cute accent from the Vivaia ad. */
function Clover({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={`absolute ${className}`}>
      {[0, 90, 180, 270].map((r) => (
        <ellipse key={r} cx="20" cy="11" rx="7.5" ry="9" fill={color} transform={`rotate(${r} 20 20)`} />
      ))}
    </svg>
  )
}

/** A thin looping line, drawn by hand. */
function Loop({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 90" fill="none" aria-hidden className={`absolute ${className}`}>
      <path d="M4 70 C 30 10, 110 0, 120 40 C 128 72, 80 84, 70 58 C 62 36, 110 18, 156 30" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/**
 * Lays a scene out at a fixed design size and scales the whole thing to the
 * available width, so the mockups keep their proportions on any screen.
 */
function Stage({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / w)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [w])
  return (
    <div ref={ref} className="mx-auto w-full" style={{ maxWidth: w, height: h * scale }}>
      <div className="relative origin-top-left" style={{ width: w, height: h, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

/** A phone with an Instagram-style feed post around the ad. */
function FeedScene({ piece, mock }: { piece: CreativePiece; mock: FeedMock }) {
  return (
    <Stage w={520} h={660}>
      {/* The printed ad, taped up behind the phone */}
      <figure className="absolute top-[9%] right-0 w-[52%] rotate-[5deg] shadow-[0_18px_40px_rgba(0,0,0,.35)]">
        <Tape className="-top-[4%] left-[34%] rotate-[-4deg]" />
        <img src={piece.poster} alt="" className="block w-full" loading="lazy" />
      </figure>

      {/* The phone */}
      <div className="absolute top-[2%] left-[6%] w-[54%] -rotate-[3deg] rounded-[2.6rem] border-[7px] border-[#151515] bg-[#FBF7F2] shadow-[0_24px_60px_rgba(0,0,0,.45)]">
        <div className="overflow-hidden rounded-[2.1rem] text-[#1a1a1a]">
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[11px] font-medium">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-[#151515]" aria-hidden />
            <span className="tracking-tight">●●●</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-[#1a1a1a] font-serif text-[12px] text-white">
              {mock.handle[0].toUpperCase()}
            </span>
            <span className="leading-tight">
              <span className="flex items-center gap-1 text-[11px] font-medium">
                {mock.handle} <BadgeCheck size={11} className="text-[#3897F0]" aria-hidden />
              </span>
              <span className="block text-[10px] text-[#1a1a1a]/60">Sponsored</span>
            </span>
            <MoreHorizontal size={14} className="ml-auto" aria-hidden />
          </div>
          <div className="aspect-[4/5]">
            <Clip piece={piece} />
          </div>
          <div className="flex items-center gap-3 px-3 pt-2.5" aria-hidden>
            <Heart size={17} />
            <MessageCircle size={17} />
            <Send size={16} />
            <Bookmark size={16} className="ml-auto" />
          </div>
          <p className="px-3 pt-1.5 text-[11px] font-medium">{mock.likes} likes</p>
          <p className="px-3 pt-0.5 text-[11px] leading-snug">
            <span className="font-medium">{mock.handle}</span> {mock.caption}
          </p>
          <div style={{ background: mock.ctaBg ?? '#F4D3DC' }} className="mx-3 mt-2.5 flex items-center justify-between rounded-md px-3 py-1.5 text-[11px] font-medium">
            {mock.cta} <ChevronRight size={13} aria-hidden />
          </div>
          <div className="mt-3 flex items-center justify-around border-t border-[#1a1a1a]/10 px-2 pt-2.5 pb-4" aria-hidden>
            <Home size={17} />
            <Search size={17} />
            <SquarePlus size={17} />
            <Clapperboard size={17} />
            <UserRound size={17} />
          </div>
        </div>
      </div>

      <Clover color={mock.deco} className="top-[-2%] left-0 size-9 -rotate-12" />
      <Loop className="top-[2%] left-[-6%] w-28 text-paper-2/35" />
    </Stage>
  )
}

/** An email open in a mail window, plus a phone turned sideways, both showing the animation. */
function EmailScene({ piece, mock }: { piece: CreativePiece; mock: EmailMock }) {
  return (
    <Stage w={560} h={580}>
      {/* The email, open in a mail app */}
      <div className="absolute top-[6%] left-0 w-[86%] overflow-hidden rounded-xl bg-[#FBF6EC] text-[#24346B] shadow-[0_24px_60px_rgba(0,0,0,.45)]">
        <div className="flex items-center gap-1.5 border-b border-[#24346B]/10 px-4 py-2.5 text-[11px]">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#28C840]" aria-hidden />
          <span className="ml-2 font-medium">{mock.sender}</span>
          <span className="ml-auto underline underline-offset-2">View in browser</span>
        </div>
        <div className="p-3">
          <div className="overflow-hidden rounded-lg" style={{ aspectRatio: piece.ratio }}>
            <Clip piece={piece} />
          </div>
        </div>
        <div className="px-6 pt-3 pb-8 text-center">
          <p className="font-serif text-[30px] leading-none font-semibold">{mock.headline}</p>
          <p className="mt-3 text-[13px]">{mock.line}</p>
          <span className="mx-auto mt-4 flex size-8 items-center justify-center rounded-full border border-[#24346B]" aria-hidden>
            <ChevronRight size={15} />
          </span>
        </div>
      </div>

      {/* The same banner on a phone, turned sideways */}
      <div className="absolute right-0 bottom-[6%] w-[58%] -rotate-[9deg] rounded-[1.8rem] border-[6px] border-[#151515] bg-[#151515] shadow-[0_24px_50px_rgba(0,0,0,.5)]">
        <div className="overflow-hidden rounded-[1.4rem] bg-[#1F2F6B]" style={{ aspectRatio: piece.ratio }}>
          <Clip piece={piece} />
        </div>
      </div>

      {mock.note && (
        <p className="absolute top-[0%] right-[-2%] w-28 rotate-[-10deg] text-right font-[family-name:var(--font-hand)] text-[19px] leading-[1.05] text-paper-2/75">
          {mock.note}
          <svg viewBox="0 0 40 50" fill="none" aria-hidden className="ml-auto mt-1 w-7 text-paper-2/60">
            <path d="M30 2 C 34 20, 26 34, 8 44 M8 44 L 17 44 M8 44 L 11 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </p>
      )}
      <Clover color={mock.deco} className="right-[2%] bottom-[46%] size-7 rotate-12" />
      <Loop className="right-[-4%] bottom-[38%] w-24 text-paper-2/30" />
    </Stage>
  )
}

function Caption({ n, piece }: { n: number; piece: CreativePiece }) {
  const link = piece.mock?.link
  return (
    <div>
      <p className="label text-accent">{String(n).padStart(2, '0')}</p>
      <h3 className="mt-2 font-serif text-[28px] leading-tight md:text-[34px]">{piece.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-paper-2/75 md:text-[16px]">{piece.note}</p>
      {piece.medium && <p className="label mt-4 text-paper-2/45">{piece.medium}</p>}
      {link && (
        <Link to={link.to} data-cursor="OPEN" className="label mt-6 inline-block underline underline-offset-4 transition-colors hover:text-accent">
          {link.label} →
        </Link>
      )}
    </div>
  )
}

/** The ads, one per row, each staged where it would really live, alternating sides. */
export default function AdShowcase({ pieces }: { pieces: CreativePiece[] }) {
  return (
    <Reveal amount={0.05} as="section" className="page-px overflow-x-clip bg-night py-20 text-paper-2 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Rv i={0} className="label flex justify-between border-b border-paper-2/20 pb-2">
          <span>The ads</span>
          <span>{String(pieces.length).padStart(2, '0')} pieces</span>
        </Rv>
        <Rv i={1} as="p" className="mt-3 font-serif text-[18px] text-paper-2/70 italic md:text-[20px]">
          Campaign creative, shown where it lives
        </Rv>
        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {pieces.map((p, i) => {
            const scene: ReactNode =
              p.mock?.kind === 'feed' ? (
                <FeedScene piece={p} mock={p.mock} />
              ) : p.mock?.kind === 'email' ? (
                <EmailScene piece={p} mock={p.mock} />
              ) : (
                <div className="mx-auto w-full max-w-sm overflow-hidden" style={{ aspectRatio: p.ratio ?? '4 / 5' }}>
                  <Clip piece={p} />
                </div>
              )
            const flip = i % 2 === 1
            return (
              <Rv key={p.title} i={2 + i} className="grid items-center gap-12 md:grid-cols-12 md:gap-x-10">
                <div className={`min-w-0 md:col-span-7 ${flip ? 'md:order-2 md:col-start-6' : ''}`}>{scene}</div>
                <div className={`min-w-0 md:col-span-4 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                  <Caption n={i + 1} piece={p} />
                </div>
              </Rv>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}
