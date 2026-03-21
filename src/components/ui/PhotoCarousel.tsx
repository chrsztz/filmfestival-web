import { useEffect, useMemo, useRef } from 'react'
import { Image } from 'lucide-react'

interface PhotoCarouselProps {
  photos?: { src: string; alt: string }[]
  placeholderCount?: number
}

export default function PhotoCarousel({ photos, placeholderCount = 6 }: PhotoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const items = useMemo(
    () =>
      photos && photos.length > 0
        ? photos
        : Array.from({ length: placeholderCount }, (_, i) => ({
            src: '',
            alt: `幕后花絮 ${i + 1}`,
          })),
    [photos, placeholderCount],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateVisuals = () => {
      const maxScroll = Math.max(container.scrollWidth - container.clientWidth, 1)
      const progress = container.scrollLeft / maxScroll
      const objectPositionX = 100 - progress * 100

      container.querySelectorAll<HTMLImageElement>('[data-photo-image]').forEach((img) => {
        img.style.objectPosition = `${objectPositionX}% center`
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
        className="photo-carousel-scroll flex gap-4 overflow-x-auto pb-3 cursor-grab active:cursor-grabbing"
      >
        {items.map((item, index) => (
          <div
            key={`${item.alt}-${index}`}
            className="flex-none w-72 sm:w-80 aspect-[4/3] rounded-xl overflow-hidden border border-copper-500/20 bg-festival-navy/60"
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.alt}
                data-photo-image
                draggable={false}
                className="w-full h-full object-cover transition-[object-position] duration-300"
                style={{ objectPosition: '50% center' }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-text-muted bg-festival-navy/60">
                <Image size={32} className="mb-2 opacity-40" />
                <span className="text-xs">{item.alt}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
