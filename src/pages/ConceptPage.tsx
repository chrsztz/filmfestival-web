import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ParallaxSection from '../components/effects/ParallaxSection'
import WaveAnimation from '../components/effects/WaveAnimation'
import { useI18n } from '../i18n'

const chapters = [
  {
    id: 'what',
    label: 'RESONANCE',
    title: { zh: '何为众响', en: 'What Is Resonance' },
    content: {
      zh: '众响，是万千声音汇聚后的回响。它不是单一的旋律，而是每一种独特表达彼此碰撞后产生的共鸣。在这个时代，每个人都可以发声，每一段影像都可能成为回应世界的方式。',
      en: 'Resonance is the echo created when many voices gather together. It is not a single melody, but a field of response formed by distinct expressions meeting one another. In our time, everyone can speak, and every image can become a way of answering the world.',
    },
    accent: 'copper',
  },
  {
    id: 'power',
    label: 'THE POWER OF IMAGE',
    title: { zh: '影像的力量', en: 'The Power of Image' },
    content: {
      zh: '影像是光与影的诗篇，也是时间被切开的片段。一帧画面可以凝住情绪，一段短片可以穿越语言和距离。我们相信，每一位青年创作者手中的镜头，都蕴含着改变观看方式的可能。',
      en: 'Images are poems written with light and shadow, fragments of time held in form. A single frame can hold emotion; a short film can move across language and distance. We believe every young creator holds the power to reshape how we see.',
    },
    accent: 'sage',
  },
  {
    id: 'era',
    label: 'ECHOES OF AN ERA',
    title: { zh: '时代共振', en: 'Echoes of an Era' },
    content: {
      zh: '当个人经验与时代脉搏相互触碰，影像便获得了超越自身的力量。我们寻找的，不只是技法上的成熟，更是那些能够触及人心、引发思考并连接彼此的作品。',
      en: 'When personal experience meets the pulse of an era, moving images gain a force larger than themselves. We are not only looking for technical skill, but for works that touch people, spark thought and connect one life to another.',
    },
    accent: 'copper',
  },
  {
    id: 'voice',
    label: 'YOUR VOICE MATTERS',
    title: { zh: '你的声音', en: 'Your Voice Matters' },
    content: {
      zh: '合心，是让彼此靠近；众响，是让每一种声音都被听见。无论你是第一次拿起相机，还是已经拥有稳定表达的创作者，在这里，你的影像就是你的声音。',
      en: 'Resonance begins when people move closer in spirit and every voice is given room to be heard. Whether you are picking up a camera for the first time or already shaping a clear creative practice, your film is your voice here.',
    },
    accent: 'sage',
  },
]

export default function ConceptPage() {
  const { locale } = useI18n()

  return (
    <div className="pt-20">
      <section className="relative overflow-hidden px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-festival-dark to-festival-deep" />
        <WaveAnimation variant="background" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.span
            className="text-xs uppercase tracking-[0.4em] text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {locale === 'zh' ? 'ABOUT THE THEME' : '主题释义'}
          </motion.span>
          <motion.h1
            className="mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {locale === 'zh' ? '主题释义' : 'Theme Statement'}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {locale === 'zh'
              ? '以心合意，以影发声，以众成响'
              : 'Gather hearts, speak through images, and let many voices resonate'}
          </motion.p>
        </div>
      </section>

      {chapters.map((chapter, index) => (
        <ParallaxSection key={chapter.id} offset={30} className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              className={`flex flex-col ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <span className="mb-3 text-xs uppercase tracking-[0.3em] text-text-muted">{chapter.label}</span>
              <h2
                className={`mb-6 font-serif text-3xl font-bold sm:text-4xl md:text-5xl ${
                  chapter.accent === 'copper'
                    ? 'bg-gradient-to-r from-copper-400 to-glow bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-sage-400 to-sage-300 bg-clip-text text-transparent'
                }`}
              >
                {chapter.title[locale]}
              </h2>
              <div
                className={`mb-8 h-0.5 w-16 ${
                  chapter.accent === 'copper'
                    ? 'bg-gradient-to-r from-copper-500 to-transparent'
                    : 'bg-gradient-to-r from-sage-500 to-transparent'
                }`}
              />
              <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {chapter.content[locale]}
              </p>
            </motion.div>
          </div>

          {index < chapters.length - 1 && (
            <div className="mt-16">
              <WaveAnimation />
            </div>
          )}
        </ParallaxSection>
      ))}

      <section className="px-6 py-20">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-4 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            {locale === 'zh' ? '准备好发出你的声音了吗？' : 'Ready to let your voice be heard?'}
          </h3>
          <p className="mb-8 text-text-secondary">
            {locale === 'zh'
              ? '投稿截止日期：2026年3月25日 23:59'
              : 'Submission deadline: March 25, 2026 at 23:59'}
          </p>
          <Link
            to="/submissions"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-copper-500 to-copper-600 px-8 py-3 font-medium text-white shadow-[0_0_20px_rgba(212,132,90,0.3)] transition-all hover:from-copper-400 hover:to-copper-500 hover:shadow-[0_0_30px_rgba(212,132,90,0.5)]"
          >
            {locale === 'zh' ? '前往投递通道' : 'Go to Submissions'}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
