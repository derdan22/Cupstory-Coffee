import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  hover?: boolean
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  ...props
}: GlassCardProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      whileHover={hover && !reduced ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`glass rounded-2xl p-4 md:rounded-3xl md:p-5 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
