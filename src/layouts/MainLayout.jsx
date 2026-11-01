import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import RouteProgress from '../components/RouteProgress'
import PageLoader from '../components/PageLoader'
export default function MainLayout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div id="top">
      <RouteProgress />
      <Navbar />
      <PageTransition>
        <Suspense fallback={<PageLoader />}><Outlet /></Suspense>
      </PageTransition>
      <Footer />
    </div>
  )
}
