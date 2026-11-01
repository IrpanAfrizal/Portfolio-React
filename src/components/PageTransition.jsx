import { useLocation } from 'react-router-dom'
export default function PageTransition({ children }) {
  const { pathname } = useLocation()
  return <main key={pathname} className="page">{children}</main>
}
