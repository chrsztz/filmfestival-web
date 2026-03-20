import { motion } from 'framer-motion'

interface AnimatedLogoProps {
  className?: string
  size?: number
}

export default function AnimatedLogo({ className = '', size = 600 }: AnimatedLogoProps) {
  const viewBox = '0 0 800 400'

  // Heart-wave paths - copper colored (outer to inner)
  const copperPaths = [
    // Outermost copper heart-wave with extended side waves
    'M400,340 C350,340 200,280 140,200 C80,120 100,60 160,40 C220,20 300,50 360,100 C380,115 395,140 400,160 C405,140 420,115 440,100 C500,50 580,20 640,40 C700,60 720,120 660,200 C600,280 450,340 400,340 M140,200 C120,210 60,200 20,190 C0,185 -20,180 -40,185 M660,200 C680,210 740,200 780,190 C800,185 820,180 840,185',
    // Second copper heart-wave
    'M400,320 C360,320 230,270 170,200 C110,130 125,75 175,55 C225,35 300,65 355,110 C375,125 393,148 400,165 C407,148 425,125 445,110 C500,65 575,35 625,55 C675,75 690,130 630,200 C570,270 440,320 400,320 M170,200 C150,208 100,200 60,195 C35,192 10,190 -10,193 M630,200 C650,208 700,200 740,195 C765,192 790,190 810,193',
    // Third copper heart-wave
    'M400,300 C368,300 255,258 200,200 C145,142 155,92 195,72 C235,52 305,78 353,118 C373,133 392,155 400,170 C408,155 427,133 447,118 C495,78 565,52 605,72 C645,92 655,142 600,200 C545,258 432,300 400,300 M200,200 C182,207 140,200 108,197 C85,195 62,194 45,196 M600,200 C618,207 660,200 692,197 C715,195 738,194 755,196',
    // Fourth copper heart-wave (innermost copper)
    'M400,280 C375,280 280,248 230,200 C180,152 188,110 218,92 C248,74 310,92 350,125 C370,140 390,160 400,175 C410,160 430,140 450,125 C490,92 552,74 582,92 C612,110 620,152 570,200 C520,248 425,280 400,280 M230,200 C215,205 182,200 155,198 C138,197 120,196 108,198 M570,200 C585,205 618,200 645,198 C662,197 680,196 692,198',
  ]

  // Heart-wave paths - sage colored (interleaved with copper)
  const sagePaths = [
    // Outermost sage heart-wave
    'M400,330 C355,330 215,275 155,200 C95,125 112,68 168,48 C224,28 302,58 358,105 C378,120 394,144 400,162 C406,144 422,120 442,105 C498,58 576,28 632,48 C688,68 705,125 645,200 C585,275 445,330 400,330 M155,200 C135,209 80,200 40,193 C18,189 -5,185 -25,189 M645,200 C665,209 720,200 760,193 C782,189 805,185 825,189',
    // Second sage heart-wave
    'M400,310 C365,310 243,264 185,200 C127,136 140,83 185,63 C230,43 303,72 354,114 C374,129 392,152 400,168 C408,152 426,129 446,114 C497,72 570,43 615,63 C660,83 673,136 615,200 C557,264 435,310 400,310 M185,200 C167,208 120,200 85,196 C62,194 38,192 20,195 M615,200 C633,208 680,200 715,196 C738,194 762,192 780,195',
    // Third sage heart-wave
    'M400,290 C372,290 268,253 215,200 C162,147 172,100 207,82 C242,64 308,85 352,122 C372,137 391,158 400,172 C409,158 428,137 448,122 C492,85 558,64 593,82 C628,100 638,147 585,200 C532,253 428,290 400,290 M215,200 C198,206 160,200 130,197 C110,196 90,195 75,197 M585,200 C602,206 640,200 670,197 C690,196 710,195 725,197',
    // Innermost sage heart-wave
    'M400,268 C380,268 295,240 248,200 C200,160 207,122 232,107 C257,92 315,105 348,130 C368,143 389,162 400,175 C411,162 432,143 452,130 C485,105 543,92 568,107 C593,122 600,160 552,200 C505,240 420,268 400,268 M248,200 C235,204 205,200 182,198 C165,197 148,196 138,198 M552,200 C565,204 595,200 618,198 C635,197 652,196 662,198',
  ]

  // Center diamond shape paths
  const centerPaths = [
    'M400,235 L370,200 L400,165 L430,200 Z',
    'M400,248 L360,200 L400,152 L440,200 Z',
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
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8a050" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#d4845a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#d4845a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Copper paths */}
        {copperPaths.map((d, i) => (
          <motion.path
            key={`copper-${i}`}
            d={d}
            fill="none"
            stroke="#d4845a"
            strokeWidth={1.5 - i * 0.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            custom={i}
            variants={pathDrawVariant}
            initial="hidden"
            animate="visible"
            filter="url(#glow)"
          />
        ))}

        {/* Sage paths (interleaved) */}
        {sagePaths.map((d, i) => (
          <motion.path
            key={`sage-${i}`}
            d={d}
            fill="none"
            stroke="#97a86a"
            strokeWidth={1.5 - i * 0.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            custom={i + 0.5}
            variants={pathDrawVariant}
            initial="hidden"
            animate="visible"
            filter="url(#glow)"
          />
        ))}

        {/* Center diamond outlines */}
        {centerPaths.map((d, i) => (
          <motion.path
            key={`center-${i}`}
            d={d}
            fill="none"
            stroke={i === 0 ? '#d4845a' : '#97a86a'}
            strokeWidth={1.2}
            custom={4 + i * 0.3}
            variants={pathDrawVariant}
            initial="hidden"
            animate="visible"
          />
        ))}

        {/* Center warm glow */}
        <motion.circle
          cx="400"
          cy="200"
          r="45"
          fill="url(#centerGlow)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
        />

        {/* Number 12 */}
        <motion.text
          x="400"
          y="210"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-serif"
          fontSize="42"
          fontWeight="700"
          fill="#e8a050"
          filter="url(#strongGlow)"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2, ease: 'easeOut' }}
        >
          12
        </motion.text>
      </svg>
    </div>
  )
}
