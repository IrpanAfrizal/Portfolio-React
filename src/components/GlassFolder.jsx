import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/folder.css'

/**
 * Folder kaca: panel belakang (gradien/gambar), "file" di dalamnya, dan panel depan kaca buram.
 * Hover = panel depan miring ke arah kita. Klik / Enter / Spasi = folder terbuka dan file menyebar.
 * File bisa berupa tautan internal (to), eksternal (href), atau lembar statis.
 */
const PALETTES = {
  aurora: ['#f4efe9', '#e9c2b8', '#c2433f', '#2a1e2a', '#22395e', '#6f97c2'],
  ember: ['#07090c', '#16252c', '#3d5f68', '#a3201a', '#ef4a2b', '#ff8a5c'],
  dusk: ['#120c18', '#3e2850', '#8f6c9c', '#b3502f', '#eab08a', '#fbe7d2'],
  glacier: ['#f7f8fa', '#d9e2ea', '#9fb4c7', '#bccbd8', '#e8edf2'],
  verdant: ['#070b08', '#173024', '#4f7a5a', '#a7843a', '#e9cf87', '#fbf3d6'],
}
const gradientOf = name => {
  const c = PALETTES[name] || PALETTES.aurora
  return `radial-gradient(90% 70% at 85% 0%, ${c[c.length - 1]}66, transparent 60%), linear-gradient(135deg, ${c.join(', ')})`
}
const rng = seed => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hashString = s => {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
const fanSlot = (i, n) => (n <= 1 ? 0 : (i / (n - 1)) * 2 - 1)

const W = 340, H = 272, HEADROOM = 54, FRONT_H = H - 74, MAX_VISIBLE = 4
const BACK_PATH = 'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z'
const FRONT_PATH = `M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 ${FRONT_H - 22}A22 22 0 0 1 318 ${FRONT_H}L22 ${FRONT_H}A22 22 0 0 1 0 ${FRONT_H - 22}Z`

export default function GlassFolder({ label = 'Folder', meta, tone = 'light', art = 'aurora', image, files = [], width = 340, appearDelay = 0, labels = {} }) {
  const uid = useId().replace(/:/g, '')
  const rootRef = useRef(null)
  const filesRef = useRef(null)
  const hitRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [entered, setEntered] = useState(false)
  const k = width / W

  // muncul (merakit diri) saat pertama kali terlihat
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') { setEntered(true); return }
    let timer = 0
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return
      io.disconnect()
      timer = window.setTimeout(() => setEntered(true), appearDelay)
    }, { threshold: 0.25 })
    io.observe(el)
    return () => { io.disconnect(); window.clearTimeout(timer) }
  }, [appearDelay])

  // cahaya & paralaks mengikuti kursor tanpa re-render
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    let raf = 0, px = 0, py = 0
    const write = () => { raf = 0; el.style.setProperty('--gf-px', px.toFixed(3)); el.style.setProperty('--gf-py', py.toFixed(3)) }
    const move = e => {
      if (e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      px = ((e.clientX - r.left) / r.width) * 2 - 1
      py = ((e.clientY - r.top) / r.height) * 2 - 1
      if (!raf) raf = requestAnimationFrame(write)
    }
    const leave = () => { px = 0; py = 0; if (!raf) raf = requestAnimationFrame(write) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); cancelAnimationFrame(raf) }
  }, [])

  // file tertutup tidak ikut urutan Tab
  useEffect(() => { filesRef.current?.toggleAttribute('inert', !open) }, [open])

  // Escape / klik di luar menutup folder
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); hitRef.current?.focus() } }
    const onDown = e => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown) }
  }, [open])

  const visible = files.slice(-MAX_VISIBLE)
  const start = files.length - visible.length

  return (
    <div ref={rootRef} className="gf-root" data-tone={tone} data-open={open || undefined} data-entered={entered || undefined}
      style={{ width, height: (H + HEADROOM) * k }}>
      <div className="gf-stage" style={{ transform: `translateY(${HEADROOM * k}px) scale(${k})` }}>
        <div className="gf-tilt">
          <div className="gf-shadow" aria-hidden="true" />
          <div className="gf-back" style={{ clipPath: `path('${BACK_PATH}')` }} aria-hidden="true">
            <div className="gf-art" style={{ background: gradientOf(art) }}>
              {image && <img src={image} alt="" draggable={false} onError={e => (e.currentTarget.style.display = 'none')} />}
            </div>
            <div className="gf-back-sheen" />
          </div>
          <svg className="gf-rim gf-back-rim" viewBox={`0 0 ${W} ${H}`} aria-hidden="true"><path d={BACK_PATH} /></svg>

          <div className="gf-front" style={{ clipPath: `path('${FRONT_PATH}')` }}>
            <div className="gf-tint" aria-hidden="true" />
            <div className="gf-spec" aria-hidden="true" />
            <svg className="gf-rim gf-front-rim" viewBox={`0 0 ${W} ${FRONT_H}`} aria-hidden="true">
              <defs>
                <linearGradient id={`gf-rim-${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
                  <stop offset="0.35" stopColor="#fff" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <path d={FRONT_PATH} stroke={`url(#gf-rim-${uid})`} />
            </svg>
            <button ref={hitRef} type="button" className="gf-hit" aria-expanded={open}
              aria-label={`${open ? labels.close || 'Close' : labels.open || 'Open'} ${label}`}
              onClick={() => setOpen(o => !o)} />
            <div className="gf-label">
              <span className="gf-title" title={label}>{label}</span>
              {meta && <span className="gf-meta">{meta}</span>}
            </div>
          </div>

          <div ref={filesRef} className="gf-files" role="list" aria-label={`${label} ${labels.contents || ''}`.trim()}>
            {visible.map((file, v) => {
              const jitter = rng(hashString(file.name) + start + v)
              const style = {
                '--gf-slot': fanSlot(v, visible.length),
                '--gf-depth': visible.length - 1 - v,
                '--gf-jx': ((jitter() - 0.5) * 10).toFixed(2) + 'px',
                '--gf-jr': ((jitter() - 0.5) * 3.2).toFixed(2) + 'deg',
                zIndex: v + 1,
              }
              const inner = (
                <>
                  <span className="gf-lines" aria-hidden="true">
                    <i style={{ width: '86%' }} /><i style={{ width: '92%' }} /><i style={{ width: '64%' }} /><i style={{ width: '88%' }} /><i style={{ width: '42%' }} />
                  </span>
                  <span className="gf-sheet-head">
                    <span className="gf-sheet-name">{file.name}</span>
                    {file.meta && <span className="gf-sheet-meta">{file.meta}</span>}
                  </span>
                </>
              )
              return (
                <div key={file.name + v} role="listitem" className="gf-sheet-slot">
                  {file.to ? <Link to={file.to} className="gf-sheet" style={style}>{inner}</Link>
                    : file.href ? <a href={file.href} target="_blank" rel="noopener noreferrer" className="gf-sheet" style={style}>{inner}</a>
                    : <div className="gf-sheet gf-sheet--static" style={style}>{inner}</div>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
