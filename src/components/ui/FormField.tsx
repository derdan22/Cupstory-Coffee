import { CircleX } from 'lucide-react'
import type { ReactNode } from 'react'
import { labelClass } from '../../lib/form'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
  className?: string
}

export function FormField({ id, label, error, children, className = '' }: FormFieldProps) {
  const invalid = Boolean(error)

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        {children}
        {invalid && (
          <CircleX
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500"
            aria-hidden
          />
        )}
      </div>
      {invalid && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-red-600"
        >
          <CircleX className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
