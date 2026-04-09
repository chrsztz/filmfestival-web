import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, FileVideo, Subtitles, Clock, ChevronDown, AlertCircle } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import WaveAnimation from '../components/effects/WaveAnimation'
import divisionsData from '../data/submissions.json'
import type { Division } from '../types'
import { useI18n } from '../i18n'

const divisions: Division[] = divisionsData

export default function SubmissionsPage() {
  const { locale } = useI18n()
  const [activeTab, setActiveTab] = useState<string>(divisions[0].id)

  const techSpecs = [
    {
      icon: FileVideo,
      title: locale === 'zh' ? '视频格式' : 'Format',
      desc: locale === 'zh' ? 'MP4（H.264 编码）' : 'MP4 (H.264 codec)',
    },
    {
      icon: Monitor,
      title: locale === 'zh' ? '分辨率' : 'Resolution',
      desc: locale === 'zh' ? '≥ 1080p（1920×1080）' : '≥ 1080p (1920×1080)',
    },
    {
      icon: Subtitles,
      title: locale === 'zh' ? '字幕要求' : 'Subtitles',
      desc: locale === 'zh' ? '必须包含中英双语字幕' : 'Chinese and English subtitles are required',
    },
    {
      icon: Clock,
      title: locale === 'zh' ? '时长限制' : 'Duration',
      desc: locale === 'zh' ? '按学段不同，5-15 分钟' : '5 to 15 minutes depending on division',
    },
  ]

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
            {locale === 'zh' ? 'SUBMISSIONS' : '投递通道'}
          </motion.span>
          <motion.h1
            className="mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {locale === 'zh' ? '投递通道' : 'Submission Channel'}
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {locale === 'zh'
              ? '提交你的影像作品，让更多人听见你的声音。'
              : 'Submit your moving-image work and let more people hear your voice.'}
          </motion.p>
        </div>
      </section>

      <WaveAnimation />

      <section className="px-6 py-12">
        <motion.div
          className="mx-auto max-w-2xl rounded-2xl border border-glow/20 bg-festival-navy/60 p-8 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <AlertCircle size={18} className="text-glow" />
            <span className="text-sm font-medium text-glow">
              {locale === 'zh'
                ? '投稿截止日期：2026年3月25日 23:59'
                : 'Submission deadline: March 25, 2026 at 23:59'}
            </span>
          </div>
          <div className="text-center">
            <p className="font-serif text-lg text-copper-400">{locale === 'zh' ? '已截止' : 'Closed'}</p>
          </div>
        </motion.div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title={locale === 'zh' ? '技术标准' : 'Technical Requirements'}
            titleEn="TECHNICAL REQUIREMENTS"
            titleZh="技术标准"
            subtitle={
              locale === 'zh'
                ? '请确保作品符合以下技术规格，不合规的作品可能无法正常参评'
                : 'Please make sure your work meets the technical requirements below.'
            }
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techSpecs.map((spec, index) => (
              <Card key={spec.title} delay={index * 0.1} hover={false}>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-copper-500/10">
                    <spec.icon size={20} className="text-copper-400" />
                  </div>
                  <h3 className="mb-1 text-sm font-medium text-text-primary">{spec.title}</h3>
                  <p className="text-sm text-text-secondary">{spec.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            title={locale === 'zh' ? '各学段要求' : 'Division Requirements'}
            titleEn="DIVISION REQUIREMENTS"
            titleZh="各学段要求"
            subtitle={
              locale === 'zh'
                ? '选择你所在的学段，了解具体投稿要求'
                : 'Choose your division to review the relevant submission rules.'
            }
          />

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setActiveTab(div.id)}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  activeTab === div.id
                    ? 'border border-copper-500/30 bg-copper-500/20 text-copper-400'
                    : 'border border-transparent text-text-secondary hover:bg-festival-navy/50 hover:text-text-primary'
                }`}
              >
                {locale === 'zh' ? div.name : div.nameEn}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {divisions
              .filter((div) => div.id === activeTab)
              .map((div) => (
                <motion.div
                  key={`${div.id}-${locale}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-copper-500/20 bg-festival-navy/60 p-8 backdrop-blur-md"
                >
                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-text-primary">
                        {locale === 'zh' ? div.name : div.nameEn}
                      </h3>
                      <p className="mt-1 text-xs tracking-wider text-text-muted">
                        {locale === 'zh' ? div.nameEn : div.name}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-copper-400">{div.minSubmissions}</p>
                        <p className="text-xs text-text-muted">
                          {locale === 'zh' ? '最低投稿数' : 'Min Works'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-sage-400">
                          {locale === 'zh' ? div.maxDuration : div.maxDurationEn || div.maxDuration}
                        </p>
                        <p className="text-xs text-text-muted">
                          {locale === 'zh' ? '最长时长' : 'Max Duration'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {(locale === 'zh' ? div.requirements : div.requirementsEn || div.requirements).map((req, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-500/60" />
                        <p className="text-sm text-text-secondary">{req}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          <div className="mt-8 sm:hidden">
            <p className="flex items-center justify-center gap-1 text-center text-xs text-text-muted">
              <ChevronDown size={14} />
              {locale === 'zh' ? '点击上方标签切换学段' : 'Tap the tabs above to switch divisions'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
