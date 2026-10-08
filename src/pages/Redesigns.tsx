import CaseLayout, { CaseIntro } from '../components/case/CaseLayout'
import EmailFrame from '../components/case/EmailFrame'
import { Reveal, Rv } from '../components/Reveal'
import { redesigns } from '../data/redesigns'

export default function Redesigns() {
  return (
    <CaseLayout no="03" label="Redesigns" next={{ title: 'Concepts', to: '/work/concepts' }}>
      <CaseIntro no="03" kicker="Redesigns" title="Redesigns" line="I spot the problems, then fix them." />
      {redesigns.map((r, k) => (
        <Reveal
          key={r.id}
          as="section"
          id={r.id}
          amount={0.08}
          className="page-px grid gap-12 border-t border-ink/15 py-20 md:grid-cols-12 md:gap-x-8 md:py-28"
        >
          {/* The story: what was wrong, what I changed, what I kept */}
          <div className="md:col-span-5">
            <Rv i={0} className="label text-accent">
              03.{k + 1} · {r.kind}
            </Rv>
            <Rv i={1} as="h2" className="headline mt-3 text-[15vw] md:text-[min(7vw,104px)]">
              {r.brand}.
            </Rv>
            <div className="mt-10 grid grid-cols-[auto_1fr_1fr] gap-x-5 gap-y-4">
              <Rv i={2} className="label col-start-2 text-ink/60">
                The problem
              </Rv>
              <Rv i={2} className="label text-accent">
                The fix
              </Rv>
              {r.points.map((p, i) => (
                <Rv key={i} i={3 + i} className="col-span-3 grid grid-cols-subgrid items-baseline border-t border-ink/15 pt-4">
                  <span className="label flex size-5 items-center justify-center rounded-full bg-accent tracking-normal text-paper-2">
                    {i + 1}
                  </span>
                  <span className="text-[14px] leading-snug text-ink/75 md:text-[15px]">{p.problem}</span>
                  <span className="text-[14px] leading-snug md:text-[15px]">{p.fix}</span>
                </Rv>
              ))}
            </div>
            <Rv i={8} className="mt-8 border-t border-ink/15 pt-4">
              <p className="label text-ink/60">What I kept</p>
              <p className="mt-2 text-[14px] leading-snug md:text-[15px]">{r.kept}</p>
            </Rv>
          </div>

          {/* The two full emails, side by side */}
          <div className="md:col-span-6 md:col-start-7">
            <Rv i={2} className="grid grid-cols-2 gap-4 md:gap-6">
              <EmailFrame src={r.before} label="Before" note={r.beforeNote} />
              <EmailFrame src={r.after} label="After" accent motion={r.motion} />
            </Rv>
            <Rv i={3} className="label mt-4 flex justify-between gap-4 text-ink/55">
              <span>Unofficial redesign, not affiliated with {r.brand}</span>
              <span className="hidden sm:inline">Scroll inside each email</span>
            </Rv>
          </div>
        </Reveal>
      ))}
    </CaseLayout>
  )
}
