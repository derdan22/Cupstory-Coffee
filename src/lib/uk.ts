import type { CatalogFilter, ProductBrand, ProductCategory } from './types'
import { assetUrl } from './asset-url'

const promoImg = (path: string) => assetUrl(`images/${path}`)

export const uk = {
  nav: {
    catalog: 'Каталог',
    promo: 'Бренди',
    howItWorks: 'Як замовити',
    openCart: 'Відкрити кошик',
    menu: 'Меню',
    closeMenu: 'Закрити меню',
  },
  hero: {
    badge: 'Lavazza · Jacobs · MacCoffee',
    title: 'Кожна чашка має',
    titleAccent: 'свою історію',
    subtitle:
      'Преміум-кава в наявності — оберіть упаковку, залиште контакти, ми передзвонимо.',
    cta: 'До каталогу',
    ctaAlt: 'Як це працює',
  },
  promo: {
    cta: 'До каталогу',
    slides: [
      {
        id: 'beans',
        title: 'Зерно для еспресо',
        tagline: 'Lavazza · 1 кг',
        items: [
          {
            kind: 'Зерно',
            name: 'Qualità Oro',
            price: 899,
            weight: '1 кг',
            image: promoImg('banner/banner-lavazza-qualita-oro-beans-1kg.webp'),
            filter: 'Lavazza' as const,
          },
          {
            kind: 'Зерно',
            name: 'Super Crema',
            price: 899,
            weight: '1 кг',
            image: promoImg('banner/banner-lavazza-super-crema-beans-1kg.webp'),
            filter: 'Lavazza' as const,
          },
          {
            kind: 'Зерно',
            name: 'Qualità Rossa',
            price: 799,
            weight: '1 кг',
            image: promoImg('banner/banner-lavazza-qualita-rossa-beans-1kg.webp'),
            filter: 'Lavazza' as const,
          },
        ],
      },
      {
        id: 'brands',
        title: 'Три бренди',
        tagline: 'Зерно · розчинна · стіки',
        items: [
          {
            kind: 'Зерно',
            name: 'Lavazza Oro',
            price: 899,
            weight: '1 кг',
            image: promoImg('banner/banner-lavazza-qualita-oro-beans-1kg.webp'),
            filter: 'Lavazza' as const,
          },
          {
            kind: 'Розчинна',
            name: 'Jacobs Monarch',
            price: 449,
            weight: '500 г',
            image: promoImg('banner/banner-jacobs-monarch-signature-500g.webp'),
            filter: 'Jacobs' as const,
          },
          {
            kind: '3 в 1',
            name: 'MacCoffee Original',
            price: 189,
            weight: 'стіки',
            image: promoImg('banner/banner-maccoffee-original-3in1.webp'),
            filter: 'MacCoffee' as const,
          },
        ],
      },
      {
        id: 'ground',
        title: 'Мелена та розчинна',
        tagline: 'Щоденний вибір',
        items: [
          {
            kind: 'Мелена',
            name: 'Lavazza Oro',
            price: 229,
            weight: '250 г',
            image: promoImg('banner/banner-lavazza-qualita-oro-ground-250g.webp'),
            filter: 'Lavazza' as const,
          },
          {
            kind: 'Розчинна',
            name: 'Ambassador Premium',
            price: 349,
            weight: '400 г',
            image: promoImg('banner/banner-ambassador-premium-400g.webp'),
            filter: 'Ambassador' as const,
          },
          {
            kind: 'Розчинна',
            name: 'Jacobs Monarch',
            price: 399,
            weight: '400 г',
            image: promoImg('banner/banner-jacobs-monarch-signature-400g.webp'),
            filter: 'Jacobs' as const,
          },
        ],
      },
    ],
  },
  catalog: {
    title: 'Каталог',
    hint: 'Обрали → кошик → залишили контакти',
    empty: 'Товарів не знайдено.',
  },
  product: {
    add: 'Додати',
    added: 'додано до кошика',
    close: 'Закрити',
    categoryLabel: 'Тип',
    weightLabel: 'Вага',
    priceLabel: 'Ціна',
  },
  cart: {
    title: 'Кошик',
    empty: 'Кошик порожній',
    emptyHint: 'Оберіть каву в каталозі',
    items: 'Товарів',
    checkout: 'Доставка та оплата',
    checkoutNote:
      'Оформіть доставку та оплату на наступному кроці. Онлайн-оплата підключається — зараз підтвердження замовлення.',
    close: 'Закрити',
  },
  checkout: {
    title: 'Доставка та оплата',
    subtitle: 'Заповніть доставку та оберіть спосіб оплати.',
    total: 'До сплати',
    totalNote: 'Підсумок за товарами в кошику',
    orderTitle: 'Ваше замовлення',
    contactsTitle: 'Контакти',
    deliveryTitle: 'Доставка',
    city: 'Місто',
    address: 'Адреса доставки',
    deliveryComment: 'Коментар до доставки (необовʼязково)',
    paymentTitle: 'Оплата',
    paymentIntro: 'Оберіть спосіб оплати. Підсумок до сплати — нижче.',
    paymentSoon: 'Скоро',
    paymentGatewayNote: 'Платіжний шлюз (LiqPay / Mono) — підключення незабаром',
    paymentCardOnline: 'Банківська картка',
    paymentCardOnlineDesc: 'Visa, Mastercard',
    paymentApplePay: 'Apple Pay',
    paymentGooglePay: 'Google Pay',
    paymentCash: 'Готівка при отриманні',
    paymentCashDesc: 'Оплата курʼєру при доставці',
    cardNumber: 'Номер картки',
    cardExpiry: 'Термін',
    cardCvc: 'CVC',
    payButton: 'Оплатити',
    payCashButton: 'Замовити з оплатою при отриманні',
    payUnavailableTitle: 'Онлайн-оплата підключається',
    payUnavailableText:
      'Платіжний шлюз ще не підключено. Ви можете підтвердити замовлення зараз — менеджер зателефонує для узгодження деталей.',
    payUnavailableBack: 'Назад',
    confirmOrder: 'Підтвердити замовлення',
    confirming: 'Обробка…',
    firstName: "Ім'я",
    lastName: 'Прізвище',
    phone: 'Телефон для звʼязку',
    back: 'Назад до кошика',
    backHome: 'На головну',
    proceedToPayment: 'Перейти до оплати',
    validationTitle: 'Перевірте форму',
    validationHint: 'Поля з червоною позначкою потрібно виправити.',
    errors: {
      firstNameRequired: "Вкажіть ім'я",
      firstNameShort: "Ім'я занадто коротке (мінімум 2 символи)",
      lastNameRequired: 'Вкажіть прізвище',
      lastNameShort: 'Прізвище занадто коротке (мінімум 2 символи)',
      phoneRequired: 'Вкажіть номер телефону',
      phoneInvalid: 'Номер у форматі +380 XX XXX XX XX (9 цифр після коду)',
      cityRequired: 'Вкажіть місто доставки',
      cityShort: 'Назва міста занадто коротка',
      addressRequired: 'Вкажіть адресу доставки',
      addressShort: 'Адреса занадто коротка (мінімум 5 символів)',
    },
    emptyCart: 'Кошик порожній',
    emptyCartHint: 'Спочатку додайте товари з каталогу',
    goCatalog: 'До каталогу',
    error: 'Не вдалося надіслати. Спробуйте ще раз.',
  },
  success: {
    title: 'Замовлення прийнято!',
    text: 'Дякуємо! Найближчим часом зателефонуємо — узгодимо доставку та оплату.',
    close: 'Добре',
  },
  howItWorks: {
    title: 'Як замовити',
    intro: 'Оберіть каву, оформіть доставку та оплату — як у звичайному магазині.',
    steps: [
      {
        title: 'Оберіть каву',
        desc: 'Lavazza, Jacobs, MacCoffee чи Ambassador — у каталозі.',
      },
      {
        title: 'Додайте в кошик',
        desc: 'Потрібна кількість упаковок — сума орієнтовна.',
      },
      {
        title: 'Залиште контакти',
        desc: "Ім'я, адреса, спосіб оплати — картка або при отриманні.",
      },
      {
        title: 'Ми передзвонимо',
        desc: 'Узгодимо доставку, ціну та час.',
      },
    ],
  },
  footer: {
    about: 'CupStory — преміум-кава. Замовлення та оплата онлайн.',
    rights: 'Усі права захищені.',
  },
  marquee: 'LAVAZZA · JACOBS · MACCOFFEE · AMBASSADOR · ЗЕРНО · МЕЛЕНА · ',
} as const

