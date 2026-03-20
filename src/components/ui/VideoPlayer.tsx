import { Play } from 'lucide-react'

interface VideoPlayerProps {
  src?: string
  poster?: string
  title?: string
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  if (!src) {
    return (
      <div className="relative aspect-video bg-festival-navy/60 backdrop-blur-md border border-copper-500/20 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-copper-500/20 flex items-center justify-center mx-auto mb-4 border border-copper-500/30">
            <Play size={28} className="text-copper-400 ml-1" />
          </div>
          <p className="text-text-secondary text-sm">{title || '视频即将上线'}</p>
          <p className="text-text-muted text-xs mt-1">敬请期待</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-festival-navy rounded-xl overflow-hidden border border-copper-500/20">
      <video
        src={src}
        poster={poster}
        controls
        className="w-full h-full object-cover"
        preload="metadata"
      >
        您的浏览器不支持视频播放。
      </video>
    </div>
  )
}
