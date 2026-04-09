import { Outlet, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'

export default function RootLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0.92, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
