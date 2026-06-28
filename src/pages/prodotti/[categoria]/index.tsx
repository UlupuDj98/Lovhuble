import { GetStaticPaths, GetStaticProps } from 'next'
import { SEOHead } from '@/components/SEOHead'
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
  return (
    <>
      <SEOHead
        title={`${initialCategoryName} — Lovehuble`}
        description={`Esplora la nostra selezione di ${initialCategoryName.toLowerCase()}: prodotti per adulti di qualità premium con spedizione discreta.`}
        canonical={`/prodotti/${categorySlug}`}
        ogImage={`/categorie/${categorySlug}.png`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lovehuble.com' },
            { '@type': 'ListItem', position: 2, name: initialCategoryName, item: `https://lovehuble.com/prodotti/${categorySlug}` },
          ],
        }}
      />
      <Category key={categorySlug} initialProducts={initialProducts} initialSubCategoryItems={initialSubCategoryItems} categorySlug={categorySlug} initialCategoryName={initialCategoryName} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const handles = await getTopLevelCategoryHandles().catch(() => [])
  return {
    paths: handles.map(h => ({ params: { categoria: h } })),
    fallback: 'blocking',
  }
}

const HIDDEN_CATEGORIES = ['offerte-flash']

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoria = params?.categoria as string

  if (HIDDEN_CATEGORIES.includes(categoria)) {
    return { notFound: true }
  }

  const [initialProducts, subCats, initialCategoryName] = await Promise.all([
    getProductsByParentCategory(categoria).catch(() => []),
    getSubCategories(categoria).catch(() => []),
    getCategoryName(categoria).catch(() => ''),
  ])

  if (!initialCategoryName) {
    return { notFound: true }
  }

  const initialSubCategoryItems = subCats.map(s => ({
    title: s.name,
    imageSrc: s.image,
    link: `/prodotti/${categoria}/${s.slug}`,
  }))
  return { props: { initialProducts, initialSubCategoryItems, categorySlug: categoria, initialCategoryName }, revalidate: 60 }
}
