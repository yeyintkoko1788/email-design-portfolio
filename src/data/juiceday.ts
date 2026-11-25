import type { Motion } from '../components/case/EmailFrame'

export type JuicedayEmail = {
  no: string
  name: string
  when: string
  job: string
  action: string
  choice: string
  color: string
  mobile: string
  desktop: string
  /** A looping animation over part of the desktop email (the email's GIF) */
  motion?: Motion
  /** The same animation, placed on the separate mobile layout */
  motionMobile?: Motion
  /** A small footnote under the email's notes */
  note?: string
  /** Link to this email's process pages, when it has them */
  process?: string
}

const img = (file: string) => `/images/juiceday/${file}`

export const product = {
  name: 'Sunny Drop',
  what: 'vitamin C serum and SPF 30 in one bottle',
}

export const palette = [
  { name: 'Navy', hex: '#24346B' },
  { name: 'Sky', hex: '#BFD7F2' },
  { name: 'Peach', hex: '#FFD3B0' },
  { name: 'Butter', hex: '#FDE7A0' },
  { name: 'Blush', hex: '#F7C6D9' },
  { name: 'Cream', hex: '#FFF7EC' },
]

export const emails: JuicedayEmail[] = [
  {
    no: '01',
    name: 'Curiosity',
    when: 'Before launch',
    job: 'Make them wonder what’s coming, and get them on the early list.',
    action: 'Save my spot: join the early list',
    choice: 'The bottle stays hidden. Three clues and a date give people a reason to come back on Friday.',
    color: '#BFD7F2',
    mobile: img('m-01-curiosity.png'),
    desktop: img('d-01-curiosity.jpg'),
    process: '/work/juiceday/process/01',
  },
  {
    no: '02',
    name: 'Launch',
    when: 'Launch day',
    job: 'The big reveal: answer every clue.',
    action: 'Shop Sunny Drop',
    choice: 'The clues come back, solved, so the payoff is immediate. A free mini for launch week gives a reason to buy now.',
    color: '#FFD3B0',
    mobile: img('m-02-launch.png'),
    desktop: img('d-02-launch.jpg'),
    process: '/work/juiceday/process/02',
    // The animated hero replaces the still one: full width, y 680–1630 of the 1200 × 4568 design
    motion: { src: img('launch-motion.mp4'), x: 0, y: 14.886, w: 100, h: 20.797, fit: 'contain', bg: '#FEF8EE' },
    // Mobile layout (760 × 3696): the hero sits at x 20–740, y 516–996
    motionMobile: { src: img('launch-motion.mp4'), x: 2.632, y: 13.961, w: 94.737, h: 12.987, fit: 'contain', bg: '#FEF8EE' },
  },
  {
    no: '03',
    name: 'Social proof',
    when: '3 days in',
    job: 'Let real customers convince the doubters.',
    action: 'Shop Sunny Drop',
    choice: 'Reviews, ratings and customer photos lead, not brand claims.',
    note: 'Reviews and figures are sample content for this concept.',
    color: '#F7C6D9',
    mobile: img('m-03-social-proof.png'),
    desktop: img('d-03-social-proof.jpg'),
    process: '/work/juiceday/process/03',
  },
  {
    no: '04',
    name: 'Last chance',
    when: 'Final night',
    job: 'Turn “maybe later” into “now”, before the free mini ends.',
    action: 'Get Sunny Drop now',
    choice: 'A midnight deadline, and a simple offer: two bottles, one price.',
    color: '#FDE7A0',
    mobile: img('m-04-last-chance.png'),
    desktop: img('d-04-last-chance.jpg'),
    process: '/work/juiceday/process/04',
  },
]

/** The sends, in order: when each email goes out. */
export const sequence = [
  { no: '01', name: 'Curiosity', day: 'Day −3 · Tue' },
  { no: '02', name: 'Launch', day: 'Day 0 · Fri, 8 AM', note: 'Early list gets it Thursday' },
  { no: '03', name: 'Social proof', day: 'Day +3 · Mon, 8 AM' },
  { no: '04', name: 'Last chance', day: 'Day +6 · Thu, 8 AM' },
]

/** What is exported as an image and what stays live text in Klaviyo. */
export const buildPlan = [
  { no: '01', name: 'Curiosity', images: 'Logo, hero headline, bottle graphic.', live: 'Body, clues, button, footer.' },
  { no: '02', name: 'Launch', images: 'Logo, hero headline, product GIF.', live: 'Body, solved clues, routine equation, gift coupon, buttons, footer.' },
  {
    no: '03',
    name: 'Social proof',
    images: 'Logo, hero arch with photo and 4.8 seal, customer photos, mini-bottle arch.',
    live: 'Ticker, headline, review text, stats band, offer text, buttons, footer.',
  },
  { no: '04', name: 'Last chance', images: 'Logo, hero lockup.', live: 'Ticker, headline, deadline strip, order summary, quote, buttons, footer.' },
]

export const buildRules = [
  'Prices and dates repeat exactly: $32 · 30 ml, Thursday midnight.',
  'The deadline is plain text. There is no countdown timer.',
]

