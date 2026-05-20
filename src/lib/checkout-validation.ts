import { isValidUaPhone } from './phone'
import { uk } from './uk'

export type CheckoutField = 'first_name' | 'last_name' | 'phone' | 'city' | 'address'

export type CheckoutFormValues = {
  first_name: string
  last_name: string
  phone: string
  city: string
  address: string
}

export type CheckoutErrors = Partial<Record<CheckoutField, string>>

const e = uk.checkout.errors

export function validateCheckoutForm(form: CheckoutFormValues): {
  valid: boolean
  errors: CheckoutErrors
} {
  const errors: CheckoutErrors = {}

  const first = form.first_name.trim()
  const last = form.last_name.trim()
  const city = form.city.trim()
  const address = form.address.trim()

  if (!first) errors.first_name = e.firstNameRequired
  else if (first.length < 2) errors.first_name = e.firstNameShort

  if (!last) errors.last_name = e.lastNameRequired
  else if (last.length < 2) errors.last_name = e.lastNameShort

  const phoneDigits = form.phone.replace(/\D/g, '')
  if (phoneDigits.length <= 3) errors.phone = e.phoneRequired
  else if (!isValidUaPhone(form.phone)) errors.phone = e.phoneInvalid

  if (!city) errors.city = e.cityRequired
  else if (city.length < 2) errors.city = e.cityShort

  if (!address) errors.address = e.addressRequired
  else if (address.length < 5) errors.address = e.addressShort

  return { valid: Object.keys(errors).length === 0, errors }
}

export const checkoutFieldOrder: CheckoutField[] = [
  'first_name',
  'last_name',
  'phone',
  'city',
  'address',
]

export function firstInvalidField(errors: CheckoutErrors): CheckoutField | undefined {
  return checkoutFieldOrder.find((f) => errors[f])
}
