import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Sparkles, Users, Send, Newspaper } from 'lucide-react'
import ParticleField from '../components/effects/ParticleField'
import AnimatedLogo from '../components/effects/AnimatedLogo'
import WaveAnimation from '../components/effects/WaveAnimation'
import CountdownTimer from '../components/ui/CountdownTimer'
import Card from '../components/ui/Card'

const SUBMISSION_DEADLINE = '2026-03-25T23:59:59+08:00'
const CEREMONY_DATE = '2026-04-15T18:00:00+08:00'

const quickNavItems = [
  {
    path: '/concept',
    icon: Sparkles,
    title: '主题释义',
    titleEn: 'Concept',
    desc: '探索"众响"的深层含义',
  },
  {
    path: '/guests',
    icon: Users,
    title: '评审嘉宾',
    titleEn: 'Guests',
    desc: '认识影节评审团',
  },
  {
    path: '/submissions',
    icon: Send,
    title: '投递通道',
    titleEn: 'Submit',
    desc: '了解投稿要求与规范',
  },
  {
    path: '/news',
    icon: Newspaper,
    title: '影节动态',
    titleEn: 'News',
    desc: '最新消息与幕后花絮',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-festival-deep via-festival-dark to-festival-deep" />
        <ParticleField />

        {/* Radial glow behind logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-copper-500/5 rounded-full blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-20">
          {/* Animated Logo */}
          <AnimatedLogo className="w-full max-w-[500px] sm:max-w-[580px] mb-8" />

          {/* Title */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              {'合心众响'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + i * 0.15, duration: 0.5 }}
                  style={{
                    textShadow: '0 0 40px rgba(232,160,80,0.3)',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="text-text-secondary text-base sm:text-lg tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6, duration: 0.8 }}
            >
              众响 —— 寻找影像中的时代共振
            </motion.p>
            <motion.p
              className="text-text-muted text-sm mt-2 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.9, duration: 0.8 }}
            >
              THE 12TH CAMPUS FILM FESTIVAL
            </motion.p>
          </motion.div>

          {/* Dual Countdown */}
          <motion.div
            className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.6 }}
          >
            <CountdownTimer
              targetDate={SUBMISSION_DEADLINE}
              label="投稿截止倒计时"
              urgent
            />
            <CountdownTimer
              targetDate={CEREMONY_DATE}
              label="颁奖典礼倒计时"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-copper-500/30 flex items-start justify-center p-1.5"
            animate={{ borderColor: ['rgba(198,122,74,0.3)', 'rgba(198,122,74,0.6)', 'rgba(198,122,74,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-copper-400"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Wave Separator */}
      <WaveAnimation />

      {/* Quick Navigation Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-text-muted">
              EXPLORE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mt-2">
              探索影节
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickNavItems.map((item, index) => (
              <Link key={item.path} to={item.path}>
                <Card delay={index * 0.1} className="h-full group cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-copper-500/10 flex items-center justify-center mb-4 group-hover:bg-copper-500/20 transition-colors">
                      <item.icon size={24} className="text-copper-400" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <span className="text-xs text-text-muted tracking-wider mb-2">
                      {item.titleEn}
                    </span>
                    <p className="text-sm text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom wave */}
      <WaveAnimation />
    </div>
  )
}
