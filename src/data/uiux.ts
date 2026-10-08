/** UI/UX case studies, shown at /creative/ui-ux/:slug. Trimmed from the old site. */

/** w × h = the file's pixel size, so pairs can be laid out at equal heights */
export type Img = {
  src: string
  alt: string
  w: number
  h: number
  /** Adds a thin frame, for files without one baked in */
  stroke?: boolean
  /** Small label under the image */
  caption?: string
}

export type CaseSection =
  /** Short text, optionally with a pulled-out question */
  | { kind: 'text'; title: string; body: string[]; question?: string; images?: Img[] }
  /** "What we saw → what it means for the design" */
  | { kind: 'table'; title: string; intro?: string; head: [string, string]; rows: [string, string][] }
  /** Screens with a short caption: one wide image, or desktop + phone */
  | {
      kind: 'screens'
      title: string
      intro?: string
      items: { name: string; text: string; images: Img[] }[]
    }
  /** Information architecture: a diagram with a short note */
  | { kind: 'diagram'; title: string; body: string; image: Img }
  /** Weighted score breakdown */
  | { kind: 'score'; title: string; body: string; weights: [string, number][]; example: string }
  /** A few numbered points */
  | { kind: 'points'; title: string; intro?: string; points: string[] }

export type CaseStudy = {
  slug: string
  title: string
  kicker: string
  line: string
  cover: string
  coverAlt?: string
  meta: [string, string][]
  link?: { label: string; href: string }
  stats?: [string, string][]
  sections: CaseSection[]
  quote?: string
}

const fd = '/images/creative/fabric-decode'
const vr = '/images/creative/vera'

export type UiuxProject = CaseStudy

