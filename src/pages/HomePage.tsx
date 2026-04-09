import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { Sparkles, Users, Send, Newspaper } from 'lucide-react'
import ParticleField from '../components/effects/ParticleField'
import AnimatedLogo from '../components/effects/AnimatedLogo'
import WaveAnimation from '../components/effects/WaveAnimation'
import CountdownTimer from '../components/ui/CountdownTimer'
import Card from '../components/ui/Card'
import { useI18n } from '../i18n'

const SUBMISSION_DEADLINE = '2026-03-25T23:59:59+08:00'
const CEREMONY_DATE = '2026-04-15T18:00:00+08:00'

export default function HomePage() {
  const { locale } = useI18n()

  const quickNavItems = [
    {
      path: '/concept',
      icon: Sparkles,
      title: locale === 'zh' ? '主题释义' : 'Concept',
      titleEn: 'Concept',
      desc: locale === 'zh' ? '探索“众响”的深层含义' : 'Explore the deeper meaning of Resonance',
    },
    {
      path: '/guests',
      icon: Users,
      title: locale === 'zh' ? '评审嘉宾' : 'Guests',
      titleEn: 'Guests',
      desc: locale === 'zh' ? '认识影节评审团' : 'Meet the festival jury',
    },
    {
      path: '/submissions',
      icon: Send,
      title: locale === 'zh' ? '投递通道' : 'Submit',
      titleEn: 'Submit',
      desc: locale === 'zh' ? '了解投稿要求与规范' : 'Review submission rules and requirements',
    },
    {
      path: '/news',
      icon: Newspaper,
      title: locale === 'zh' ? '影节动态' : 'News',
      titleEn: 'News',
      desc: locale === 'zh' ? '最新消息与幕后花絮' : 'Follow updates and behind-the-scenes notes',
    },
  ]

  const heroTitle = locale === 'zh' ? '共振' : 'RESONANCE'

  return (
    <div>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden overflow-y-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-festival-deep via-festival-dark to-festival-deep" />
        <ParticleField />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[400px] w-[600px] rounded-full bg-copper-500/5 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 pt-20">
          <AnimatedLogo className="mb-8 w-full max-w-[500px] sm:max-w-[580px]" />

          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <h1 className="mb-4 font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              {heroTitle.split('').map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className="inline-block bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + i * 0.05, duration: 0.5 }}
                  style={{ textShadow: '0 0 40px rgba(232,160,80,0.3)' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="text-base tracking-wide text-text-secondary sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6, duration: 0.8 }}
            >
              {locale === 'zh'
                ? '众响：寻找影像中的时代共振'
                : 'Resonance: finding the pulse of an era through moving images'}
            </motion.p>
            <motion.p
              className="mt-2 text-sm tracking-widest text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.9, duration: 0.8 }}
            >
              {locale === 'zh' ? '第十二届校园电影节' : 'THE 12TH CAMPUS FILM FESTIVAL'}
            </motion.p>
          </motion.div>

          <motion.div
            className="mb-12 flex flex-col gap-8 sm:flex-row sm:gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 0.6 }}
          >
            <CountdownTimer
              targetDate={SUBMISSION_DEADLINE}
              label={locale === 'zh' ? '投稿截止倒计时' : 'Submission Countdown'}
              urgent
            />
            <CountdownTimer
              targetDate={CEREMONY_DATE}
              label={locale === 'zh' ? '颁奖典礼倒计时' : 'Ceremony Countdown'}
            />
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
        >
          <motion.div
            className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-copper-500/30 p-1.5"
            animate={{ borderColor: ['rgba(198,122,74,0.3)', 'rgba(198,122,74,0.6)', 'rgba(198,122,74,0.3)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-copper-400"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      <WaveAnimation />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-text-muted">
              {locale === 'zh' ? 'EXPLORE' : '探索影节'}
            </span>
            <h2 className="mt-2 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
              {locale === 'zh' ? '探索影节' : 'Explore the Festival'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {quickNavItems.map((item, index) => (
              <Link key={item.path} to={item.path}>
                <Card delay={index * 0.1} className="group h-full min-h-[260px] cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-copper-500/10 transition-colors group-hover:bg-copper-500/20">
                      <item.icon size={26} className="text-copper-400" />
                    </div>
                    <h3 className="mb-3 font-serif text-2xl font-semibold leading-tight text-text-primary">
                      {item.title}
                    </h3>
                    <span className="mb-3 text-sm tracking-wider text-text-muted">{item.titleEn}</span>
                    <p className="text-base text-text-secondary">{item.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6">
        <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />
      </div>
      <WaveAnimation />
    </div>
  )
}
