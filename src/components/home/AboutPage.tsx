import SectionHead from '../SectionHead'
import { Rv } from '../Reveal'
import Logo, { InlineLogo } from '../Logo'
import { Checker, Hand, Zigzag } from '../Collage'
import { popStyle } from '../../lib/pop'
import { site } from '../../data/site'
import { beforeDesign, notes, path, story } from '../../data/about'

/**
 * Page 2 · About. Desktop: intro | path | quote, with the notes as a strip below.
 * Phones: everything stacked. Decoration is kept to one small handwritten note.
 */
export default function AboutPage() {
  return (
    <div className="page-px relative flex h-full flex-col bg-paper pt-5 pb-16 short:pt-4 short:pb-[52px] md:pt-8 md:pb-20">
      <Rv i={0}>
        <SectionHead title="About" n={2} />
      </Rv>

      <div className="grid min-h-0 flex-1 content-center-safe gap-4 short:gap-2.5 lg:grid-cols-[1.15fr_0.95fr_1fr] lg:items-center lg:gap-x-[6vw]">
        {/* Intro */}
        <div>
          <div className="relative">
            <div>
              <Rv i={1} as="h2" className="headline text-[10vw] leading-[1] short:text-[7.5vw] md:text-[56px] lg:text-[min(3.8vw,7.5svh)]">
                Hi, I’m
                <span className="relative mt-1 block w-[min(50vw,240px)] md:w-[300px] lg:w-[min(16vw,30svh)]">
                  <Logo className="h-auto w-full text-accent" title={site.name} />
                  <Zigzag className="absolute top-[4%] -right-[1%] w-[9%]" />
                </span>
              </Rv>
              <Rv i={2} className="label mt-2 text-ink/55 lg:mt-3">
                {site.fullName} · {site.role}
              </Rv>
            </div>
            <div className="pop absolute top-[6%] right-0 flex items-start gap-2 -rotate-[8deg] lg:right-[4%]" style={popStyle(1, -16)}>
              <Hand className="text-[15px] lg:text-[min(1.15vw,2.1svh)]">
                same curiosity.
                <br />
                new medium.
              </Hand>
              <Checker className="mt-1 aspect-square w-[18px] rotate-12 lg:w-[min(1.6vw,3svh)]" />
            </div>
          </div>
          <div className="mt-3 space-y-2 text-[14px] leading-[1.5] short:mt-3 short:space-y-1.5 short:text-[13px] md:text-[17px] lg:mt-6 lg:max-w-[26rem] lg:space-y-4 lg:text-[min(1.25vw,17px)] lg:leading-relaxed">
            {story.map((p, i) => (
              <Rv key={p} i={3 + i} as="p">
                {p}
              </Rv>
            ))}
          </div>
        </div>

        {/* Path */}
        <div className="lg:border-l lg:border-ink/15 lg:pl-10">
          <ol className="flex gap-6 lg:block">
            {path.map((step, i) => (
              <Rv key={step.role} as="li" i={4 + i} className="flex items-baseline gap-2 lg:block lg:border-b lg:border-ink/15 lg:py-5 lg:first:pt-0">
                <span className="label text-accent">
                  <span className="hidden lg:inline">— </span>
                  {step.years}
                </span>
                <p className="font-serif text-[18px] leading-tight lg:mt-2 lg:text-[min(2.2vw,4.2svh)]">
                  {step.role}
                  <span className="ml-2 font-sans text-[0.55em] text-accent">→</span>
                </p>
                <p className="mt-2 hidden text-[15px] leading-snug text-ink/70 lg:block">{step.line}</p>
              </Rv>
            ))}
          </ol>
          <Rv i={6} className="mt-3 border-t border-ink pt-3 short:mt-2 short:pt-2 lg:mt-0 lg:border-t-0 lg:pt-5">
            <p className="label text-accent">Before design</p>
            <p className="mt-2 text-[14px] leading-normal short:text-[13px] md:text-[16px] lg:text-[15px] lg:leading-relaxed">{beforeDesign}</p>
          </Rv>
        </div>

        {/* Quote */}
        <Rv i={7} as="figure" className="border-y border-ink/15 py-3 short:py-2 lg:border-0 lg:py-0">
          <blockquote className="headline text-[5.6vw] leading-[1.15] italic short:text-[4.3vw] md:text-[32px] lg:text-[min(2.6vw,5svh)] lg:leading-[1.15]">
            “{site.quote}”
          </blockquote>
          <figcaption className="label mt-2 lg:mt-5">
            — <InlineLogo size={1.8} /> · Vol. 2
          </figcaption>
        </Rv>

        {/* Notes: a strip across the bottom on desktop, a list on phones */}
        <Rv i={8} className="lg:col-span-3 lg:mt-[5svh] lg:flex lg:justify-between lg:gap-x-8 lg:border-t lg:border-ink/15 lg:pt-5">
          <p className="label text-accent lg:pr-4">Notes</p>
          <dl className="mt-2 grid grid-cols-[6.5rem_1fr] items-baseline gap-x-3 gap-y-1 text-[13px] leading-snug short:mt-1.5 short:gap-y-1 md:text-[15px] lg:contents">
            {[...notes, { label: 'Status', text: '' }].map((n) => (
              <div key={n.label} className={`contents lg:block ${n.label === 'Status' ? 'short:hidden' : ''}`}>
                <dt className="label text-ink/55">{n.label}</dt>
                <dd className="lg:mt-1.5 lg:text-[min(1.05vw,15px)] xl:whitespace-nowrap">
                  {n.label === 'Status' ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" /> Open to work
                    </span>
                  ) : (
                    n.text
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Rv>
      </div>

    </div>
  )
}
