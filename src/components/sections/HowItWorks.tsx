import { motion } from 'framer-motion'
import { uk } from '../../lib/uk'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

export function HowItWorks() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="how-it-works" className="border-t border-forest-800 bg-forest-900 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="font-display text-xl font-bold text-cream md:text-3xl">
          {uk.howItWorks.title}
        </h2>
        <p className="mt-2 text-sm text-cream/55">{uk.howItWorks.intro}</p>
        <ol className="mt-6 flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {uk.howItWorks.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass flex gap-4 rounded-2xl p-4 sm:flex-col sm:gap-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-bright/20 text-sm font-bold text-emerald-bright">
                {i + 1}
              </span>
              <span>
                <span className="font-display block font-semibold text-cream">{step.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-cream/55">{step.desc}</span>
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
