export const inputClass =
  'w-full min-h-12 rounded-xl border border-forest-800 bg-white px-4 text-base text-cream outline-none placeholder:text-cream/40 focus:border-emerald-bright focus:ring-2 focus:ring-emerald-bright/20'

export const inputErrorClass =
  'border-red-500 bg-red-50/40 pr-11 focus:border-red-500 focus:ring-red-500/25'

export function fieldInputClass(invalid?: boolean) {
  return invalid ? `${inputClass} ${inputErrorClass}` : inputClass
}

export const labelClass = 'mb-1.5 block text-sm font-medium text-cream/80'
