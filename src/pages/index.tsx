import { GetServerSideProps } from 'next'
import { Home } from '@/app/pages/Home'
import { getCollections, getAllProducts, getExclusiveProducts } from '@/app/lib/medusa-data'
import type { Product } from '@/app/data/products'

interface Props {
  initialCategories: { title: string; imageSrc: string; link: string }[]
  initialFeatured: Product[]
  initialNovita: Product[]
  initialEsclusive: Product[]
}

export default function HomePage({ initialCategories, initialFeatured, initialNovita, initialEsclusive }: Props) {
  return (
    <Home
      initialCategories={initialCategories}
      initialFeatured={initialFeatured}
      initialNovita={initialNovita}
      initialEsclusive={initialEsclusive}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [collections, allProducts, exclusiveProducts] = await Promise.all([
    getCollections().catch(() => []),
    getAllProducts().catch(() => []),
    getExclusiveProducts().catch(() => []),
  ])

  const initialCategories = collections.map(c => ({
    title: c.name,
    imageSrc: c.image,
    link: `/prodotti/${c.slug}`,
  }))

  return {
    props: {
      initialCategories,
      initialFeatured: allProducts.slice(0, 6),
      initialNovita: allProducts.slice(6, 12),
      initialEsclusive: exclusiveProducts,
    },
  }
}
