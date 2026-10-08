import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SoundToggle from '../SoundToggle'
import Logo from '../Logo'

export default function CaseLayout({
  no,
  label,
  children,
  next,
  back = '/#work',
}: {
  no: string
  label: string
  children: ReactNode
  next?: { title: string; to: string }
  /** Where "← The issue" goes */
  back?: string
}) {
  return (
    <div className="min-h-svh bg-paper-2">
      <header className="page-px fixed inset-x-0 top-0 z-[400] flex h-14 items-center justify-between gap-4 border-b border-ink/10 bg-paper-2/90 backdrop-blur">
        <Link to={back} data-cursor="BACK" className="label transition-colors hover:text-accent">
          ← The issue
        </Link>
        <Link to="/" aria-label="nang, home" className="absolute left-1/2 top-2.5 -translate-x-1/2">
          <Logo title="" className="h-auto w-[72px] text-accent" />
        </Link>
        <div className="flex items-center gap-4">
          <span className="label hidden text-accent md:inline">
            {no} · {label}
          </span>
          <SoundToggle />
        </div>
      </header>
      <main className="pt-14">{children}</main>
      {next && (
        <Link
          to={next.to}
          data-cursor="NEXT"
          className="page-px group flex items-end justify-between border-t border-paper-2/15 bg-night py-14 text-paper-2 md:py-20"
        >
          <span className="label">Next project</span>
          <span className="headline text-5xl transition-colors group-hover:text-accent md:text-8xl">{next.title}. <span className="font-sans text-[0.5em]">→</span></span>
        </Link>
      )}
    </div>
  )
}

/** Section header used by the non-book case studies. */
export function CaseIntro({ no, kicker, title, line, note }: { no: string; kicker: string; title: string; line: string; note?: string }) {
  return (
    <div className="page-px pt-14 pb-10 md:pt-24 md:pb-16">
      <p className="label text-accent">
        {no} · {kicker}
      </p>
      <h1 className="headline mt-4 text-[17vw] text-accent md:text-[10vw]">{title}.</h1>
      <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink/80 md:text-[19px]">{line}</p>
      {note && <p className="label mt-4 text-ink/60">{note}</p>}
    </div>
  )
}
