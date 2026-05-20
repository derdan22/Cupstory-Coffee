import { ArrowLeft, Banknote, CreditCard, Smartphone, Wallet } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { PaymentUnavailableModal } from '../components/checkout/PaymentUnavailableModal'
import { SuccessModal } from '../components/cart/SuccessModal'
import { Button } from '../components/ui/Button'
import { FormField } from '../components/ui/FormField'
import { PhoneInput } from '../components/ui/PhoneInput'
import {
  firstInvalidField,
  validateCheckoutForm,
  type CheckoutErrors,
  type CheckoutField,
} from '../lib/checkout-validation'
import { fieldInputClass, inputClass, labelClass } from '../lib/form'
import { normalizeUaPhone } from '../lib/phone'
import { createOrder } from '../lib/supabase'
import { uk } from '../lib/uk'
import type { OrderItem } from '../lib/types'
import { useCartStore } from '../store/cart-store'

type PaymentMethod = 'card' | 'apple' | 'google' | 'cash'

const paymentOptions: {
  id: PaymentMethod
  label: string
  desc: string
  icon: typeof CreditCard
  online: boolean
}[] = [
  {
    id: 'card',
    label: uk.checkout.paymentCardOnline,
    desc: uk.checkout.paymentCardOnlineDesc,
    icon: CreditCard,
    online: true,
  },
  {
    id: 'apple',
    label: uk.checkout.paymentApplePay,
    desc: uk.checkout.paymentSoon,
    icon: Smartphone,
    online: true,
  },
  {
    id: 'google',
    label: uk.checkout.paymentGooglePay,
    desc: uk.checkout.paymentSoon,
    icon: Wallet,
    online: true,
  },
  {
    id: 'cash',
    label: uk.checkout.paymentCash,
    desc: uk.checkout.paymentCashDesc,
    icon: Banknote,
    online: false,
  },
]

