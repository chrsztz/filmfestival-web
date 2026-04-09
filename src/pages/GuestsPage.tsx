import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import WaveAnimation from '../components/effects/WaveAnimation'
import guestsData from '../data/guests.json'
import type { Guest } from '../types'
import { useI18n } from '../i18n'

const guests: Guest[] = guestsData

export default function GuestsPage() {
  const { locale } = useI18n()

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-festival-dark via-festival-deep to-festival-dark" />
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-[-8rem] top-10 h-72 w-72 rounded-full bg-copper-500/10 blur-3xl" />
          <div className="absolute right-[-6rem] bottom-0 h-80 w-80 rounded-full bg-sage-400/10 blur-3xl" />
        </div>
        <WaveAnimation variant="background" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            className="text-xs uppercase tracking-[0.4em] text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {locale === 'zh' ? 'JUDGES & GUESTS' : '评审与嘉宾'}
          </motion.span>
          <motion.h1
            className="mt-4 pb-1 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text font-serif text-4xl font-bold leading-[1.15] text-transparent sm:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {locale === 'zh' ? '评审与嘉宾' : 'Judges & Guests'}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {locale === 'zh'
              ? '来自影视行业的资深从业者，为参赛作品提供专业评审与指导'
              : 'Experienced professionals from the film and media industry offering thoughtful review and guidance'}
          </motion.p>
        </div>
      </section>

      <WaveAnimation />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title={locale === 'zh' ? '评审' : 'Meet the Guests'}
            titleEn="MEET THE GUESTS"
            titleZh="评审阵容"
          />

          <div className="space-y-6">
            {guests.map((guest, index) => (
              <Card
                key={guest.id}
                delay={index * 0.08}
                hover={false}
                className="overflow-hidden border-copper-500/20 bg-festival-navy/65 p-0"
              >
                <div className="grid gap-0 md:grid-cols-[240px_1fr]">
                  <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-festival-slate to-festival-navy">
                    <img src={guest.avatar} alt={locale === 'zh' ? guest.name : guest.nameEn || guest.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-festival-deep/60 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-serif text-3xl font-bold text-text-primary">
                        {locale === 'zh' ? guest.name : guest.nameEn || guest.name}
                      </h2>
                      <span className="text-xs uppercase tracking-[0.3em] text-text-muted">
                        {locale === 'zh' ? guest.nameEn : guest.name}
                      </span>
                    </div>

                    <p className="mt-6 text-sm leading-8 text-text-secondary sm:text-base">
                      {locale === 'zh' ? guest.bio : guest.bioEn || guest.bio}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
