import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { uk } from '../../lib/uk'
import { Button } from '../ui/Button'

interface SuccessModalProps {
  open: boolean
  onClose: () => void
}

export function SuccessModal({ open, onClose }: SuccessModalProps) {
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
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="safe-bottom relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-br from-emerald-bright to-emerald p-8 text-center shadow-xl md:p-9"
          >
            <CheckCircle className="mx-auto h-12 w-12 text-ink md:h-14 md:w-14" />
            <h3 className="font-display mt-4 text-xl font-bold text-ink md:text-2xl">
              {uk.success.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/85">{uk.success.text}</p>
            <Button variant="secondary" className="mt-7 w-full !border-white/40 !bg-white/95" onClick={onClose}>
              {uk.success.close}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
