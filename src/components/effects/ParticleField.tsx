import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  targetAlpha: number
}

interface BlackHoleState {
  active: boolean
  x: number
  y: number
  phase: number
  stableFrames: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const blackHoleRef = useRef<BlackHoleState>({
    active: false,
    x: -1000,
    y: -1000,
    phase: 0,
    stableFrames: 0,
  })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#d4845a', '#c67a4a', '#e8a050', '#97a86a', '#8a9a5a']
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 50 : 120

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.1,
      targetAlpha: Math.random() * 0.5 + 0.1,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const blackHole = blackHoleRef.current

      const triggerRadius = 115
      let clusteredCount = 0
      let clusteredSpeedTotal = 0
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < triggerRadius) {
          clusteredCount++
          clusteredSpeedTotal += Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        }
      }

      const avgClusterSpeed = clusteredCount > 0 ? clusteredSpeedTotal / clusteredCount : Infinity
      const isStableCluster = clusteredCount >= 30 && avgClusterSpeed < 0.16
      if (!blackHole.active && isStableCluster) {
        blackHole.stableFrames += 1
      } else {
        blackHole.stableFrames = Math.max(0, blackHole.stableFrames - 2)
      }

      if (!blackHole.active && blackHole.stableFrames > 24) {
        blackHole.active = true
        blackHole.x = mouse.x
        blackHole.y = mouse.y
        blackHole.phase = 0
        blackHole.stableFrames = 0
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 0.001 && dist < 150) {
          const force = (150 - dist) / 150
          p.vx += (dx / dist) * force * 0.25
          p.vy += (dy / dist) * force * 0.25
          p.targetAlpha = Math.min(0.8, p.targetAlpha + force * 0.3)
        } else {
          p.targetAlpha = Math.random() * 0.5 + 0.1
        }

        if (blackHole.active) {
          const bhDx = blackHole.x - p.x
          const bhDy = blackHole.y - p.y
          const bhDist = Math.sqrt(bhDx * bhDx + bhDy * bhDy)
          if (bhDist > 0.001 && bhDist < 280) {
            const pull = (280 - bhDist) / 280
            const nx = bhDx / bhDist
            const ny = bhDy / bhDist
            p.vx += nx * pull * 0.55
            p.vy += ny * pull * 0.55

            // Light tangential spin to make the black hole feel alive.
            p.vx += -ny * pull * 0.09
            p.vy += nx * pull * 0.09
          }
          if (bhDist < 14) {
            const angle = Math.random() * Math.PI * 2
            const spawnDist = 240 + Math.random() * 120
            p.x = blackHole.x + Math.cos(angle) * spawnDist
            p.y = blackHole.y + Math.sin(angle) * spawnDist
            p.vx *= 0.15
            p.vy *= 0.15
          }
        }

        // Alpha lerp
        p.alpha += (p.targetAlpha - p.alpha) * 0.02

        // Movement
        p.x += p.vx
        p.y += p.vy

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()

        // Keep nearby particles from clumping while preserving a soft, floating look.
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          if (dist2 > 0.001 && dist2 < 26) {
            const repel = ((26 - dist2) / 26) * 0.02
            const nx = dx2 / dist2
            const ny = dy2 / dist2
            p.vx += nx * repel
            p.vy += ny * repel
            p2.vx -= nx * repel
            p2.vy -= ny * repel
          }

          // Draw connections
          if (dist2 < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = p.color
            const blackHoleFade =
              blackHole.active
                ? 1 -
                  Math.max(
                    0,
                    1 -
                      Math.sqrt(
                        ((p.x + p2.x) * 0.5 - blackHole.x) ** 2 +
                          ((p.y + p2.y) * 0.5 - blackHole.y) ** 2,
                      ) /
                        140,
                  ) *
                    0.65
                : 1
            ctx.globalAlpha = (1 - dist2 / 120) * 0.15 * blackHoleFade
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      if (blackHole.active) {
        const pulse = 1 + Math.sin(blackHole.phase * 0.22) * 0.08

        const halo = ctx.createRadialGradient(
          blackHole.x,
          blackHole.y,
          8,
          blackHole.x,
          blackHole.y,
          90,
        )
        halo.addColorStop(0, 'rgba(10,10,14,0.95)')
        halo.addColorStop(0.3, 'rgba(18,18,26,0.7)')
        halo.addColorStop(0.65, 'rgba(92,77,66,0.2)')
        halo.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.globalAlpha = 0.9
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(blackHole.x, blackHole.y, 95 * pulse, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 0.95
        ctx.beginPath()
        ctx.arc(blackHole.x, blackHole.y, 10 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = '#060608'
        ctx.fill()
        blackHole.phase += 1
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  )
}
