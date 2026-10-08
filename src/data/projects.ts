export type Category = 'Sequences' | 'Redesigns' | 'Concepts'

export type Project = {
  no: string
  title: string
  category: Category
  /** One short line, shown in the index */
  line: string
  href: string
  color: string
  /** Email image in /public. Placeholder until set. */
  image?: string
  /** The strongest project: shown larger in the thumbnail row */
  featured?: boolean
  /** Has a coded email (shows an "HTML + Klaviyo" tag in the index) */
  coded?: boolean
}

export const projects: Project[] = [
  { no: '01', title: 'Juiceday launch', category: 'Sequences', line: '4 emails, one product reveal', href: '/work/juiceday', color: '#FFD3B0', image: '/images/work/juiceday-poster-v2.jpg', featured: true },
  { no: '02', title: 'Vivaia journey', category: 'Sequences', line: 'Campaign → cart email', href: '/work/vivaia', coded: true, color: '#F2C9D3', image: '/images/work/vivaia-thumb.jpg' },
  { no: '03', title: 'Nike', category: 'Redesigns', line: 'Unofficial redesign', href: '/work/redesigns#nike', color: '#E3DACB', image: '/images/work/nike-thumb.jpg' },
  { no: '04', title: 'Tripadvisor', category: 'Redesigns', line: 'Unofficial redesign', href: '/work/redesigns#tripadvisor', color: '#CFE3D6', image: '/images/work/tripadvisor-thumb.jpg' },
  { no: '05', title: 'Matcha loyalty', category: 'Concepts', line: 'Self-initiated concept', href: '/work/concepts#matcha', color: '#CFE0B4', image: '/images/work/matcha-thumb.jpg' },
  { no: '06', title: 'Museum exhibition', category: 'Concepts', line: 'Self-initiated concept', href: '/work/concepts#museum', color: '#D9D2C5', image: '/images/work/museum-thumb.jpg' },
]

export const categories: Category[] = ['Sequences', 'Redesigns', 'Concepts']
