import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import type { Product, ProductBrand } from '../../lib/types'
import { getCategoryLabel, uk } from '../../lib/uk'
import { useCartStore } from '../../store/cart-store'
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMedia'
import { GlassCard } from '../ui/GlassCard'
import { ProductDetailModal } from './ProductDetailModal'

const brandBadge: Record<ProductBrand, string> = {
  Lavazza: 'bg-lavazza',
  Jacobs: 'bg-jacobs',
  MacCoffee: 'bg-maccoffee',
  Ambassador: 'bg-ambassador',
}

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const [detailOpen, setDetailOpen] = useState(false)

  const handleAdd = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()
      addItem(product)
      toast.success(`${product.name} ${uk.product.added}`)
    },
    [addItem, product],
  )

  const blockCardClick = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation()
  }, [])

  const openDetails = useCallback(() => setDetailOpen(true), [])

  return (
    <>
      <motion.article
        initial={reduced ? false : { opacity: 0, y: mobile ? 8 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: mobile ? '0px' : '-16px' }}
        transition={{
          delay: mobile || reduced ? 0 : Math.min(index * 0.03, 0.25),
          duration: mobile ? 0.25 : 0.35,
        }}
        className="h-full"
      >
        <GlassCard hover={!mobile} className="flex h-full flex-col !p-3 md:!p-5">
          <button
            type="button"
            onClick={openDetails}
            className="touch-manipulation flex min-h-0 flex-1 flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-bright/50 rounded-xl"
          >
            <div className="relative mb-2 overflow-hidden rounded-xl bg-forest-900 md:mb-3 md:rounded-2xl">
              <img
                src={product.image_url}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-contain p-2 md:p-4"
              />
              <span
                className={`absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold text-white md:left-2 md:top-2 md:text-[10px] ${brandBadge[product.brand]}`}
              >
                {product.brand}
              </span>
            </div>
            <h3 className="font-display line-clamp-2 text-sm font-semibold leading-snug text-cream md:text-lg">
              {product.name}
            </h3>
            <p className="mt-1 text-[10px] text-cream/45 md:text-[11px]">
              {getCategoryLabel(product.category)} · {product.weight}
            </p>
            <p className="mt-1.5 line-clamp-2 flex-1 text-xs text-cream/55 md:mt-2 md:text-sm">
              {product.description}
            </p>
          </button>

          <div
            className="relative z-[2] mt-3 flex items-center justify-between gap-2 border-t border-forest-800 pt-3 md:mt-4 md:pt-4"
            onClick={blockCardClick}
            onPointerDown={blockCardClick}
          >
            <p className="pointer-events-none text-lg font-bold text-gradient-gold md:text-xl">
              {product.price} ₴
            </p>
            <button
              type="button"
              onClick={handleAdd}
              onPointerDown={blockCardClick}
              className="touch-manipulation relative z-[3] flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-bright text-ink shadow-[0_2px_12px_rgba(222,184,135,0.45)] transition hover:bg-emerald active:scale-95 md:h-10 md:w-10"
              aria-label={`${uk.product.add}: ${product.name}`}
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </GlassCard>
      </motion.article>

      <ProductDetailModal
        product={product}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  )
}
