import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { projects } from '../data/projects'
import { usePrefs } from '../context/Preferences'
const SHADES = ['var(--brand)', 'color-mix(in srgb,var(--brand) 70%,var(--surface))', 'color-mix(in srgb,var(--brand) 45%,var(--surface))', 'color-mix(in srgb,var(--brand) 25%,var(--surface))']
export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, dir } = usePrefs()
  const p = projects.find(x => x.slug === slug)
  if (!p) return (
    <div className="wrap section"><h1>{t('projects.notFound')}</h1><Button to="/projects" style={{ marginTop: 20 }}>{t('projects.back')}</Button></div>
  )
  const base = 'projects.items.' + p.id
  const when = p.status ? t('projects.status.' + p.status) : p.year
  return (
    <div className="wrap section" style={{ maxWidth: 820 }}>
      <Link to="/projects" className="muted">{dir === 'rtl' ? '→' : '←'} {t('projects.all')}</Link>
      <h1 style={{ margin: '16px 0 8px' }}>{p.title}</h1>
      <p className="muted">{t('projects.types.' + p.category)}{when ? ` · ${when}` : ''}</p>
      <div className="portrait" style={{ aspectRatio: '16/9', borderRadius: 'var(--r-md)', margin: '24px 0' }}>
        <img src={p.image} alt={p.title} onError={e => (e.currentTarget.style.display = 'none')} />
      </div>
      <p>{t(base + '.summary')}</p>
      {t(base + '.sections').map(s => (
        <section key={s.title}>
          <h3 style={{ margin: '28px 0 10px' }}>{s.title}</h3>
          <ul className="checks">{s.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
        </section>
      ))}
      <h3 style={{ margin: '28px 0 10px' }}>{t('projects.builtWith')}</h3>
      <div className="chips">{p.stack.map(s => <span className="chip" key={s}>{s}</span>)}</div>
      {p.langs && (
        <>
          <h3 style={{ margin: '28px 0 12px' }}>{t('projects.languages')}</h3>
          <div className="langbar" role="img" aria-label={p.langs.map(([n, v]) => `${n} ${v}%`).join(', ')}>
            {p.langs.map(([n, v], i) => <span key={n} style={{ flex: v, background: SHADES[i % SHADES.length] }} />)}
          </div>
          <ul className="langlegend" dir="ltr">
            {p.langs.map(([n, v], i) => <li key={n}><i style={{ background: SHADES[i % SHADES.length] }} />{n} <span className="muted">{v}%</span></li>)}
          </ul>
        </>
      )}
      {p.github && (
        <Button href={p.github} target="_blank" rel="noopener noreferrer" style={{ marginTop: 32 }}>{t('projects.github')}<Icon name="external" size={13} /></Button>
      )}
    </div>
  )
}
