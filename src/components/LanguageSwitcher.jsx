import { useState } from 'react'
import { LANGS, usePrefs } from '../context/Preferences'
import '../styles/language.css'

/**
 * Pemilih bahasa gaya IconBar / toolbar:
 * - Semua bendera selalu tampil sejajar.
 * - Bahasa aktif otomatis melebarkan label namanya.
 * - Hover / fokus pada bendera lain → labelnya ikut melebar sebentar (preview).
 * - Klik bendera → ganti bahasa aktif.
 */
const FLAGS = {
  en: (
    <>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
    </>
  ),
  id: (
    <>
      <rect width="60" height="20" fill="#CE1126" />
      <rect y="20" width="60" height="20" fill="#fff" />
    </>
  ),
  ar: (
    <>
      <rect width="60" height="40" fill="#006C35" />
      <path d="M13 15c3-4 5 3 8 0s5-3 8 0 5 3 8 0 5-3 8 0 4 2 5 0" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M14 27h32" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M46 27l-4-2.5v5z" fill="#fff" />
    </>
  ),
}
const Flag = ({ code }) => (
  <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{FLAGS[code]}</svg>
)

export default function LanguageSwitcher() {
  const { lang, setLang, t } = usePrefs()
  const [hover, setHover] = useState(null)
  const names = Object.fromEntries(LANGS)

  return (
    <div className="lang" role="toolbar" aria-orientation="horizontal" aria-label={t('settings.language')}>
      {LANGS.map(([code]) => {
        const isSelected = code === lang
        const expanded = isSelected || hover === code
        return (
          <button
            key={code}
            type="button"
            lang={code}
            className={'lg-btn' + (isSelected ? ' current' : '') + (expanded ? ' expanded' : '')}
            aria-label={names[code]}
            aria-pressed={isSelected}
            aria-expanded={expanded}
            onClick={() => setLang(code)}
            onMouseEnter={() => setHover(code)}
            onMouseLeave={() => setHover(null)}
            onFocus={e => { if (e.currentTarget.matches(':focus-visible')) setHover(code) }}
            onBlur={() => setHover(null)}
          >
            <span className="lg-flag"><Flag code={code} /></span>
            <span className="lg-label"><span>{names[code]}</span></span>
          </button>
        )
      })}
    </div>
  )
}