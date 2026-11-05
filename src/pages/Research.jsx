import Button from '../components/Button'
import Icon from '../components/Icon'
import PageFX from '../components/PageFX'
import SectionHeading from '../components/SectionHeading'
import { research } from '../data/experience'
import { usePrefs } from '../context/Preferences'
export default function Research() {
  const { t } = usePrefs()
  const external = research.link !== '#' ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <div className="wrap section fx">
      <PageFX />
      <SectionHeading index="05 / 07" title={t('research.title')} sub={t('research.sub')} as="h1" />
      <article className="card paper">
        <div className="paper-img">
          <img src={research.image} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
        </div>
        <div className="paper-body">
          <span className="chip">{t('research.journal')}</span>
          <h3>{research.title}</h3>
          <p className="muted">{research.authors}</p>
          <Button href={research.link} {...external}>{t('research.view')}<Icon name="external" size={13} /></Button>
        </div>
      </article>
      <h4 className="kt">{t('research.keyTech')}</h4>
      <div className="chips">{research.tech.map(x => <span className="chip pill" key={x}>{x}</span>)}</div>
      <div className="stats">
        {t('research.stats').map((s, i) => (
          <div key={i}><Icon name={research.icons[i]} /><b>{s.title}</b><span className="muted">{s.sub}</span></div>
        ))}
      </div>
    </div>
  )
}