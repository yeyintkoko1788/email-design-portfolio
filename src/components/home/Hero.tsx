import { useRef, type CSSProperties, type PointerEvent } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Rv } from '../Reveal'
import Logo from '../Logo'
import { site } from '../../data/site'
import { clamp, useFinePointer, useReducedMotion } from '../../lib/hooks'

type Box = [x: number, y: number, w: number, h: number]

/** Where each layer sits on the original 1536 × 1024 artwork, in pixels. */
const PERSON = { box: [320, 61, 980, 950] as Box }

/**
 * Decorations, in the order they are pressed onto the page.
 * depth: how far it drifts with the mouse. twist: its angle as it lands.
 * behind: tucked under the sweater.
 */
const PIECES: { name: string; box: Box; depth: number; twist: number; behind?: boolean }[] = [
  { name: 'note', box: [88, 196, 420, 351], depth: 1.6, twist: -9 },
  { name: 'polaroid', box: [153, 550, 365, 461], depth: 1.1, twist: 7, behind: true },
  { name: 'flower', box: [172, 763, 190, 221], depth: 2.2, twist: -24 },
  { name: 'checker', box: [1133, 686, 289, 325], depth: 1, twist: 9, behind: true },
  { name: 'line', box: [1198, 457, 176, 186], depth: 1.4, twist: -5 },
  { name: 'star', box: [1094, 352, 77, 92], depth: 2.6, twist: 40 },
  { name: 'quote', box: [1126, 172, 311, 147], depth: 1.8, twist: -7 },
]

/** Position a layer on the canvas, in % of the original artwork. */
const place = ([x, y, w]: Box): CSSProperties => ({
  left: `${(x / 1536) * 100}%`,
  top: `${(y / 1024) * 100}%`,
  width: `${(w / 1536) * 100}%`,
})

function Layer({ name, alt }: { name: string; alt: string }) {
  return (
    <picture>
      <source srcSet={`/images/hero/layers/${name}.avif`} type="image/avif" />
      <img src={`/images/hero/layers/${name}.png`} alt={alt} draggable={false} className="block h-auto w-full" />
    </picture>
  )
}

/**
 * Magazine-cover hero: the logo as masthead, with the scrapbook portrait in
 * front of it so the head overlaps the letters. The decorations are separate
 * layers: they are pressed on one by one, then drift with the mouse.
 *
 * Inside the stage everything is positioned in %, so the cover keeps its
 * composition at any size. Phones get their own proportions (the md: values
 * are desktop / iPad).
 */
export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const parallax = fine && !reduced

  // Every layer drifts with the mouse by its own depth, like loose sheets of paper.
  const onMove = (e: PointerEvent) => {
    const stage = stageRef.current
    if (!parallax || !stage) return
    const r = stage.getBoundingClientRect()
    stage.style.setProperty('--mx', String(clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1)))
    stage.style.setProperty('--my', String(clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1)))
  }
  const onLeave = () => {
    stageRef.current?.style.setProperty('--mx', '0')
    stageRef.current?.style.setProperty('--my', '0')
  }
  const drift = (depth: number) => ({
    translate: `calc(var(--mx, 0) * ${depth}%) calc(var(--my, 0) * ${depth}%)`,
  })
  // Decorations drift in units of the canvas width, so small pieces move as much as big ones.
  const driftCq = (depth: number) => ({
    translate: `calc(var(--mx, 0) * ${depth}cqw) calc(var(--my, 0) * ${depth}cqw)`,
  })

  return (
    <div className="page-px flex h-full flex-col bg-paper pt-5 pb-14 md:pb-5" onPointerMove={onMove} onPointerLeave={onLeave}>
      <Rv i={0}>
        <div className="label flex justify-between gap-4 pb-2">
          <span>Portfolio / Vol. 2</span>
          <span className="font-medium text-accent">The Email Edition</span>
          <span>{site.year}</span>
        </div>
        <div className="h-px bg-accent" />
      </Rv>

      <div className="flex min-h-0 flex-1 items-center justify-center pt-3 [container-type:size]">
        <div
          ref={stageRef}
          className="relative aspect-[1.12] w-[min(100cqw,calc(100cqh*1.12))] md:aspect-[1000/790] md:w-[min(100cqw,calc(100cqh*1.266))]"
        >
          {/* Masthead, behind the portrait */}
          <Rv i={1} as="h1" className="absolute left-[2%] top-[2%] z-10 w-[96%] md:left-[5.5%] md:top-[1%] md:w-[90%]">
            <div className="transition-[translate] duration-700 ease-out" style={drift(-0.4)}>
              <Logo className="h-auto w-full text-accent" title={site.fullName} />
            </div>
          </Rv>

          {/* Scrapbook collage: the portrait plus each decoration as its own layer,
              placed on a 1536 × 1024 canvas (the size of the original artwork). */}
          <div className="absolute left-[-6%] top-[16.5%] z-20 aspect-[1536/1024] w-[112%] [container-type:inline-size] md:left-[-4.5%] md:top-[16.5%] md:w-[98%]">
            <Rv i={2} className="absolute z-10" style={place(PERSON.box)}>
              <div className="transition-[translate] duration-700 ease-out" style={drift(0.6)}>
                <Layer name="person" alt={`Portrait of ${site.fullName}, email designer. “${site.tagline}”`} />
              </div>
            </Rv>
            {PIECES.map((p, k) => (
              <div key={p.name} className={`absolute ${p.behind ? 'z-0' : 'z-20'}`} style={place(p.box)}>
                <div className="pop" style={{ '--d': `${0.75 + k * 0.17}s`, '--r': `${p.twist}deg` } as CSSProperties}>
                  <div className="transition-[translate] duration-700 ease-out" style={driftCq(p.depth)}>
                    <Layer name={p.name} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-4 pt-3 md:flex-row md:items-end md:justify-between">
        <Rv i={3} className="label">
          {site.role}
          <br />
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent" /> Open to work
          </span>
        </Rv>
        {/* Calls to action: shown last, after the collage has landed */}
        <Rv i={19} className="grid shrink-0 grid-cols-2 gap-2 md:flex md:items-center md:gap-3">
          <button
            type="button"
            onClick={() => {
              const work = document.getElementById('work')
              if (work) window.scrollTo({ top: work.getBoundingClientRect().top + window.scrollY, behavior: reduced ? 'auto' : 'smooth' })
            }}
            data-cursor="VIEW"
            className="label inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-paper transition-colors hover:bg-ink md:px-5 md:py-2.5"
          >
            See the work <ArrowDown size={12} aria-hidden />
          </button>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
            className="label inline-flex items-center justify-center gap-1.5 rounded-full border border-ink px-3.5 py-2 transition-colors hover:border-accent hover:text-accent md:px-5 md:py-2.5"
          >
            Résumé <ArrowUpRight size={12} aria-hidden />
          </a>
        </Rv>
      </div>
    </div>
  )
}
