import { GetStaticPaths, GetStaticProps } from 'next'
import { Category } from '@/views/Category'
import { getProductsByParentCategory, getSubCategories, getTopLevelCategoryHandles, getCategoryName } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProducts: Product[]
  initialSubCategoryItems: { title: string; imageSrc: string; link: string }[]
  categorySlug: string
  initialCategoryName: string
}

export default function CategoriaPage({ initialProducts, initialSubCategoryItems, categorySlug, initialCategoryName }: Props) {
  return <Category key={categorySlug} initialProducts={initialProducts} initialSubCategoryItems={initialSubCategoryItems} categorySlug={categorySlug} initialCategoryName={initialCategoryName} />
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
  const [initialProducts, subCats, initialCategoryName] = await Promise.all([
    getProductsByParentCategory(categoria).catch(() => []),
    getSubCategories(categoria).catch(() => []),
    getCategoryName(categoria).catch(() => ''),
  ])
  const initialSubCategoryItems = subCats.map(s => ({
    title: s.name,
    imageSrc: s.image,
    link: `/prodotti/${categoria}/${s.slug}`,
  }))
  return { props: { initialProducts, initialSubCategoryItems, categorySlug: categoria, initialCategoryName }, revalidate: 60 }
}
