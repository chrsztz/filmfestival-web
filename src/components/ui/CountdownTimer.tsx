import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { Clock, AlertTriangle } from 'lucide-react'

interface CountdownTimerProps {
  targetDate: string
  label: string
  urgent?: boolean
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-festival-navy/80 backdrop-blur-sm border border-copper-500/20 rounded-lg px-3 py-2 min-w-[60px] sm:min-w-[72px]">
          <motion.span
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-2xl sm:text-3xl font-mono font-bold text-copper-400 text-center tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs text-text-secondary mt-1.5 tracking-wider uppercase">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({ targetDate, label, urgent }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-text-secondary text-sm">{label}</p>
        <p className="text-copper-400 font-serif text-lg mt-1">已截止</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        {urgent && days <= 7 ? (
          <AlertTriangle size={16} className="text-glow animate-pulse" />
        ) : (
          <Clock size={16} className="text-text-secondary" />
        )}
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <TimeUnit value={days} label="天" />
        <span className="text-copper-500/50 text-xl font-light mt-[-16px]">:</span>
        <TimeUnit value={hours} label="时" />
        <span className="text-copper-500/50 text-xl font-light mt-[-16px]">:</span>
        <TimeUnit value={minutes} label="分" />
        <span className="text-copper-500/50 text-xl font-light mt-[-16px]">:</span>
        <TimeUnit value={seconds} label="秒" />
      </div>
    </div>
  )
}
