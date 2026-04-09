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

const works = [
  { src: '/movies/A Magic Tree House Adventure.png', zh: 'A Magic Tree House Adventure', en: 'A Magic Tree House Adventure' },
  { src: '/movies/Beneath The Blue.png', zh: 'Beneath The Blue', en: 'Beneath The Blue' },
  { src: '/movies/HeartStrings.png', zh: 'HeartStrings', en: 'HeartStrings' },
  { src: '/movies/为珍存岁迹.png', zh: '为珍存岁迹', en: 'For the Precious Traces of Time' },
  { src: '/movies/公益的崛起時空迴响.png', zh: '公益的崛起時空迴响', en: 'Public Welfare Rising: Echoes Across Time' },
  { src: '/movies/公益的崛起花絮.png', zh: '公益的崛起花絮', en: 'Public Welfare Rising: Behind the Scenes' },
  { src: '/movies/嘉靖四十五年.png', zh: '嘉靖四十五年', en: 'The 45th Year of Jiajing' },
  { src: '/movies/失语症的独白.jpg', zh: '失语症的独白', en: 'Monologue of Aphasia' },
  { src: '/movies/山那边.png', zh: '山那边', en: 'Beyond the Mountain' },
  { src: '/movies/我们的故事.png', zh: '我们的故事', en: 'Our Story' },
  { src: '/movies/梦境.png', zh: '梦境', en: 'Dreamscape' },
  { src: '/movies/熊自强.png', zh: '熊自强', en: 'Xiong Ziqiang' },
  { src: '/movies/生于弯路.png', zh: '生于弯路', en: 'Born on a Winding Road' },
  { src: '/movies/童篮无界.png', zh: '童篮无界', en: 'Beyond the Basket' },
  { src: '/movies/绿茵少年.png', zh: '绿茵少年', en: 'Boys on the Green' },
  { src: '/movies/越过1300公里.png', zh: '越过1300公里', en: 'Across 1300 Kilometers' },
  { src: '/movies/错位的惊喜.png', zh: '错位的惊喜', en: 'Misplaced Surprise' },
]

export default function NewsPage() {
  const { locale } = useI18n()

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
            {locale === 'zh' ? 'NEWS & UPDATES' : '影节动态'}
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
            title={locale === 'zh' ? '作品' : 'Works'}
            titleEn="WORKS"
            titleZh="作品"
            subtitle={
              locale === 'zh'
                ? '本届作品封面预览'
                : 'A preview of selected works and their cover art'
            }
          />
          <PhotoCarousel
            photos={works.map((work) => ({
              src: work.src,
              alt: locale === 'zh' ? work.zh : work.en,
            }))}
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title={locale === 'zh' ? '时间轴' : 'Timeline'}
            titleEn="TIMELINE"
            titleZh="时间轴"
          />

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
