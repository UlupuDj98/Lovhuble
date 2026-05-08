import type { Product, Category, SubCategory } from '../data/products'

const BASE = typeof window !== 'undefined'
  ? '/api/medusa'
  : (process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000')
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_KEY ?? ''
const REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID ?? ''

// Costruisce URL preservando i '+' nei fields (non li URL-encoda)
function buildUrl(path: string, params: Record<string, string> = {}): string {
  const parts = Object.entries(params).map(([k, v]) => {
    if (k === 'fields') return `fields=${v.replace(/\+/g, '%2B').replace(/%2B/g, '+')}`
    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
  })
  return `${BASE}${path}${parts.length ? '?' + parts.join('&') : ''}`
}

async function storeGet<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  // region_id solo per /store/products
  const allParams = path.includes('/store/products') && REGION_ID
    ? { limit: '100', region_id: REGION_ID, ...params }
    : { limit: '100', ...params }

  const url = buildUrl(path, allParams)
  const res = await fetch(url, {
    headers: { 'x-publishable-api-key': PUB_KEY },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Medusa ${path}: ${res.status} ${body}`)
  }
  return res.json()
}

const FIELDS = '+collection,+variants.calculated_price,+metadata'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(p: any): Product {
  const variant = p.variants?.[0]
  const priceAmount = variant?.calculated_price?.calculated_amount
    ?? variant?.prices?.[0]?.amount
    ?? 0
  const collection = p.collection ?? {}
  const meta = p.metadata ?? {}

  return {
    id: p.id,
    name: p.title,
    slug: p.handle,
    category: collection.title ?? '',
    categorySlug: collection.handle ?? '',
    subCategory: meta.subCategory ?? '',
    subCategorySlug: meta.subCategorySlug ?? '',
    price: priceAmount / 100,
    image: p.thumbnail ?? p.images?.[0]?.url ?? '',
    images: p.images?.map((img: any) => img.url).filter(Boolean) ?? (p.thumbnail ? [p.thumbnail] : []),
    description: p.description ?? '',
    features: (meta.features as string[]) ?? [],
    inStock: variant?.manage_inventory ? (variant.inventory_quantity ?? 0) > 0 : true,
    exclusive: meta.exclusive === true,
    variantId: variant?.id ?? '',
  }
}

// Cache in-memory per collezioni e categorie (evita chiamate ripetute)
let _collections: any[] | null = null
let _categories: any[] | null = null

async function fetchCollections(): Promise<any[]> {
  if (!_collections) {
    const { collections } = await storeGet<any>('/store/collections')
    _collections = collections ?? []
  }
  return _collections!
}

async function fetchCategories(): Promise<any[]> {
  if (!_categories) {
    const { product_categories } = await storeGet<any>('/store/product-categories')
    _categories = product_categories ?? []
  }
  return _categories!
}

// ── Prodotti per collezione ───────────────────────────────────────────────

export async function getProductsByCollection(collectionHandle: string): Promise<Product[]> {
  const collections = await fetchCollections()
  const collection = collections.find((c: any) => c.handle === collectionHandle)
  if (!collection) return []

  const { products } = await storeGet<any>('/store/products', {
    'collection_id[]': collection.id,
    fields: FIELDS,
  })
  return (products ?? []).map(mapProduct)
}

// ── Prodotti per categoria ────────────────────────────────────────────────

export async function getProductsByCategory(categoryHandle: string): Promise<Product[]> {
  const categories = await fetchCategories()
  const category = categories.find((c: any) => c.handle === categoryHandle)
  if (!category) return []

  const { products } = await storeGet<any>('/store/products', {
    'category_id[]': category.id,
    fields: FIELDS,
  })
  return (products ?? []).map(mapProduct)
}

// ── Singolo prodotto per handle ───────────────────────────────────────────

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const { products } = await storeGet<any>('/store/products', {
    handle,
    fields: FIELDS,
  })
  const p = products?.[0]
  return p ? mapProduct(p) : null
}

// ── Collezioni ────────────────────────────────────────────────────────────

export async function getCollections(): Promise<Category[]> {
  const collections = await fetchCollections()
  return collections.map((c: any) => ({
    name: c.title,
    slug: c.handle,
    image: `/categorie/${c.handle}.png`,
  }))
}

// ── Prodotti esclusivi ────────────────────────────────────────────────────

export async function getExclusiveProducts(): Promise<Product[]> {
  return getProductsByCollection('speciali')
}

// ── Tutti i prodotti (con cache leggera) ──────────────────────────────────

let _allProducts: Product[] | null = null

export async function getAllProducts(): Promise<Product[]> {
  if (!_allProducts) {
    const { products } = await storeGet<any>('/store/products', { fields: FIELDS })
    _allProducts = (products ?? []).map(mapProduct)
  }
  return _allProducts!
}

// ── Nome categoria per handle ─────────────────────────────────────────────

export async function getCategoryName(handle: string): Promise<string> {
  const categories = await fetchCategories()
  const cat = categories.find((c: any) => c.handle === handle)
  return cat?.name ?? handle
}

// ── Ricerca prodotti ──────────────────────────────────────────────────────

export async function searchProducts(q: string): Promise<Product[]> {
  if (!q.trim()) return []
  const { products } = await storeGet<any>('/store/products', { q, fields: FIELDS })
  return (products ?? []).map(mapProduct)
}

// ── Sottocategorie per categoria principale ───────────────────────────────

export async function getSubCategories(parentHandle: string): Promise<SubCategory[]> {
  const all = await fetchCategories()
  const parent = all.find((c: any) => c.handle === parentHandle)
  if (!parent) return []

  return all
    .filter((c: any) => c.parent_category_id === parent.id)
    .map((c: any) => ({
      name: c.name,
      slug: c.handle,
      parentSlug: parentHandle,
      image: `/categorie/${parentHandle}.png`,
    }))
}
