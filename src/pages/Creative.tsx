import { Navigate, useParams } from 'react-router-dom'
import CaseLayout, { CaseIntro } from '../components/case/CaseLayout'
import CreativeTile from '../components/CreativeTile'
import PosterWall from '../components/PosterWall'
import CaseStudyBody from '../components/case/CaseStudy'
import { Reveal, Rv } from '../components/Reveal'
import { creative } from '../data/creative'

/** /creative/:slug: everything inside one creative category. */
export default function Creative() {
  const { slug } = useParams()
  const index = creative.findIndex((c) => c.slug === slug)
  if (index < 0) return <Navigate to="/#creative" replace />
  const c = creative[index]
  const next = creative[(index + 1) % creative.length]

  return (
    <CaseLayout
      key={c.slug}
      no="05"
      label={`Creative space · ${c.title}`}
      back="/#creative"
      next={{ title: next.title, to: `/creative/${next.slug}` }}
    >
      <CaseIntro no="05" kicker={c.tag ?? 'My creative space'} title={c.title} line={c.line} />
      {c.layout === 'wall' ? (
        <PosterWall pieces={c.pieces} />
      ) : c.study ? (
        <CaseStudyBody p={c.study} />
      ) : (
        <Reveal amount={0.1} className="page-px grid gap-10 pb-24 sm:grid-cols-2 md:grid-cols-3 md:gap-8 md:pb-36">
          {c.pieces.map((p, i) => (
            <Rv key={i} i={i}>
              <CreativeTile piece={p} aspect={c.aspect} />
            </Rv>
          ))}
        </Reveal>
      )}
    </CaseLayout>
  )
}
