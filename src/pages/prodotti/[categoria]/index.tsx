import { GetServerSideProps } from 'next'
import { Category } from '@/views/Category'
import { getProductsByCategory, getSubCategories } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProducts: Product[]
  initialSubCategoryItems: { title: string; imageSrc: string; link: string }[]
}

export default function CategoriaPage({ initialProducts, initialSubCategoryItems }: Props) {
  return <Category initialProducts={initialProducts} initialSubCategoryItems={initialSubCategoryItems} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoria = context.params?.categoria as string
  const [initialProducts, subCats] = await Promise.all([
    getProductsByCategory(categoria).catch(() => []),
    getSubCategories(categoria).catch(() => []),
  ])
  const initialSubCategoryItems = subCats.map(s => ({
    title: s.name,
    imageSrc: s.image,
    link: `/prodotti/${categoria}/${s.slug}`,
  }))
  return { props: { initialProducts, initialSubCategoryItems } }
}
