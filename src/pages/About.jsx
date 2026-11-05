import PageFX from '../components/PageFX'
import SectionHeading from '../components/SectionHeading'
import { usePrefs } from '../context/Preferences'
export default function About() {
  const { t } = usePrefs()
  return (
    <div className="wrap fx">
      <PageFX variant="left" />
      <section className="section split">
        <div>
          <SectionHeading index="02 / 07" title={t('about.title')} sub={t('about.sub')} as="h1" />
          <p>{t('about.p1')}</p>
          <p style={{ marginTop: 14 }}>{t('about.p2')}</p>
          <div className="facts">
            <div><b>{t('about.education')}</b><span className="muted">{t('about.educationV')}</span></div>
            <div><b>{t('about.experience')}</b><span className="muted">{t('about.experienceV')}</span></div>
            <div><b>{t('about.goal')}</b><span className="muted">{t('about.goalV')}</span></div>
          </div>
        </div>
        <div className="portrait" style={{ borderRadius: 'var(--r-md)' }}>
          <img src="/images/about.jpg" alt="" onError={e => (e.currentTarget.style.display = 'none')} />
          <q>{t('about.quote')}</q>
        </div>
      </section>
    </div>
  )
}