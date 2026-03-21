import { motion } from 'framer-motion'

interface WaveAnimationProps {
  className?: string
  variant?: 'separator' | 'background'
}

export default function WaveAnimation({ className = '', variant = 'separator' }: WaveAnimationProps) {
  if (variant === 'background') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.svg
            key={i}
            className="absolute w-full"
            style={{ bottom: `${i * 8}%`, opacity: 0.05 + i * 0.02 }}
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            initial={{ x: i % 2 === 0 ? 0 : -100 }}
            animate={{ x: i % 2 === 0 ? -100 : 0 }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          >
            <path
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
              fill={i % 2 === 0 ? '#d4845a' : '#97a86a'}
            />
          </motion.svg>
        ))}
      </div>
    )
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
        {/* Copper wave */}
        <motion.path
          d="M0,30 C180,60 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1440,0 1440,30"
          fill="none"
          stroke="#d4845a"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        {/* Sage wave */}
        <motion.path
          d="M0,35 C240,5 480,55 720,25 C960,55 1200,5 1440,35"
          fill="none"
          stroke="#97a86a"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
