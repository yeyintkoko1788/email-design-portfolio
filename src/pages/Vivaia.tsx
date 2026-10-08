import { ArrowRight, ArrowDown } from 'lucide-react'
import CaseLayout, { CaseIntro } from '../components/case/CaseLayout'
import { Reveal, Rv } from '../components/Reveal'
import { FigCaption } from '../components/Deco'
import CodeCard from '../components/CodeCard'
import EmailFrame from '../components/case/EmailFrame'

type Stop = { label: string; line: string; color: string; image?: string }

const IMG = '/images/work/vivaia'
const campaign: Stop = {
  label: 'Campaign email',
  line: 'Women’s Day: draw a lucky card and win a reward.',
  color: '#F2C9D3',
  image: `${IMG}/campaign-redesign.jpg`,
}
const cart: Stop = { label: 'Cart email', line: 'The automatic reminder: “Still thinking about them?”', color: '#F6D7DF', image: '/emails/vivaia-cart/design.png' }

function EmailStop({ n, stop, i }: { n: number; stop: Stop; i: number }) {
  return (
    <Rv i={i}>
      <div
        className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_0_0_1px_rgba(26,26,26,.12),0_10px_30px_rgba(26,26,26,.1)]"
        style={{ background: stop.color }}
      >
        {stop.image ? (
          <img src={stop.image} alt={stop.label} className="size-full object-cover object-top" loading="lazy" />
        ) : (
          <span className="label absolute inset-0 flex items-center justify-center text-ink/50">{stop.label}</span>
        )}
      </div>
      <FigCaption n={n} className="mt-3">
        {stop.label}
      </FigCaption>
      <p className="mt-2 text-[15px] leading-snug text-ink/80">{stop.line}</p>
    </Rv>
  )
}

const notes = [
  {
    title: 'The problem',
    text: 'The original used Women’s Day as a banner, then turned into a generic sale: 56% off flats, product grids, unrelated promotions. People who opened it for Women’s Day got a discount catalogue instead.',
  },
  {
    title: 'What I changed',
    text: 'I rebuilt the email around one moment, the Lucky Card draw, with Women’s Day running from top to bottom: the hero introduces it, the rewards show what’s at stake, and one red button repeats the same action. I explored an illustrated and a photo-led hero; the photo won, because for a fashion brand the shoe does more work than any drawing.',
  },
  {
    title: 'What I kept',
    text: 'The “Sale, New Arrival, Best Sellers” links, for people who opened the email but don’t care about the campaign. Always give them a second reason to click.',
  },
]

/** The campaign email before and after: the two full emails side by side, with the reasoning. */
function CampaignRedesign() {
  return (
    <Reveal as="section" amount={0.08} className="page-px border-t border-ink/15 py-20 md:py-28">
      <Rv i={0} className="label flex justify-between">
        <span className="text-accent">Up close</span>
        <span>The campaign email · Unofficial redesign</span>
      </Rv>
      <Rv i={1} as="h2" className="headline mt-6 text-[11vw] md:text-[min(5vw,72px)]">
        Before <em className="text-accent">&amp;</em> after.
      </Rv>
      <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-x-8">
        <dl className="space-y-8 md:col-span-4">
          {notes.map((n, i) => (
            <Rv key={n.title} i={2 + i}>
              <dt className="label text-accent">{n.title}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink/80 md:text-[16px]">{n.text}</dd>
            </Rv>
          ))}
        </dl>
        <Rv i={3} className="grid grid-cols-2 gap-4 md:col-span-7 md:col-start-6 md:gap-8">
          <EmailFrame src={`${IMG}/campaign-original.jpg`} label="Before" note="≈ 5,300px long" />
          <EmailFrame src={`${IMG}/campaign-redesign.jpg`} label="After" note="≈ 2,100px long" accent />
        </Rv>
      </div>
      <Rv i={6} className="label mt-6 text-ink/55 md:text-right">Scroll inside each email to read it all</Rv>
    </Reveal>
  )
}

/** The moment between the two emails: it happens on the website, not in an email. */
function Trigger({ i }: { i: number }) {
  return (
    <Rv i={i} className="flex flex-col items-center justify-center gap-3 py-2 text-center md:pb-24">
      <span className="label text-ink/55">On the website</span>
      <p className="max-w-[16rem] font-serif text-[17px] leading-snug text-balance italic md:text-[18px]">
        Adds the black Mary Janes to cart, then leaves.
      </p>
      <div className="flex w-full items-center gap-2 text-accent">
        <span className="hidden h-px flex-1 border-t border-dashed border-ink/50 md:block" />
        <ArrowRight size={16} className="hidden md:block" aria-hidden />
        <ArrowDown size={16} className="mx-auto md:hidden" aria-hidden />
      </div>
    </Rv>
  )
}

export default function Vivaia() {
  return (
    <CaseLayout no="02" label="Customer journey" next={{ title: 'Redesigns', to: '/work/redesigns' }}>
      <CaseIntro no="02" kicker="Customer journey" title="Vivaia" line="One shopper’s story, from campaign to cart email." />
      <Reveal as="section" amount={0.1} className="page-px pb-24 md:pb-36">
        {/* Campaign email → (adds to cart, leaves) → Cart email | its design and code */}
        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-x-8">
          <div className="md:col-span-3">
            <EmailStop n={1} stop={campaign} i={0} />
          </div>
          <div className="md:col-span-2 md:self-center">
            <Trigger i={1} />
          </div>
          <div className="md:col-span-3">
            <EmailStop n={2} stop={cart} i={2} />
          </div>
          <div id="code" className="md:col-span-4">
            <Rv i={3}>
              <CodeCard />
            </Rv>
          </div>
        </div>
      </Reveal>
      <CampaignRedesign />
    </CaseLayout>
  )
}