export const uiux: UiuxProject[] = [
  {
    slug: 'fabric-decode',
    title: 'Fabric Decode',
    kicker: 'UI/UX · Side project, live',
    line: 'A web app that turns a garment label into an eco score, care tips and a card worth keeping.',
    cover: `${fd}/cover.jpg`,
    coverAlt: 'Fabric Decode home screen: Feel the fabric. Know the story.',
    meta: [
      ['Role', 'UI/UX designer'],
      ['Timeline', '3 days'],
      ['Tools', 'Figma · Claude'],
    ],
    link: { label: 'Try it', href: 'https://fabric-decode.vercel.app/' },
    stats: [
      ['4 in 1', 'answers from one label'],
      ['36', 'data points: 9 fabrics × 4 measures'],
      ['3 days', 'design, build, revise'],
    ],
    sections: [
      {
        kind: 'text',
        title: 'The problem',
        body: [
          'A label that reads “70% cotton, 30% polyester” tells a shopper almost nothing. Is cotton sustainable? Can polyester be recycled? Every question is another search, and the answers often disagree.',
          'At a rack or a checkout page, that’s enough to give up. The information exists. It’s just scattered.',
        ],
        question: 'How do you help someone with 30 seconds at a rack, not 30 minutes and five tabs?',
      },
      {
        kind: 'diagram',
        title: 'Information architecture',
        body: 'Three parts and one shared system. The label checker and the library both read from the same scoring, and “How scores work” is the same everywhere.',
        image: { src: `${fd}/ia.png`, w: 1360, h: 1152, alt: 'Fabric Decode information architecture' },
      },
      {
        kind: 'screens',
        title: 'What I built',
        intro: 'One input, no account, no setup. Three parts:',
        items: [
          {
            name: 'Label checker',
            text: 'Type what the label says. Get an eco score, a breakdown per material and care instructions.',
            images: [
              { src: `${fd}/desktop-linen.jpg`, w: 1736, h: 1330, alt: 'Label checker on desktop' },
              { src: `${fd}/mobile-linen.jpg`, w: 498, h: 1330, alt: 'Label checker on mobile' },
            ],
          },
          {
            name: 'A card to keep',
            text: 'Every check makes a designed result card, not a screenshot. Like a receipt for a conscious choice.',
            images: [
              { src: `${fd}/desktop-result.jpg`, w: 1736, h: 1400, alt: 'Result card on desktop' },
              { src: `${fd}/mobile-result.jpg`, w: 498, h: 1400, alt: 'Result card on mobile' },
            ],
          },
          {
            name: 'Fabric library',
            text: 'Nine materials, filtered by natural, semi-synthetic and synthetic, each with its score, pros, cons and care.',
            images: [
              { src: `${fd}/desktop-library.jpg`, w: 1738, h: 1600, alt: 'Fabric library on desktop' },
              { src: `${fd}/mobile-library.jpg`, w: 498, h: 1600, alt: 'Fabric library on mobile' },
            ],
          },
        ],
      },
      {
        kind: 'score',
        title: 'How the score works',
        body: 'Four measures from public environmental research, weighted and averaged by the label’s percentages. “How scores work” opens right in the app, so anyone can check the logic in one click.',
        weights: [
          ['Sustainability', 35],
          ['Recyclability', 25],
          ['Water use', 20],
          ['Chemical impact', 20],
        ],
        example: '70% cotton (~60) + 30% polyester (~45) = 55 / 100, moderate',
      },
      {
        kind: 'points',
        title: 'Looking back',
        points: [
          'Small and focused beat big and vague. Keeping it to one input was a choice, not a limit.',
          'Building what I designed kept me honest. Every extra screen had to earn its place.',
          'Next: cite sources per material, and let people save checks to build a wardrobe score over time.',
        ],
      },
    ],
    quote: 'Good design doesn’t moralize. It informs, then gets out of the way.',
  },
  {
    slug: 'vera',
    title: 'VERA',
    kicker: 'UI/UX · Concept',
    line: 'A luxury vintage shop online that feels as trustworthy as the boutique.',
    cover: `${vr}/cover.jpg`,
    coverAlt: 'VERA home screen over a vintage fashion exhibition',
    meta: [
      ['Role', 'UI/UX designer'],
      ['Timeline', '2 weeks'],
      ['Tools', 'Figma'],
    ],
    link: {
      label: 'View prototype',
      href: 'https://www.figma.com/proto/JYpXEvfbXvKEAGZoz5x3H9/Projects?node-id=296-2912&viewport=631%2C-172%2C0.07&t=atPpUYzoWmWIUPjY-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=296%3A2912&page-id=243%3A2386',
    },
    sections: [
      {
        kind: 'table',
        title: 'The problem',
        intro:
          'Second-hand luxury is growing fast, but buying it online still feels like a cluttered resale site, with no way to try on a $5,000 coat. For buyers aged 25–45, trust is everything.',
        head: ['What I saw', 'What it meant for the design'],
        rows: [
          ['Pieces cost $1,000–$10,000+', 'Authenticity has to show on every screen'],
          ['No way to inspect before buying', 'A virtual try-on and 360° view'],
          ['Resale sites look cluttered', 'Editorial quality that matches the price'],
          ['Sustainability gets preachy', 'Present everywhere, never the loudest thing'],
        ],
      },
      {
        kind: 'diagram',
        title: 'Information architecture',
        body: 'Five areas around one journey: browse, filter, try on, check out. The try-on is the feature that sets VERA apart; sustainability lives in the footer of every page.',
        image: { src: `${vr}/ia.png`, w: 1360, h: 1440, alt: 'VERA information architecture' },
      },
      {
        kind: 'screens',
        title: 'Key screens',
        items: [
          {
            name: 'Homepage',
            text: 'The whole brand story in one scroll. Collections are named and styled like editorials, not categories.',
            images: [
              { src: `${vr}/collections.jpg`, w: 1100, h: 1060, stroke: true, alt: 'Explore our collections' },
              { src: `${vr}/evening.jpg`, w: 1200, h: 1060, alt: 'Evening and occasion collection' },
            ],
          },
          {
            name: 'Product and try-on',
            text: '360° view, “Individually sourced” on every piece, and a try-on that explains itself before you upload a photo.',
            images: [
              { src: `${vr}/product.jpg`, w: 1264, h: 840, alt: 'Product detail' },
              { src: `${vr}/ai.jpg`, w: 1056, h: 840, alt: 'AI virtual try-on' },
            ],
          },
          {
            name: 'Cart and checkout',
            text: 'Where each piece came from stays visible all the way to payment, and so does the total.',
            images: [
              { src: `${vr}/cart.jpg`, w: 1152, h: 643, alt: 'Cart' },
              { src: `${vr}/checkout.jpg`, w: 1152, h: 643, alt: 'Checkout, payment step' },
            ],
          },
        ],
      },
      {
        kind: 'points',
        title: 'Why it should work',
        intro: 'A concept, so no real users yet. But every choice answers a known problem in luxury e-commerce:',
        points: [
          'Virtual try-on cuts fashion returns by 20–30% (Forrester).',
          'Keeping provenance through checkout calms doubt at the riskiest moment.',
          'Next: search, empty and error states, mobile and onboarding.',
        ],
      },
    ],
  },
]
