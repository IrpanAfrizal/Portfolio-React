import { Link } from 'react-router-dom'
import Icon from './Icon'

// Kartu proyek dengan "takik" di sudut cover berisi tombol panah.
// Takik dilukis dengan warna latar halaman (--bg), jadi kartu harus berada langsung di atas latar halaman.
export default function NotchedProjectCard({ to, title, description, image, badge, tags = [], i = 0 }) {
  return (
    <Link to={to} className="npc" style={{ '--i': i }}>
      <div className="npc-media">
        <div className="npc-cover">
          <img src={image} alt={title} loading="lazy" onError={e => (e.currentTarget.style.display = 'none')} />
          {badge && <span className="npc-badge">{badge}</span>}
        </div>
        <span className="npc-cut" aria-hidden="true" />
        <span className="npc-fillet a" aria-hidden="true" />
        <span className="npc-fillet b" aria-hidden="true" />
        <span className="npc-disc" aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
      </div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {tags.length > 0 && <ul className="npc-tags">{tags.map(t => <li key={t}>{t}</li>)}</ul>}
    </Link>
  )
}
