import type { Product, ProductOption, ProductVariant, Category, SubCategory } from '../data/products'

const BASE = typeof window !== 'undefined'
  ? '/api/medusa'
  : (process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000')
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_KEY ?? ''
const REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID ?? ''

function buildUrl(path: string, params: Record<string, string | string[]> = {}): string {
  const parts: string[] = []
  for (const [k, v] of Object.entries(params)) {
    if (k === 'fields') {
      parts.push(`fields=${v as string}`)
    } else if (Array.isArray(v)) {
      for (const item of v) {
        parts.push(`${k}=${encodeURIComponent(item)}`)
      }
    } else {
      parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    }
  }
  return `${BASE}${path}${parts.length ? '?' + parts.join('&') : ''}`
}

async function storeGet<T>(path: string, params: Record<string, string | string[]> = {}): Promise<T> {
  const allParams: Record<string, string | string[]> = path.includes('/store/products') && REGION_ID
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

const FIELDS = '*categories,+images,+material,+weight,+height,+width,+length,+options,+options.values,+variants,+variants.calculated_price,+variants.options,+metadata'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(
  p: any,
  allCategories: any[],
  knownSubCat?: any,
  knownParentCat?: any,
): Product {
  const firstVariant = p.variants?.[0]
  const priceAmount = Number(firstVariant?.calculated_price?.calculated_amount
    ?? firstVariant?.prices?.[0]?.amount
    ?? 0)
  const meta = p.metadata ?? {}

  const options: ProductOption[] = (p.options ?? []).map((opt: any) => ({
    title: opt.title as string,
    values: (opt.values ?? []).map((v: any) => v.value as string),
  }))

  const variants: ProductVariant[] = (p.variants ?? []).map((v: any) => {
    const amount = Number(v.calculated_price?.calculated_amount ?? v.prices?.[0]?.amount ?? 0)
    const variantOptions: Record<string, string> = {}
    for (const optVal of v.options ?? []) {
      const opt = (p.options ?? []).find((o: any) => o.id === optVal.option_id)
      if (opt) variantOptions[opt.title] = optVal.value
    }
    return {
      id: v.id,
      title: v.title,
      options: variantOptions,
      price: amount,
      weight: v.weight ?? null,
      height: v.height ?? null,
      width: v.width ?? null,
      length: v.length ?? null,
    }
  })

  // Categoria iniettata direttamente (approccio affidabile) oppure fallback su p.categories
  let subCategoryHandle: string
  let subCategoryName: string
  let categoryHandle: string
  let categoryName: string

  if (knownSubCat) {
    subCategoryHandle = knownSubCat.handle ?? ''
    subCategoryName = knownSubCat.name ?? ''
    categoryHandle = knownParentCat?.handle ?? ''
    categoryName = knownParentCat?.name ?? ''
  } else {
    // Fallback: cerca la sottocategoria in p.categories e la verifica in allCategories
    const productCategories: any[] = p.categories ?? []
    let fullSubCat: any = null
    for (const pc of productCategories) {
      const full = allCategories.find((c: any) => c.id === pc.id || c.handle === pc.handle)
      if (full?.parent_category_id) { fullSubCat = full; break }
    }
    if (!fullSubCat && productCategories.length > 0) {
      const pc = productCategories[0]
      fullSubCat = allCategories.find((c: any) => c.id === pc.id || c.handle === pc.handle) ?? null
    }
    const parentCat = fullSubCat?.parent_category_id
      ? allCategories.find((c: any) => c.id === fullSubCat.parent_category_id)
      : null
    if (parentCat) {
      // Prodotto in sottocategoria: categorySlug = parent, subCategorySlug = subCat
      subCategoryHandle = fullSubCat?.handle ?? ''
      subCategoryName = fullSubCat?.name ?? ''
      categoryHandle = parentCat.handle
      categoryName = parentCat.name
    } else {
      // Prodotto in categoria top-level (es. bambole): categorySlug = categoria, subCategorySlug = ''
      categoryHandle = fullSubCat?.handle ?? ''
      categoryName = fullSubCat?.name ?? ''
      subCategoryHandle = ''
      subCategoryName = ''
    }
  }

  return {
    id: p.id,
    name: p.title,
    slug: p.handle,
    subtitle: p.subtitle ?? '',
    category: categoryName,
    categorySlug: categoryHandle,
    subCategory: subCategoryName,
    subCategorySlug: subCategoryHandle,
    price: priceAmount,
    image: p.thumbnail ?? p.images?.[0]?.url ?? '',
    imageNoBg: (meta.thumbnail_nobg as string) ?? null,
    images: p.images?.map((img: any) => img.url).filter(Boolean) ?? (p.thumbnail ? [p.thumbnail] : []),
    description: p.description ?? '',
    features: (meta.features as string[]) ?? [],
    inStock: firstVariant?.manage_inventory ? (firstVariant.inventory_quantity ?? 0) > 0 : true,
    exclusive: meta.exclusive === true,
    variantId: firstVariant?.id ?? '',
    material: p.material ?? null,
    height: p.height ?? null,
    width: p.width ?? null,
    length: p.length ?? null,
    weight: p.weight ?? null,
    options: options.length > 0 ? options : null,
    variants: variants.length > 0 ? variants : null,
  }
}

// Cache in-memory per categorie
let _categories: any[] | null = null

// Map productId → { subCat, parentCat } costruita da tutte le subcategorie reali
let _productCatMap: Map<string, { subCat: any; parentCat: any }> | null = null

async function buildProductCatMap(): Promise<Map<string, { subCat: any; parentCat: any }>> {
  if (_productCatMap) return _productCatMap
  const all = await fetchCategories()
  const subCats = all.filter((c: any) => c.parent_category_id)
  const map = new Map<string, { subCat: any; parentCat: any }>()
  for (const subCat of subCats) {
    const parentCat = all.find((c: any) => c.id === subCat.parent_category_id)
    if (!parentCat) continue
    try {
      const { products } = await storeGet<any>('/store/products', {
        'category_id[]': subCat.id,
        fields: 'id',
      })
      for (const p of (products ?? [])) {
        if (p.id && !map.has(p.id)) map.set(p.id, { subCat, parentCat })
      }
    } catch { /* ignora errori per singola categoria */ }
  }
  _productCatMap = map
  return map
}

async function fetchCategories(): Promise<any[]> {
  if (!_categories) {
    const { product_categories } = await storeGet<any>('/store/product-categories')
    _categories = product_categories ?? []
  }
  return _categories!
}

// ── Prodotti per categoria (singola) ─────────────────────────────────────
// Inietta la categoria nota direttamente per evitare dipendenza da p.categories

export async function getProductsByCategory(categoryHandle: string): Promise<Product[]> {
  const categories = await fetchCategories()
  const category = categories.find((c: any) => c.handle === categoryHandle)
  if (!category) return []

  const { products } = await storeGet<any>('/store/products', {
    'category_id[]': category.id,
    fields: FIELDS,
  })

  // Categoria reale (ha un parent): inietta direttamente
  if (category.parent_category_id) {
    const parentCat = categories.find((c: any) => c.id === category.parent_category_id)
    return (products ?? []).map((p: any) => mapProduct(p, categories, category, parentCat))
  }

  // Categoria curation/top-level: usa il map per trovare la subcategoria reale di ogni prodotto
  const catMap = await buildProductCatMap()
  return (products ?? []).map((p: any) => {
    const info = catMap.get(p.id)
    return mapProduct(p, categories, info?.subCat, info?.parentCat)
  })
}

// ── Prodotti per categoria principale (aggrega tutte le subcategorie) ────

export async function getProductsByParentCategory(parentHandle: string): Promise<Product[]> {
  const all = await fetchCategories()
  const parent = all.find((c: any) => c.handle === parentHandle)
  if (!parent) return []

  const subCats = all.filter((c: any) => c.parent_category_id === parent.id)
  if (subCats.length === 0) return getProductsByCategory(parentHandle)

  // Chiama getProductsByCategory per ogni subcategoria in parallelo:
  // garantisce l'iniezione corretta di subCat/parentCat senza dipendere da p.categories
  const results = await Promise.all(
    subCats.map((s: any) => getProductsByCategory(s.handle).catch(() => [] as Product[]))
  )
  return results.flat()
}

// ── Prodotti per sottocategoria ───────────────────────────────────────────

export async function getProductsBySubCategory(subHandle: string, parentHandle: string): Promise<Product[]> {
  const direct = await getProductsByCategory(subHandle)
  if (direct.length > 0) return direct
  const parentProducts = await getProductsByParentCategory(parentHandle)
  return parentProducts.filter(p => p.subCategorySlug === subHandle)
}

// ── Singolo prodotto per handle ───────────────────────────────────────────

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const categories = await fetchCategories()
  const { products } = await storeGet<any>('/store/products', {
    handle,
    fields: FIELDS,
  })
  const p = products?.[0]
  if (!p) return null
  // Senza categoria iniettata: usa il fallback su p.categories + allCategories
  return mapProduct(p, categories)
}

// ── Singolo prodotto con categoria nota (usato dalla pagina [slug].tsx) ──

export async function getProductByHandleWithCategory(
  handle: string,
  subCatHandle: string,
  parentCatHandle: string,
): Promise<Product | null> {
  const categories = await fetchCategories()
  const { products } = await storeGet<any>('/store/products', {
    handle,
    fields: FIELDS,
  })
  const p = products?.[0]
  if (!p) return null

  const subCat = categories.find((c: any) => c.handle === subCatHandle)
  const parentCat = categories.find((c: any) => c.handle === parentCatHandle)
  return mapProduct(p, categories, subCat, parentCat)
}

// ── Categorie principali (senza parent) ──────────────────────────────────

export async function getMainCategories(): Promise<Category[]> {
  const all = await fetchCategories()
  return all
    .filter((c: any) => !c.parent_category_id)
    .map((c: any) => ({
      name: c.name,
      slug: c.handle,
      image: `/categorie/${c.handle}.png`,
    }))
}

// ── Prodotti esclusivi ────────────────────────────────────────────────────

export async function getExclusiveProducts(): Promise<Product[]> {
  return getProductsByParentCategory('bambole')
}

// ── Tutti i prodotti ──────────────────────────────────────────────────────

let _allProducts: Product[] | null = null

export async function getAllProducts(): Promise<Product[]> {
  if (!_allProducts) {
    const categories = await fetchCategories()
    const { products } = await storeGet<any>('/store/products', { fields: FIELDS })
    _allProducts = (products ?? []).map((p: any) => mapProduct(p, categories))
  }
  return _allProducts!
}

// ── Path helpers per getStaticPaths ──────────────────────────────────────

export async function getTopLevelCategoryHandles(): Promise<string[]> {
  const all = await fetchCategories()
  return all.filter((c: any) => !c.parent_category_id).map((c: any) => c.handle)
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
  const all = await fetchCategories()
  const subCats = all.filter((c: any) => c.parent_category_id)
  const paths: { categoria: string; subcategoria: string; slug: string }[] = []

  for (const subCat of subCats) {
    const parent = all.find((c: any) => c.id === subCat.parent_category_id)
    if (!parent) continue
    const products = await getProductsByCategory(subCat.handle)
    for (const p of products) {
      if (p.slug) paths.push({ categoria: parent.handle, subcategoria: subCat.handle, slug: p.slug })
    }
  }
  return paths
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
  const categories = await fetchCategories()
  const { products } = await storeGet<any>('/store/products', { q, fields: FIELDS })
  if (!products?.length) return []
  const catMap = await buildProductCatMap()
  return products.map((p: any) => {
    const info = catMap.get(p.id)
    return mapProduct(p, categories, info?.subCat, info?.parentCat)
  })
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
