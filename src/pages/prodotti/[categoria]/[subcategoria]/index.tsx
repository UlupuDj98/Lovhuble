import { GetStaticPaths, GetStaticProps } from 'next'
import { SEOHead } from '@/components/SEOHead'
import { Subcategory } from '@/views/Subcategory'
import { getProductsBySubCategory, getCategoryName, getSubCategories, getAllSubcategoryPaths } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProducts: Product[]
  initialSubCategoryName: string
  initialSubCategoryItems: { title: string; imageSrc: string; link: string }[]
  subCategorySlug: string
  categorySlug: string
}

export default function SubcategoriaPage({ initialProducts, initialSubCategoryName, initialSubCategoryItems, subCategorySlug, categorySlug }: Props) {
  return (
    <>
      <SEOHead
        title={`${initialSubCategoryName} — Lovehuble`}
        description={`Scopri la collezione ${initialSubCategoryName.toLowerCase()} di Lovehuble: qualità, discrezione e spedizione sicura.`}
        canonical={`/prodotti/${categorySlug}/${subCategorySlug}`}
      />
      <Subcategory
        key={subCategorySlug}
        initialProducts={initialProducts}
        initialSubCategoryName={initialSubCategoryName}
        initialSubCategoryItems={initialSubCategoryItems}
        categorySlug={categorySlug}
        subCategorySlug={subCategorySlug}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllSubcategoryPaths().catch(() => [])
  return {
    paths: paths.map(p => ({ params: { categoria: p.categoria, subcategoria: p.subcategoria } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoria = params?.categoria as string
  const subcategoria = params?.subcategoria as string
  const [initialProducts, initialSubCategoryName, subCats] = await Promise.all([
    getProductsBySubCategory(subcategoria, categoria).catch(() => []),
    getCategoryName(subcategoria).catch(() => ''),
    getSubCategories(categoria).catch(() => []),
  ])
  const initialSubCategoryItems = subCats.map(s => ({
    title: s.name,
    imageSrc: s.image,
    link: `/prodotti/${categoria}/${s.slug}`,
  }))
  return { props: { initialProducts, initialSubCategoryName, initialSubCategoryItems, subCategorySlug: subcategoria, categorySlug: categoria }, revalidate: 60 }
}
