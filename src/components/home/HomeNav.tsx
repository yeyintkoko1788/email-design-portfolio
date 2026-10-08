import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SoundToggle from '../SoundToggle'
import { InlineLogo } from '../Logo'
import { site } from '../../data/site'

const links = [
  { label: 'How I work', to: '/#process' },
  { label: 'Work', to: '/#work' },
  { label: 'Creative space', to: '/#creative' },
  { label: 'Contact', to: '/#contact' },
]

/** Slim bar that slides in once the opening pages are behind you. */
export default function HomeNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const issue = document.getElementById('issue')
      setVisible(!!issue && issue.getBoundingClientRect().bottom < 64)
    }
    const raf = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`page-px fixed inset-x-0 top-0 z-[400] flex h-14 items-center justify-between border-b border-ink/10 bg-paper/90 backdrop-blur transition-transform duration-500 ease-[var(--ease-bounce)] ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      inert={!visible}
    >
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="label" aria-label="nang, back to the cover">
        <InlineLogo title="" /> · Vol. 2
      </Link>
      <nav className="flex items-center gap-5">
        {links.map((l) => (
          <Link key={l.label} to={l.to} className="label hidden transition-colors hover:text-accent md:inline">
            {l.label}
          </Link>
        ))}
        <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="label text-accent transition-colors hover:text-ink">
          Résumé ↗
        </a>
        <SoundToggle />
      </nav>
    </header>
  )
}
