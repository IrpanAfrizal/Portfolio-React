import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Intro from './components/Intro'
import lazyRetry from './utils/lazyRetry'

const Home = lazyRetry(() => import('./pages/Home'))
const About = lazyRetry(() => import('./pages/About'))
const Projects = lazyRetry(() => import('./pages/Projects'))
const ProjectDetail = lazyRetry(() => import('./pages/ProjectDetail'))
const Expertise = lazyRetry(() => import('./pages/Expertise'))
const Research = lazyRetry(() => import('./pages/Research'))
const Experiments = lazyRetry(() => import('./pages/Experiments'))
const Contact = lazyRetry(() => import('./pages/Contact'))

// Intro tampil setiap web dibuka (tab/sesi baru), bukan setiap pindah halaman.
const seen = () => { try { return sessionStorage.getItem('intro') === '1' } catch { return false } }

export default function App() {
  const [intro, setIntro] = useState(() => !seen())
  const done = () => { try { sessionStorage.setItem('intro', '1') } catch { /* abaikan */ } setIntro(false) }
  return (
    <>
      {intro && <Intro onDone={done} />}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/research" element={<Research />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  )
}
