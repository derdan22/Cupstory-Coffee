import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'
import { uk } from '../../lib/uk'
import { Button } from '../ui/Button'

interface PaymentUnavailableModalProps {
  open: boolean
  loading: boolean
  onClose: () => void
  onConfirmOrder: () => void
}

export function PaymentUnavailableModal({
  open,
  loading,
  onClose,
  onConfirmOrder,
}: PaymentUnavailableModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-4 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-xl md:p-8"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-bright/25">
              <CreditCard className="h-6 w-6 text-cream" />
            </div>
            <h3 className="font-display mt-4 text-center text-xl font-bold text-cream">
              {uk.checkout.payUnavailableTitle}
            </h3>
            <p className="mt-3 text-center text-sm leading-relaxed text-cream/65">
              {uk.checkout.payUnavailableText}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button className="w-full" disabled={loading} onClick={onConfirmOrder}>
                {loading ? uk.checkout.confirming : uk.checkout.confirmOrder}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={onClose}>
                {uk.checkout.payUnavailableBack}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
