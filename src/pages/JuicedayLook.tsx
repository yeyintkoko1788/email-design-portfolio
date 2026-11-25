import { useState } from 'react'
import CaseLayout from '../components/case/CaseLayout'
import type { Spread } from '../components/Book'
import { Rv } from '../components/Reveal'
import { lookImages } from '../data/juiceday'
import { useIsDesktop } from '../lib/hooks'
import { DesktopBook, MobileBook, PageNumber } from './Juiceday'

/** A whole image on a paper-edge card. */
export function PaperImage({ src, ratio, alt, rotate = 0 }: { src: string; ratio: string; alt: string; rotate?: number }) {
  return (
    <div className="bg-white p-[1.6cqw] shadow-[0_6px_18px_rgba(26,26,26,.14)]" style={{ transform: `rotate(${rotate}deg)` }}>
      <img src={src} alt={alt} draggable={false} className="block w-full" style={{ aspectRatio: ratio }} loading="lazy" />
    </div>
  )
}

/** Back to the System spread (the fourth spread) that linked here. */
const BACK = { label: 'Back to Juiceday', to: '/work/juiceday?spread=3' }

function buildLookSpreads(): Spread[] {
  return [
    {
      name: 'Colour',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Design process
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
            Colour.
          </Rv>
          <ul className="mt-[3cqw] grid gap-[2cqw]">
            <Rv as="li" i={2} className="pg-t">
              Round 1: orange, lemon and grapefruit. It didn’t feel right.
            </Rv>
            <Rv as="li" i={3} className="pg-t">
              Round 2: a bolder palette.
            </Rv>
            <Rv as="li" i={4} className="pg-t">
              Final: pastel, to make the brand feel playful, warm, soft and distinctive.
            </Rv>
          </ul>
          <Rv i={5} className="absolute" style={{ left: '8cqw', top: '62cqw', width: '78cqw' }}>
            <p className="label mb-[2cqw] text-ink/60">Round 1</p>
            <PaperImage {...lookImages.palette1} alt="Round 1 palette: orange, lemon and grapefruit" rotate={-1.5} />
          </Rv>
          <PageNumber n={2} side="l" />
        </div>
      ),
      right: (
        <div className="pg">
          <Rv i={0} className="absolute" style={{ left: '9cqw', top: '9cqw', width: '82cqw' }}>
            <p className="label mb-[2cqw] text-ink/60">Round 2</p>
            <PaperImage {...lookImages.palette2} alt="Round 2 palette: cobalt added, three serif options" rotate={1.5} />
          </Rv>
          <Rv i={1} className="absolute" style={{ left: '14cqw', top: '66cqw', width: '66cqw' }}>
            <p className="label mb-[2cqw] text-accent">Final</p>
            <PaperImage {...lookImages.paletteFinal} alt="Final sorbet palette with a sample email hero" rotate={-1} />
          </Rv>
          <PageNumber n={3} side="r" />
        </div>
      ),
    },
    {
      name: 'Two directions',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Two directions
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
            Same structure, two styles.
          </Rv>
          <Rv i={2} className="pg-t mt-[3cqw]">
            Pastel was the choice from the start. To test it, the same email was designed in the bold palette from round 1. Pastel held.
          </Rv>
          <Rv i={3} className="absolute" style={{ left: '28cqw', top: '40cqw', width: '44cqw' }}>
            <PaperImage {...lookImages.directionA} alt="Direction A, pastel editorial" rotate={-1} />
            <div className="mt-[2.6cqw] flex justify-center"><p className="label whitespace-nowrap text-ink/60">A · Pastel editorial</p></div>
          </Rv>
          <PageNumber n={4} side="l" />
        </div>
      ),
      right: (
        <div className="pg">
          <Rv i={0} className="absolute" style={{ left: '28cqw', top: '40cqw', width: '44cqw' }}>
            <PaperImage {...lookImages.directionB} alt="Direction B, saturated and condensed" rotate={1} />
            <div className="mt-[2.6cqw] flex justify-center"><p className="label whitespace-nowrap text-ink/60">B · Saturated, condensed</p></div>
          </Rv>
          <PageNumber n={5} side="r" />
        </div>
      ),
    },
    {
      name: 'Type',
      left: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            Type
          </Rv>
          <Rv i={1} as="h2" className="headline pg-h2 mt-[3cqw]">
            Fraunces, and DM Sans.
          </Rv>
          <Rv i={2} className="pg-t mt-[3cqw]">
            Fraunces for headlines: soft, round curves keep it playful.
          </Rv>
          <Rv i={3} className="pg-t mt-[3cqw]">
            DM Sans for everything else.
          </Rv>
          <PageNumber n={6} side="l" />
        </div>
      ),
      right: (
        <div className="pg">
          <Rv i={0} className="label text-accent">
            The pair
          </Rv>
          <Rv i={1} className="absolute" style={{ left: '7cqw', top: '24cqw', width: '86cqw' }}>
            <PaperImage {...lookImages.typePair} alt="Fraunces for headlines, DM Sans for body and buttons" rotate={1.2} />
          </Rv>
          <Rv i={2} className="pg-t absolute" style={{ left: '6cqw', right: '6cqw', top: '70cqw' }}>
            Fallbacks: Georgia for Fraunces, Arial for DM Sans. Most inboxes do not load web fonts, so heavy headlines are exported as images and body text stays live.
          </Rv>
          <PageNumber n={7} side="r" />
        </div>
      ),
    },
  ]
}

export default function JuicedayLook() {
  const desktop = useIsDesktop()
  const [spreads] = useState(() => buildLookSpreads())

  return (
    <CaseLayout no="01" label="Design process" back={BACK.to} backLabel={BACK.label}>
      {desktop ? <DesktopBook spreads={spreads} modalOpen={false} endLink={BACK} /> : <MobileBook spreads={spreads} endLink={BACK} />}
    </CaseLayout>
  )
}
