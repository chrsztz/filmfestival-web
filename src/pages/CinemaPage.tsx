import { motion } from 'framer-motion'
import { Film, Clock } from 'lucide-react'
import WaveAnimation from '../components/effects/WaveAnimation'
import { useI18n } from '../i18n'

export default function CinemaPage() {
  const { locale } = useI18n()

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
        </div>
      </section>

      <WaveAnimation />

      <section className="px-6 py-32">
        <motion.div
          className="mx-auto max-w-md text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-copper-500/20 bg-festival-navy/60">
            <Film size={36} className="text-copper-400/60" />
          </div>
          <h2 className="mb-3 font-serif text-2xl font-bold text-text-primary">
            {locale === 'zh' ? '即将开放' : 'Coming Soon'}
          </h2>
          <p className="mb-4 text-text-secondary">
            {locale === 'zh'
              ? '云端影院将在颁奖典礼后上线，届时你可以在线观看全部参赛作品。'
              : 'The online cinema will open after the award ceremony, where selected festival works will be available to watch.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <Clock size={16} />
            <span>
              {locale === 'zh' ? '预计上线：2026年4月15日后' : 'Expected launch: after April 15, 2026'}
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
