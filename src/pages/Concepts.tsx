import CaseLayout, { CaseIntro } from '../components/case/CaseLayout'
import EmailFrame from '../components/case/EmailFrame'
import { Reveal, Rv } from '../components/Reveal'

type Concept = {
  id: string
  title: string
  kind: string
  poster: string
  posterNote: string
  brief: [string, string][]
  /** What I did, as short numbered points */
  did: string[]
  /** One email, or two versions set up as an A/B test */
  emails: { label: string; src?: string; note?: string }[]
  test?: { change: string; expect: string; measure: string }
}

const IMG = '/images/work'

const concepts: Concept[] = [
  {
    id: 'matcha',
    title: 'Matcha loyalty',
    kind: 'Loyalty email · Café',
    poster: `${IMG}/matcha-poster.jpg`,
    posterNote: 'The in-café poster: the same “Buy 5, free 1” stamp, on the cup',
    brief: [
      ['The idea', 'A stamp-card email for a matcha café: you’re 2 stamps away from a free drink, and this weekend every drink counts double.'],
      ['The challenge', 'Make a points update feel like a treat, not a receipt.'],
      ['Why this brief', 'Loyalty emails are everywhere, and most of them are dull.'],
    ],
    did: [
      'The headline says exactly where you are: “You’re 2 stamps away from a free one!”',
      'The stamp card is the picture: three cups, two question marks. Readable in a second, like the paper card at the counter.',
      'One reason to come now: double-stamp weekend, in the top bar and under the stamps.',
      'One main button, “Order ahead”, and a quieter one for member perks.',
      'Deep matcha green, cream and a serif, so the email and the poster feel like one café.',
    ],
    emails: [
      { label: 'Version A', src: `${IMG}/matcha/email-arch.jpg`, note: 'Arched photo' },
      { label: 'Version B', src: `${IMG}/matcha/email-full.jpg`, note: 'Full-width photo' },
    ],
    test: {
      change: 'Only the photo. A frames the drinks in an arch and keeps the stamp card higher; B runs the photo full width for more appetite.',
      expect: 'B’s bigger photo makes the drink more tempting, but pushes the stamps lower. Which matters more?',
      measure: 'Clicks on “Order ahead”, then visits that weekend.',
    },
  },
  {
    id: 'museum',
    title: 'Museum exhibition',
    kind: 'Event email · Exhibition',
    poster: `${IMG}/museum-poster-v2.jpg`,
    posterNote: 'The exhibition poster: same title, dates and wavy edge',
    brief: [
      ['The idea', 'A launch email for a small museum’s new exhibition, “The Weight of Light”: four artists, opening 12 October.'],
      ['The challenge', 'Make a museum email feel like walking into the gallery, not reading a listing.'],
      ['Why this brief', 'Art emails often bury the work under opening times. I wanted the paintings to lead.'],
    ],
    did: [
      'The essentials first: title, opening date, one line on the theme, and “Get tickets”.',
      'A reason to feel like an insider: subscribers get a preview evening the night before, with its own RSVP.',
      'Selected works alternate painting and text, like walking past them on a wall: artist, medium, size and one line each.',
      'A dark gallery brown for the art and warm paper cream for the practical parts, so you always know which is which.',
      'Dates, hours and the address at the end, with the same ticket button.',
    ],
    emails: [{ label: 'The email', src: `${IMG}/museum/email.jpg`, note: 'Exhibition launch' }],
  },
]

export default function Concepts() {
  return (
    <CaseLayout no="04" label="Concepts" next={{ title: 'Juiceday', to: '/work/juiceday' }}>
      <CaseIntro no="04" kicker="Concepts" title="Concepts" line="The brief I wrote myself." note="Self-initiated concepts" />
      {concepts.map((c, k) => (
        <Reveal
          key={c.id}
          as="section"
          id={c.id}
          amount={0.06}
          className="page-px grid gap-12 border-t border-ink/15 py-20 md:grid-cols-12 md:gap-x-8 md:py-28"
        >
          {/* The brief, what I did, and the poster */}
          <div className="md:col-span-5">
            <Rv i={0} className="label text-accent">
              04.{k + 1} · {c.kind}
            </Rv>
            <Rv i={1} as="h2" className="headline mt-3 text-[13vw] md:text-[min(6vw,88px)]">
              {c.title}.
            </Rv>
            <dl className="mt-10 space-y-5">
              {c.brief.map(([term, text], i) => (
                <Rv key={term} i={2 + i}>
                  <dt className="label text-accent">{term}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed md:text-[16px]">{text}</dd>
                </Rv>
              ))}
            </dl>
            <Rv i={5} className="mt-10">
              <p className="label text-ink/60">What I did</p>
              <ol className="mt-2 border-t border-ink/15">
                {c.did.map((d, i) => (
                  <li key={i} className="grid grid-cols-[1.75rem_1fr] items-baseline border-b border-ink/15 py-3">
                    <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[14px] leading-snug md:text-[15px]">{d}</span>
                  </li>
                ))}
              </ol>
            </Rv>
            <Rv i={6} as="figure" className="mt-12 w-[62%] -rotate-2">
              <img
                src={c.poster}
                alt={`${c.title} poster`}
                loading="lazy"
                className="block w-full shadow-[0_0_0_1px_rgba(26,26,26,.14),0_2px_4px_rgba(26,26,26,.08),0_12px_28px_rgba(26,26,26,.14)]"
              />
              <figcaption className="label mt-3 rotate-2 text-ink/55">{c.posterNote}</figcaption>
            </Rv>
          </div>

          {/* The email(s): they stay in view while you read the left side */}
          <div className="md:sticky md:top-20 md:col-span-6 md:col-start-7 md:self-start">
            <Rv i={2} className={`grid gap-4 md:gap-6 ${c.emails.length > 1 ? 'grid-cols-2' : 'mx-auto max-w-sm'}`}>
              {c.emails.map((e, i) => (
                <EmailFrame key={e.label} src={e.src} label={e.label} note={e.note} accent={i === 1} />
              ))}
            </Rv>
            {c.test && (
              <Rv i={3} className="mt-8 border-t border-ink/15 pt-5">
                <p className="label text-accent">A/B test plan</p>
                <dl className="mt-3 grid gap-4 sm:grid-cols-3 sm:gap-6">
                  {(
                    [
                      ['What changes', c.test.change],
                      ['What I expect', c.test.expect],
                      ['What I’d measure', c.test.measure],
                    ] as const
                  ).map(([term, text]) => (
                    <div key={term}>
                      <dt className="label text-ink/60">{term}</dt>
                      <dd className="mt-1 text-[14px] leading-snug">{text}</dd>
                    </div>
                  ))}
                </dl>
              </Rv>
            )}
            <Rv i={4} className="label mt-4 text-ink/55">
              Self-initiated concept · Scroll inside each email
            </Rv>
          </div>
        </Reveal>
      ))}
    </CaseLayout>
  )
}
