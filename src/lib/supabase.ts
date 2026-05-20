import { createClient } from '@supabase/supabase-js'
import { assetUrl } from './asset-url'
import type { Product, OrderItem } from './types'
import { STORE_PRODUCTS, sortProducts } from './products'

function withAssetBase(product: Product): Product {
  const url = product.image_url
  if (!url || url.startsWith('http') || url.startsWith(import.meta.env.BASE_URL)) {
    return product
  }
  return { ...product, image_url: assetUrl(url.replace(/^\//, '')) }
}

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && key)

export const supabase = supabaseConfigured
  ? createClient(url, key)
  : null

export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) return sortProducts(STORE_PRODUCTS)

  const { data, error } = await supabase.from('products').select('*').order('price', { ascending: true })

  if (error || !data?.length) return sortProducts(STORE_PRODUCTS)
  return sortProducts((data as Product[]).map(withAssetBase))
}

export async function createOrder(payload: {
  first_name: string
  last_name: string
  phone: string
  comment: string | null
  items: OrderItem[]
  total_price: number
}) {
  if (!supabase) {
    await new Promise((r) => setTimeout(r, 600))
    console.info('[demo] Замовлення:', payload)
    return { id: crypto.randomUUID() }
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      ...payload,
      status: 'Новый',
    })
    .select('id')
    .single()

  if (error) throw error
  return data
}
