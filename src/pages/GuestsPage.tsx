import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import WaveAnimation from '../components/effects/WaveAnimation'
import guestsData from '../data/guests.json'
import type { Guest } from '../types'

const guests: Guest[] = guestsData

export default function GuestsPage() {
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
            JUDGES & GUESTS
          </motion.span>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl font-bold mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            评审与嘉宾
          </motion.h1>
          <motion.p
            className="mt-6 text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            来自影视行业的资深从业者，为参赛作品提供专业评审与指导
          </motion.p>
        </div>
      </section>

      <WaveAnimation />

      {/* Guest Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="评审团"
            titleEn="JURY PANEL"
            subtitle="六位来自不同领域的影视专业人士，共同守护青年影像创作的品质与多元"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guests.map((guest, index) => (
              <Card key={guest.id} delay={index * 0.1} className="group">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar placeholder */}
                  <div className="relative mb-5">
                    <div className="w-24 h-24 rounded-full bg-festival-slate border-2 border-copper-500/20 flex items-center justify-center group-hover:border-glow/50 transition-colors duration-500 overflow-hidden">
                      {guest.avatar ? (
                        <img
                          src={guest.avatar}
                          alt={guest.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={36} className="text-text-muted" />
                      )}
                    </div>
                    {/* Glow ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-glow/0 group-hover:border-glow/30 transition-all duration-500 scale-100 group-hover:scale-110" />
                  </div>

                  {/* Info */}
                  <h3 className="font-serif text-xl font-bold text-text-primary">
                    {guest.name}
                  </h3>
                  {guest.nameEn && (
                    <p className="text-xs text-text-muted mt-0.5 tracking-wider">
                      {guest.nameEn}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2 mb-3">
                    <span className="text-sm text-copper-400">{guest.title}</span>
                    <span className="text-text-muted">·</span>
                    <span className="text-sm text-sage-400">{guest.organization}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {guest.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
