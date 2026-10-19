import type { ReactNode } from 'react'
import SectionHead from '../SectionHead'
import PhoneFrame from '../PhoneFrame'
import { Rv } from '../Reveal'
import { Asterisk, Checker, Hand, Note, Polaroid, Smiley, Swoosh, Tape, TornPhoto } from '../Collage'
import { popStyle } from '../../lib/pop'
import { process } from '../../data/process'
import { emails } from '../../data/juiceday'

/** One small collage object per step (desktop only). */
const objects: ReactNode[] = [
  <Note clip className="w-[72%] rotate-[4deg] text-[min(0.95vw,1.8svh)]">
    launch
    <br />→ awareness
    <br />→ conversion.
  </Note>,
  <div className="relative w-[66%] -rotate-[5deg]">
    <Asterisk className="absolute top-[18%] -left-[34%] w-[22%]" />
    <Polaroid src="/images/process/candle.jpg" pin />
  </div>,
  <div className="relative w-[74%] rotate-[3deg]">
    <Note tone="paper" className="text-[min(0.9vw,1.7svh)]">
      Right message
      <br />+ Right person
      <br />+ Right time
    </Note>
    <Asterisk className="absolute top-[30%] -right-[22%] w-[18%]" />
  </div>,
  <div className="relative w-[70%]">
    <Asterisk className="absolute -top-[6%] -left-[20%] w-[18%]" />
    <TornPhoto src="/images/process/lemons.jpg" alt="" className="w-[80%] -rotate-3" imgClassName="aspect-square" />
    <Checker className="absolute right-0 -bottom-[18%] aspect-square w-[52%] rotate-6" />
  </div>,
  <div className="relative w-[70%] rotate-[4deg]">
    <Tape className="-top-[6%] left-[30%] -rotate-3" />
    <TornPhoto src="/images/process/camera.jpg" alt="" imgClassName="aspect-square" />
  </div>,
  <PhoneFrame src={emails[1].mobile} alt="" className="w-[52%] rotate-[7deg] !border-[3px]" />,
]

/** Page 3 · How I work: "From brief to inbox." and six steps, each with a collage object. */
export default function ProcessPage() {
  return (
    <div className="page-px flex h-full flex-col bg-paper pt-5 pb-16 short:pt-4 short:pb-[52px] md:pt-8 md:pb-20">
      <Rv i={0}>
        <SectionHead title="How I work" n={3} />
      </Rv>

      <div className="grid min-h-0 flex-1 content-center-safe gap-5 short:gap-3 lg:grid-cols-[0.8fr_3.4fr] lg:items-center lg:gap-x-[5vw]">
        {/* Intro */}
        <div className="relative lg:self-stretch lg:py-[6svh]">
          <Rv i={1} as="h2" className="headline text-[9vw] leading-[1.02] short:text-[7.5vw] md:text-[min(52px,6.5svh)] lg:text-[min(3.6vw,7svh)]">
            From brief <br className="hidden lg:block" />
            to{' '}
            <span className="relative inline-block">
              inbox.
              <Swoosh className="absolute -bottom-[0.18em] left-0 w-full" />
            </span>
          </Rv>
          <Rv i={2} className="label mt-3 text-ink/60 lg:mt-8">
            The process behind
            <br className="hidden lg:block" /> every campaign
          </Rv>
          <div className="pop mt-[7svh] hidden w-fit -rotate-12 items-end gap-2 lg:flex" style={popStyle(1.6, -18)}>
            <Hand className="text-[min(1.15vw,2.1svh)]">
              strategy
              <br />+ creativity
              <br />= impact
            </Hand>
            <Smiley className="mb-1 w-[min(1.3vw,2.4svh)]" />
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* The red path that links the steps (desktop) */}
          <svg
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            aria-hidden
            className="draw-path pointer-events-none absolute top-1/2 left-[-2%] hidden h-[7svh] w-[104%] -translate-y-1/2 text-accent lg:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          >
            <path pathLength={1} d="M5 34C120 34 250 30 300 18C330 10 330 2 318 6C305 12 330 30 380 32C480 36 560 34 660 22C690 18 690 8 678 12C665 18 690 32 740 32C840 32 920 30 990 30M976 24L990 30L976 36" />
          </svg>

          <ol className="relative grid grid-cols-2 gap-x-5 lg:grid-cols-3 lg:gap-x-[3.5vw] lg:gap-y-[11svh]">
            {process.map((p, i) => (
              <Rv
                key={p.step}
                as="li"
                i={3 + i}
                className="border-ink/15 py-3.5 short:py-2.5 md:py-[min(14px,1.8svh)] max-lg:not-nth-[-n+2]:border-t lg:grid lg:grid-cols-[1fr_34%] lg:items-start lg:gap-5 lg:py-0"
              >
                <div>
                  <p className="label text-accent">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="headline mt-1 text-[23px] leading-none short:text-[20px] md:text-[min(32px,4.2svh)] lg:mt-2 lg:text-[min(2.5vw,4.6svh)]">
                    {p.step}
                    <span className="ml-1.5 font-sans text-[0.55em] text-accent">→</span>
                  </h3>
                  <p className="mt-2 font-serif text-[14px] leading-snug italic short:text-[13px] md:text-[min(17px,2.5svh)] lg:mt-3 lg:text-[min(1.2vw,2.2svh)]">
                    {p.question}
                  </p>
                </div>
                <div className="pop hidden justify-center self-center lg:flex" style={popStyle(0.9 + i * 0.15, i % 2 ? 9 : -9)}>
                  {objects[i]}
                </div>
              </Rv>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
