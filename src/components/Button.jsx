import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Spinner from './Spinner'

const sleep = ms => new Promise(r => setTimeout(r, ms))

// Semua tombol memakai komponen ini, jadi semuanya punya status loading.
export default function Button({ to, href, plain, variant, size, loading, delay = 350, onClick, className = '', children, ...rest }) {
  const [busy, setBusy] = useState(false)
  const alive = useRef(true)
  const { pathname } = useLocation()
  useEffect(() => { alive.current = true; return () => { alive.current = false } }, [])
  useEffect(() => { setBusy(false) }, [pathname])

  const isBusy = busy || !!loading
  const cls = [plain ? '' : 'btn', variant, size, isBusy && 'busy', className].filter(Boolean).join(' ')
  const content = <>{isBusy && <Spinner />}{children}</>
  const hold = async ms => { setBusy(true); await sleep(ms); if (alive.current) setBusy(false) }

  if (to) return (
    <Link to={to} className={cls} aria-busy={isBusy} {...rest}
      onClick={e => { if (isBusy) return e.preventDefault(); hold(1500) }}>{content}</Link>
  )
  if (href) return (
    <a href={href} className={cls} aria-busy={isBusy} {...rest}
      onClick={e => { if (isBusy) return e.preventDefault(); hold(900) }}>{content}</a>
  )
  return (
    <button type="button" className={cls} aria-busy={isBusy} {...rest}
      onClick={async e => {
        if (isBusy) { e.preventDefault(); return }
        if (rest.type === 'submit' || !onClick) return
        setBusy(true); await sleep(delay)
        try { await onClick(e) } finally { if (alive.current) setBusy(false) }
      }}>{content}</button>
  )
}
