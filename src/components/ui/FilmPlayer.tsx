import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Loader2,
  RotateCcw,
} from 'lucide-react'
import { useI18n } from '../../i18n'

interface FilmPlayerProps {
  src: string
  poster?: string
  title?: string
  autoPlay?: boolean
  className?: string
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function FilmPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  className = '',
}: FilmPlayerProps) {
  const { locale } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hideTimerRef = useRef<number | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(autoPlay)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [seekHover, setSeekHover] = useState<{ x: number; time: number } | null>(null)

  const t = (zh: string, en: string) => (locale === 'zh' ? zh : en)

  // Auto-hide controls
  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    hideTimerRef.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false)
      }
    }, 2600)
  }, [])

  const revealControls = useCallback(() => {
    setShowControls(true)
    scheduleHide()
  }, [scheduleHide])

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current)
    }
  }, [])

  // Sync video state to React
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => {
      setIsPlaying(true)
      setHasStarted(true)
      scheduleHide()
    }
    const onPause = () => {
      setIsPlaying(false)
      setShowControls(true)
    }
    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    const onDuration = () => setDuration(video.duration)
    const onProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1))
      }
    }
    const onWaiting = () => setIsLoading(true)
    const onPlaying = () => setIsLoading(false)
    const onCanPlay = () => setIsLoading(false)
    const onVolume = () => {
      setVolume(video.volume)
      setMuted(video.muted)
    }
    const onError = () => {
      setHasError(true)
      setIsLoading(false)
    }
    const onEnded = () => {
      setIsPlaying(false)
      setShowControls(true)
    }

    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadedmetadata', onDuration)
    video.addEventListener('durationchange', onDuration)
    video.addEventListener('progress', onProgress)
    video.addEventListener('waiting', onWaiting)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('volumechange', onVolume)
    video.addEventListener('error', onError)
    video.addEventListener('ended', onEnded)

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('loadedmetadata', onDuration)
      video.removeEventListener('durationchange', onDuration)
      video.removeEventListener('progress', onProgress)
      video.removeEventListener('waiting', onWaiting)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('volumechange', onVolume)
      video.removeEventListener('error', onError)
      video.removeEventListener('ended', onEnded)
    }
  }, [scheduleHide])

  // Fullscreen state sync
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current) return
      const active = document.activeElement
      if (
        active &&
        (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') &&
        active !== containerRef.current
      ) {
        return
      }
      if (!isFullscreen && document.activeElement !== containerRef.current) return

      const video = videoRef.current
      if (!video) return

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          video.currentTime = Math.max(0, video.currentTime - 5)
          revealControls()
          break
        case 'ArrowRight':
          e.preventDefault()
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 5)
          revealControls()
          break
        case 'm':
          e.preventDefault()
          video.muted = !video.muted
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen, revealControls])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    if (!video.muted && video.volume === 0) {
      video.volume = 0.6
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return
    const v = parseFloat(e.target.value)
    video.volume = v
    video.muted = v === 0
  }

  const seekTo = (time: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, Math.min(video.duration || 0, time))
  }

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    seekTo(ratio * (duration || 0))
  }

  const handleSeekHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const ratio = Math.max(0, Math.min(1, x / rect.width))
    setSeekHover({ x, time: ratio * (duration || 0) })
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await containerRef.current.requestFullscreen()
    }
  }

  const restart = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    void video.play()
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0
  const volumePct = (muted ? 0 : volume) * 100

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseMove={revealControls}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={() => hasStarted && togglePlay()}
      className={`group relative aspect-video w-full overflow-hidden rounded-xl border border-copper-500/20 bg-black shadow-[0_20px_70px_-25px_rgba(0,0,0,0.65)] outline-none ring-copper-500/40 focus-visible:ring-2 ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        preload="metadata"
        className="h-full w-full bg-black object-contain"
      />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

      {/* Big-play overlay (before first start) */}
      <AnimatePresence>
        {!hasStarted && !hasError && (
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-festival-deep/40 via-festival-deep/30 to-festival-deep/70 backdrop-blur-[2px]"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full border border-copper-400/40 bg-festival-navy/70 shadow-[0_0_60px_rgba(212,132,90,0.35)] backdrop-blur-md"
            >
              <span className="absolute inset-0 animate-pulse rounded-full border border-copper-400/30" />
              <Play size={32} className="ml-1.5 text-copper-300" fill="currentColor" />
            </motion.div>
            {title && (
              <span className="font-serif text-base text-text-primary/90 sm:text-lg">{title}</span>
            )}
            <span className="text-xs uppercase tracking-[0.3em] text-copper-300/80">
              {t('点击播放', 'Click to Play')}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Loading spinner */}
      <AnimatePresence>
        {isLoading && hasStarted && !hasError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <Loader2 size={42} className="animate-spin text-copper-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-festival-deep/85 px-6 text-center backdrop-blur-sm">
          <span className="font-serif text-lg text-copper-400">
            {t('视频加载失败', 'Failed to Load Video')}
          </span>
          <span className="text-sm text-text-muted">
            {t('请检查网络连接后重试', 'Please check your connection and try again.')}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setHasError(false)
              videoRef.current?.load()
            }}
            className="mt-2 rounded-full border border-copper-500/30 bg-copper-500/10 px-4 py-1.5 text-xs text-copper-300 transition-colors hover:bg-copper-500/20"
          >
            {t('重试', 'Retry')}
          </button>
        </div>
      )}

      {/* Controls bar */}
      <AnimatePresence>
        {hasStarted && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 12 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-gradient-to-t from-festival-deep/95 via-festival-deep/70 to-transparent px-4 pb-3 pt-10 sm:px-5 sm:pb-4"
          >
            {/* Seek bar */}
            <div
              className="group/seek relative h-3 cursor-pointer"
              onClick={handleSeekClick}
              onMouseMove={handleSeekHover}
              onMouseLeave={() => setSeekHover(null)}
            >
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
                <div
                  className="absolute inset-y-0 left-0 bg-white/20"
                  style={{ width: `${bufferedPct}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-copper-500 via-copper-400 to-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-300 opacity-0 shadow-[0_0_12px_rgba(232,160,80,0.6)] transition-opacity group-hover/seek:opacity-100"
                style={{ left: `${progress}%` }}
              />
              {seekHover && (
                <div
                  className="pointer-events-none absolute -top-7 -translate-x-1/2 rounded bg-festival-deep/90 px-1.5 py-0.5 font-mono text-[10px] text-copper-200 shadow ring-1 ring-copper-500/30"
                  style={{ left: seekHover.x }}
                >
                  {formatTime(seekHover.time)}
                </div>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex items-center gap-3 text-text-primary">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full text-copper-300 transition-colors hover:bg-copper-500/10 hover:text-copper-200"
                aria-label={isPlaying ? t('暂停', 'Pause') : t('播放', 'Play')}
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} className="ml-0.5" fill="currentColor" />
                )}
              </button>

              <button
                type="button"
                onClick={restart}
                className="hidden h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-copper-500/10 hover:text-copper-300 sm:flex"
                aria-label={t('重新播放', 'Restart')}
              >
                <RotateCcw size={16} />
              </button>

              <div className="group/vol flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-copper-500/10 hover:text-copper-300"
                  aria-label={muted ? t('取消静音', 'Unmute') : t('静音', 'Mute')}
                >
                  {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <div className="hidden w-0 overflow-hidden transition-all duration-300 group-hover/vol:w-20 sm:block">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="film-volume-slider h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/15"
                    style={{
                      background: `linear-gradient(to right, var(--color-copper-400) 0%, var(--color-copper-400) ${volumePct}%, rgba(255,255,255,0.15) ${volumePct}%, rgba(255,255,255,0.15) 100%)`,
                    }}
                    aria-label={t('音量', 'Volume')}
                  />
                </div>
              </div>

              <div className="ml-1 font-mono text-xs tabular-nums text-text-secondary">
                <span className="text-copper-200">{formatTime(currentTime)}</span>
                <span className="mx-1 text-text-muted">/</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                {title && (
                  <span className="hidden max-w-[260px] truncate font-serif text-sm text-text-secondary md:block">
                    {title}
                  </span>
                )}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-copper-500/10 hover:text-copper-300"
                  aria-label={isFullscreen ? t('退出全屏', 'Exit Fullscreen') : t('全屏', 'Fullscreen')}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
