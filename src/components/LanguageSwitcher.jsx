import { useEffect, useRef, useState } from 'react'
import { LANGS, usePrefs } from '../context/Preferences'
import '../styles/language.css'

/**
 * Pemilih bahasa gaya "icon bar":
 * - Awalnya hanya bendera bahasa yang aktif.
 * - Klik bendera: namanya keluar di samping bendera, dan bendera bahasa lain ikut muncul.
 * - Arahkan kursor ke bendera lain: namanya keluar. Klik: ganti bahasa, lalu kembali ke satu bendera.
 * - Escape atau klik di luar menutupnya.
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
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); setHover(null) } }
    const onDown = e => { if (!rootRef.current?.contains(e.target)) { setOpen(false); setHover(null) } }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown) }
  }, [open])

  const names = Object.fromEntries(LANGS)
  const order = [lang, ...LANGS.map(l => l[0]).filter(c => c !== lang)] // bahasa aktif selalu paling depan

  return (
    <div ref={rootRef} className={'lang' + (open ? ' open' : '')} role="group" aria-label={t('settings.language')}>
      {order.map(code => {
        const current = code === lang
        const show = current || open
        const expanded = open && (current || hover === code)
        return (
          <div key={code} className={'lg-slot' + (show ? ' show' : '')}>
            <div className="lg-clip">
              <button
                type="button"
                lang={code}
                className={'lg-btn' + (current ? ' current' : '') + (expanded ? ' expanded' : '')}
                aria-label={names[code]}
                aria-pressed={current}
                aria-expanded={current ? open : undefined}
                onClick={() => {
                  if (current) { setOpen(o => !o); return }
                  setLang(code); setOpen(false); setHover(null)
                }}
                onMouseEnter={() => { if (open) setHover(code) }}
                onMouseLeave={() => setHover(null)}
                onFocus={e => { if (open && e.currentTarget.matches(':focus-visible')) setHover(code) }}
                onBlur={() => setHover(null)}
              >
                <span className="lg-flag"><Flag code={code} /></span>
                <span className="lg-label"><span>{names[code]}</span></span>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}