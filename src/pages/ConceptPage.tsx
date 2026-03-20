import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ParallaxSection from '../components/effects/ParallaxSection'
import WaveAnimation from '../components/effects/WaveAnimation'

const chapters = [
  {
    id: 'what',
    titleEn: 'RESONANCE',
    title: '何为众响',
    content:
      '众响，是万千声音汇聚成的回响。它不是单一的旋律，而是每一个独特声音交织后产生的共鸣。在这个时代，每个人都是发声者，每一段影像都是一次表达——当这些表达汇聚在一起，便形成了"众响"。',
    accent: 'copper',
  },
  {
    id: 'power',
    titleEn: 'THE POWER OF IMAGE',
    title: '影像的力量',
    content:
      '影像，是光与影的诗篇，是时间的切片。一帧画面可以凝固瞬间的情感，一段影片可以跨越时空的阻隔。我们相信，每一位年轻创作者手中的镜头，都蕴含着改变世界的可能。',
    accent: 'sage',
  },
  {
    id: 'resonance',
    titleEn: 'ECHOES OF AN ERA',
    title: '时代共振',
    content:
      '当个人的声音与时代的脉搏产生共振，影像便获得了超越自身的力量。我们寻找的不仅是技术上的精湛，更是那些能够触及人心、引发思考、连接彼此的作品——它们是这个时代最真实的注脚。',
    accent: 'copper',
  },
  {
    id: 'you',
    titleEn: 'YOUR VOICE MATTERS',
    title: '你的声音',
    content:
      '合心，是将所有人的心意凝聚在一起；众响，是让每一个声音都被听见。无论你是第一次拿起相机的新手，还是已有作品的资深创作者——在这里，你的影像就是你的声音，而我们期待听见。',
    accent: 'sage',
  },
]

export default function ConceptPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-festival-dark to-festival-deep" />
        <WaveAnimation variant="background" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            className="text-xs tracking-[0.4em] uppercase text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ABOUT THE THEME
          </motion.span>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            主题释义
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            以心合意，以影发声，以众成响
          </motion.p>
        </div>
      </section>

      {/* Chapters */}
      {chapters.map((chapter, index) => (
        <ParallaxSection key={chapter.id} offset={30} className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              className={`flex flex-col ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-text-muted mb-3">
                {chapter.titleEn}
              </span>
              <h2
                className={`font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${
                  chapter.accent === 'copper'
                    ? 'bg-gradient-to-r from-copper-400 to-glow bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-sage-400 to-sage-300 bg-clip-text text-transparent'
                }`}
              >
                {chapter.title}
              </h2>
              <div
                className={`h-0.5 w-16 mb-8 ${
                  chapter.accent === 'copper'
                    ? 'bg-gradient-to-r from-copper-500 to-transparent'
                    : 'bg-gradient-to-r from-sage-500 to-transparent'
                }`}
              />
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl">
                {chapter.content}
              </p>
            </motion.div>
          </div>

          {/* Decorative wave between chapters */}
          {index < chapters.length - 1 && (
            <div className="mt-16">
              <WaveAnimation />
            </div>
          )}
        </ParallaxSection>
      ))}

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-primary mb-4">
            准备好发出你的声音了吗？
          </h3>
          <p className="text-text-secondary mb-8">
            投稿截止日期：2026年3月25日 23:59
          </p>
          <Link
            to="/submissions"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-copper-500 to-copper-600 text-white rounded-xl font-medium hover:from-copper-400 hover:to-copper-500 transition-all shadow-[0_0_20px_rgba(212,132,90,0.3)] hover:shadow-[0_0_30px_rgba(212,132,90,0.5)]"
          >
            前往投递通道
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
