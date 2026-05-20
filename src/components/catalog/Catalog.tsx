import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../../lib/supabase'
import { sortProducts } from '../../lib/products'
import type { Product, ProductBrand } from '../../lib/types'
import { useIsMobile } from '../../hooks/useMedia'
import {
  categoryFilters,
  categoryLabels,
  isBrandFilter,
  isCategoryFilter,
  uk,
  type CategoryFilter,
} from '../../lib/uk'
import { ProductCard } from './ProductCard'
import { ProductSkeleton } from '../ui/ProductSkeleton'

export function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<CategoryFilter>('All')
  const mobile = useIsMobile()

  useEffect(() => {
    fetchProducts()
      .then((list) => setProducts(sortProducts(list)))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onFilter = (e: Event) => {
      const brand = (e as CustomEvent<ProductBrand>).detail
      if (brand) setActive(brand)
    }
    window.addEventListener('catalog-filter', onFilter)
    return () => window.removeEventListener('catalog-filter', onFilter)
  }, [])

  const filtered = useMemo(() => {
    if (active === 'All') return products
    if (isBrandFilter(active)) return products.filter((p) => p.brand === active)
    if (isCategoryFilter(active)) return products.filter((p) => p.category === active)
    return products
  }, [products, active])

  const skeletonCount = mobile ? 4 : 6

  return (
    <section
      id="catalog"
      className="scroll-mt-16 py-8 pb-24 md:py-12 md:pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <header className="mb-4 md:mb-6">
          <h2 className="font-display text-2xl font-bold text-cream md:text-4xl">
            {uk.catalog.title}
          </h2>
          <p className="mt-1 text-xs text-cream/50 md:text-sm">{uk.catalog.hint}</p>
        </header>

        <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none md:flex-wrap md:overflow-visible">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`touch-manipulation shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition min-h-11 ${
                active === cat
                  ? 'bg-emerald-bright text-ink shadow-md'
                  : 'glass text-cream/80'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-cream/50">{uk.catalog.empty}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
