import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useI18n } from '../../i18n'
import { useTheme } from '../../theme'

const navLinks = [
  { path: '/', zh: '众响之源', en: 'Home' },
  { path: '/concept', zh: '主题释义', en: 'Concept' },
  { path: '/guests', zh: '评审嘉宾', en: 'Guests' },
  { path: '/submissions', zh: '投递通道', en: 'Submit' },
  { path: '/cinema', zh: '云端影院', en: 'Cinema' },
  { path: '/news', zh: '影节动态', en: 'News' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { locale, toggleLocale } = useI18n()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-copper-500/10 bg-festival-deep/65 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/logo.png"
            alt={locale === 'zh' ? '合心众响' : 'Resonance'}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-copper-500/20"
          />
          <div className="flex items-baseline gap-3">
            <span className="bg-gradient-to-r from-copper-400 to-glow bg-clip-text font-serif text-xl font-bold text-transparent">
              {locale === 'zh' ? '合心众响' : 'RESONANCE'}
            </span>
            <span className="hidden text-xs tracking-wider text-text-secondary sm:inline">
              {locale === 'zh' ? 'RESONANCE' : 'CAMPUS FILM FESTIVAL'}
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-lg px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive ? 'text-copper-400' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {locale === 'zh' ? link.zh : link.en}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-copper-400 to-glow"
                    initial={{ opacity: 0, scaleX: 0.85 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.85 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    style={{ transformOrigin: 'center' }}
                  />
                )}
              </Link>
            )
          })}

          <button
            onClick={toggleLocale}
            className="ml-3 rounded-full border border-copper-500/20 bg-festival-navy/60 px-3 py-1 text-xs font-medium text-copper-400 transition-colors hover:bg-copper-500/10"
            aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            {locale === 'zh' ? 'EN' : '中'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative ml-2 flex h-7 w-[52px] items-center rounded-full border border-copper-500/20 bg-festival-navy/60 p-0.5 transition-colors hover:bg-copper-500/10"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Sun size={12} className={`ml-1 transition-opacity ${theme === 'light' ? 'text-glow opacity-100' : 'text-text-muted opacity-40'}`} />
            <Moon size={12} className={`ml-auto mr-1 transition-opacity ${theme === 'dark' ? 'text-copper-400 opacity-100' : 'text-text-muted opacity-40'}`} />
            <motion.div
              className="absolute top-0.5 h-[22px] w-[22px] rounded-full bg-copper-500/80 shadow-sm"
              animate={{ left: theme === 'light' ? 2 : 26 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLocale}
            className="rounded-full border border-copper-500/20 bg-festival-navy/60 px-3 py-1 text-xs font-medium text-copper-400 transition-colors hover:bg-copper-500/10"
            aria-label={locale === 'zh' ? 'Switch language' : '切换语言'}
          >
            {locale === 'zh' ? 'EN' : '中'}
          </button>
          <button
            onClick={toggleTheme}
            className="relative flex h-7 w-[52px] items-center rounded-full border border-copper-500/20 bg-festival-navy/60 p-0.5 transition-colors hover:bg-copper-500/10"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Sun size={12} className={`ml-1 transition-opacity ${theme === 'light' ? 'text-glow opacity-100' : 'text-text-muted opacity-40'}`} />
            <Moon size={12} className={`ml-auto mr-1 transition-opacity ${theme === 'dark' ? 'text-copper-400 opacity-100' : 'text-text-muted opacity-40'}`} />
            <motion.div
              className="absolute top-0.5 h-[22px] w-[22px] rounded-full bg-copper-500/80 shadow-sm"
              animate={{ left: theme === 'light' ? 2 : 26 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-text-secondary transition-colors hover:text-copper-400"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-copper-500/10 bg-festival-deep/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-copper-500/10 text-copper-400'
                        : 'text-text-secondary hover:bg-festival-navy/50 hover:text-text-primary'
                    }`}
                  >
                    <span>{locale === 'zh' ? link.zh : link.en}</span>
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
