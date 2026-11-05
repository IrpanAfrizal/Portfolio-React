import { useRef, useState } from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'
import PageFX from '../components/PageFX'
import { skillGroups } from '../data/skills'
import { usePrefs } from '../context/Preferences'
import '../styles/skills.css'

export default function Expertise() {
  const { t, dir } = usePrefs()
  const [active, setActive] = useState('all')
  const gridRef = useRef(null)
  const total = String(skillGroups.length).padStart(2, '0')
  const tx = (id, key) => t(`skillsPage.groups.${id}.${key}`)

  const shown = active === 'all' ? skillGroups : skillGroups.filter(g => g.id === active)

  // "Explore Details": tampilkan semua kartu lalu turun ke daftar kartu
  const explore = () => {
    setActive('all')
    requestAnimationFrame(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className="wrap sk fx">
      <PageFX />
      <section className="sk-hero">
        <div className="sk-intro">
          <p className="sk-index">03 / 07 <span aria-hidden="true" /></p>
          <h1>{t('skillsPage.title')}</h1>
          <p className="muted">{t('skillsPage.sub')}</p>
        </div>

        <div className="sk-spot">
          <span className="sk-num" aria-hidden="true">01</span>
          <div className="sk-spot-body">
            <h2>{t('skillsPage.spotTitle')}</h2>
            <p className="muted">{t('skillsPage.spotDesc')}</p>
            <div className="chips">{t('skillsPage.spotTags').map(x => <span className="chip" key={x}>{x}</span>)}</div>
            <Button plain className="sk-link" onClick={explore}>{t('skillsPage.explore')} <span aria-hidden="true">{dir === 'rtl' ? '←' : '→'}</span></Button>
          </div>
          <div className="sk-art" aria-hidden="true">
            <div className="clip"><i className="a1" /><i className="a2" /><i className="a3" /></div>
            <Icon name="code" size={36} className="a-icon" />
            <Icon name="sparkle" size={26} className="a-star" />
          </div>
        </div>
      </section>

      <div className="sk-pills" role="group" aria-label={t('skillsPage.filterLabel')}>
        <Button plain className="sk-pill all" aria-pressed={active === 'all'} onClick={() => setActive('all')}>
          <Icon name="grid" size={16} />{t('skillsPage.all')}
        </Button>
        {skillGroups.map(g => (
          <Button plain key={g.id} className="sk-pill" aria-pressed={active === g.id} onClick={() => setActive(g.id)}>
            <Icon name={g.icon} size={16} />{tx(g.id, 'short')}
          </Button>
        ))}
        <span className="sk-line" aria-hidden="true" />
      </div>

      <div className={'sk-grid' + (active !== 'all' ? ' single' : '')} ref={gridRef} key={active}>
        {shown.map((g, i) => {
          const idx = skillGroups.findIndex(x => x.id === g.id)
          const big = active !== 'all' || idx < 2
          return (
            <article key={g.id} className={'sk-card ' + (big ? 'lg' : 'sm')} style={{ '--i': i }}>
              <header>
                <span className="sk-ico"><Icon name={g.icon} size={big ? 28 : 22} /></span>
                <div>
                  <h3>{tx(g.id, 'name')}</h3>
                  <p className="muted">{tx(g.id, 'tagline')}</p>
                </div>
                <span className="sk-count">{String(idx + 1).padStart(2, '0')} / {total}</span>
              </header>
              <div className="sk-body">
                <div>
                  <h4>{t('skillsPage.technologies')}</h4>
                  <div className="chips">{g.tech.map(x => <span className="chip" key={x}>{x}</span>)}</div>
                </div>
                <div>
                  <h4>{t('skillsPage.capabilities')}</h4>
                  <ul className="checks">{t(`skillsPage.groups.${g.id}.caps`).map(c => <li key={c}>{c}</li>)}</ul>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="sk-banner">
        <Icon name="sparkle" size={22} />
        <p>{t('skillsPage.quote')}</p>
        <span className="sk-line" aria-hidden="true" />
        <Button to="/projects">{t('skillsPage.cta')}<Icon name="arrowUpRight" size={14} /></Button>
      </div>
    </div>
  )
}