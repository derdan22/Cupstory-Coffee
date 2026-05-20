import { Hero } from './Hero'
import { FeaturedPromo } from './FeaturedPromo'
import { Marquee } from './Marquee'

/** Головний екран на всю висоту: реклама + hero + бігунок внизу */
export function HomeFold() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-forest-950">
      <FeaturedPromo />
      <Hero />
      <Marquee />
    </div>
  )
}
