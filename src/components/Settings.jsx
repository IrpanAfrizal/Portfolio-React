import { usePrefs } from '../context/Preferences'
import Icon from './Icon'
import LanguageSwitcher from './LanguageSwitcher'
export default function Settings() {
  const { theme, toggleTheme, t } = usePrefs()
  return (
    <div className="prefs">
      <LanguageSwitcher />
      <button type="button" className="pref-theme" aria-label={t('settings.theme')} aria-pressed={theme === 'dark'}
        onClick={e => { const r = e.currentTarget.getBoundingClientRect(); toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 }) }}>
        <Icon name="sun" size={16} className="ic sun" /><Icon name="moon" size={16} className="ic moon" />
      </button>
    </div>
  )
}