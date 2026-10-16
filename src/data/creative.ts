import type { CaseStudy } from './uiux'

export type CreativePiece = {
  title: string
  note: string
  /** Image or video file in /public. Placeholder tile until set. */
  src?: string
  video?: boolean
  /** Still frame shown before a video plays */
  poster?: string
  /** Shape of the piece when it isn't 4:5, e.g. '3 / 1' for an email banner */
  ratio?: string
  /** Source size and the visible part inside it, to trim a recording's black edge: [w, h, left, top, right, bottom] in px */
  crop?: [number, number, number, number, number, number]
  /** How an ad is staged: in a social feed post, or inside an email */
  mock?: FeedMock | EmailMock
  /** Opens a detail page */
  href?: string
  /** Gallery label: medium and a few colours from the piece */
  medium?: string
  year?: string
  palette?: string[]
  color: string
}

export type FeedMock = {
  kind: 'feed'
  handle: string
  caption: string
  likes: string
  cta: string
  /** Background of the CTA bar under the post */
  ctaBg?: string
  /** Colour of the small clover decoration */
  deco: string
  /** Related email story */
  link?: { label: string; to: string }
}

export type EmailMock = {
  kind: 'email'
  sender: string
  headline: string
  line: string
  deco: string
  /** Little handwritten note beside it */
  note?: string
  link?: { label: string; to: string }
}

export type CreativeCategory = {
  slug: string
  title: string
  /** Small tag on the card and page, e.g. "Client commission" */
  tag?: string
  /** One line on the home page card and the category page */
  line: string
  /** Tile shape for the pieces */
  aspect: string
  color: string
  pieces: CreativePiece[]
  /** 'wall': hang the pieces like a small exhibition (posters) */
  layout?: 'wall'
  /** Front card of the stack on the home page, if it isn't one of the pieces */
  thumb?: string
  /** A single project told as a case study on the category page */
  study?: CaseStudy
}

