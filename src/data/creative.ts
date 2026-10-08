import type { CaseStudy } from './uiux'

export type CreativePiece = {
  title: string
  note: string
  /** Image or video file in /public. Placeholder tile until set. */
  src?: string
  video?: boolean
  /** Still frame shown before a video plays */
  poster?: string
  /** Opens a detail page */
  href?: string
  /** Gallery label: medium and a few colours from the piece */
  medium?: string
  year?: string
  palette?: string[]
  color: string
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
    title: 'Ads & posters',
    line: 'Ads that move, and the posters I couldn’t leave out.',
    aspect: 'aspect-[4/5]',
    color: '#F2C9D3',
    thumb: '/images/creative/posters/make-a-mess.jpg',
    layout: 'wall',
    pieces: [
      { title: 'Obstacle', src: '/images/creative/posters/obstacle.jpg', note: 'The biggest obstacle might be the doubt within you.', color: '#ECE8E0', medium: 'Digital poster', palette: ['#324978', '#51504D', '#B2B2AD'] },
      { title: 'Just tomatoes', src: '/images/creative/posters/tomatoes.jpg', note: 'No thoughts. Just tomatoes.', color: '#F8ECEE', medium: 'Digital poster', palette: ['#ED6558', '#D8D6E7', '#F9EEEF'] },
    ],
  },
  {
    slug: 'book-cover',
    title: 'Book cover',
    tag: 'Client commission',
    line: 'A real commission, from brief to print.',
    aspect: 'aspect-[2/3]',
    color: '#D9D2C5',
    pieces: [{ title: 'The Wounded Spiral', src: '/images/creative/book-cover/cover.jpg', note: 'Lee John Nottingham · A5 paperback', color: '#D9D2C5' }],
    study: {
      slug: 'the-wounded-spiral',
      title: 'The Wounded Spiral',
      kicker: 'Client commission',
      line: '',
      cover: '/images/creative/book-cover/cover.jpg',
      coverAlt: 'Three printed copies of The Wounded Spiral on a table',
      meta: [
        ['Book', 'The Wounded Spiral'],
        ['Client', 'Lee John Nottingham'],
        ['Genre', 'Surrealist fiction'],
        ['Format', 'A5 paperback, full wrap'],
        ['Role', 'Graphic designer'],
        ['Timeline', '2 weeks'],
        ['Tools', 'Figma'],
      ],
      stats: [
        ['1st', 'client project, on time and in scope'],
        ['300', 'DPI print file, rebuilt from a 27–42 DPI scan'],
        ['2', 'finals, both printed to decide on paper'],
      ],
      sections: [
        {
          kind: 'text',
          title: 'The brief',
          body: [
            'The client gave me his own oil painting and an AI-made cover as a reference. Dark, painterly, literary-surreal. Not pulp horror, not gothic. The painting stays the centrepiece.',
            'The catch: it was never painted to be a cover. Dense detail everywhere, and no quiet space for type.',
          ],
          question: 'How do you turn a painting into a cover without changing its character?',
          images: [
            { src: '/images/creative/book-cover/painting.jpg', w: 1468, h: 1114, alt: 'The original oil painting', caption: 'The painting' },
            { src: '/images/creative/book-cover/ai-reference.jpg', w: 1536, h: 1024, alt: 'The AI-made cover reference', caption: 'The reference' },
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
              text: 'The client’s pick stays closest to the reference, with a blurred back for the blurb. Mine removes the blurry aircraft, so one scene runs across the spine. He printed both to decide on paper.',
              images: [
                { src: '/images/creative/book-cover/final-client.jpg', w: 2200, h: 1718, alt: 'Final cover, client’s pick', caption: 'Client’s pick' },
                { src: '/images/creative/book-cover/final-recommended.jpg', w: 2200, h: 1718, alt: 'Final cover, my recommendation', caption: 'My recommendation' },
              ],
            },
          ],
        },
        {
          kind: 'points',
          title: 'Looking back',
          points: [
            'A canvas isn’t a cover. Every fix had to work without visibly touching the painting.',
            'With an undecided client, quick and clear reasons mattered as much as the design.',
            'Rebuilding a low-resolution scan into a print-ready file was new to me, and now I know how.',
          ],
        },
      ],
    },
  },
]
