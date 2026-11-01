import { useState } from 'react'
import Button from '../components/Button'
import NotchedProjectCard from '../components/NotchedProjectCard'
import SectionHeading from '../components/SectionHeading'
import { projects, categories } from '../data/projects'
import { usePrefs } from '../context/Preferences'
export default function Projects() {
  const { t } = usePrefs()
  const [cat, setCat] = useState('all')
  const list = cat === 'all' ? projects : projects.filter(p => p.category === cat)
  return (
    <div className="wrap section">
      <SectionHeading index="04 / 07" title={t('projects.title')} sub={t('projects.sub')} as="h1" />
      <div className="filters" role="group" aria-label={t('projects.filter')}>
        {categories.map(c => <Button plain key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{t('projects.filters.' + c)}</Button>)}
      </div>
      <div className="grid g3 npc-grid" key={cat}>
        {list.map((p, i) => (
          <NotchedProjectCard key={p.slug} i={i} to={`/projects/${p.slug}`} title={p.title} image={p.image}
            badge={p.status ? t('projects.status.' + p.status) : p.year}
            description={t(`projects.items.${p.id}.summary`)} tags={p.stack.slice(0, 3)} />
        ))}
      </div>
    </div>
  )
}
