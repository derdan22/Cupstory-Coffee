import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { usePrefersReducedMotion } from '../../hooks/useMedia'
import { uk } from '../../lib/uk'

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden bg-gradient-to-b from-forest-900 via-white to-white px-0 py-4 md:py-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(222,184,135,0.22),transparent_55%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center md:gap-10">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-bright/80 md:text-xs">
              {uk.hero.badge}
            </p>
            <h1 className="font-display text-[1.75rem] font-bold leading-[1.1] text-cream sm:text-4xl md:text-5xl">
              {uk.hero.title}{' '}
              <span className="text-gradient-emerald">{uk.hero.titleAccent}</span>
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-cream/65 md:mt-4 md:text-base">
              {uk.hero.subtitle}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-6">
              <Button onClick={() => scrollTo('catalog')} className="w-full sm:w-auto">
                {uk.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => scrollTo('how-it-works')}
              >
                {uk.hero.ctaAlt}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="order-1 flex justify-center md:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=640&q=80"
              alt="Преміум еспресо"
              width={640}
              height={800}
              fetchPriority="high"
              className="relative z-10 max-h-[220px] w-full max-w-[260px] rounded-2xl object-cover shadow-2xl glow-emerald sm:max-h-[280px] sm:max-w-[300px] md:max-h-[340px] md:rounded-3xl md:max-w-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
