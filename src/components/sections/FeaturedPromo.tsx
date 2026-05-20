import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { uk } from '../../lib/uk'
import type { ProductBrand } from '../../lib/types'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

const slides = uk.promo.slides
const AUTO_MS = 6000
const SWIPE = 40

export function FeaturedPromo() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  const goTo = useCallback((i: number) => {
    setIndex((i + slides.length) % slides.length)
  }, [])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (paused || reduced) return
    const t = setInterval(next, AUTO_MS)
    return () => clearInterval(t)
  }, [paused, reduced, next])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE || info.velocity.x < -400) next()
    else if (info.offset.x > SWIPE || info.velocity.x > 400) prev()
  }

  const scrollToCatalog = (brand?: ProductBrand) => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
    if (brand) {
      window.dispatchEvent(new CustomEvent('catalog-filter', { detail: brand }))
    }
  }

  const slide = slides[index]

  return (
    <section
      id="promo"
      className="shrink-0 bg-forest-950 px-3 pb-3 pt-[4rem] md:px-8 md:pb-4 md:pt-[5rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-forest-800/90 bg-white shadow-[0_6px_28px_rgba(26,36,32,0.08)] md:rounded-[1.35rem]">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(222,184,135,0.18),transparent_50%),radial-gradient(ellipse_at_90%_100%,rgba(222,184,135,0.08),transparent_45%)]"
            aria-hidden
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={slide.id}
              drag={reduced ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.06}
              onDragEnd={onDragEnd}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative cursor-grab active:cursor-grabbing"
            >
              <div className="relative px-4 py-3 md:px-5 md:py-4">
                <div className="mb-3 flex items-center justify-between gap-3 border-b border-forest-800/70 pb-3 md:mb-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/45 md:text-[11px]">
                      {slide.tagline}
                    </p>
                    <h2 className="font-display mt-0.5 truncate text-lg font-semibold leading-tight text-cream md:text-xl">
                      {slide.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToCatalog()}
                    className="tap-target group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-forest-800/80 bg-forest-900/50 px-3 py-1.5 text-xs font-medium text-cream/70 transition hover:border-emerald-bright/60 hover:bg-emerald-bright/15 hover:text-cream md:px-4 md:py-2"
                  >
                    {uk.promo.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {slide.items.map((item) => (
                    <button
                      key={`${slide.id}-${item.name}`}
                      type="button"
                      onClick={() => scrollToCatalog(item.filter)}
                      className="group flex flex-col overflow-hidden rounded-xl border border-forest-800/50 bg-forest-900/35 text-left transition hover:border-emerald-bright/40 hover:bg-white hover:shadow-[0_4px_16px_rgba(26,36,32,0.06)] md:rounded-2xl"
                    >
                      <div className="relative flex aspect-[5/4] min-h-[112px] items-center justify-center overflow-hidden bg-gradient-to-b from-[#f5f0e8] via-[#faf8f4] to-white p-1.5 sm:min-h-[128px] md:min-h-[148px] md:p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          width={400}
                          height={400}
                          draggable={false}
                          className="h-full w-full select-none object-contain object-center drop-shadow-[0_8px_20px_rgba(26,36,32,0.12)] transition duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="px-2.5 pb-2.5 pt-2 md:px-3 md:pb-3">
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-cream/45">
                          {item.kind}
                        </span>
                        <p className="font-display mt-0.5 line-clamp-2 text-xs font-semibold leading-snug text-cream md:text-sm">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs font-bold text-gradient-gold md:text-sm">
                          {item.price} ₴
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-2.5 flex items-center justify-center gap-1.5 md:mt-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.title}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? 'w-7 bg-emerald-bright'
                  : 'w-1.5 bg-forest-800/90 hover:bg-emerald-bright/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
