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
  attractionBias: number
}

interface BlackHoleState {
  x: number
  y: number
  phase: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    pressed: false,
  })
  const particlesRef = useRef<Particle[]>([])
  const blackHolesRef = useRef<BlackHoleState[]>([])
  const clusterStableFramesRef = useRef(0)
  const spawnCooldownRef = useRef(0)
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
      attractionBias: 0.7 + Math.random() * 0.8,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.targetX = e.clientX - rect.left
      mouseRef.current.targetY = e.clientY - rect.top
    }
    const handleMouseDown = () => {
      mouseRef.current.pressed = true
    }
    const handleMouseUp = () => {
      mouseRef.current.pressed = false
    }
    const handleMouseLeave = () => {
      mouseRef.current.pressed = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const blackHoles = blackHolesRef.current
      const maxSpeed = mouse.pressed ? 3.9 : 2.6
      const mouseInfluenceRadius = 190
      const blackHoleInfluenceRadius = 300
      const mouseDeadZoneRadius = 18
      const mouseGravityBase = mouse.pressed ? 300 : 180
      const blackHoleGravityBase = 540
      const softening = 24
      const maxBlackHoles = 4
      const minHoleGap = 180

      // Cursor influence follows the real pointer with easing instead of jumping.
      mouse.x += (mouse.targetX - mouse.x) * 0.14
      mouse.y += (mouse.targetY - mouse.y) * 0.14
      spawnCooldownRef.current = Math.max(0, spawnCooldownRef.current - 1)

      const triggerRadius = 120
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
      const isStableCluster =
        clusteredCount >= (mouse.pressed ? 25 : 30) &&
        avgClusterSpeed < 0.22
      if (isStableCluster) {
        clusterStableFramesRef.current += 1
      } else {
        clusterStableFramesRef.current = Math.max(0, clusterStableFramesRef.current - 2)
      }

      if (clusterStableFramesRef.current > (mouse.pressed ? 25 : 30) && spawnCooldownRef.current === 0) {
        let tooCloseToExisting = false
        for (let h = 0; h < blackHoles.length; h++) {
          const hole = blackHoles[h]
          const d = Math.sqrt((hole.x - mouse.x) ** 2 + (hole.y - mouse.y) ** 2)
          if (d < minHoleGap) {
            tooCloseToExisting = true
            break
          }
        }

        if (!tooCloseToExisting) {
          blackHoles.push({
            x: mouse.x,
            y: mouse.y,
            phase: 0,
          })
          if (blackHoles.length > maxBlackHoles) {
            blackHoles.shift()
          }
          spawnCooldownRef.current = 80
        }
        clusterStableFramesRef.current = 0
      }

      const blackHoleNearCounts = new Array(blackHoles.length).fill(0)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 0.001 && dist < mouseDeadZoneRadius) {
          // Extremely close to cursor: stop inverse-square pull to avoid jitter clumping.
          p.vx *= 0.94
          p.vy *= 0.94
          const nx = dx / dist
          const ny = dy / dist
          p.vx += -ny * 0.01
          p.vy += nx * 0.01
          p.targetAlpha = Math.min(0.85, p.targetAlpha + 0.1)
        } else if (dist > 0.001 && dist < mouseInfluenceRadius) {
          const falloff = 1 - dist / mouseInfluenceRadius
          const accel = (mouseGravityBase * falloff) / (dist * dist + softening) * p.attractionBias
          p.vx += (dx / dist) * accel
          p.vy += (dy / dist) * accel
          p.targetAlpha = Math.min(0.8, p.targetAlpha + falloff * 0.25)
        } else {
          p.targetAlpha = Math.random() * 0.5 + 0.1
        }

        for (let h = 0; h < blackHoles.length; h++) {
          const blackHole = blackHoles[h]
          const bhDx = blackHole.x - p.x
          const bhDy = blackHole.y - p.y
          const bhDist = Math.sqrt(bhDx * bhDx + bhDy * bhDy)
          if (bhDist < 150) {
            blackHoleNearCounts[h] += 1
          }
          if (bhDist > 0.001 && bhDist < blackHoleInfluenceRadius) {
            const falloff = 1 - bhDist / blackHoleInfluenceRadius
            const nx = bhDx / bhDist
            const ny = bhDy / bhDist
            const bhAccel = (blackHoleGravityBase * falloff) / (bhDist * bhDist + softening)
            p.vx += nx * bhAccel
            p.vy += ny * bhAccel

            // Light tangential spin to make the black hole feel alive.
            p.vx += -ny * bhAccel * 0.16
            p.vy += nx * bhAccel * 0.16
          }
          if (bhDist < 14) {
            const angle = Math.random() * Math.PI * 2
            const spawnDist = 240 + Math.random() * 120
            p.x = blackHole.x + Math.cos(angle) * spawnDist
            p.y = blackHole.y + Math.sin(angle) * spawnDist
            p.vx *= 0.15
            p.vy *= 0.15
            break
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

        // Terminal velocity so particles cannot accelerate forever.
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed
          p.vx *= scale
          p.vy *= scale
        }

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
            let blackHoleFade = 1
            if (blackHoles.length > 0) {
              const midX = (p.x + p2.x) * 0.5
              const midY = (p.y + p2.y) * 0.5
              let nearest = Infinity
              for (let h = 0; h < blackHoles.length; h++) {
                const hole = blackHoles[h]
                const d = Math.sqrt((midX - hole.x) ** 2 + (midY - hole.y) ** 2)
                if (d < nearest) nearest = d
              }
              blackHoleFade = 1 - Math.max(0, 1 - nearest / 140) * 0.65
            }
            ctx.globalAlpha = (1 - dist2 / 120) * 0.15 * blackHoleFade
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      for (let h = blackHoles.length - 1; h >= 0; h--) {
        const blackHole = blackHoles[h]
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
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
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
