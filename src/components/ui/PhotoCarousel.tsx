import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../../i18n'

interface PhotoCarouselItem {
  src: string
  alt: string
  description?: string
}

interface PhotoCarouselProps {
  photos?: PhotoCarouselItem[]
  placeholderCount?: number
}

const mod = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor

export default function PhotoCarousel({ photos, placeholderCount = 6 }: PhotoCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const virtualOffsetRef = useRef(0)
  const periodRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const dragStateRef = useRef({ active: false, startX: 0, startOffset: 0 })

  const { locale } = useI18n()
  const [imagesReady, setImagesReady] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const items = useMemo(
    () =>
      photos && photos.length > 0
        ? photos
        : Array.from({ length: placeholderCount }, (_, i) => ({
            src: '',
            alt: locale === 'zh' ? `幕后花絮 ${i + 1}` : `Behind the Scenes ${i + 1}`,
            description: '',
          })),
    [locale, photos, placeholderCount],
  )

  const groups = useMemo(() => [items, items, items], [items])

  useEffect(() => {
    const sources = [...new Set(items.map((item) => item.src).filter(Boolean))]
    let cancelled = false

    setImagesReady(false)
    setIsInitialized(false)
    virtualOffsetRef.current = 0
    periodRef.current = 0

    if (sources.length === 0) {
      setImagesReady(true)
      return
    }

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image()
        const finish = () => resolve()

        image.onload = finish
        image.onerror = finish
        image.src = src

        if (image.complete) {
          resolve()
        }
      })

    Promise.all(sources.map(preload)).then(() => {
      if (!cancelled) {
        setImagesReady(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [items])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track || !imagesReady || items.length === 0) return

    const measurePeriod = () => {
      const groupEls = track.querySelectorAll<HTMLDivElement>('[data-photo-group]')
      if (groupEls.length < 2) return 0
      return groupEls[1].getBoundingClientRect().left - groupEls[0].getBoundingClientRect().left
    }

    const updateVisuals = (normalizedOffset: number, period: number) => {
      const parallaxShift = Math.sin(virtualOffsetRef.current / 240) * 18

      track.querySelectorAll<HTMLImageElement>('[data-photo-image]').forEach((img) => {
        img.style.transform = `translateX(${parallaxShift}px) scale(1.08)`
      })

      const viewportRect = viewport.getBoundingClientRect()
      const viewportCenter = viewportRect.left + viewportRect.width / 2

      track.querySelectorAll<HTMLDivElement>('[data-photo-card]').forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distanceRatio = Math.min(Math.abs(viewportCenter - cardCenter) / viewportRect.width, 1)
        const focus = 1 - distanceRatio
        const scale = 0.88 + focus * 0.12
        const opacity = 0.42 + focus * 0.58
        const y = (1 - focus) * 24

        card.style.transform = `translateY(${y}px) scale(${scale})`
        card.style.opacity = String(opacity)
      })
    }

    const applyTrackPosition = () => {
      const period = periodRef.current
      if (period <= 0) return

      const normalizedOffset = mod(virtualOffsetRef.current, period)
      track.style.transform = `translate3d(${-period - normalizedOffset}px, 0, 0)`
      updateVisuals(normalizedOffset, period)
    }

    const scheduleApplyTrackPosition = () => {
      if (frameRef.current !== null) return

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        applyTrackPosition()
      })
    }

    const initialize = () => {
      periodRef.current = measurePeriod()
      virtualOffsetRef.current = 0
      applyTrackPosition()

      const revealFrame = requestAnimationFrame(() => {
        setIsInitialized(true)
      })

      return revealFrame
    }

    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 768) return

      const horizontalDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (horizontalDelta === 0) return

      event.preventDefault()
      virtualOffsetRef.current += horizontalDelta
      scheduleApplyTrackPosition()
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return

      dragStateRef.current = {
        active: true,
        startX: event.clientX,
        startOffset: virtualOffsetRef.current,
      }

      viewport.style.cursor = 'grabbing'
      viewport.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragStateRef.current.active) return

      event.preventDefault()
      const deltaX = event.clientX - dragStateRef.current.startX
      virtualOffsetRef.current = dragStateRef.current.startOffset - deltaX
      scheduleApplyTrackPosition()
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (!dragStateRef.current.active) return

      dragStateRef.current.active = false
      viewport.style.cursor = ''
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId)
      }
    }

    const handleResize = () => {
      periodRef.current = measurePeriod()
      applyTrackPosition()
    }

    const resizeObserver = new ResizeObserver(() => {
      periodRef.current = measurePeriod()
      applyTrackPosition()
    })

    const revealFrame = initialize()

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    viewport.addEventListener('pointerdown', handlePointerDown)
    viewport.addEventListener('pointermove', handlePointerMove)
    viewport.addEventListener('pointerup', handlePointerUp)
    viewport.addEventListener('pointercancel', handlePointerUp)
    window.addEventListener('resize', handleResize)
    resizeObserver.observe(viewport)
    resizeObserver.observe(track)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }

      cancelAnimationFrame(revealFrame)
      resizeObserver.disconnect()
      viewport.removeEventListener('wheel', handleWheel)
      viewport.removeEventListener('pointerdown', handlePointerDown)
      viewport.removeEventListener('pointermove', handlePointerMove)
      viewport.removeEventListener('pointerup', handlePointerUp)
      viewport.removeEventListener('pointercancel', handlePointerUp)
      window.removeEventListener('resize', handleResize)
    }
  }, [imagesReady, items])

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        className={`photo-carousel-scroll overflow-hidden px-[18vw] pb-3 ${isInitialized ? 'opacity-100' : 'opacity-0'}`}
      >
        <div ref={trackRef} className="flex gap-4 will-change-transform">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} data-photo-group className="flex flex-none gap-4">
              {group.map((item, index) => (
                <div
                  key={`${groupIndex}-${item.alt}-${index}`}
                  data-photo-card
                  className="h-[420px] w-72 flex-none overflow-hidden rounded-xl border border-copper-500/20 bg-festival-navy/60 will-change-transform sm:h-[480px] sm:w-80"
                  title={item.description || undefined}
                >
                  {item.src ? (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-festival-navy/60">
                      <img
                        src={item.src}
                        alt={item.alt}
                        title={item.description || undefined}
                        data-photo-image
                        draggable={false}
                        className="h-full w-auto max-w-none shrink-0 will-change-transform"
                        style={{ transform: 'translateX(0px) scale(1.08)', transformOrigin: 'center center' }}
                      />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-festival-navy/60 px-6 text-center" aria-label={item.alt}>
                      <span className="font-serif text-lg tracking-[0.16em] text-copper-300/80 sm:text-xl">
                        {locale === 'zh' ? '敬请期待' : 'Coming Soon'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
