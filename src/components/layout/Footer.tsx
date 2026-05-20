import { Coffee } from 'lucide-react'
import { uk } from '../../lib/uk'

export function Footer() {
  return (
    <footer className="safe-bottom border-t border-forest-800 bg-emerald-bright py-8 text-ink md:py-10">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 md:h-7 md:w-7" />
            <span className="font-display text-base font-bold md:text-lg">CupStory</span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed opacity-85 md:text-sm">{uk.footer.about}</p>
        </div>
        <p className="mt-5 text-[10px] opacity-60 md:text-xs">
          © {new Date().getFullYear()} CupStory. {uk.footer.rights}
        </p>
      </div>
    </footer>
  )
}
