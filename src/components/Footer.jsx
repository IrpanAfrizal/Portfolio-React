import { usePrefs } from '../context/Preferences'
export default function Footer() {
  const { t } = usePrefs()
  return (
    <footer className="wrap footer">
      <span>© {new Date().getFullYear()} Irpan Afrizal Putra Eriani. {t('footer.rights')}</span>
      <a href="#top">{t('footer.top')} ↑</a>
    </footer>
  )
}
