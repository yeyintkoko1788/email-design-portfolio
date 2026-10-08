import { Navigate, useParams } from 'react-router-dom'
import CaseLayout, { CaseIntro } from '../components/case/CaseLayout'
import CaseStudyBody from '../components/case/CaseStudy'
import { uiux } from '../data/uiux'

/** /creative/ui-ux/:project: one UI/UX case study. */
export default function UiuxCase() {
  const { project } = useParams()
  const index = uiux.findIndex((p) => p.slug === project)
  if (index < 0) return <Navigate to="/creative/ui-ux" replace />
  const p = uiux[index]
  const next = uiux[(index + 1) % uiux.length]

  return (
    <CaseLayout
      key={p.slug}
      no="05"
      label={`UI/UX · ${p.title}`}
      back="/creative/ui-ux"
      next={{ title: next.title, to: `/creative/ui-ux/${next.slug}` }}
    >
      <CaseIntro no="05" kicker={p.kicker} title={p.title} line={p.line} />

      <CaseStudyBody p={p} />
    </CaseLayout>
  )
}
