import { uk } from '../../lib/uk'

export function Marquee() {
  const repeated = uk.marquee.repeat(6)

  return (
    <section
      className="shrink-0 overflow-hidden border-y border-forest-800/90 bg-emerald-bright py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] md:py-3"
      aria-hidden
    >
      <div className="marquee-track flex whitespace-nowrap">
        <span className="px-4 text-xs font-bold tracking-[0.2em] text-ink">{repeated}</span>
        <span className="px-4 text-xs font-bold tracking-[0.2em] text-ink">{repeated}</span>
      </div>
    </section>
  )
}
