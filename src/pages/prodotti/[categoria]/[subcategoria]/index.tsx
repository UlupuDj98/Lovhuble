import { GetServerSideProps } from 'next'
import { Subcategory } from '@/app/pages/Subcategory'
import { getProductsByCategory, getCategoryName } from '@/app/lib/medusa-data'
import type { Product } from '@/app/data/products'

interface Props {
  initialProducts: Product[]
  initialSubCategoryName: string
}

export default function SubcategoriaPage({ initialProducts, initialSubCategoryName }: Props) {
  return <Subcategory initialProducts={initialProducts} initialSubCategoryName={initialSubCategoryName} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const subcategoria = context.params?.subcategoria as string
  const [initialProducts, initialSubCategoryName] = await Promise.all([
    getProductsByCategory(subcategoria).catch(() => []),
    getCategoryName(subcategoria).catch(() => ''),
  ])
  return { props: { initialProducts, initialSubCategoryName } }
}
