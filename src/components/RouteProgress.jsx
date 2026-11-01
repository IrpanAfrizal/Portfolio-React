import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
export default function RouteProgress() {
  const { pathname } = useLocation()
  const [run, setRun] = useState(false)
  useEffect(() => {
    setRun(true)
    const t = setTimeout(() => setRun(false), 700)
    return () => clearTimeout(t)
  }, [pathname])
  return <div className={'rp' + (run ? ' run' : '')} aria-hidden="true" />
}
