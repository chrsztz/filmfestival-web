import { useMemo } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import VideoPlayer from '../components/ui/VideoPlayer'
import PhotoCarousel from '../components/ui/PhotoCarousel'
import WaveAnimation from '../components/effects/WaveAnimation'
import newsData from '../data/news.json'
import type { NewsItem } from '../types'
import { useI18n } from '../i18n'

const news: NewsItem[] = newsData as NewsItem[]

const shuffle = <T,>(items: T[]) => {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export default function NewsPage() {
  const { locale } = useI18n()

  const behindPhotos = useMemo(() => {
    const across1300 = shuffle([
      '/behind/越过1300公里/1.jpg',
      '/behind/越过1300公里/2.jpg',
      '/behind/越过1300公里/3.jpg',
      '/behind/越过1300公里/4.jpg',
      '/behind/越过1300公里/5.jpg',
    ])
      .slice(0, 3)
      .map((src, index) => ({
        src,
        alt: locale === 'zh' ? `越过1300公里 幕后照片 ${index + 1}` : `Across 1300 Kilometers behind-the-scenes photo ${index + 1}`,
        description: locale === 'zh' ? '越过1300公里' : 'Across 1300 Kilometers',
      }))

    return [
      ...across1300,
      {
        src: '/behind/梦境/1.jpg',
        alt: locale === 'zh' ? '梦境 幕后照片' : 'Dreamscape behind-the-scenes photo',
        description: locale === 'zh' ? '梦境' : 'Dreamscape',
      },
      {
        src: '/behind/coding.png',
        alt: locale === 'zh' ? '编码 幕后照片' : 'Coding behind-the-scenes photo',
        description: locale === 'zh' ? '编码' : 'Coding',
      },
      {
        src: '',
        alt: locale === 'zh' ? '敬请期待 1' : 'Coming Soon 1',
        description: '',
      },
      {
        src: '',
        alt: locale === 'zh' ? '敬请期待 2' : 'Coming Soon 2',
        description: '',
      },
    ]
  }, [locale])

  const tagLabels: Record<string, { label: string; color: string }> = {
    announcement: {
      label: locale === 'zh' ? '公告' : 'Announcement',
      color: 'text-copper-400 bg-copper-500/10 border-copper-500/20',
    },
    'behind-scenes': {
      label: locale === 'zh' ? '幕后' : 'Behind the Scenes',
      color: 'text-sage-400 bg-sage-500/10 border-sage-500/20',
    },
    update: {
      label: locale === 'zh' ? '动态' : 'Update',
      color: 'text-glow bg-glow/10 border-glow/20',
    },
  }

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
            {locale === 'zh' ? '影节动态' : 'NEWS & UPDATES'}
          </motion.span>
          <motion.h1
            className="mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {locale === 'zh' ? '影节动态' : 'News & Updates'}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {locale === 'zh'
              ? '关注影节最新进展，了解幕后故事'
              : 'Follow the latest festival updates and behind-the-scenes stories'}
          </motion.p>
        </div>
      </section>

      <WaveAnimation />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            title={locale === 'zh' ? '精选视频' : 'Featured Video'}
            titleEn="FEATURED VIDEO"
            titleZh="精选视频"
            subtitle={
              locale === 'zh'
                ? '影节官方视频即将上线，敬请期待'
                : 'The official festival video will be released soon.'
            }
          />
          <VideoPlayer title={locale === 'zh' ? '影节官方宣传片' : 'Official Festival Trailer'} />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title={locale === 'zh' ? '幕后照片' : 'Behind the Scenes Photos'}
            titleEn="BEHIND THE SCENES PHOTOS"
            titleZh="幕后照片"
            subtitle={
              locale === 'zh'
                ? '记录创作现场与影节时刻'
                : 'Moments from production and the festival'
            }
          />
          <PhotoCarousel photos={behindPhotos} />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading title={locale === 'zh' ? '时间轴' : 'Timeline'} titleEn="TIMELINE" titleZh="时间轴" />

          <div className="relative">
            <div className="absolute bottom-0 top-0 left-4 w-px bg-gradient-to-b from-copper-500/40 via-copper-500/20 to-transparent sm:left-6" />

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
                    <div className="absolute top-2 left-2.5 h-3 w-3 rounded-full border-2 border-festival-deep bg-copper-500 sm:left-4.5" />

                    <Card hover={false} delay={0}>
                      <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full border px-2 py-0.5 text-xs ${tag.color}`}>
                            {tag.label}
                          </span>
                          <span className="text-xs text-text-muted">{item.date}</span>
                        </div>
                      </div>
                      <h3 className="mb-2 font-serif text-lg font-semibold text-text-primary">
                        {locale === 'zh' ? item.title : item.titleEn || item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {locale === 'zh' ? item.summary : item.summaryEn || item.summary}
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
