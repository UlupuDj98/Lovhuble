import { GetServerSideProps } from 'next'
import { Category } from '@/app/pages/Category'
import { getProductsByCategory } from '@/app/lib/medusa-data'
import type { Product } from '@/app/data/products'

interface Props {
  initialProducts: Product[]
}

export default function CategoriaPage({ initialProducts }: Props) {
  return <Category initialProducts={initialProducts} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoria = context.params?.categoria as string
  const initialProducts = await getProductsByCategory(categoria).catch(() => [])
  return { props: { initialProducts } }
}
