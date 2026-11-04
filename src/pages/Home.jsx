import Button from '../components/Button'
import GlassFolder from '../components/GlassFolder'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'
import { usePrefs } from '../context/Preferences'

export default function Home() {
  const { t, theme } = usePrefs()
  const featured = projects.filter(p => p.featured)
  const folderFiles = p => [
    { name: t('home.folder.details'), meta: p.year || t('projects.types.' + p.category), to: `/projects/${p.slug}` },
    ...(p.github ? [{ name: 'GitHub', meta: t('home.folder.source'), href: p.github }] : []),
    ...(p.gitlab ? [{ name: 'GitLab', meta: t('home.folder.source'), href: p.gitlab }] : []),
    { name: p.stack.slice(0, 3).join(' · '), meta: t('home.folder.stack') },
  ]
  const folderMeta = p => {
    const type = t('projects.types.' + p.category)
    const when = p.status ? t('projects.status.' + p.status) : p.year
    return when ? `${type} · ${when}` : type
  }
  return (
    <>
      <section className="wrap hero">
        <div>
          <p className="tag">{t('hero.role')}</p>
          <h1>Irpan Afrizal<br />Putra Eriani</h1>
          <p>{t('hero.intro')}</p>
          <div className="cta">
            <Button to="/projects">{t('hero.explore')}</Button>
            <Button to="/about" variant="ghost">{t('hero.about')}</Button>
            <Button href="/documents/irpan-cv.pdf" download variant="ghost"><Icon name="download" size={14} />{t('hero.cv')}</Button>
          </div>
          <p className="open muted">{t('hero.open')}</p>
        </div>
        <div className="portrait">
          <img src="/images/profile.JPG" alt="Irpan Afrizal Putra Eriani" onError={e => (e.currentTarget.style.display = 'none')} />
          <q>{t('hero.quote')}</q>
        </div>
      </section>
      <section className="wrap section">
        <SectionHeading index="01 / 07" title={t('home.title')} sub={t('home.sub')} as="h3" />
        <div className="folders">
          {featured.map((p, i) => (
            <GlassFolder key={p.slug} label={p.title} meta={folderMeta(p)} tone={theme === 'dark' ? 'dark' : 'light'}
              icon={p.icon} image={p.image} width={300} appearDelay={i * 140} files={folderFiles(p)} labels={{ open: t('home.folder.open'), close: t('home.folder.close'), contents: t('home.folder.contents') }} />
          ))}
        </div>
      </section>
    </>
  )
}