import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ChevronLeft, ChevronRight, Image } from 'lucide-react'

interface PhotoCarouselProps {
  photos?: { src: string; alt: string }[]
  placeholderCount?: number
}

export default function PhotoCarousel({ photos, placeholderCount = 6 }: PhotoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const scrollAmount = 320
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const items = photos || Array.from({ length: placeholderCount }, (_, i) => ({
    src: '',
    alt: `幕后花絮 ${i + 1}`,
  }))

  return (
    <div className="relative group">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-festival-deep/80 backdrop-blur-sm border border-copper-500/20 flex items-center justify-center text-copper-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-festival-navy"
        aria-label="向左滚动"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-festival-deep/80 backdrop-blur-sm border border-copper-500/20 flex items-center justify-center text-copper-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-festival-navy"
        aria-label="向右滚动"
      >
        <ChevronRight size={20} />
      </button>

      {/* Carousel */}
      <motion.div
        ref={containerRef}
        style={{ x: springX }}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={containerRef}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-72 sm:w-80 aspect-[4/3] snap-center rounded-xl overflow-hidden border border-copper-500/20 bg-festival-navy/60"
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
                <Image size={32} className="mb-2 opacity-40" />
                <span className="text-xs">{item.alt}</span>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
