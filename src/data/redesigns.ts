import type { Motion } from '../components/case/EmailFrame'

export type Redesign = {
  id: string
  brand: string
  /** What kind of email it is */
  kind: string
  before?: string
  after?: string
  /** Note above the original, e.g. where the screenshot came from */
  beforeNote?: string
  motion?: Motion
  /** Numbered problem → fix pairs */
  points: { problem: string; fix: string }[]
  kept: string
}

const IMG = '/images/work'

export const redesigns: Redesign[] = [
  {
    id: 'nike',
    brand: 'Nike',
    kind: 'Members email · New arrivals',
    before: `${IMG}/nike/original.jpg`,
    after: `${IMG}/nike/redesign.jpg`,
    beforeNote: 'As it arrived in Gmail',
    // The product GIF sits at x 60–1140, y 2528–4245 of the 1200 × 5989 design
    motion: { src: `${IMG}/nike/nike-motion.mp4`, x: 5, y: 42.21, w: 90, h: 28.67 },
    points: [
      {
        problem: 'The message was buried in a long, dense paragraph in small type.',
        fix: 'One punchy line in Nike’s voice: “You’re ahead, Zin.”',
      },
      {
        problem: 'Two identical buttons competed for the same click.',
        fix: 'A clear order: one filled button, one outlined.',
      },
      {
        problem: 'In Gmail, the middle images broke apart and the email was clipped, hiding the footer and unsubscribe link.',
        fix: 'One product GIF instead of a stack of image slices, in a simpler, lighter layout.',
      },
      {
        problem: 'The swoosh overlapped the “Exclusive Access” headline.',
        fix: 'A smaller swoosh above a clean headline, with one short line: “Early access. Always.”',
      },
    ],
    kept: 'The hero photo, the members-first message, the personal greeting and Nike’s black-and-white look.',
  },
  {
    id: 'tripadvisor',
    brand: 'Tripadvisor',
    kind: 'Travel inspiration · Storybook castles',
    before: `${IMG}/tripadvisor/original.jpg`,
    after: `${IMG}/tripadvisor/redesign.jpg`,
    points: [
      {
        problem: 'Two different buttons, “See the list” and “See the full list”, led to the same page.',
        fix: 'One label for that page, “See The 9 Castles”, at the top and again at the end.',
      },
      {
        problem: 'Every castle had the same “Explore now” button.',
        fix: 'Buttons that say where they go: “View Himeji Castle”.',
      },
      {
        problem: '“Storybook” lived only in the headline.',
        fix: 'A cream palette and wavy photo edges, so the whole email feels like a storybook.',
      },
    ],
    kept: 'The three featured castles, their location pins, and a photo credit on every image.',
  },
]
