import Spinner from './Spinner'
import useOnline from '../hooks/useOnline'
import { usePrefs } from '../context/Preferences'
export default function PageLoader() {
  const online = useOnline()
  const { t } = usePrefs()
  return (
    <div className="pl" role="status" aria-live="polite">
      <Spinner size={22} />
      <span className="muted">{online ? t('loader.page') : t('loader.offline')}</span>
    </div>
  )
}
