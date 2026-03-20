import { motion } from 'framer-motion'
import { Film, Clock } from 'lucide-react'
import WaveAnimation from '../components/effects/WaveAnimation'

export default function CinemaPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-festival-dark to-festival-deep" />
        <WaveAnimation variant="background" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            className="text-xs tracking-[0.4em] uppercase text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ONLINE CINEMA
          </motion.span>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl font-bold mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            云端影院
          </motion.h1>
        </div>
      </section>

      <WaveAnimation />

      {/* Coming Soon */}
      <section className="py-32 px-6">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-festival-navy/60 border border-copper-500/20 flex items-center justify-center mx-auto mb-6">
            <Film size={36} className="text-copper-400/60" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-text-primary mb-3">
            即将开放
          </h2>
          <p className="text-text-secondary mb-4">
            云端影院将在颁奖典礼后上线，届时您可以在线观看所有参赛作品。
          </p>
          <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
            <Clock size={16} />
            <span>预计上线：2026年4月15日后</span>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
