import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import VideoPlayer from '../components/ui/VideoPlayer'
import PhotoCarousel from '../components/ui/PhotoCarousel'
import WaveAnimation from '../components/effects/WaveAnimation'
import newsData from '../data/news.json'
import type { NewsItem } from '../types'

const news: NewsItem[] = newsData as NewsItem[]

const tagLabels: Record<string, { label: string; color: string }> = {
  announcement: { label: '公告', color: 'text-copper-400 bg-copper-500/10 border-copper-500/20' },
  'behind-scenes': { label: '幕后', color: 'text-sage-400 bg-sage-500/10 border-sage-500/20' },
  update: { label: '动态', color: 'text-glow bg-glow/10 border-glow/20' },
}

export default function NewsPage() {
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
            NEWS & UPDATES
          </motion.span>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl font-bold mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            影节动态
          </motion.h1>
          <motion.p
            className="mt-6 text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            关注影节最新进展，了解幕后故事
          </motion.p>
        </div>
      </section>

      <WaveAnimation />

      {/* Featured Video */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="精彩视频"
            titleEn="FEATURED VIDEO"
            subtitle="影节官方视频即将上线，敬请期待"
          />
          <VideoPlayer title="影节官方宣传片" />
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="幕后花絮"
            titleEn="BEHIND THE SCENES"
            subtitle="记录影节筹备过程中的精彩瞬间"
          />
          <PhotoCarousel />
        </div>
      </section>

      {/* News Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="时间轴"
            titleEn="TIMELINE"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-copper-500/40 via-copper-500/20 to-transparent" />

            <div className="space-y-8">
              {news.map((item, index) => {
                const tag = tagLabels[item.tag] || tagLabels.update
                return (
                  <motion.div
                    key={item.id}
                    className="relative pl-12 sm:pl-16"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2.5 sm:left-4.5 top-2 w-3 h-3 rounded-full bg-copper-500 border-2 border-festival-deep" />

                    <Card hover={false} delay={0}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${tag.color}`}>
                            {tag.label}
                          </span>
                          <span className="text-xs text-text-muted">{item.date}</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.summary}
                      </p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
