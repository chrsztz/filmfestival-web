import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Film as FilmIcon, Play, Clock, X, User } from 'lucide-react'
import WaveAnimation from '../components/effects/WaveAnimation'
import FilmPlayer from '../components/ui/FilmPlayer'
import { useI18n } from '../i18n'
import filmsData from '../data/films.json'
import type { Film } from '../types'

const films: Film[] = (filmsData as Film[]).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

const formatRuntime = (seconds: number, locale: 'zh' | 'en') => {
  const total = Math.floor(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  if (locale === 'zh') {
    return s === 0 ? `${m} 分` : `${m} 分 ${String(s).padStart(2, '0')} 秒`
  }
  return s === 0 ? `${m} min` : `${m} min ${String(s).padStart(2, '0')} s`
}

export default function CinemaPage() {
  const { locale } = useI18n()
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeFilm = useMemo(
    () => films.find((film) => film.id === activeId) ?? null,
    [activeId],
  )

  // Lock body scroll when modal open + close on Esc
  useEffect(() => {
    if (!activeFilm) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [activeFilm])

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-festival-dark to-festival-deep" />
        <WaveAnimation variant="background" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            className="text-xs uppercase tracking-[0.4em] text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {locale === 'zh' ? 'ONLINE CINEMA' : '云端影院'}
          </motion.span>
          <motion.h1
            className="mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {locale === 'zh' ? '云端影院' : 'Online Cinema'}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {locale === 'zh'
              ? '收录本届"合心众响"全部参赛作品，点击海报即可在线观看。'
              : 'A complete archive of every Resonance festival entry. Tap any poster to watch.'}
          </motion.p>
          <motion.div
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-copper-500/20 bg-festival-navy/60 px-4 py-1.5 text-xs text-copper-300 backdrop-blur-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <FilmIcon size={14} />
            <span>
              {locale === 'zh' ? `共 ${films.length} 部作品` : `${films.length} films in selection`}
            </span>
          </motion.div>
        </div>
      </section>

      <WaveAnimation />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {films.map((film, index) => {
              const title = locale === 'zh' ? film.title : film.titleEn || film.title
              const director = locale === 'zh' ? film.director : film.directorEn || film.director
              const school =
                locale === 'zh' ? film.school : film.schoolEn || film.school

              return (
                <motion.button
                  key={film.id}
                  type="button"
                  onClick={() => setActiveId(film.id)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
                  className="group relative overflow-hidden rounded-xl border border-copper-500/20 bg-festival-navy/60 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-copper-400/60 hover:shadow-[0_25px_60px_-20px_rgba(212,132,90,0.35)]"
                >
                  {/* Poster */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-festival-slate via-festival-navy to-festival-dark">
                    {film.poster ? (
                      <img
                        src={film.poster}
                        alt={title}
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-copper-400/50">
                        <FilmIcon size={48} strokeWidth={1.2} />
                        <span className="px-4 text-center font-serif text-sm text-text-muted">
                          {title}
                        </span>
                      </div>
                    )}

                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-festival-deep/0 opacity-0 transition-all duration-300 group-hover:bg-festival-deep/55 group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-copper-300/60 bg-festival-deep/40 shadow-[0_0_30px_rgba(212,132,90,0.45)] backdrop-blur-sm">
                        <Play size={24} className="ml-1 text-copper-200" fill="currentColor" />
                      </div>
                    </div>

                    {/* Runtime badge */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-copper-500/30 bg-festival-deep/70 px-2.5 py-1 font-mono text-[10px] text-copper-200 backdrop-blur">
                      <Clock size={10} />
                      {formatRuntime(film.durationSeconds, locale)}
                    </div>

                    {/* Order number */}
                    <div className="absolute left-3 top-3 font-serif text-2xl text-copper-300/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {String(film.order ?? index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="space-y-2 px-4 py-4">
                    <h3 className="line-clamp-2 font-serif text-base font-semibold text-text-primary transition-colors group-hover:text-copper-300">
                      {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <User size={12} className="text-copper-400/70" />
                      <span className="truncate">{director}</span>
                    </div>
                    {school && (
                      <div className="text-[11px] text-text-muted">{school}</div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal player */}
      <AnimatePresence>
        {activeFilm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-festival-deep/85 px-4 py-8 backdrop-blur-md"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-copper-500/30 bg-festival-navy/80 text-copper-300 transition-colors hover:bg-copper-500/20 hover:text-copper-200"
                aria-label={locale === 'zh' ? '关闭' : 'Close'}
              >
                <X size={18} />
              </button>

              <FilmPlayer
                key={activeFilm.id}
                src={activeFilm.videoUrl}
                poster={activeFilm.poster}
                title={locale === 'zh' ? activeFilm.title : activeFilm.titleEn || activeFilm.title}
                autoPlay
              />

              <div className="mt-5 flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-serif text-xl text-text-primary sm:text-2xl">
                    {locale === 'zh' ? activeFilm.title : activeFilm.titleEn || activeFilm.title}
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    {locale === 'zh' ? '导演 / 创作者：' : 'Director / Creator: '}
                    <span className="text-copper-300">
                      {locale === 'zh'
                        ? activeFilm.director
                        : activeFilm.directorEn || activeFilm.director}
                    </span>
                    {(activeFilm.school || activeFilm.schoolEn) && (
                      <>
                        <span className="mx-2 text-text-muted">·</span>
                        <span className="text-text-muted">
                          {locale === 'zh'
                            ? activeFilm.school
                            : activeFilm.schoolEn || activeFilm.school}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 self-start rounded-full border border-copper-500/30 bg-festival-navy/70 px-3 py-1 font-mono text-xs text-copper-200 sm:self-auto">
                  <Clock size={12} />
                  {formatRuntime(activeFilm.durationSeconds, locale)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
