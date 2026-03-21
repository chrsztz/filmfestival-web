import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { path: '/', label: '众响之源', labelEn: 'Home' },
  { path: '/concept', label: '主题释义', labelEn: 'Concept' },
  { path: '/guests', label: '评审嘉宾', labelEn: 'Guests' },
  { path: '/submissions', label: '投递通道', labelEn: 'Submit' },
  { path: '/news', label: '影节动态', labelEn: 'News' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-festival-deep/65 backdrop-blur-xl border-b border-copper-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-serif text-xl font-bold bg-gradient-to-r from-copper-400 to-glow bg-clip-text text-transparent">
            合心众响
          </span>
          <span className="text-xs text-text-secondary hidden sm:inline tracking-wider">
            RESONANCE
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm transition-colors duration-300 rounded-lg ${
                  isActive
                    ? 'text-copper-400'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-copper-400 to-glow rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary hover:text-copper-400 transition-colors p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-festival-deep/95 backdrop-blur-xl border-b border-copper-500/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'text-copper-400 bg-copper-500/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-festival-navy/50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="ml-2 text-xs text-text-muted">{link.labelEn}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
