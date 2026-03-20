import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export default function Card({ children, className = '', hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`bg-festival-navy/60 backdrop-blur-md border border-copper-500/20 rounded-xl p-6 transition-shadow duration-300 ${
        hover ? 'hover:shadow-[0_0_30px_rgba(212,132,90,0.15)] hover:border-copper-500/30' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