export function CheckoutPage() {
  const navigate = useNavigate()
  const paymentRef = useRef<HTMLElement>(null)
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice)
  const setCartOpen = useCartStore((s) => s.setOpen)
  const clearCart = useCartStore((s) => s.clearCart)

  const [loading, setLoading] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [payment, setPayment] = useState<PaymentMethod>('card')
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '+380 ',
    city: '',
    address: '',
    delivery_comment: '',
  })

  const openCart = () => {
    setCartOpen(true)
    navigate('/')
  }

  const patchForm = (patch: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...patch }))
    const keys = Object.keys(patch) as (keyof typeof form)[]
    setErrors((prev) => {
      const next = { ...prev }
      for (const key of keys) {
        if (key in next && key !== 'delivery_comment') {
          delete next[key as CheckoutField]
        }
      }
      return next
    })
  }

  const showValidationToast = (nextErrors: CheckoutErrors) => {
    const count = Object.keys(nextErrors).length
    const first = firstInvalidField(nextErrors)
    const firstMsg = first ? nextErrors[first] : undefined

    toast.error(uk.checkout.validationTitle, {
      description:
        count > 1
          ? `${uk.checkout.validationHint} Знайдено ${count} помилок.`
          : (firstMsg ?? uk.checkout.validationHint),
      className: '!border-red-200 !bg-red-50',
    })
  }

  const scrollToField = (field?: CheckoutField) => {
    if (!field) return
    document.getElementById(`checkout-${field}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  const validateDelivery = () => {
    const { valid, errors: nextErrors } = validateCheckoutForm(form)
    setErrors(nextErrors)

    if (!valid) {
      showValidationToast(nextErrors)
      scrollToField(firstInvalidField(nextErrors))
      return false
    }
    return true
  }

  const goToPayment = () => {
    if (!validateDelivery()) return
    paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const buildComment = () => {
    const paymentLabel = paymentOptions.find((p) => p.id === payment)?.label ?? ''
    const parts = [
      `Доставка: ${form.city.trim()}, ${form.address.trim()}`,
      form.delivery_comment.trim() ? `Коментар доставки: ${form.delivery_comment.trim()}` : '',
      `Оплата: ${paymentLabel}`,
    ].filter(Boolean)
    return parts.join('\n')
  }

  const submitOrder = async () => {
    if (!validateDelivery()) return

    const orderItems: OrderItem[] = items.map(({ product, quantity }) => ({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      weight: product.weight,
    }))

    setLoading(true)
    try {
      await createOrder({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: normalizeUaPhone(form.phone),
        comment: buildComment(),
        items: orderItems,
        total_price: totalPrice(),
      })
      setPayModalOpen(false)
      clearCart()
      setSuccessOpen(true)
    } catch {
      toast.error(uk.checkout.error)
    } finally {
      setLoading(false)
    }
  }

  const handlePay = () => {
    if (!validateDelivery()) return
    const method = paymentOptions.find((p) => p.id === payment)
    if (method?.online) {
      setPayModalOpen(true)
    } else {
      void submitOrder()
    }
  }

  const total = totalPrice()
  const isOnlinePayment = payment !== 'cash'

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 pb-16 pt-24 text-center md:pt-28">
        <h1 className="font-display text-2xl font-bold text-cream">{uk.checkout.emptyCart}</h1>
        <p className="mt-2 text-sm text-cream/60">{uk.checkout.emptyCartHint}</p>
        <Button
          className="mt-6"
          onClick={() => {
            navigate('/')
            setTimeout(
              () => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }),
              100,
            )
          }}
        >
          {uk.checkout.goCatalog}
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-8 md:pt-24">
        <button
          type="button"
          onClick={openCart}
          className="mb-6 inline-flex items-center gap-2 text-sm text-cream/60 transition hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" />
          {uk.checkout.back}
        </button>

        <header className="mb-8">
          <h1 className="font-display text-2xl font-bold text-cream md:text-4xl">
            {uk.checkout.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-cream/60 md:text-base">{uk.checkout.subtitle}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          <div className="space-y-8">
            <section className="glass rounded-2xl p-5 md:p-6">
              <h2 className="font-display text-lg font-semibold text-cream">
                {uk.checkout.contactsTitle}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <FormField
                  id="checkout-first_name"
                  label={uk.checkout.firstName}
                  error={errors.first_name}
                >
                  <input
                    id="checkout-first_name"
                    required
                    autoComplete="given-name"
                    value={form.first_name}
                    onChange={(e) => patchForm({ first_name: e.target.value })}
                    aria-invalid={Boolean(errors.first_name)}
                    aria-describedby={errors.first_name ? 'checkout-first_name-error' : undefined}
                    className={fieldInputClass(Boolean(errors.first_name))}
                  />
                </FormField>
                <FormField
                  id="checkout-last_name"
                  label={uk.checkout.lastName}
                  error={errors.last_name}
                >
                  <input
                    id="checkout-last_name"
                    required
                    autoComplete="family-name"
                    value={form.last_name}
                    onChange={(e) => patchForm({ last_name: e.target.value })}
                    aria-invalid={Boolean(errors.last_name)}
                    aria-describedby={errors.last_name ? 'checkout-last_name-error' : undefined}
                    className={fieldInputClass(Boolean(errors.last_name))}
                  />
                </FormField>
                <FormField
                  id="checkout-phone"
                  className="sm:col-span-2"
                  label={uk.checkout.phone}
                  error={errors.phone}
                >
                  <PhoneInput
                    id="checkout-phone"
                    required
                    invalid={Boolean(errors.phone)}
                    value={form.phone}
                    onChange={(phone) => patchForm({ phone })}
                    aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
                  />
                </FormField>
              </div>
            </section>

            <section className="glass rounded-2xl p-5 md:p-6">
              <h2 className="font-display text-lg font-semibold text-cream">
                {uk.checkout.deliveryTitle}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <FormField id="checkout-city" label={uk.checkout.city} error={errors.city}>
                  <input
                    id="checkout-city"
                    required
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => patchForm({ city: e.target.value })}
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? 'checkout-city-error' : undefined}
                    className={fieldInputClass(Boolean(errors.city))}
                  />
                </FormField>
                <FormField
                  id="checkout-address"
                  className="sm:col-span-2"
                  label={uk.checkout.address}
                  error={errors.address}
                >
                  <input
                    id="checkout-address"
                    required
                    autoComplete="street-address"
                    value={form.address}
                    onChange={(e) => patchForm({ address: e.target.value })}
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? 'checkout-address-error' : undefined}
                    className={fieldInputClass(Boolean(errors.address))}
                  />
                </FormField>
                <div className="sm:col-span-2">
                  <label className={labelClass}>{uk.checkout.deliveryComment}</label>
                  <textarea
                    value={form.delivery_comment}
                    onChange={(e) => patchForm({ delivery_comment: e.target.value })}
                    rows={2}
                    className={`${inputClass} min-h-[4.5rem] resize-none`}
                  />
                </div>
              </div>
            </section>

            <section
              id="payment"
              ref={paymentRef}
              className="glass scroll-mt-24 rounded-2xl p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-display text-lg font-semibold text-cream">
                    {uk.checkout.paymentTitle}
                  </h2>
                  <p className="mt-1 text-sm text-cream/60">{uk.checkout.paymentIntro}</p>
                </div>
                <span className="rounded-full bg-emerald-bright/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-cream/70">
                  {uk.checkout.paymentSoon}
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {paymentOptions.map(({ id, label, desc, icon: Icon }) => (
                  <label
                    key={id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 transition ${
                      payment === id
                        ? 'border-emerald-bright bg-emerald-bright/15'
                        : 'border-forest-800 bg-white hover:bg-forest-900'
                    } ${id !== 'card' && id !== 'cash' ? 'opacity-80' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                      className="sr-only"
                    />
                    <Icon className="h-5 w-5 shrink-0 text-emerald-bright" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-cream">{label}</span>
                      <span className="block text-[11px] text-cream/50">{desc}</span>
                    </span>
                  </label>
                ))}
              </div>

              {isOnlinePayment && (
                <div className="mt-4 space-y-3 rounded-xl border border-forest-800 bg-forest-900/80 p-4">
                  <p className="text-center text-xs text-cream/50">{uk.checkout.paymentGatewayNote}</p>
                  <div className="pointer-events-none space-y-3 opacity-55">
                    <div>
                      <label className={labelClass}>{uk.checkout.cardNumber}</label>
                      <input
                        disabled
                        placeholder="4242 4242 4242 4242"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>{uk.checkout.cardExpiry}</label>
                        <input disabled placeholder="MM/YY" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>{uk.checkout.cardCvc}</label>
                        <input disabled placeholder="CVC" className={inputClass} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center justify-between rounded-xl border border-forest-800 bg-white px-4 py-3">
                <span className="text-sm text-cream/60">{uk.checkout.total}</span>
                <span className="text-xl font-bold text-gradient-gold">{total} ₴</span>
              </div>

              <Button
                type="button"
                className="mt-4 w-full"
                disabled={loading}
                onClick={handlePay}
              >
                {isOnlinePayment
                  ? `${uk.checkout.payButton} ${total} ₴`
                  : uk.checkout.payCashButton}
              </Button>
            </section>
          </div>

          <aside className="glass-strong sticky top-20 rounded-2xl p-5 md:p-6">
            <h2 className="font-display text-lg font-semibold text-cream">{uk.checkout.orderTitle}</h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-3 border-b border-forest-800 pb-3 last:border-0 last:pb-0"
                >
                  <img
                    src={product.image_url}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-lg object-contain bg-forest-900"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium leading-snug">{product.name}</p>
                    <p className="text-xs text-cream/50">
                      {quantity} × {product.price} ₴
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-forest-800 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-cream/60">{uk.checkout.total}</span>
                <span className="text-xl font-bold text-gradient-gold">{totalPrice()} ₴</span>
              </div>
              <p className="mt-1 text-xs text-cream/45">{uk.checkout.totalNote}</p>
            </div>
            <Button type="button" className="mt-5 w-full" onClick={goToPayment}>
              {uk.checkout.proceedToPayment}
            </Button>
            <Link
              to="/"
              className="mt-3 block text-center text-sm text-cream/50 hover:text-cream"
            >
              {uk.checkout.backHome}
            </Link>
          </aside>
        </div>
      </div>

      <PaymentUnavailableModal
        open={payModalOpen}
        loading={loading}
        onClose={() => setPayModalOpen(false)}
        onConfirmOrder={() => void submitOrder()}
      />

      <SuccessModal
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false)
          navigate('/')
        }}
      />
    </>
  )
}
