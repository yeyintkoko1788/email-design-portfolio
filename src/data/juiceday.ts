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
    action: 'Save my spot',
    choice: 'The bottle stays hidden: three clues and a date instead.',
    color: '#BFD7F2',
    mobile: img('m-01-curiosity.png'),
    desktop: img('d-01-curiosity.jpg'),
  },
  {
    no: '02',
    name: 'Launch',
    when: 'Launch day',
    job: 'The big reveal: answer every clue.',
    action: 'Shop Sunny Drop',
    choice: 'The clues come back, solved, plus a free mini for launch week.',
    color: '#FFD3B0',
    mobile: img('m-02-launch.png'),
    desktop: img('d-02-launch.jpg'),
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
    choice: 'Reviews, ratings and customer photos, not brand claims.',
    color: '#F7C6D9',
    mobile: img('m-03-social-proof.png'),
    desktop: img('d-03-social-proof.jpg'),
  },
  {
    no: '04',
    name: 'Last chance',
    when: 'Final night',
    job: 'Turn “maybe later” into “now”, before the free mini ends.',
    action: 'Get Sunny Drop now',
    choice: 'A midnight deadline, and the deal made simple: two bottles, one price.',
    color: '#FDE7A0',
    mobile: img('m-04-last-chance.png'),
    desktop: img('d-04-last-chance.jpg'),
  },
]
