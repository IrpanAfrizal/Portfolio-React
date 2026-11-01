import { useState } from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import { usePrefs } from '../context/Preferences'
const EMAIL = 'irpanafrizal2020@gmail.com'
export default function Contact() {
  const { t } = usePrefs()
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = async e => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 700))
    const body = `${f.message}\n\n— ${f.name} (${f.email})`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t('contact.subject'))}&body=${encodeURIComponent(body)}`
    setSending(false)
  }
  return (
    <div className="wrap section">
      <SectionHeading index="07 / 07" title={t('contact.title')} sub={t('contact.sub')} as="h1" />
      <div className="split">
        <div>
          <h3 style={{ font: '500 14px var(--sans)', marginBottom: 16 }}>{t('contact.touch')}</h3>
          <ul className="info">
            <li><b>{t('contact.email')}</b><a className="muted" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><b>{t('contact.phone')}</b><span className="muted" dir="ltr">+62 812 3456 7890</span></li>
            <li><b>{t('contact.location')}</b><span className="muted">{t('contact.locationV')}</span></li>
          </ul>
          <h3 style={{ font: '500 14px var(--sans)', marginBottom: 10 }}>{t('contact.follow')}</h3>
          <div className="chips">
            <a className="chip" href="https://www.linkedin.com/in/irpan-afrizal-putra-eriani-890aa143b/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="chip" href="https://github.com/IrpanAfrizal" target="_blank" rel="noopener noreferrer">GitHub</a><a className="chip" href="https://www.instagram.com/irpan_afrizal13/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <Button href="/documents/irpan-cv.pdf" download style={{ marginTop: 28 }}><Icon name="download" size={14} />{t('contact.cv')}</Button>
        </div>
        <form className="card" onSubmit={submit}>
          <h3 style={{ font: '500 14px var(--sans)', marginBottom: 16 }}>{t('contact.send')}</h3>
          <label className="field">{t('contact.name')}<input required value={f.name} onChange={set('name')} placeholder={t('contact.namePh')} /></label>
          <label className="field">{t('contact.mail')}<input required type="email" dir="ltr" value={f.email} onChange={set('email')} placeholder={t('contact.mailPh')} /></label>
          <label className="field">{t('contact.msg')}<textarea required value={f.message} onChange={set('message')} placeholder={t('contact.msgPh')} /></label>
          <Button type="submit" loading={sending} style={{ width: '100%', justifyContent: 'center' }}>{t('contact.submit')}</Button>
        </form>
      </div>
    </div>
  )
}
