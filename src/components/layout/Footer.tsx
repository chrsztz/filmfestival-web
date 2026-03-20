import { Link } from 'react-router'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-copper-500/10 bg-festival-deep">
      {/* Wave separator */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-bold bg-gradient-to-r from-copper-400 to-glow bg-clip-text text-transparent mb-3">
              合心众响
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              第十二届校园电影节<br />
              寻找影像中的时代共振
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">快速导航</h4>
            <div className="flex flex-col gap-2">
              {[
                { path: '/concept', label: '主题释义' },
                { path: '/guests', label: '评审嘉宾' },
                { path: '/submissions', label: '投递通道' },
                { path: '/news', label: '影节动态' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-text-secondary hover:text-copper-400 transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">影节信息</h4>
            <div className="text-sm text-text-secondary space-y-2">
              <p>投稿截止：2026年3月25日</p>
              <p>颁奖典礼：2026年4月15日</p>
              <p>联系组委会获取更多信息</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-copper-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; 2026 第十二届校园电影节组委会
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1">
            以 <Heart size={12} className="text-copper-500" /> 构建
          </p>
        </div>
      </div>
    </footer>
  )
}