// TODO(owner): send the files, titles and one-liners for every piece.
export const creative: CreativeCategory[] = [
  {
    slug: 'ui-ux',
    title: 'UI/UX',
    line: 'Fabric, fashion and the screens around them.',
    aspect: 'aspect-[4/5]',
    color: '#E3DACB',
    pieces: [
      { title: 'Fabric Decode', src: '/images/creative/fabric-decode/cover.jpg', href: '/creative/ui-ux/fabric-decode', note: 'Decode a fabric’s composition and how it suits your climate. Built for mobile and desktop.', color: '#E3DACB' },
      { title: 'VERA', src: '/images/creative/vera/cover.jpg', href: '/creative/ui-ux/vera', note: 'A vintage fashion shop that makes second-hand feel first-class.', color: '#D9D2C5' },
    ],
  },
  {
    slug: 'posters',
    title: 'Ads in motion',
    line: 'Ads and email GIFs that move.',
    aspect: 'aspect-[4/5]',
    color: '#F2C9D3',
    thumb: '/videos/matcha-ad.jpg',
    layout: 'wall',
    pieces: [
      { title: 'Vivaia · Women’s Day', src: '/videos/vivaia-ad.mp4', poster: '/videos/vivaia-ad.jpg', note: 'The feed ad that leads into the campaign email: up to $50 off.', color: '#F2DDE2', video: true, medium: 'Motion ad · Instagram feed 4:5 · 2026', mock: { kind: 'feed', handle: 'vivaia.official', caption: 'Celebrate Women’s Day with up to $50 off. More comfort, more confidence.', likes: '1,248', cta: 'Shop Now', deco: '#F2A7B8', link: { label: 'See the Vivaia journey', to: '/work/vivaia' } } },
      { title: 'Juiceday · Countdown', src: '/videos/juiceday-countdown.mp4', poster: '/videos/juiceday-countdown.jpg', note: 'The last-chance timer. In a real send, a live Klaviyo countdown in this design.', color: '#1F2F6B', video: true, ratio: '724 / 241', crop: [746, 266, 9, 13, 733, 254], medium: 'Email GIF · 600 × 200 · 2026', mock: { kind: 'email', sender: 'Juiceday', headline: 'juiceday', line: 'Your free mini says goodbye at midnight.', deco: '#8EA2E8', note: 'countdown animation in email', link: { label: 'See the Juiceday launch', to: '/work/juiceday' } } },
      { title: 'Matcha · Stamp card', src: '/videos/matcha-ad.mp4', poster: '/videos/matcha-ad.jpg', note: 'The café’s feed ad for the stamp card, in the same greens as the loyalty email.', color: '#9AA68E', video: true, medium: 'Product motion ad · Instagram feed 4:5 · 2026', mock: { kind: 'feed', handle: 'nangmatcha', caption: 'Whisk, sip, enjoy. Buy 5, and the 6th one is on us.', likes: '862', cta: 'Order Ahead', ctaBg: '#DDE3C8', deco: '#9DB57A', link: { label: 'See the Matcha email', to: '/work/concepts#matcha' } } },
    ],
  },
  {
    slug: 'book-cover',
    title: 'Book cover',
    tag: 'Client commission',
    line: 'A real commission, from brief to final design.',
    aspect: 'aspect-[2/3]',
    color: '#D9D2C5',
    pieces: [{ title: 'The Wounded Spiral', src: '/images/creative/book-cover/cover.jpg', note: 'Surrealist fiction · A5 paperback', color: '#D9D2C5' }],
    study: {
      slug: 'the-wounded-spiral',
      title: 'The Wounded Spiral',
      kicker: 'Client commission',
      line: '',
      cover: '/images/creative/book-cover/cover.jpg',
      coverAlt: 'The Wounded Spiral cover design, mocked up as books on a shelf',
      meta: [
        ['Book', 'The Wounded Spiral'],
        ['Client', 'Independent author'],
        ['Genre', 'Surrealist fiction'],
        ['Format', 'A5 paperback, full wrap'],
        ['Role', 'Graphic designer'],
        ['Timeline', '5 days'],
        ['Tools', 'Figma'],
        ['Delivered', 'Two print-ready cover designs'],
        ['Outcome', 'Concept selected by the author'],
      ],
      stats: [
        ['1st', 'client project, on time and in scope'],
        ['300', 'DPI print file, rebuilt from a 27–42 DPI scan'],
        ['2', 'finals delivered, print-ready'],
      ],
      sections: [
        {
          kind: 'text',
          title: 'The brief',
          body: [
            'The client gave me his own oil painting and a rough idea of the mood he wanted: dark, painterly, literary-surreal. Not pulp horror, not gothic. The painting stays the centrepiece.',
            'The catch: it was never painted to be a cover. Dense detail everywhere, and no quiet space for type.',
          ],
          question: 'How do you turn a painting into a cover without changing its character?',
          images: [
            { src: '/images/creative/book-cover/painting.jpg', w: 1468, h: 1114, alt: 'The original oil painting', caption: 'The painting' },
          ],
        },
        {
          kind: 'points',
          title: 'Key decisions',
          intro: 'Let the painting lead, keep the type minimal, and use gold to signal a literary book.',
          points: [
            'Split the two figures across the wrap: the masked face on the front, the figure turned away on the back.',
            'A mustard-gold title with a noise texture, so the painting’s colours show through the letters. It feels part of the scene, not stuck on top.',
            'Tested Baskerville, Cinzel and Trajan Pro with the client. He chose Cinzel and Baskerville.',
          ],
        },
        {
          kind: 'screens',
          title: 'Two directions',
          items: [
            {
              name: 'Clean or framed',
              text: 'Painting and type only, or an ornate gold frame. The frame worked, but it felt decorative and softened the mood, so the clean one led.',
              images: [
                { src: '/images/creative/book-cover/direction-clean.jpg', w: 2200, h: 1718, alt: 'Clean direction', caption: 'Clean' },
                { src: '/images/creative/book-cover/direction-ornate.jpg', w: 2200, h: 1718, alt: 'Ornate frame direction', caption: 'Framed' },
              ],
            },
          ],
        },
        {
          kind: 'screens',
          title: 'Final design',
          items: [
            {
              name: 'Two finals',
              text: 'Final A stays closest to the author’s original idea, with a blurred back for the blurb. Final B removes the blurry aircraft, so one scene runs across the spine. Both went to the author as print-ready files.',
              images: [
                { src: '/images/creative/book-cover/final-client.jpg', w: 2200, h: 1718, alt: 'Final cover A', caption: 'Final A · selected by the author' },
                { src: '/images/creative/book-cover/final-recommended.jpg', w: 2200, h: 1718, alt: 'Final cover B', caption: 'Final B · my recommendation' },
              ],
            },
          ],
        },
        {
          kind: 'points',
          title: 'Looking back',
          points: [
            'A canvas isn’t a cover. Every fix had to work without visibly touching the painting.',
            'Feedback changed daily: the blurb, its position, the type, the colours, the layout. Short rounds with a clear reason for every choice kept the project moving.',
            'Rebuilding a low-resolution scan into a print-ready file was new to me, and now I know how.',
            'Agree on final sign-off and credit in writing before starting. I do this on every project now.',
          ],
        },
      ],
    },
  },
]
