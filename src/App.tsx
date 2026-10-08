import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Juiceday from './pages/Juiceday'
import Vivaia from './pages/Vivaia'
import Redesigns from './pages/Redesigns'
import Concepts from './pages/Concepts'
import Creative from './pages/Creative'
import UiuxCase from './pages/UiuxCase'
import SoundProvider from './components/SoundProvider'
import SpringCursor from './components/SpringCursor'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo(0, 0)
      }, 50)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <SoundProvider>
      <ScrollToTop />
      <SpringCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/juiceday" element={<Juiceday />} />
        <Route path="/work/vivaia" element={<Vivaia />} />
        <Route path="/work/redesigns" element={<Redesigns />} />
        <Route path="/work/concepts" element={<Concepts />} />
        <Route path="/creative/:slug" element={<Creative />} />
        <Route path="/creative/ui-ux/:project" element={<UiuxCase />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </SoundProvider>
  )
}
