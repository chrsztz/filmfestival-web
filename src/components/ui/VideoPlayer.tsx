import { Play } from 'lucide-react'
import { useI18n } from '../../i18n'

interface VideoPlayerProps {
  src?: string
  poster?: string
  title?: string
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const { locale } = useI18n()

  if (!src) {
    return (
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-copper-500/20 bg-festival-navy/60 backdrop-blur-md">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-copper-500/30 bg-copper-500/20">
            <Play size={28} className="ml-1 text-copper-400" />
          </div>
          <p className="text-sm text-text-secondary">
            {title || (locale === 'zh' ? '视频即将上线' : 'Video coming soon')}
          </p>
          <p className="mt-1 text-xs text-text-muted">{locale === 'zh' ? '敬请期待' : 'Stay tuned'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-copper-500/20 bg-festival-navy">
      <video
        src={src}
        poster={poster}
        controls
        className="h-full w-full object-cover"
        preload="metadata"
      >
        {locale === 'zh'
          ? '您的浏览器不支持视频播放。'
          : 'Your browser does not support video playback.'}
      </video>
    </div>
  )
}
