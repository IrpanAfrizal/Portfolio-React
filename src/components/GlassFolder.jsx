import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/folder.css'

/**
 * Kartu kaca 3D.
 * Hover / fokus = kartu miring, lapisan (lingkaran, kaca, teks, tombol) terangkat pada kedalaman berbeda.
 * Props sama seperti versi sebelumnya, jadi Home.jsx tidak perlu diubah:
 *  - files[].to    -> tautan internal, dipakai sebagai tombol "detail" (pojok kanan bawah) + seluruh kartu bisa diklik
 *  - files[].href  -> tautan eksternal, tampil sebagai tombol bulat (mis. GitHub)
 *  - files[] tanpa to/href -> teks keterangan (mis. tech stack)
 */

// ukuran dasar kartu (px); tampilan di-scale sesuai prop width
const W = 290, H = 300

// lingkaran berlapis di pojok kanan atas: ukuran, jarak dari tepi, kedalaman (z)
const ORBS = [
  { s: 170, p: 8, z: 20 },
  { s: 140, p: 10, z: 40 },
  { s: 110, p: 17, z: 60 },
  { s: 80, p: 23, z: 80 },
]

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)
const GitlabIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21.5 2.5 14.3l1.9-6 2.5 6.7h10.2l2.5-6.7 1.9 6z" />
    <path d="M4.4 8.3 6.5 2.8l2.6 6.9zM19.6 8.3 17.5 2.8l-2.6 6.9z" />
  </svg>
)
const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
  </svg>
)
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const Svg = props => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} />
)
const PROJECT_ICONS = {
  // robot chatbot
  chatbot: (
    <Svg>
      <rect x="4" y="8" width="16" height="11" rx="3.5" />
      <path d="M12 8V5.2M2.5 12.5v3M21.5 12.5v3M9.5 16.3h5" />
      <circle cx="12" cy="4" r="1.2" />
      <circle cx="9" cy="12.6" r=".9" fill="currentColor" />
      <circle cx="15" cy="12.6" r=".9" fill="currentColor" />
    </Svg>
  ),
  // kotak aset / arsip
  asset: (
    <Svg>
      <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </Svg>
  ),
  // tas portfolio
  portfolio: (
    <Svg>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18M10.5 13v1.5h3V13" />
    </Svg>
  ),
}
// pilih ikon: prop `icon` > tebakan dari judul > huruf pertama
const pickIcon = (icon, label) => {
  if (icon && PROJECT_ICONS[icon]) return icon
  if (/chatbot/i.test(label)) return 'chatbot'
  if (/asset|aset|arsip|archiv/i.test(label)) return 'asset'
  if (/portfolio|portofolio/i.test(label)) return 'portfolio'
  return null
}

export default function GlassFolder({ label = 'Folder', meta, tone = 'light', icon, image, files = [], width = W, appearDelay = 0, labels = {} }) {
  const rootRef = useRef(null)
  const [entered, setEntered] = useState(false)
  const k = width / W

  // muncul saat pertama kali terlihat di layar
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

  const details = files.find(f => f.to)
  const links = files.filter(f => f.href).slice(0, 3)
  const notes = files.filter(f => !f.to && !f.href)
  const iconKey = pickIcon(icon, label)

  return (
    <div ref={rootRef} className="gf-root" data-tone={tone} data-entered={entered || undefined}
      role="group" aria-label={`${label} ${labels.contents || ''}`.trim()}
      style={{ width, height: H * k }}>
      <div className="gf-stage" style={{ transform: `scale(${k})` }}>
        <div className="gf-card">
          {/* latar: gradien / gambar proyek */}
          <div className="gf-art" aria-hidden="true">
            {image && <img src={image} alt="" draggable={false} onError={e => (e.currentTarget.style.display = 'none')} />}
          </div>

          {/* seluruh kartu bisa diklik menuju halaman detail */}
          {details && <Link to={details.to} className="gf-cover" tabIndex={-1} aria-hidden="true" />}

          {/* kaca buram */}
          <div className="gf-glass" aria-hidden="true" />

          {/* judul & keterangan */}
          <div className="gf-content">
            <span className="gf-title" title={label}>{label}</span>
            {meta && <span className="gf-meta">{meta}</span>}
            {notes.map((n, i) => (
              <p key={n.name + i} className="gf-note">
                {n.meta && <span>{n.meta}</span>}
                {n.name}
              </p>
            ))}
          </div>

          {/* tombol bulat + tautan detail */}
          <div className="gf-bottom">
            <div className="gf-socials">
              {links.map((f, i) => (
                <a key={f.name + i} href={f.href} target="_blank" rel="noopener noreferrer" className="gf-btn"
                  style={{ '--gf-d': `${400 + i * 200}ms` }} title={f.name}
                  aria-label={f.meta ? `${f.name} (${f.meta})` : f.name}>
                  {/github\.com/i.test(f.href) ? <GithubIcon /> : /gitlab\.com/i.test(f.href) ? <GitlabIcon /> : <ExternalIcon />}
                </a>
              ))}
            </div>
            {details && (
              <Link to={details.to} className="gf-more">
                <span>{details.name}</span>
                <ChevronIcon />
              </Link>
            )}
          </div>

          {/* lingkaran berlapis + lencana inisial */}
          <div className="gf-orbs" aria-hidden="true">
            {ORBS.map((o, i) => (
              <div key={i} className="gf-orb" style={{ '--s': o.s, '--p': o.p, '--z': o.z, '--i': i }} />
            ))}
            <div className="gf-badge" style={{ '--i': ORBS.length }}>{PROJECT_ICONS[iconKey] || label.trim().charAt(0).toUpperCase()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}