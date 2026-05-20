import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-bright text-ink font-semibold active:scale-[0.98] md:hover:bg-emerald md:hover:shadow-[0_0_24px_rgba(222,184,135,0.55)]',
  secondary:
    'border border-forest-800 bg-white text-cream shadow-sm active:bg-forest-900 md:hover:bg-forest-900',
  ghost: 'text-cream/70 active:bg-forest-900 md:hover:bg-forest-900 md:hover:text-cream',
  gold: 'bg-gradient-to-r from-gold to-gold-light text-white font-semibold',
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.button
      type={type}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm tracking-wide transition-colors disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
