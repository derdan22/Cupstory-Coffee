import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cart-store'
import { uk } from '../../lib/uk'
import { Button } from '../ui/Button'

export function CartDrawer() {
  const navigate = useNavigate()
  const { items, isOpen, setOpen, removeItem, updateQuantity, totalItems, totalPrice } =
    useCartStore()

  const goToCheckout = () => {
    setOpen(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/30 md:backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="safe-bottom fixed right-0 top-0 z-[70] flex h-[100dvh] w-full max-w-md flex-col border-l border-forest-800 bg-white shadow-2xl md:glass-strong"
          >
            <div className="flex items-center justify-between border-b border-forest-800 px-4 py-4">
              <h2 className="font-display flex items-center gap-2 text-lg font-bold">
                <ShoppingBag className="h-5 w-5 text-emerald-bright" />
                {uk.cart.title}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tap-target flex items-center justify-center rounded-full active:bg-forest-900"
                aria-label={uk.cart.close}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <section className="flex-1 overflow-y-auto overscroll-contain px-4 py-3">
              {items.length === 0 ? (
                <div className="flex min-h-[50vh] flex-col items-center justify-center text-center text-cream/50">
                  <ShoppingBag className="mb-3 h-14 w-14 opacity-30" />
                  <p className="font-display text-lg">{uk.cart.empty}</p>
                  <p className="mt-1 text-sm">{uk.cart.emptyHint}</p>
                </div>
              ) : (
                <ul className="space-y-3 pb-4">
                  {items.map(({ product, quantity }) => (
                    <li
                      key={product.id}
                      className="flex gap-3 rounded-2xl border border-forest-800 bg-forest-900 p-3"
                    >
                      <img
                        src={product.image_url}
                        alt=""
                        loading="lazy"
                        className="h-20 w-20 shrink-0 rounded-xl object-contain bg-white p-1"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="line-clamp-2 text-sm font-medium leading-snug">
                          {product.name}
                        </p>
                        <p className="text-sm text-gold">{product.price} ₴</p>
                        <div className="mt-auto flex items-center gap-1 pt-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="tap-target flex items-center justify-center rounded-full bg-forest-800"
                            aria-label="Менше"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm font-medium">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="tap-target flex items-center justify-center rounded-full bg-forest-800"
                            aria-label="Більше"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="tap-target ml-auto flex items-center justify-center text-red-500"
                            aria-label="Видалити"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {items.length > 0 && (
              <footer className="safe-bottom border-t border-forest-800 bg-forest-900 px-4 py-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-cream/60">
                    {uk.cart.items}: {totalItems()}
                  </span>
                  <span className="font-bold text-gradient-gold">{totalPrice()} ₴</span>
                </div>
                <p className="mb-3 rounded-xl border border-emerald-bright/30 bg-emerald-bright/10 px-3 py-2 text-[11px] leading-relaxed text-cream/65">
                  {uk.cart.checkoutNote}
                </p>
                <Button className="w-full" onClick={goToCheckout}>
                  {uk.cart.checkout}
                </Button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
