export type ProductCategory = 'Coffee Beans' | 'Ground Coffee' | 'Instant Coffee' | 'Coffee Sticks'

export type ProductBrand = 'Lavazza' | 'Jacobs' | 'MacCoffee' | 'Ambassador'

export type OrderStatus = 'Новый' | 'Обрабатывается' | 'Завершен'

export interface Product {
  id: string
  name: string
  brand: ProductBrand
  category: ProductCategory
  description: string
  price: number
  weight: string
  image_url: string
  is_popular: boolean
  created_at?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface OrderItem {
  product_id: string
  name: string
  price: number
  quantity: number
  weight: string
}

export interface OrderForm {
  first_name: string
  last_name: string
  phone: string
  comment?: string
}

/** Фільтр каталогу: бренд або тип кави */
export type CatalogFilter = 'All' | ProductBrand | ProductCategory
