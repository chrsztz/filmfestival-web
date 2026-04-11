import { useEffect, useMemo, useRef } from 'react'
import { useI18n } from '../../i18n'

interface PhotoCarouselProps {
  photos?: { src: string; alt: string }[]
  placeholderCount?: number
}

export default function PhotoCarousel({ photos, placeholderCount = 6 }: PhotoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { locale } = useI18n()

  const items = useMemo(
    () =>
      photos && photos.length > 0
        ? photos
        : Array.from({ length: placeholderCount }, (_, i) => ({
            src: '',
            alt: locale === 'zh' ? `幕后花絮 ${i + 1}` : `Behind the Scenes ${i + 1}`,
          })),
    [locale, photos, placeholderCount],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateVisuals = () => {
      const maxScroll = Math.max(container.scrollWidth - container.clientWidth, 1)
      const progress = container.scrollLeft / maxScroll
      const imageOffset = -18 + progress * 36

      container.querySelectorAll<HTMLImageElement>('[data-photo-image]').forEach((img) => {
        img.style.transform = `translateX(${imageOffset}%) scale(1.08)`
      })

      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      container.querySelectorAll<HTMLDivElement>('[data-photo-card]').forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distanceRatio = Math.min(Math.abs(containerCenter - cardCenter) / containerRect.width, 1)
        const focus = 1 - distanceRatio
        const scale = 0.88 + focus * 0.12
        const opacity = 0.42 + focus * 0.58
        const y = (1 - focus) * 24

        card.style.transform = `translateY(${y}px) scale(${scale})`
        card.style.opacity = String(opacity)
      })
    }

    const centerOnLoad = () => {
      const maxScroll = Math.max(container.scrollWidth - container.clientWidth, 0)
      container.scrollLeft = maxScroll / 2
      updateVisuals()
    }

    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < 768) return
      const horizontalDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (horizontalDelta === 0) return
      event.preventDefault()
      container.scrollLeft += horizontalDelta
      updateVisuals()
    }

    let isPointerDragging = false
    let startX = 0
    let startScrollLeft = 0

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      isPointerDragging = true
      startX = event.clientX
      startScrollLeft = container.scrollLeft
      container.style.cursor = 'grabbing'
      container.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isPointerDragging) return
      event.preventDefault()
      const deltaX = event.clientX - startX
      container.scrollLeft = startScrollLeft - deltaX
      updateVisuals()
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (!isPointerDragging) return
      isPointerDragging = false
      container.style.cursor = ''
      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId)
      }
    }

    const handleScroll = () => updateVisuals()
    const handleResize = () => centerOnLoad()

    centerOnLoad()

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('pointerdown', handlePointerDown)
    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerup', handlePointerUp)
    container.addEventListener('pointercancel', handlePointerUp)
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('pointerdown', handlePointerDown)
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerup', handlePointerUp)
      container.removeEventListener('pointercancel', handlePointerUp)
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [items.length])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="photo-carousel-scroll flex cursor-grab gap-4 overflow-x-auto px-[18vw] pb-3 active:cursor-grabbing"
      >
        {items.map((item, index) => (
          <div
            key={`${item.alt}-${index}`}
            data-photo-card
            className="h-[420px] w-72 flex-none overflow-hidden rounded-xl border border-copper-500/20 bg-festival-navy/60 transition-[transform,opacity,border-color,box-shadow] duration-300 ease-out will-change-transform sm:h-[480px] sm:w-80"
          >
            {item.src ? (
              <div className="h-full w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  data-photo-image
                  draggable={false}
                  className="h-full w-full object-cover will-change-transform"
                  style={{ transform: 'translateX(0%) scale(1.08)', transformOrigin: 'center center' }}
                />
              </div>
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-festival-navy/60 px-6 text-center"
                aria-label={item.alt}
              >
                <span className="font-serif text-lg tracking-[0.16em] text-copper-300/80 sm:text-xl">
                  {locale === 'zh' ? '敬请期待' : 'Coming Soon'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
