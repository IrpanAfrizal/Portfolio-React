import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import en from '../i18n/en'
import id from '../i18n/id'
import ar from '../i18n/ar'
import skillsEn from '../i18n/skills.en'
import skillsId from '../i18n/skills.id'
import skillsAr from '../i18n/skills.ar'

const dicts = {
  en: { ...en, skillsPage: skillsEn },
  id: { ...id, skillsPage: skillsId },
  ar: { ...ar, skillsPage: skillsAr },
}

// const dicts = { en, id, ar }
export const LANGS = [['en', 'English'], ['id', 'Indonesia'], ['ar', 'العربية']]
const Ctx = createContext(null)

const read = key => { try { return localStorage.getItem(key) } catch { return null } }
const pick = (obj, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj)
const initialLang = () => {
  const saved = read('lang')
  if (saved && saved in { en: 1, id: 1, ar: 1 }) return saved
  const nav = (navigator.language || 'en').slice(0, 2)
  return nav in { en: 1, id: 1, ar: 1 } ? nav : 'en'
}

export function PreferencesProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  const [theme, setTheme] = useState(() => (read('theme') === 'dark' ? 'dark' : 'light'))

  useEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('lang', lang) } catch { /* abaikan */ }
  }, [lang])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* abaikan */ }
  }, [theme])

  // Ganti tema lewat View Transitions API: browser mengambil "foto" tampilan lama dan baru,
  // lalu membuka tampilan baru dengan lingkaran dari tombol. Tidak ada transisi per-elemen,
  // jadi tidak berkedip. Browser tanpa fitur ini (atau reduced motion) berganti langsung.
  const toggleTheme = useCallback(origin => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const el = document.documentElement
    const swap = () => { flushSync(() => setTheme(next)); el.dataset.theme = next }
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || still) { swap(); return }
    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? 0
    const vt = document.startViewTransition(swap)
    vt.ready.then(() => {
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      el.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
      )
    }).catch(() => { /* transisi dibatalkan, abaikan */ })
  }, [theme])

  const t = useCallback(path => pick(dicts[lang], path) ?? pick(en, path) ?? path, [lang])
  const value = useMemo(() => ({
    lang, setLang, theme, setTheme, t, toggleTheme,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
  }), [lang, theme, t, toggleTheme])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const usePrefs = () => useContext(Ctx)
