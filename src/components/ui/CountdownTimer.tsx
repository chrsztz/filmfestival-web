import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'
import { useCountdown } from '../../hooks/useCountdown'
import { useI18n } from '../../i18n'

interface CountdownTimerProps {
  targetDate: string
  label: string
  urgent?: boolean
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="min-w-[60px] rounded-lg border border-copper-500/20 bg-festival-navy/80 px-3 py-2 backdrop-blur-sm sm:min-w-[72px]">
          <motion.span
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-center font-mono text-2xl font-bold tabular-nums text-copper-400 sm:text-3xl"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="mt-1.5 text-[10px] uppercase tracking-wider text-text-secondary sm:text-xs">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({ targetDate, label, urgent }: CountdownTimerProps) {
  const { locale } = useI18n()
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  const units =
    locale === 'zh'
      ? { days: '天', hours: '时', minutes: '分', seconds: '秒', expired: '已截止' }
      : { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs', expired: 'Closed' }

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="mt-1 font-serif text-lg text-copper-400">{units.expired}</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        {urgent && days <= 7 ? (
          <AlertTriangle size={16} className="animate-pulse text-glow" />
        ) : (
          <Clock size={16} className="text-text-secondary" />
        )}
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <TimeUnit value={days} label={units.days} />
        <span className="mt-[-16px] text-xl font-light text-copper-500/50">:</span>
        <TimeUnit value={hours} label={units.hours} />
        <span className="mt-[-16px] text-xl font-light text-copper-500/50">:</span>
        <TimeUnit value={minutes} label={units.minutes} />
        <span className="mt-[-16px] text-xl font-light text-copper-500/50">:</span>
        <TimeUnit value={seconds} label={units.seconds} />
      </div>
    </div>
  )
}
