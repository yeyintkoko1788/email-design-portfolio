import HomeNav from '../components/home/HomeNav'
import StoryIssue from '../components/home/StoryIssue'
import Hero from '../components/home/Hero'
import AboutPage from '../components/home/AboutPage'
import Work from '../components/home/Work'
import ProcessPage from '../components/home/ProcessPage'
import CreativeSpace from '../components/home/CreativeSpace'
import Contact from '../components/home/Contact'
import { site } from '../data/site'

export default function Home() {
  return (
    <div className="bg-paper">
      <HomeNav />
      <StoryIssue
        pages={[<Hero key="cover" />, <AboutPage key="about" />, <ProcessPage key="process" />]}
        anchors={['cover', 'about', 'process']}
        total={site.parts}
      />
      <Work />
      <CreativeSpace />
      <Contact />
    </div>
  )
}
