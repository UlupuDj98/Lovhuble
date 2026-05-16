import type { Product, ProductOption, ProductVariant, Category, SubCategory } from '../data/products'

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

const FIELDS = '+collection,+material,+weight,+height,+width,+length,+options,+options.values,+variants,+variants.calculated_price,+variants.options,+metadata'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(p: any): Product {
  const firstVariant = p.variants?.[0]
  const priceAmount = firstVariant?.calculated_price?.calculated_amount
    ?? firstVariant?.prices?.[0]?.amount
    ?? 0
  const collection = p.collection ?? {}
  const meta = p.metadata ?? {}

  const options: ProductOption[] = (p.options ?? []).map((opt: any) => ({
    title: opt.title as string,
    values: (opt.values ?? []).map((v: any) => v.value as string),
  }))

  const variants: ProductVariant[] = (p.variants ?? []).map((v: any) => {
    const amount = v.calculated_price?.calculated_amount ?? v.prices?.[0]?.amount ?? 0
    const variantOptions: Record<string, string> = {}
    for (const optVal of v.options ?? []) {
      const opt = (p.options ?? []).find((o: any) => o.id === optVal.option_id)
      if (opt) variantOptions[opt.title] = optVal.value
    }
    return { id: v.id, title: v.title, options: variantOptions, price: amount / 100 }
  })

  return {
    id: p.id,
    name: p.title,
    slug: p.handle,
    subtitle:p.subtitle ?? '',
    category: collection.title ?? '',
    categorySlug: collection.handle ?? '',
    subCategory: meta.subCategory ?? '',
    subCategorySlug: meta.subCategorySlug ?? '',
    price: priceAmount / 100,
    image: p.thumbnail ?? p.images?.[0]?.url ?? '',
    images: p.images?.map((img: any) => img.url).filter(Boolean) ?? (p.thumbnail ? [p.thumbnail] : []),
    description: p.description ?? '',
    features: (meta.features as string[]) ?? [],
    inStock: firstVariant?.manage_inventory ? (firstVariant.inventory_quantity ?? 0) > 0 : true,
    exclusive: meta.exclusive === true,
    variantId: firstVariant?.id ?? '',
    material: p.material ?? undefined,
    height: p.height ?? undefined,
    width: p.width ?? undefined,
    length: p.length ?? undefined,
    weight: p.weight ?? undefined,
    options: options.length > 0 ? options : undefined,
    variants: variants.length > 0 ? variants : undefined,
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

// ── Prodotti per sottocategoria (con fallback su metadata) ───────────────
export async function getProductsBySubCategory(subHandle: string, parentHandle: string): Promise<Product[]> {
  const direct = await getProductsByCategory(subHandle)
  if (direct.length > 0) return direct
  const parentProducts = await getProductsByCategory(parentHandle)
  return parentProducts.filter(p => p.subCategorySlug === subHandle)
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

// ── Path helpers per getStaticPaths ──────────────────────────────────────

export async function getTopLevelCategoryHandles(): Promise<string[]> {
  const collections = await fetchCollections()
  return collections.map((c: any) => c.handle)
}

export async function getAllSubcategoryPaths(): Promise<{ categoria: string; subcategoria: string }[]> {
  const categories = await fetchCategories()
  const paths: { categoria: string; subcategoria: string }[] = []
  for (const cat of categories) {
    if (cat.parent_category_id) {
      const parent = categories.find((c: any) => c.id === cat.parent_category_id)
      if (parent) paths.push({ categoria: parent.handle, subcategoria: cat.handle })
    }
  }
  return paths
}

export async function getAllProductPaths(): Promise<{ categoria: string; subcategoria: string; slug: string }[]> {
  const products = await getAllProducts()
  return products
    .filter(p => p.slug && p.categorySlug && p.subCategorySlug)
    .map(p => ({ categoria: p.categorySlug, subcategoria: p.subCategorySlug, slug: p.slug }))
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