export const typeSpecs: [string, string][] = [
  ['Headline', 'Fraunces 800, 44px'],
  ['Clue titles', 'Fraunces 800, 22px'],
  ['Body', 'DM Sans, 16px on 24px'],
  ['Button', 'DM Sans 500, 16px, 52px tall'],
  ['Footer', 'DM Sans, 14px'],
]

/** A region cut out of a stitched email image, in that image's own pixels. */
export type Cut = { src: string; x: number; y: number; w: number; h: number; iw: number; ih: number }

export const cuts: Record<'headline' | 'clue' | 'review' | 'price' | 'strip' | 'button', Cut> = {
  headline: { src: img('m-02-launch.png'), x: 130, y: 328, w: 510, h: 192, iw: 760, ih: 3696 },
  clue: { src: img('m-01-curiosity.png'), x: 68, y: 1461, w: 624, h: 393, iw: 760, ih: 4596 },
  review: { src: img('m-03-social-proof.png'), x: 68, y: 1547, w: 624, h: 616, iw: 760, ih: 6030 },
  price: { src: img('m-04-last-chance.png'), x: 30, y: 1655, w: 700, h: 613, iw: 760, ih: 3850 },
  strip: { src: img('m-04-last-chance.png'), x: 20, y: 1417, w: 720, h: 135, iw: 760, ih: 3850 },
  button: { src: img('m-02-launch.png'), x: 120, y: 1174, w: 520, h: 134, iw: 760, ih: 3696 },
}

const look = (file: string) => `/images/juiceday/look/${file}`

/** "Design process": the palette rounds, the type choice and the two style directions. */
export const lookImages = {
  palette1: { src: look('palette-1.png'), ratio: '1580 / 1300' },
  palette2: { src: look('palette-2.png'), ratio: '1580 / 830' },
  paletteFinal: { src: look('palette-final.png'), ratio: '1580 / 1180' },
  typePair: { src: look('type-pair.png'), ratio: '1580 / 560' },
  directionA: { src: look('direction-a.png'), ratio: '896 / 1640' },
  directionB: { src: look('direction-b.png'), ratio: '886 / 1624' },
}

/** Email 01 process: five sections of the first draft (version A), and what changed in the final, with the reason. */
const slice = (n: number, w: number, h: number): Cut => ({ src: img(`process/a-slice-${n}.png`), x: 0, y: 0, w, h, iw: w, ih: h })

export const process01 = {
  rows: [
    {
      label: '1 · Riddle copy',
      text: 'Riddle-like copy. The final says what and when, in the brand’s colour and type.',
      a: slice(1, 1012, 872),
    },
    {
      label: '2 · Early access up front',
      text: 'Early access came first. The final goes straight to the clues.',
      a: slice(2, 1010, 856),
    },
    {
      label: '3 · Two abstract clues',
      text: 'Two abstract clues. The final has three you can guess, plus a calendar button.',
      a: slice(3, 1014, 596),
    },
    {
      label: '4 · Countdown',
      text: 'A countdown. The final has one action: “Save my spot.”',
      a: slice(5, 1014, 554),
    },
  ],
}

/** Email 02 process: the first layout, and the final. */
export const process02 = {
  headline: 'Product first.',
  beforeLabel: 'First layout, desktop',
  beforeCaption: 'Text beside the product competed with it.',
  afterLabel: 'Final, every screen',
  notes: [
    'Product first, GIF on top.',
    '“OK, PEEK!” answers “No peeking”.',
    'The ticker carries the offer, not “OUT NOW”.',
  ],
}

export const processImages = {
  email02Before: { src: img('process/email02-first-layout.png'), ratio: '1200 / 1162' },
  email02After: { src: img('m-02-launch.png'), x: 0, y: 0, w: 760, h: 1000, iw: 760, ih: 3696 } as Cut,
}

/** Email 03 process: the four rounds, and the headline choice. */
export const process03 = {
  headline: 'Four rounds.',
  rounds: [
    { label: '1 · Stickers', text: 'Sticker reviews felt childish.', src: img('process/email03-round-1-hero.png'), ratio: '780 / 1446' },
    { label: '2 · Elevated', text: 'Editorial, but too plain.', src: img('process/email03-round-2-hero.png'), ratio: '780 / 948' },
    { label: '3 · Balanced', text: 'Playful luxury: elevated type and spacing, with the colour of Emails 01 and 02.', src: img('process/email03-round-3-hero.png'), ratio: '780 / 1848' },
    { label: '4 · Final', text: 'A customer replaces the bottle, and the headline answers the subject line.', src: img('process/email03-round-4-hero.png'), ratio: '780 / 1780' },
  ],
}

/** Email 04 process: the button wording, and the price card heading. */
export const process04 = {
  headline: 'Honest microcopy.',
  text: '“Claim my free mini” sounds like a giveaway, and the click leads to a checkout. The buttons now say what happens: “Shop Sunny Drop”, then “Get Sunny Drop now”.',
  firstButton: { src: img('process/email04-first-button.png'), ratio: '780 / 320' },
  cardHeadline: 'Two bottles, one price.',
  before: { src: img('process/email04-card-before.png'), ratio: '1068 / 648' },
  after: { src: img('process/email04-card-after.png'), ratio: '1064 / 768' },
}
