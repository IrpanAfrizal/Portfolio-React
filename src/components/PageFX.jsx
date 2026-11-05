import Icon from './Icon'
import '../styles/pagefx.css'

/**
 * Latar animasi halaman: lingkaran tipis yang "bernapas", bintang melayang, dan cahaya lembut.
 * Pakai: beri class "fx" pada pembungkus halaman, lalu taruh <PageFX /> sebagai anak pertamanya.
 * variant: 'right' (default) | 'left' (cermin) | 'hero' (lebih besar, untuk bagian atas Home)
 */
export default function PageFX({ variant = 'right' }) {
  return (
    <div className={`fx-deco fx-${variant}`} aria-hidden="true">
      <span className="fx-arc" />
      <span className="fx-arc fx-arc2" />
      <span className="fx-orb" />
      <span className="fx-star"><Icon name="sparkle" size={30} /></span>
    </div>
  )
}