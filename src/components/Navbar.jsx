import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button'
import Settings from './Settings'
import { usePrefs } from '../context/Preferences'

// Urutan sama dengan nomor halaman 01–08
const links = [['/', 'home'], ['/about', 'about'], ['/expertise', 'skills'], ['/projects', 'projects'],
  ['/research', 'research'], ['/experiments', 'experiments'], ['/contact', 'contact']]

export default function Navbar() {
  const { t } = usePrefs()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll) }
  }, [])
  return (
    <header className={'site-header' + (scrolled ? ' scrolled' : '')}>
      <div className="wrap">
        <nav className="nav" aria-label="Main">
          <Link to="/" className="logo">irpan.</Link>
          <ul id="menu" className={open ? 'open' : ''}>
            {links.map(([to, k]) => <li key={to}><NavLink to={to} end={to === '/'}>{t('nav.' + k)}</NavLink></li>)}
          </ul>
          <div className="nav-actions">
            <Settings />
            <button type="button" className="btn ghost sm menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>{open ? t('nav.close') : t('nav.menu')}</button>
            <Button to="/contact" size="sm">{t('nav.talk')}</Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
