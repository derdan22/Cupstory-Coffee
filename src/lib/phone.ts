/** Україна: +380 + 9 цифр (мобільний) */

export const UA_PHONE_PREFIX = '+380'
export const UA_PHONE_PLACEHOLDER = '+380 XX XXX XX XX'

/** Лише цифри після коду країни (макс. 9) */
function extractNationalDigits(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('380')) digits = digits.slice(3)
  else if (digits.startsWith('80')) digits = digits.slice(2)
  else if (digits.startsWith('0')) digits = digits.slice(1)
  return digits.slice(0, 9)
}

/** Відображення: +380 XX XXX XX XX */
export function formatUaPhone(raw: string): string {
  const d = extractNationalDigits(raw)
  if (d.length === 0) return `${UA_PHONE_PREFIX} `

  let out = `${UA_PHONE_PREFIX} ${d.slice(0, 2)}`
  if (d.length > 2) out += ` ${d.slice(2, 5)}`
  if (d.length > 5) out += ` ${d.slice(5, 7)}`
  if (d.length > 7) out += ` ${d.slice(7, 9)}`
  return out
}

/** Збереження: +380XXXXXXXXX */
export function normalizeUaPhone(raw: string): string {
  const d = extractNationalDigits(raw)
  return d.length ? `${UA_PHONE_PREFIX}${d}` : ''
}

/** Мобільний UA: +380 і 9 цифр, перша 3–9 */
export function isValidUaPhone(raw: string): boolean {
  const normalized = normalizeUaPhone(raw)
  return /^\+380[3-9]\d{8}$/.test(normalized)
}
