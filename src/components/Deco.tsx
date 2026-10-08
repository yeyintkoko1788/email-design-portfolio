import type { ReactNode } from 'react'

// The allowed magazine decorations: thin, small, precise. Max 2–3 per page.

export function RedRule({ left, center, right, className = '' }: { left?: ReactNode; center?: ReactNode; right?: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="h-px bg-accent" />
      <div className="label mt-1.5 flex justify-between gap-4">
        <span>{left}</span>
        {center && <span className="text-accent">{center}</span>}
        <span>{right}</span>
      </div>
    </div>
  )
}

export function RedSquare({ className = '' }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-2.5 bg-accent ${className}`} />
}

export function Squares({ count = 3, className = '' }: { count?: number; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex gap-1.5 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="size-1.5 bg-accent" />
      ))}
    </span>
  )
}

/** Printer's crop marks at the four corners of the child. */
export function CropMarks({ children, className = '' }: { children: ReactNode; className?: string }) {
  const h = 'absolute h-px w-2.5 bg-ink'
  const v = 'absolute w-px h-2.5 bg-ink'
  return (
    <div className={`relative ${className}`}>
      {children}
      <span aria-hidden className={`${h} -left-4 top-0`} />
      <span aria-hidden className={`${v} left-0 -top-4`} />
      <span aria-hidden className={`${h} -right-4 top-0`} />
      <span aria-hidden className={`${v} right-0 -top-4`} />
      <span aria-hidden className={`${h} -left-4 bottom-0`} />
      <span aria-hidden className={`${v} left-0 -bottom-4`} />
      <span aria-hidden className={`${h} -right-4 bottom-0`} />
      <span aria-hidden className={`${v} right-0 -bottom-4`} />
    </div>
  )
}

export function FigCaption({ n, children, className = '' }: { n: number; children: ReactNode; className?: string }) {
  return (
    <p className={`label ${className}`}>
      <span className="text-accent">(FIG. {String(n).padStart(2, '0')})</span> {children}
    </p>
  )
}

export function PageNo({ n, of, className = '' }: { n: number; of?: number; className?: string }) {
  return (
    <span className={`label ${className}`}>
      <span className="text-accent">{String(n).padStart(2, '0')}</span>
      {of !== undefined && <> / {String(of).padStart(2, '0')}</>}
    </span>
  )
}

export function SideText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`label rotate-180 [writing-mode:vertical-rl] ${className}`}>{children}</span>
  )
}
