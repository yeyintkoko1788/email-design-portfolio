import { useState, type ReactNode } from 'react'
import { site } from '../data/site'
// The sample version of the email, with one fixed shoe. realEmailNotes marks what the real one changes.
import cartEmailCode from '../emails/vivaia-cart-sample.html?raw'

const PREVIEW = '/emails/vivaia-cart/preview.html'
const DESIGN = '/emails/vivaia-cart/design.png'

const checklist = [
  'Table-based HTML, 600px max',
  'Responsive on phones',
  'Klaviyo cart tags (Started Checkout)',
  'Email-safe fonts: Helvetica, Arial',
  'Free-shipping line only over $99',
]

/**
 * Vivaia cart abandonment email with a Design / Code switch and the build
 * checklist. Shown beside the cart email on the Vivaia case study.
 */
export default function CodeCard({ className = '' }: { className?: string }) {
  const [mode, setMode] = useState<'design' | 'code'>('design')
  return (
    <div className={className}>
      <p className="label text-accent">Vivaia cart email · Built, not just designed</p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <div role="tablist" aria-label="View" className="label inline-flex overflow-hidden rounded-full border border-ink">
          {(['design', 'code'] as const).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 transition-colors duration-300 ${mode === m ? 'bg-night text-paper-2' : 'hover:text-accent'}`}
            >
              {m}
            </button>
          ))}
        </div>
        <span className="label flex gap-4">
          <a href={PREVIEW} target="_blank" rel="noreferrer" data-cursor="OPEN" className="underline underline-offset-4 hover:text-accent">
            Live preview ↗
          </a>
          {site.codeUrl && (
            <a href={site.codeUrl} target="_blank" rel="noreferrer" data-cursor="OPEN" className="underline underline-offset-4 hover:text-accent">
              Full code ↗
            </a>
          )}
        </span>
      </div>
      <div
        role="tabpanel"
        className="mt-4 h-[520px] overflow-hidden rounded-md shadow-[0_10px_30px_rgba(26,26,26,.1)]"
      >
        {mode === 'design' ? <CartEmailDesign /> : <CodeView code={cartEmailCode} />}
      </div>
      <ul className="label mt-4 grid gap-1">
        {checklist.map((c) => (
          <li key={c}>
            <span className="text-accent">✓</span> {c}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * What the real email changes, shown in blue above the line it replaces.
 * Each `find` matches the first line containing it after the previous match.
 */
const realEmailNotes = [
  { find: '<!-- Cart item -->', note: 'one card per item left in the cart: {% for item in event.extra.line_items %} … {% endfor %}' },
  { find: '<a href="https://www.vivaia.com/"', note: 'the link goes back to the checkout: {{ event.extra.checkout_url }}' },
  { find: 'class="product-img"', note: 'their own photo: {{ item.product.images.0.src }}, alt {{ item.product.title }}' },
  { find: '>Margot Mary Jane</p>', note: 'their product name: {{ item.product.title }}' },
  { find: 'Size 38', note: 'their colour, size and quantity: {{ item.variant_title }} · Qty. {{ item.quantity|floatformat:0 }}' },
  { find: '>$129</p>', note: 'their price: ${{ item.line_price|floatformat:-2 }}' },
  { find: '>Complete My Order</a>', note: 'the button goes back to the checkout: {{ event.extra.checkout_url }}' },
  { find: '<!-- Free shipping -->', note: "this line shows only over $99: {% if event|lookup:'$value' >= 99 %} … {% endif %}" },
]

/** The final design, scrollable inside the card. */
function CartEmailDesign() {
  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-white">
      <img src={DESIGN} alt="Vivaia cart email design" className="w-full" loading="lazy" />
    </div>
  )
}

const TOKEN = /(<!--[\s\S]*?-->)|(\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\})|("[^"\n{}]*")|(<\/?[\w:]+|\/?>)|([\w:-]+)(?==)/g
const TOKEN_CLASS = ['text-[#8a8070]', 'text-[#F5C86A]', 'text-[#BFD7A0]', 'text-[#F2A08F]', 'text-[#e8b8a8]']

function highlight(code: string) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of code.matchAll(TOKEN)) {
    const at = m.index ?? 0
    if (at > last) out.push(code.slice(last, at))
    const group = m.slice(1).findIndex((g) => g !== undefined)
    out.push(
      <span key={at} className={TOKEN_CLASS[group]}>
        {m[0]}
      </span>,
    )
    last = at + m[0].length
  }
  out.push(code.slice(last))
  return out
}

/** The code, highlighted, with each line the real email changes picked out in blue. */
function withNotes(code: string) {
  const out: ReactNode[] = []
  let plain: string[] = []
  let next = 0
  const flush = () => {
    if (plain.length) out.push(<span key={out.length}>{highlight(plain.join(''))}</span>)
    plain = []
  }
  for (const line of code.split(/(?<=\n)/)) {
    const note = realEmailNotes[next]
    if (note && line.includes(note.find)) {
      flush()
      out.push(
        <span key={out.length} className="my-1 block bg-[#7EC8FF]/15 px-2 py-1 break-words whitespace-pre-wrap text-[#7EC8FF]">
          ▸ Real email: {note.note}
        </span>,
        <span key={out.length + 1} className="text-[#7EC8FF]">
          {line}
        </span>,
      )
      next += 1
    } else plain.push(line)
  }
  flush()
  return out
}

function CodeView({ code }: { code: string }) {
  return (
    <div className="flex h-full flex-col bg-night">
      <p className="px-5 pt-4 pb-2 font-mono text-[11.5px] text-[#7EC8FF]">▸ Blue: what changes in the real email</p>
      <pre className="no-scrollbar min-h-0 flex-1 overflow-auto px-5 pb-5 font-mono text-[11.5px] leading-relaxed text-[#e8e2d6]">
        <code>{withNotes(code)}</code>
      </pre>
    </div>
  )
}
