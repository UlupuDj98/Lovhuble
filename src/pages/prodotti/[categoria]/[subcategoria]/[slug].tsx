import { GetStaticPaths, GetStaticProps } from 'next'
import { ProductDetail } from '@/views/ProductDetail'
import { getProductByHandleWithCategory, getProductsByCategory, getProductsByParentCategory, getAllProductPaths } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProduct: Product | null
  initialRelated: Product[]
}

export default function ProdottoPage({ initialProduct, initialRelated }: Props) {
  return <ProductDetail initialProduct={initialProduct} initialRelated={initialRelated} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllProductPaths().catch(() => [])
  return {
    paths: paths.map(p => ({ params: { categoria: p.categoria, subcategoria: p.subcategoria, slug: p.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const categoria = params?.categoria as string
  const subcategoria = params?.subcategoria as string

  // Usa categoria e subcategoria dall'URL per iniettarle direttamente nel prodotto
  const initialProduct = await getProductByHandleWithCategory(slug, subcategoria, categoria).catch(() => null)

  let initialRelated: Product[] = []
  if (initialProduct) {
    const sameCat = await getProductsByCategory(subcategoria).catch(() => [])
    const filtered = sameCat.filter((p: Product) => p.id !== initialProduct.id)
    if (filtered.length >= 6) {
      initialRelated = filtered.slice(0, 6)
    } else {
      const sameParent = await getProductsByParentCategory(categoria).catch(() => [])
      const extra = sameParent.filter(
        (p: Product) => p.id !== initialProduct.id && !filtered.some((f: Product) => f.id === p.id)
      )
      initialRelated = [...filtered, ...extra].slice(0, 6)
    }
  }

  return { props: { initialProduct, initialRelated }, revalidate: 60 }
}
