import { Heart } from 'lucide-react'
import { useI18n } from '../../i18n'

export default function Footer() {
  const { locale } = useI18n()

  const copy =
    locale === 'zh'
      ? {
          brand: '合心众响',
          edition: '第十二届校园电影节',
          theme: '寻找影像中的时代共振',
          infoTitle: '影节信息',
          deadline: '投稿截止：2026年3月25日',
          ceremony: '颁奖典礼：2026年4月15日',
          contact: '联系组委会获取更多信息',
          copyright: '© 2026 第十二届校园电影节组委会',
          builtWith: '以',
          builtEnd: '构建',
        }
      : {
          brand: 'RESONANCE',
          edition: 'The 12th Campus Film Festival',
          theme: 'Finding the resonance of our era through moving images',
          infoTitle: 'Festival Info',
          deadline: 'Submission Deadline: March 25, 2026',
          ceremony: 'Award Ceremony: April 15, 2026',
          contact: 'Contact the committee for more information',
          copyright: '© 2026 The 12th Campus Film Festival Committee',
          builtWith: 'Built with',
          builtEnd: '',
        }

  return (
    <footer className="relative border-t border-copper-500/10 bg-festival-deep">
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 bg-gradient-to-r from-copper-400 to-glow bg-clip-text font-serif text-lg font-bold text-transparent">
              {copy.brand}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              {copy.edition}
              <br />
              {copy.theme}
            </p>
          </div>

          <div className="md:justify-self-end md:text-right">
            <h4 className="mb-3 text-sm font-medium text-text-primary">{copy.infoTitle}</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>{copy.deadline}</p>
              <p>{copy.ceremony}</p>
              <p>{copy.contact}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-copper-500/10 pt-6 sm:flex-row">
          <p className="text-xs text-text-muted">{copy.copyright}</p>
          <p className="flex items-center gap-1 text-xs text-text-muted">
            {copy.builtWith} <Heart size={12} className="text-copper-500" /> {copy.builtEnd}
          </p>
        </div>
      </div>
    </footer>
  )
}
