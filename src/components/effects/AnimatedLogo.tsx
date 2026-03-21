import { motion } from 'framer-motion'

interface AnimatedLogoProps {
  className?: string
  size?: number
}

export default function AnimatedLogo({ className = '', size = 600 }: AnimatedLogoProps) {
  const viewBox = '0 0 800 400'
  const centerX = 400
  const centerY = 200

  const format = (value: number) => Number(value.toFixed(2))
  type Point = { x: number; y: number }
  type WaveSegments = {
    heart: string
    left: string
    right: string
  }

  const pointsToSmoothPath = (points: Point[]) => {
    if (points.length < 2) return ''
    const tension = 0.88
    let d = `M${format(points[0].x)},${format(points[0].y)}`

    for (let i = 0; i < points.length - 1; i += 1) {
      const p0 = points[i - 1] ?? points[i]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[i + 2] ?? p2

      const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension
      const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension
      const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension
      const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension

      d += ` C${format(cp1x)},${format(cp1y)} ${format(cp2x)},${format(cp2y)} ${format(p2.x)},${format(p2.y)}`
    }

    return d
  }

  const buildWavePoints = (
    joinX: number,
    baseY: number,
    direction: -1 | 1,
    length: number,
    amplitude: number,
    phase: number,
    cycles = 1.85
  ) => {
    const steps = 56
    const points: Point[] = []

    for (let step = 0; step <= steps; step += 1) {
      const t = step / steps
      const decay = Math.pow(1 - t, 1.24)
      const oscillation = Math.sin(t * cycles * Math.PI * 2 + phase) - Math.sin(phase)
      const x = joinX + direction * length * t
      const y = baseY + oscillation * amplitude * decay
      points.push({ x, y })
    }

    const tail = 52
    const tailSteps = 6
    for (let step = 1; step <= tailSteps; step += 1) {
      const t = step / tailSteps
      points.push({
        x: joinX + direction * (length + tail * t),
        y: baseY,
      })
    }

    return points
  }

  const buildHeartWaveSegments = (
    scale: number,
    waveAmplitude: number,
    phase: number,
    waveLength: number
  ): WaveSegments => {
    const sx = scale
    const sy = scale * 0.98
    const y = centerY
    const leftJoinX = centerX - sx * 0.9
    const rightJoinX = centerX + sx * 0.9

    const heartPath = [
      `M${format(centerX)},${format(y + sy * 0.9)}`,
      `C${format(centerX - sx * 0.3)},${format(y + sy * 0.72)} ${format(centerX - sx * 0.7)},${format(y + sy * 0.36)} ${format(leftJoinX)},${format(y)}`,
      `C${format(centerX - sx * 1.2)},${format(y - sy * 0.42)} ${format(centerX - sx * 1.02)},${format(y - sy * 1.02)} ${format(centerX - sx * 0.46)},${format(y - sy * 1.02)}`,
      `C${format(centerX - sx * 0.19)},${format(y - sy * 1.02)} ${format(centerX - sx * 0.05)},${format(y - sy * 0.67)} ${format(centerX)},${format(y - sy * 0.42)}`,
      `C${format(centerX + sx * 0.05)},${format(y - sy * 0.67)} ${format(centerX + sx * 0.19)},${format(y - sy * 1.02)} ${format(centerX + sx * 0.46)},${format(y - sy * 1.02)}`,
      `C${format(centerX + sx * 1.02)},${format(y - sy * 1.02)} ${format(centerX + sx * 1.2)},${format(y - sy * 0.42)} ${format(rightJoinX)},${format(y)}`,
      `C${format(centerX + sx * 0.7)},${format(y + sy * 0.36)} ${format(centerX + sx * 0.3)},${format(y + sy * 0.72)} ${format(centerX)},${format(y + sy * 0.9)}`,
    ].join(' ')

    const leftPoints = buildWavePoints(leftJoinX, y, -1, waveLength, waveAmplitude, phase)
    const rightPoints = buildWavePoints(rightJoinX, y, 1, waveLength, waveAmplitude, phase)

    return {
      heart: heartPath,
      left: pointsToSmoothPath(leftPoints),
      right: pointsToSmoothPath(rightPoints),
    }
  }

  // Keep side-wave feel from previous version, but thicker
  const heartWaves = [
    {
      segments: buildHeartWaveSegments(170, 76, 0.08, 224),
      width: 2.35,
      waveColor: '#d6a289',
      waveOpacity: 0.92,
      heartOpacity: 0.92,
      heartGradient: 'url(#heartCoreToneA)',
    },
    {
      segments: buildHeartWaveSegments(158, 64, 0.48, 216),
      width: 2.22,
      waveColor: '#8b9b75',
      waveOpacity: 0.87,
      heartOpacity: 0.84,
      heartGradient: 'url(#heartCoreToneB)',
    },
    {
      segments: buildHeartWaveSegments(146, 52, 0.92, 208),
      width: 2.06,
      waveColor: '#d8af84',
      waveOpacity: 0.84,
      heartOpacity: 0.76,
      heartGradient: 'url(#heartCoreToneC)',
    },
    {
      segments: buildHeartWaveSegments(134, 42, 1.35, 200),
      width: 1.92,
      waveColor: '#86956f',
      waveOpacity: 0.8,
      heartOpacity: 0.72,
      heartGradient: 'url(#heartCoreToneB)',
    },
    {
      segments: buildHeartWaveSegments(122, 33, 1.8, 192),
      width: 1.8,
      waveColor: '#d19e7a',
      waveOpacity: 0.76,
      heartOpacity: 0.66,
      heartGradient: 'url(#heartCoreToneA)',
    },
    {
      segments: buildHeartWaveSegments(110, 25, 2.2, 184),
      width: 1.68,
      waveColor: '#95a27c',
      waveOpacity: 0.72,
      heartOpacity: 0.6,
      heartGradient: 'url(#heartCoreToneC)',
    },
  ]

  const pathDrawVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, delay: i * 0.15, ease: 'easeInOut' as const },
        opacity: { duration: 0.3, delay: i * 0.15 },
      },
    }),
  }

  return (
    <div className={`relative ${className}`} style={{ maxWidth: size }}>
      <svg
        viewBox={viewBox}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter */}
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="numberGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor="#ffe0b4" stopOpacity="0.86" />
            <stop offset="42%" stopColor="#ebb78d" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#cf916f" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#cf916f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heartCoreToneA" x1="250" y1="200" x2="550" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c97864" />
            <stop offset="40%" stopColor="#d18c73" />
            <stop offset="47%" stopColor="#95a982" />
            <stop offset="53%" stopColor="#c9866f" />
            <stop offset="60%" stopColor="#8fa57d" />
            <stop offset="100%" stopColor="#7f986d" />
          </linearGradient>
          <linearGradient id="heartCoreToneB" x1="250" y1="200" x2="550" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c17663" />
            <stop offset="34%" stopColor="#cb886f" />
            <stop offset="44%" stopColor="#8fa47b" />
            <stop offset="50%" stopColor="#c7836c" />
            <stop offset="58%" stopColor="#99ab84" />
            <stop offset="72%" stopColor="#82a07a" />
            <stop offset="100%" stopColor="#76916a" />
          </linearGradient>
          <linearGradient id="heartCoreToneC" x1="250" y1="200" x2="550" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#bc725f" />
            <stop offset="30%" stopColor="#cb8a73" />
            <stop offset="42%" stopColor="#99ae87" />
            <stop offset="48%" stopColor="#c57d67" />
            <stop offset="54%" stopColor="#8ca277" />
            <stop offset="66%" stopColor="#c98f74" />
            <stop offset="100%" stopColor="#7b946d" />
          </linearGradient>
        </defs>

        {/* Heart-wave paths */}
        {heartWaves.map((wave, i) => (
          <g key={`wave-${i}`}>
            <motion.path
              d={wave.segments.left}
              fill="none"
              stroke={wave.waveColor}
              strokeOpacity={wave.waveOpacity}
              strokeWidth={wave.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={i}
              variants={pathDrawVariant}
              initial="hidden"
              animate="visible"
              filter="url(#glow)"
            />
            <motion.path
              d={wave.segments.heart}
              fill="none"
              stroke={wave.heartGradient}
              strokeOpacity={wave.heartOpacity}
              strokeWidth={wave.width * 1.02}
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={i + 0.08}
              variants={pathDrawVariant}
              initial="hidden"
              animate="visible"
              filter="url(#glow)"
            />
            <motion.path
              d={wave.segments.right}
              fill="none"
              stroke={wave.waveColor}
              strokeOpacity={wave.waveOpacity}
              strokeWidth={wave.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={i + 0.16}
              variants={pathDrawVariant}
              initial="hidden"
              animate="visible"
              filter="url(#glow)"
            />
          </g>
        ))}

        {/* Center warm glow */}
        <motion.circle
          cx="400"
          cy="200"
          r="68"
          fill="url(#centerGlow)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1.08 }}
          transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
        />

        {/* Center "12" as vector strokes (not selectable text) */}
        <motion.g
          fill="none"
          stroke="#5d3f33"
          strokeWidth="8.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#numberGlow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2, ease: 'easeOut' }}
          style={{ transformOrigin: '400px 200px' }}
          pointerEvents="none"
          aria-hidden="true"
        >
          <path d="M362,178 L374,169 L374,236" />
          <path d="M386,181 Q399,167 417,170 Q433,173 437,188 Q441,203 424,217 L394,236 L438,236" />
        </motion.g>
      </svg>
    </div>
  )
}
