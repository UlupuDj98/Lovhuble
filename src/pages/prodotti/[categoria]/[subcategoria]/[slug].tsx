import { GetServerSideProps } from 'next'
import { ProductDetail } from '@/app/pages/ProductDetail'
import { getProductByHandle, getProductsByCategory, getProductsByCollection } from '@/app/lib/medusa-data'
import type { Product } from '@/app/data/products'

interface Props {
  initialProduct: Product | null
  initialRelated: Product[]
}

export default function ProdottoPage({ initialProduct, initialRelated }: Props) {
  return <ProductDetail initialProduct={initialProduct} initialRelated={initialRelated} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string

  const initialProduct = await getProductByHandle(slug).catch(() => null)

  let initialRelated: Product[] = []
  if (initialProduct) {
    const sameCat = await getProductsByCategory(initialProduct.subCategorySlug).catch(() => [])
    const filtered = sameCat.filter((p: Product) => p.id !== initialProduct.id)
    if (filtered.length >= 6) {
      initialRelated = filtered.slice(0, 6)
    } else {
      const sameCollection = await getProductsByCollection(initialProduct.categorySlug).catch(() => [])
      const extra = sameCollection.filter(
        (p: Product) => p.id !== initialProduct.id && !filtered.some((f: Product) => f.id === p.id)
      )
      initialRelated = [...filtered, ...extra].slice(0, 6)
    }
  }

  return { props: { initialProduct, initialRelated } }
}
