import { PageNo } from './Deco'
import { site } from '../data/site'

/** Running header used by every part of the issue: "Title ··· 03 / 06", with a rule. */
export default function SectionHead({ title, n, className = '' }: { title: string; n: number; className?: string }) {
  return (
    <div className={className}>
      <div className="label flex justify-between pb-2">
        <span>{title}</span>
        <PageNo n={n} of={site.parts} />
      </div>
      <div className="h-px bg-ink/15" />
    </div>
  )
}
