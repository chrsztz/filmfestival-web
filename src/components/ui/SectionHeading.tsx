import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  titleEn?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, titleEn, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 ${className}`}
    >
      {titleEn && (
        <span className="text-xs tracking-[0.3em] uppercase text-text-muted block mb-2">
          {titleEn}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-copper-400 to-glow bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-sm sm:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-copper-500/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-copper-500/60" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-copper-500/40" />
      </div>
    </motion.div>
  )
}
