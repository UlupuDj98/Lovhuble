import { GetStaticPaths, GetStaticProps } from 'next'
import { Category } from '@/views/Category'
import { getProductsByCategory, getSubCategories, getTopLevelCategoryHandles } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProducts: Product[]
  initialSubCategoryItems: { title: string; imageSrc: string; link: string }[]
  categorySlug: string
}

export default function CategoriaPage({ initialProducts, initialSubCategoryItems, categorySlug }: Props) {
  return <Category initialProducts={initialProducts} initialSubCategoryItems={initialSubCategoryItems} categorySlug={categorySlug} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const handles = await getTopLevelCategoryHandles().catch(() => [])
  return {
    paths: handles.map(h => ({ params: { categoria: h } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoria = params?.categoria as string
  const [initialProducts, subCats] = await Promise.all([
    getProductsByCategory(categoria).catch(() => []),
    getSubCategories(categoria).catch(() => []),
  ])
  const initialSubCategoryItems = subCats.map(s => ({
    title: s.name,
    imageSrc: s.image,
    link: `/prodotti/${categoria}/${s.slug}`,
  }))
  return { props: { initialProducts, initialSubCategoryItems, categorySlug: categoria }, revalidate: 60 }
}
