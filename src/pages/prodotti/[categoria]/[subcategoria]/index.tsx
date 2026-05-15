import { GetServerSideProps } from 'next'
import { Subcategory } from '@/views/Subcategory'
import { getProductsByCategory, getCategoryName, getSubCategories } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProducts: Product[]
  initialSubCategoryName: string
  initialSubCategoryItems: { title: string; imageSrc: string; link: string }[]
  subCategorySlug: string
}

export default function SubcategoriaPage({ initialProducts, initialSubCategoryName, initialSubCategoryItems, subCategorySlug }: Props) {
  return (
    <Subcategory
      key={subCategorySlug}
      initialProducts={initialProducts}
      initialSubCategoryName={initialSubCategoryName}
      initialSubCategoryItems={initialSubCategoryItems}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoria = context.params?.categoria as string
  const subcategoria = context.params?.subcategoria as string
  const [initialProducts, initialSubCategoryName, subCats] = await Promise.all([
    getProductsByCategory(subcategoria).catch(() => []),
    getCategoryName(subcategoria).catch(() => ''),
    getSubCategories(categoria).catch(() => []),
  ])
  const initialSubCategoryItems = subCats.map(s => ({
    title: s.name,
    imageSrc: s.image,
    link: `/prodotti/${categoria}/${s.slug}`,
  }))
  return { props: { initialProducts, initialSubCategoryName, initialSubCategoryItems, subCategorySlug: subcategoria } }
}
