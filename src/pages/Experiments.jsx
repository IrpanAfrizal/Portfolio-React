import Icon from '../components/Icon'
import PageFX from '../components/PageFX'
import { EXPERIMENTS, TEXT } from '../data/experiments'
import { usePrefs } from '../context/Preferences'
import '../styles/experiments.css'

export default function Experiments() {
  const { lang } = usePrefs()
  const L = TEXT[lang] || TEXT.en
  return (
    <div className="wrap ex fx">
      <PageFX />
      <header className="ex-head">
        <p className="ex-index">06 / 07</p>
        <h1>{L.title}</h1>
        <p className="ex-sub">{L.sub}</p>
      </header>

      <div className="ex-grid">
        {EXPERIMENTS.map((x, i) => (
          <article className="ex-item" key={x.id} style={{ '--i': i }}>
            <span className="ex-ico" aria-hidden="true"><Icon name={x.icon} /></span>
            <div className="ex-main">
              <div className="ex-top">
                <span className="ex-num">{String(i + 1).padStart(2, '0')}.</span>
                <span className="ex-tag">{L.tags[x.tag]}</span>
              </div>
              <h2>{L.items[x.id].title}</h2>
              <p>{L.items[x.id].text}</p>
              <ul className="ex-chips">{x.topics.map(c => <li className="chip" key={c}>{c}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>

      <div className="ex-end">
        <Icon name="sparkle" size={34} />
        <p>{L.quote}</p>
      </div>
    </div>
  )
}