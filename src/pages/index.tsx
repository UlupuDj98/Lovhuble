import { GetStaticProps } from 'next'
import { Home } from '@/views/Home'
import { getMainCategories, getProductsByCategory, getExclusiveProducts } from '@/lib/medusa-data'
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

export const getStaticProps: GetStaticProps = async () => {
  const [mainCategories, featuredProducts, novitaProducts, exclusiveProducts, blogPosts] = await Promise.all([
    getMainCategories().catch(() => []),
    getProductsByCategory('best-seller').catch(() => []),
    getProductsByCategory('novita').catch(() => []),
    getExclusiveProducts().catch(() => []),
    client.fetch<BlogPost[]>(blogPostsQuery).catch(() => []),
  ])

  const initialCategories = mainCategories.map(c => ({
    title: c.name,
    imageSrc: c.image,
    link: `/prodotti/${c.slug}`,
  }))

  return {
    props: {
      initialCategories,
      initialFeatured: featuredProducts.slice(0, 6),
      initialNovita: novitaProducts.slice(0, 6),
      initialEsclusive: exclusiveProducts,
      initialBlogPosts: blogPosts,
    },
    revalidate: 60,
  }
}
