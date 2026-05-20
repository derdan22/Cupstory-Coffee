import { formatUaPhone, UA_PHONE_PLACEHOLDER, UA_PHONE_PREFIX } from '../../lib/phone'
import { fieldInputClass } from '../../lib/form'

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  required?: boolean
  id?: string
  invalid?: boolean
  className?: string
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export function PhoneInput({
  value,
  onChange,
  required,
  id,
  invalid,
  className = '',
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: PhoneInputProps) {
  const display = value.trim() ? formatUaPhone(value) : `${UA_PHONE_PREFIX} `

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatUaPhone(e.target.value))
  }

  const handleFocus = () => {
    if (!value.trim()) onChange(`${UA_PHONE_PREFIX} `)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const pos = e.currentTarget.selectionStart ?? 0
    if ((e.key === 'Backspace' || e.key === 'Delete') && pos <= UA_PHONE_PREFIX.length + 1) {
      e.preventDefault()
    }
  }

  return (
    <input
      id={id}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      required={required}
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      placeholder={UA_PHONE_PLACEHOLDER}
      maxLength={17}
      aria-invalid={ariaInvalid ?? invalid}
      aria-describedby={ariaDescribedBy}
      className={`${fieldInputClass(invalid)} ${className}`.trim()}
    />
  )
}
