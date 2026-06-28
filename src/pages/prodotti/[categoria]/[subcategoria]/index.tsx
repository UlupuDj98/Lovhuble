import { GetStaticPaths, GetStaticProps } from 'next'
import { SEOHead } from '@/components/SEOHead'
import { Subcategory } from '@/views/Subcategory'
import { getProductsBySubCategory, getCategoryName, getSubCategories, getAllSubcategoryPaths } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProducts: Product[]
  initialSubCategoryName: string
  initialCategoryName: string
  initialSubCategoryItems: { title: string; imageSrc: string; link: string }[]
  subCategorySlug: string
  categorySlug: string
}

export default function SubcategoriaPage({ initialProducts, initialSubCategoryName, initialCategoryName, initialSubCategoryItems, subCategorySlug, categorySlug }: Props) {
  return (
    <>
      <SEOHead
        title={`${initialSubCategoryName} — Lovehuble`}
        description={`Scopri la collezione ${initialSubCategoryName.toLowerCase()} di Lovehuble: qualità, discrezione e spedizione sicura.`}
        canonical={`/prodotti/${categorySlug}/${subCategorySlug}`}
        ogImage={`/categorie/${categorySlug}.png`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lovehuble.com' },
            { '@type': 'ListItem', position: 2, name: initialCategoryName, item: `https://lovehuble.com/prodotti/${categorySlug}` },
            { '@type': 'ListItem', position: 3, name: initialSubCategoryName, item: `https://lovehuble.com/prodotti/${categorySlug}/${subCategorySlug}` },
          ],
        }}
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
  const [initialProducts, initialSubCategoryName, initialCategoryName, subCats] = await Promise.all([
    getProductsBySubCategory(subcategoria, categoria).catch(() => []),
    getCategoryName(subcategoria).catch(() => ''),
    getCategoryName(categoria).catch(() => ''),
    getSubCategories(categoria).catch(() => []),
  ])

  if (!initialSubCategoryName || !initialCategoryName) {
    return { notFound: true }
  }

  const initialSubCategoryItems = subCats.map(s => ({
    title: s.name,
    imageSrc: s.image,
    link: `/prodotti/${categoria}/${s.slug}`,
  }))
  return { props: { initialProducts, initialSubCategoryName, initialCategoryName, initialSubCategoryItems, subCategorySlug: subcategoria, categorySlug: categoria }, revalidate: 60 }
}
