import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'
import PageFX from '../components/PageFX'
import SectionHeading from '../components/SectionHeading'
import { usePrefs } from '../context/Preferences'
import '../styles/contact.css'

const EMAIL = 'irpanafrizal2020@gmail.com'
const PHONE = '+62 812 3456 7890'
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Pekanbaru%2C%20Riau%2C%20Indonesia'
const SOCIALS = [
  { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/irpan-afrizal-putra-eriani-890aa143b/' },
  { name: 'GitHub', icon: 'github', href: 'https://github.com/IrpanAfrizal' },
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/irpan_afrizal13/' },
]

export default function Contact() {
  const { t } = usePrefs()
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = async e => {
    e.preventDefault()
    if (sending || sent) return
    setSending(true)
    await new Promise(r => setTimeout(r, 700))
    setSending(false)
    setSent(true) // pesawat terbang + centang
    await new Promise(r => setTimeout(r, 1700))
    const body = `${f.message}\n\n— ${f.name} (${f.email})`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}&body=${encodeURIComponent(body)}`
    setTimeout(() => setSent(false), 500)
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard tidak tersedia */ }
  }

  const items = [
    { key: 'email', icon: 'mail', label: t('contact.email'), value: EMAIL, href: `mailto:${EMAIL}` },
    { key: 'phone', icon: 'whatsapp', label: t('contact.phone'), value: PHONE, href: `https://wa.me/${PHONE.replace(/\D/g, '')}`, external: true, ltr: true },
    { key: 'loc', icon: 'pin', label: t('contact.location'), value: t('contact.locationV'), href: MAPS, external: true },
  ]

  return (
    <div className="wrap section ct fx">
      <PageFX />

      <SectionHeading index="07 / 07" title={t('contact.title')} sub={t('contact.sub')} as="h1" />

      <div className="ct-grid">
        <div className="ct-info">
          <p className="ct-status ct-reveal" style={{ '--i': 0 }}><span className="ct-dot" />{t('hero.open')}</p>

          <h3 className="ct-h ct-reveal" style={{ '--i': 1 }}>{t('contact.touch')}</h3>
          <ul className="ct-list">
            {items.map((it, i) => (
              <li key={it.key} className="ct-item ct-reveal" style={{ '--i': i + 2 }}>
                <a className="ct-link" href={it.href} {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="ct-ico"><Icon name={it.icon} size={20} /></span>
                  <span className="ct-text">
                    <b>{it.label}</b>
                    <span className="muted" dir={it.ltr ? 'ltr' : undefined}>{it.value}</span>
                  </span>
                  {it.key !== 'email' && <Icon name="arrowUpRight" size={16} className="ct-go" />}
                </a>
                {it.key === 'email' && (
                  <button type="button" className="ct-copy" data-done={copied || undefined} onClick={copy} title={EMAIL} aria-label={`${it.label}: ${EMAIL}`}>
                    <Icon name={copied ? 'check' : 'copy'} size={15} key={copied ? 'ok' : 'cp'} />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <h3 className="ct-h ct-reveal" style={{ '--i': 5 }}>{t('contact.follow')}</h3>
          <div className="ct-socials ct-reveal" style={{ '--i': 6 }}>
            {SOCIALS.map(s => (
              <a key={s.name} className="ct-soc" href={s.href} target="_blank" rel="noopener noreferrer">
                <Icon name={s.icon} size={16} />{s.name}
              </a>
            ))}
          </div>

          <div className="ct-reveal" style={{ '--i': 7 }}>
            <Button href="/documents/irpan-cv.pdf" download className="ct-cv"><Icon name="download" size={14} />{t('contact.cv')}</Button>
          </div>
        </div>

        <form className="ct-card ct-reveal" style={{ '--i': 3 }} onSubmit={submit} data-sent={sent || undefined}>
          <div className="ct-card-head">
            <span className="ct-ico ct-ico-sm"><Icon name="send" size={16} /></span>
            <h3>{t('contact.send')}</h3>
          </div>

          <label className="ct-field">
            <span className="ct-label">{t('contact.name')}</span>
            <span className="ct-control">
              <Icon name="user" size={16} />
              <input required value={f.name} onChange={set('name')} placeholder={t('contact.namePh')} autoComplete="name" />
            </span>
          </label>
          <label className="ct-field">
            <span className="ct-label">{t('contact.mail')}</span>
            <span className="ct-control">
              <Icon name="mail" size={16} />
              <input required type="email" dir="ltr" value={f.email} onChange={set('email')} placeholder={t('contact.mailPh')} autoComplete="email" />
            </span>
          </label>
          <label className="ct-field">
            <span className="ct-label">{t('contact.msg')}</span>
            <span className="ct-control ct-control--area">
              <Icon name="chat" size={16} />
              <textarea required rows={5} value={f.message} onChange={set('message')} placeholder={t('contact.msgPh')} />
            </span>
          </label>

          <Button type="submit" loading={sending} className="ct-submit"><Icon name={sent ? 'check' : 'send'} size={15} />{t('contact.submit')}</Button>

          {sent && (
            <>
              <span className="ct-fly" aria-hidden="true"><Icon name="send" size={26} /></span>
              <span className="ct-done" aria-hidden="true"><Icon name="check" size={30} /></span>
            </>
          )}
        </form>
      </div>
    </div>
  )
}