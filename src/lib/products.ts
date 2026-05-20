import type { Product, ProductBrand } from './types'

const img = (file: string) => `/images/${file.replace(/\.png$/, '.webp')}`

/** Повний асортимент — 19 позицій з ваших фото */
export const STORE_PRODUCTS: Product[] = [
  // —— Lavazza зерно 1 кг ——
  {
    id: 'lv-09',
    name: 'Lavazza Qualità Oro',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: '100% арабіка, інтенсивність 5/10. Ароматна класика з 1956 року.',
    price: 899,
    weight: '1 кг',
    image_url: img('lavazza-qualita-oro-beans-1kg.png'),
    is_popular: true,
  },
  {
    id: 'lv-07',
    name: 'Lavazza Super Crema',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: 'Ноти фундука та коричного цукру. Ідеально для еспресо та капучино.',
    price: 899,
    weight: '1 кг',
    image_url: img('lavazza-super-crema-beans-1kg.png'),
    is_popular: true,
  },
  {
    id: 'lv-04',
    name: 'Lavazza Qualità Rossa',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: 'Насичена та повнотіла суміш. Інтенсивність 5/10.',
    price: 799,
    weight: '1 кг',
    image_url: img('lavazza-qualita-rossa-beans-1kg.png'),
    is_popular: true,
  },
  {
    id: 'lv-08',
    name: 'Lavazza Gold Selection',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: 'Ноти меду та мигдалю. Преміальна лінійка для еспресо.',
    price: 949,
    weight: '1 кг',
    image_url: img('lavazza-gold-selection-beans-1kg.png'),
    is_popular: false,
  },
  {
    id: 'lv-03',
    name: 'Lavazza Qualità Oro Mountain Grown',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: '100% арабіка з гірських регіонів. Інтенсивність 7/10, насичений смак.',
    price: 949,
    weight: '1 кг',
    image_url: img('lavazza-qualita-oro-mountain-beans-1kg.png'),
    is_popular: false,
  },
  {
    id: 'lv-06',
    name: 'Lavazza ¡Tierra! Selection',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: '100% арабіка, Rainforest Alliance. Ароматна та збалансована.',
    price: 999,
    weight: '1 кг',
    image_url: img('lavazza-tierra-selection-beans-1kg.png'),
    is_popular: false,
  },
  {
    id: 'lv-05',
    name: 'Lavazza Crema e Gusto Classico',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: 'Кремова та насичена. Інтенсивність 7/10, для всіх способів заварювання.',
    price: 849,
    weight: '1 кг',
    image_url: img('lavazza-crema-e-gusto-classico-beans-1kg.png'),
    is_popular: false,
  },
  {
    id: 'lv-02',
    name: 'Lavazza Crema e Aroma',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: 'Інтенсивність 8/10. Для крема, латте, капучино та макіато.',
    price: 849,
    weight: '1 кг',
    image_url: img('lavazza-crema-e-aroma-beans-1kg.png'),
    is_popular: false,
  },
  {
    id: 'lv-01',
    name: 'Lavazza Crema e Aroma Professional',
    brand: 'Lavazza',
    category: 'Coffee Beans',
    description: 'Професійна упаковка. Ноти арахісу та мускатного горіха.',
    price: 899,
    weight: '1 кг',
    image_url: img('lavazza-crema-e-aroma-professional-1kg.png'),
    is_popular: false,
  },

  // —— Lavazza мелена 250 г ——
  {
    id: 'lv-15',
    name: 'Lavazza Espresso Italiano Classico',
    brand: 'Lavazza',
    category: 'Ground Coffee',
    description: '100% арабіка, 5/10. Для еспресо, моки та латте.',
    price: 219,
    weight: '250 г',
    image_url: img('lavazza-espresso-italiano-classico-250g.png'),
    is_popular: false,
  },
  {
    id: 'lv-13',
    name: 'Lavazza Qualità Oro Mountain Grown',
    brand: 'Lavazza',
    category: 'Ground Coffee',
    description: 'Гірська арабіка, інтенсивність 7/10. Насичений профіль.',
    price: 259,
    weight: '250 г',
    image_url: img('lavazza-qualita-oro-mountain-ground-250g.png'),
    is_popular: false,
  },
  {
    id: 'lv-12',
    name: 'Lavazza Qualità Oro',
    brand: 'Lavazza',
    category: 'Ground Coffee',
    description: 'Мелена кава 100% арабіка. Ароматна, інтенсивність 5/10.',
    price: 229,
    weight: '250 г',
    image_url: img('lavazza-qualita-oro-ground-250g.png'),
    is_popular: false,
  },
  {
    id: 'lv-14',
    name: 'Lavazza Crema e Gusto Classico',
    brand: 'Lavazza',
    category: 'Ground Coffee',
    description: 'Кремова мелена кава. Інтенсивність 8/10.',
    price: 199,
    weight: '250 г',
    image_url: img('lavazza-crema-e-gusto-classico-ground-250g.png'),
    is_popular: false,
  },
  {
    id: 'lv-10',
    name: 'Lavazza Qualità Rossa',
    brand: 'Lavazza',
    category: 'Ground Coffee',
    description: 'Класична мелена суміш у вакуумній упаковці.',
    price: 189,
    weight: '250 г',
    image_url: img('lavazza-qualita-rossa-ground-250g.png'),
    is_popular: false,
  },
  {
    id: 'lv-11',
    name: 'Lavazza Crema e Gusto',
    brand: 'Lavazza',
    category: 'Ground Coffee',
    description: 'Мелена кава для моки та еспресо.',
    price: 189,
    weight: '250 г',
    image_url: img('lavazza-crema-e-gusto-ground-250g.png'),
    is_popular: false,
  },

  // —— Jacobs ——
  {
    id: 'jb-01',
    name: 'Jacobs Monarch Signature',
    brand: 'Jacobs',
    category: 'Instant Coffee',
    description: 'Насичений смак і бездоганний аромоксамит. Акція 300 г + 100 г.',
    price: 399,
    weight: '400 г',
    image_url: img('jacobs-monarch-signature-400g.png'),
    is_popular: true,
  },
  {
    id: 'jb-02',
    name: 'Jacobs Monarch Signature',
    brand: 'Jacobs',
    category: 'Instant Coffee',
    description: 'Розчинна кава преміум-класу. До 250 чашок з упаковки.',
    price: 449,
    weight: '500 г',
    image_url: img('jacobs-monarch-signature-500g.png'),
    is_popular: true,
  },

  // —— MacCoffee ——
  {
    id: 'mc-01',
    name: 'MacCoffee The Original 3в1',
    brand: 'MacCoffee',
    category: 'Coffee Sticks',
    description: 'Миттєва кава 3 в 1 — кава, цукор і вершки в одному стіку.',
    price: 189,
    weight: 'упаковка',
    image_url: img('maccoffee-original-3in1.png'),
    is_popular: true,
  },

  // —— Ambassador ——
  {
    id: 'am-01',
    name: 'Ambassador Premium',
    brand: 'Ambassador',
    category: 'Instant Coffee',
    description: '100% сублімована кава з Бразилії. Акція 300 г + 100 г.',
    price: 349,
    weight: '400 г',
    image_url: img('ambassador-premium-400g.png'),
    is_popular: true,
  },
]

const BRAND_ORDER: ProductBrand[] = ['Lavazza', 'Jacobs', 'MacCoffee', 'Ambassador']

export function sortProducts(items: Product[]): Product[] {
  return [...items].sort((a, b) => {
    if (a.is_popular !== b.is_popular) return a.is_popular ? -1 : 1
    const brandDiff = BRAND_ORDER.indexOf(a.brand) - BRAND_ORDER.indexOf(b.brand)
    if (brandDiff !== 0) return brandDiff
    if (a.category !== b.category) {
      const catOrder = ['Coffee Beans', 'Ground Coffee', 'Instant Coffee', 'Coffee Sticks']
      return catOrder.indexOf(a.category) - catOrder.indexOf(b.category)
    }
    return a.price - b.price
  })
}