export type CategoryFilter = CatalogFilter

export const categoryFilters: CategoryFilter[] = [
  'All',
  'Lavazza',
  'Jacobs',
  'MacCoffee',
  'Ambassador',
  'Coffee Beans',
  'Ground Coffee',
  'Instant Coffee',
]

const brandSet = new Set<ProductBrand>(['Lavazza', 'Jacobs', 'MacCoffee', 'Ambassador'])
const categorySet = new Set<ProductCategory>([
  'Coffee Beans',
  'Ground Coffee',
  'Instant Coffee',
  'Coffee Sticks',
])

export const categoryLabels: Record<string, string> = {
  All: 'Усі',
  Lavazza: 'Lavazza',
  Jacobs: 'Jacobs',
  MacCoffee: 'MacCoffee',
  Ambassador: 'Ambassador',
  'Coffee Beans': 'Зерно',
  'Ground Coffee': 'Мелена',
  'Instant Coffee': 'Розчинна',
  'Coffee Sticks': 'Стики 3в1',
}

export function getCategoryLabel(category: ProductCategory): string {
  return categoryLabels[category] ?? category
}

export function isBrandFilter(f: CatalogFilter): f is ProductBrand {
  return brandSet.has(f as ProductBrand)
}

export function isCategoryFilter(f: CatalogFilter): f is ProductCategory {
  return categorySet.has(f as ProductCategory)
}
