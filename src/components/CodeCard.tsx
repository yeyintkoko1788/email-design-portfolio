import { useState, type ReactNode } from 'react'
import { site } from '../data/site'
// The real Klaviyo template; scripts/email-preview.py builds the live preview from it
import cartEmailCode from '../emails/vivaia-cart.html?raw'

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

function CodeView({ code }: { code: string }) {
  return (
    <pre className="no-scrollbar h-full overflow-auto bg-night p-5 font-mono text-[11.5px] leading-relaxed text-[#e8e2d6]">
      <code>{highlight(code)}</code>
    </pre>
  )
}
