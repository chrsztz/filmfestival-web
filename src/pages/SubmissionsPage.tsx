import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, FileVideo, Subtitles, Clock, ChevronDown, AlertCircle } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import CountdownTimer from '../components/ui/CountdownTimer'
import Card from '../components/ui/Card'
import WaveAnimation from '../components/effects/WaveAnimation'
import divisionsData from '../data/submissions.json'
import type { Division } from '../types'

const divisions: Division[] = divisionsData

const SUBMISSION_DEADLINE = '2026-03-25T23:59:59+08:00'

const techSpecs = [
  {
    icon: FileVideo,
    title: '视频格式',
    desc: 'MP4（H.264 编码）',
  },
  {
    icon: Monitor,
    title: '分辨率',
    desc: '≥ 1080p（1920×1080）',
  },
  {
    icon: Subtitles,
    title: '字幕要求',
    desc: '必须包含中英双语字幕',
  },
  {
    icon: Clock,
    title: '时长限制',
    desc: '按学段不同，5-15分钟',
  },
]

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState<string>(divisions[0].id)

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
            SUBMISSIONS
          </motion.span>
          <motion.h1
            className="font-serif text-4xl sm:text-5xl font-bold mt-4 bg-gradient-to-r from-copper-400 via-glow to-copper-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            投递通道
          </motion.h1>
          <motion.p
            className="mt-6 text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            提交你的影像作品，让更多人听见你的声音
          </motion.p>
        </div>
      </section>

      <WaveAnimation />

      {/* Deadline Countdown */}
      <section className="py-12 px-6">
        <motion.div
          className="max-w-2xl mx-auto bg-festival-navy/60 backdrop-blur-md border border-glow/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle size={18} className="text-glow" />
            <span className="text-glow font-medium text-sm">投稿截止日期：2026年3月25日 23:59</span>
          </div>
          <CountdownTimer
            targetDate={SUBMISSION_DEADLINE}
            label="距离投稿截止还有"
            urgent
          />
        </motion.div>
      </section>

      {/* Tech Specs */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="技术标准"
            titleEn="TECHNICAL REQUIREMENTS"
            subtitle="请确保作品符合以下技术规格，不合规的作品可能无法正常参评"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techSpecs.map((spec, index) => (
              <Card key={spec.title} delay={index * 0.1} hover={false}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-copper-500/10 flex items-center justify-center mb-3">
                    <spec.icon size={20} className="text-copper-400" />
                  </div>
                  <h3 className="text-sm font-medium text-text-primary mb-1">{spec.title}</h3>
                  <p className="text-sm text-text-secondary">{spec.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Division Tabs */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="各学段要求"
            titleEn="DIVISION REQUIREMENTS"
            subtitle="选择你所在的学段，了解具体投稿要求"
          />

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {divisions.map((div) => (
              <button
                key={div.id}
                onClick={() => setActiveTab(div.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  activeTab === div.id
                    ? 'bg-copper-500/20 text-copper-400 border border-copper-500/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-festival-navy/50 border border-transparent'
                }`}
              >
                {div.nameEn}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {divisions
              .filter((div) => div.id === activeTab)
              .map((div) => (
                <motion.div
                  key={div.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-festival-navy/60 backdrop-blur-md border border-copper-500/20 rounded-xl p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-text-primary">
                        {div.name}
                      </h3>
                      <p className="text-xs text-text-muted tracking-wider mt-1">
                        {div.nameEn}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-copper-400">{div.minSubmissions}</p>
                        <p className="text-xs text-text-muted">最低投稿数</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-sage-400">{div.maxDuration}</p>
                        <p className="text-xs text-text-muted">最长时长</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {div.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-copper-500/60 mt-2 shrink-0" />
                        <p className="text-text-secondary text-sm">{req}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Mobile accordion for small screens */}
          <div className="mt-8 sm:hidden">
            <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1">
              <ChevronDown size={14} />
              点击上方标签切换学段
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
