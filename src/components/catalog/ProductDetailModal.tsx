import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import type { Product, ProductBrand } from '../../lib/types'
import { getCategoryLabel, uk } from '../../lib/uk'
import { useCartStore } from '../../store/cart-store'
import { Button } from '../ui/Button'

const brandBadge: Record<ProductBrand, string> = {
  Lavazza: 'bg-lavazza',
  Jacobs: 'bg-jacobs',
  MacCoffee: 'bg-maccoffee',
  Ambassador: 'bg-ambassador',
}

interface ProductDetailModalProps {
  product: Product | null
  open: boolean
  onClose: () => void
}

export function ProductDetailModal({ product, open, onClose }: ProductDetailModalProps) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    if (!product) return
    addItem(product)
    toast.success(`${product.name} ${uk.product.added}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center p-3 sm:p-4 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/45" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="safe-bottom relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-forest-800/80 bg-white shadow-2xl md:max-w-2xl md:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-cream shadow-md transition hover:bg-forest-900 md:right-4 md:top-4"
              aria-label={uk.product.close}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="relative bg-forest-900 px-6 pb-8 pt-10 md:px-10 md:pb-10 md:pt-12">
                <span
                  className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold text-white md:left-6 md:top-6 ${brandBadge[product.brand]}`}
                >
                  {product.brand}
                </span>
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="mx-auto max-h-[220px] w-full max-w-[280px] object-contain drop-shadow-lg md:max-h-[280px]"
                />
              </div>

              <div className="px-5 py-5 md:px-8 md:py-6">
                <h2
                  id="product-detail-title"
                  className="font-display pr-8 text-xl font-bold leading-tight text-cream md:text-2xl"
                >
                  {product.name}
                </h2>

                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <div className="rounded-xl bg-forest-900/60 px-3 py-2">
                    <dt className="text-[10px] font-medium uppercase tracking-wide text-cream/45">
                      {uk.product.categoryLabel}
                    </dt>
                    <dd className="font-medium text-cream">{getCategoryLabel(product.category)}</dd>
                  </div>
                  <div className="rounded-xl bg-forest-900/60 px-3 py-2">
                    <dt className="text-[10px] font-medium uppercase tracking-wide text-cream/45">
                      {uk.product.weightLabel}
                    </dt>
                    <dd className="font-medium text-cream">{product.weight}</dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm leading-relaxed text-cream/70 md:text-base">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-forest-800 pt-5">
                  <div>
                    <p className="text-xs text-cream/50">{uk.product.priceLabel}</p>
                    <p className="text-2xl font-bold text-gradient-gold md:text-3xl">
                      {product.price} ₴
                    </p>
                  </div>
                  <Button className="shrink-0" onClick={handleAdd}>
                    <Plus className="h-4 w-4" />
                    {uk.product.add}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
