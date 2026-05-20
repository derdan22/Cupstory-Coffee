import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../../store/cart-store'
import { uk } from '../../lib/uk'

export function FloatingCart() {
  const totalItems = useCartStore((s) => s.totalItems())
  const setOpen = useCartStore((s) => s.setOpen)

  if (totalItems === 0) return null

  return (
    <motion.button
      type="button"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setOpen(true)}
      className="touch-manipulation safe-bottom fixed bottom-5 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-bright text-ink shadow-lg glow-emerald max-md:h-[3.25rem] max-md:w-[3.25rem] md:bottom-6 md:left-auto md:right-6"
      aria-label={uk.nav.openCart}
    >
      <ShoppingCart className="h-6 w-6" strokeWidth={2.25} />
      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-white">
        {totalItems}
      </span>
    </motion.button>
  )
}
