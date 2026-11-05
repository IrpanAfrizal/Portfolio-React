import { useEffect, useState } from 'react'
import Icon from './Icon'
import '../styles/pagefx.css'

/**
 * Latar animasi halaman:
 *  - lingkaran tipis "bernapas", bintang melayang, cahaya lembut
 *  - pesawat kertas kecil yang terbang terus-menerus mengitari layar (rute putus-putus)
 *
 * Pakai: beri class "fx" pada pembungkus halaman, lalu taruh <PageFX /> sebagai anak pertamanya.
 *  variant : 'right' (default) | 'left' (cermin) | 'hero' (lebih besar, untuk bagian atas Home)
 *  planes  : true (default) | false  -> tampilkan / sembunyikan pesawat
 */

// Rute berupa jalur TERTUTUP (pesawat tidak pernah keluar layar, jadi tidak ada jeda menunggu).
// Titik dalam skala 0..1 dari lebar/tinggi layar; speed = px per detik; phase = posisi awal (0..1).
const ROUTES = [
  { pts: [[.10, .25], [.50, .12], [.90, .25], [.92, .60], [.55, .84], [.12, .70]], speed: 105, phase: 0.05, scale: 1 },
  { pts: [[.15, .50], [.30, .24], [.50, .50], [.70, .76], [.85, .50], [.70, .24], [.50, .50], [.30, .76]], speed: 95, phase: 0.45, scale: 0.9 },
  { pts: [[.06, .90], [.20, .45], [.40, .15], [.60, .40], [.80, .10], [.94, .50], [.75, .86], [.45, .70], [.25, .92]], speed: 125, phase: 0.7, scale: 1.1 },
  { pts: [[.92, .35], [.80, .20], [.68, .35], [.80, .50]], speed: 80, phase: 0.2, scale: 0.85 },
  { pts: [[.08, .15], [.30, .10], [.40, .35], [.20, .55], [.06, .40]], speed: 85, phase: 0.6, scale: 0.8 },
  { pts: [[.05, .80], [.30, .95], [.60, .78], [.95, .92], [.90, .65], [.60, .60], [.30, .70]], speed: 110, phase: 0.85, scale: 1 },
]

const f = n => n.toFixed(1)

// ubah titik menjadi kurva mulus tertutup (Catmull-Rom -> Bezier)
function build(route, w, h) {
  const P = route.pts.map(([x, y]) => [x * w, y * h])
  const n = P.length
  let d = `M${f(P[0][0])} ${f(P[0][1])}`
  let len = 0
  for (let i = 0; i < n; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`
    len += Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) * 1.12
  }
  const dur = Math.max(len / route.speed, 8)
  return { d: d + 'Z', dur }
}

function Planes({ w, h }) {
  const routes = ROUTES.map(r => ({ ...r, ...build(r, w, h) }))
  return (
    <svg className="fx-planes" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {routes.map((r, i) => (
        <path key={'r' + i} className="fx-route" d={r.d} style={{ animationDelay: `-${i * 1.3}s` }} />
      ))}
      {routes.map((r, i) => (
        <g key={`p${i}-${w}x${h}`} className="fx-plane">
          <animateMotion dur={`${r.dur.toFixed(1)}s`} begin={`-${(r.dur * r.phase).toFixed(1)}s`} repeatCount="indefinite" rotate="auto" path={r.d} />
          <g transform={`scale(${r.scale})`}>
            <g className="fx-wobble" style={{ animationDelay: `-${i * 0.7}s` }}>
              {/* pesawat kertas menghadap ke kanan (arah gerak) */}
              <path d="M10 0L-8 -6L-4.5 0L-8 6Z" fill="currentColor" />
              <path d="M10 0L-4.5 0L-2.5 4.8Z" fill="currentColor" opacity=".55" />
            </g>
          </g>
        </g>
      ))}
    </svg>
  )
}

export default function PageFX({ variant = 'right', planes = true }) {
  // hormati pengaturan "kurangi gerakan": pesawat tidak ditampilkan
  const [still, setStill] = useState(false)
  const [size, setSize] = useState({ w: 1600, h: 900 })

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setStill(m.matches)
    on()
    m.addEventListener?.('change', on)
    return () => m.removeEventListener?.('change', on)
  }, [])

  // ukuran kanvas pesawat mengikuti ukuran layar (tanpa distorsi)
  useEffect(() => {
    let t = 0
    const read = () => setSize({ w: Math.max(window.innerWidth, 320), h: Math.max(window.innerHeight, 320) })
    const onResize = () => { window.clearTimeout(t); t = window.setTimeout(read, 250) }
    read()
    window.addEventListener('resize', onResize)
    return () => { window.clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <div className={`fx-deco fx-${variant}`} aria-hidden="true">
      <span className="fx-arc" />
      <span className="fx-arc fx-arc2" />
      <span className="fx-orb" />
      <span className="fx-star"><Icon name="sparkle" size={30} /></span>
      {planes && !still && <Planes w={size.w} h={size.h} />}
    </div>
  )
}