import { GetServerSideProps } from 'next'
import { Home } from '@/views/Home'
import { getCollections, getAllProducts, getExclusiveProducts } from '@/lib/medusa-data'
import { client } from '@/lib/sanity/client'
import { blogPostsQuery } from '@/lib/sanity/queries'
import type { Product } from '@/data/products'
import type { BlogPost } from '@/lib/sanity/types'

interface Props {
  initialCategories: { title: string; imageSrc: string; link: string }[]
  initialFeatured: Product[]
  initialNovita: Product[]
  initialEsclusive: Product[]
  initialBlogPosts: BlogPost[]
}

export default function HomePage({ initialCategories, initialFeatured, initialNovita, initialEsclusive, initialBlogPosts }: Props) {
  return (
    <Home
      initialCategories={initialCategories}
      initialFeatured={initialFeatured}
      initialNovita={initialNovita}
      initialEsclusive={initialEsclusive}
      initialBlogPosts={initialBlogPosts}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [collections, allProducts, exclusiveProducts, blogPosts] = await Promise.all([
    getCollections().catch(() => []),
    getAllProducts().catch(() => []),
    getExclusiveProducts().catch(() => []),
    client.fetch<BlogPost[]>(blogPostsQuery).catch(() => []),
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
      initialBlogPosts: blogPosts,
    },
  }
}
