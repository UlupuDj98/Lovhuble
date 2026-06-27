import { GetStaticPaths, GetStaticProps } from 'next'
import { SEOHead } from '@/components/SEOHead'
import { ProductDetail } from '@/views/ProductDetail'
import { getProductByHandle, getProductsByParentCategory } from '@/lib/medusa-data'
import type { Product } from '@/data/products'

interface Props {
  initialProduct: Product | null
  initialRelated: Product[]
}

export default function BambolaPage({ initialProduct, initialRelated }: Props) {
  return (
    <>
      {initialProduct && (
        <SEOHead
          title={`${initialProduct.name} — ${initialProduct.category} | Lovehuble`}
          description={initialProduct.subtitle || initialProduct.description?.slice(0, 155)}
          canonical={`/prodotti/bambole/${initialProduct.slug}`}
          ogImage={initialProduct.image}
          ogType="product"
          jsonLd={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: initialProduct.name,
            description: initialProduct.description,
            image: initialProduct.image,
            offers: {
              '@type': 'Offer',
              price: initialProduct.price,
              priceCurrency: 'EUR',
              availability: 'https://schema.org/InStock',
              url: `https://lovehuble.com/prodotti/bambole/${initialProduct.slug}`,
            },
          }}
        />
      )}
      <ProductDetail initialProduct={initialProduct} initialRelated={initialRelated} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProductsByParentCategory('bambole').catch(() => [])
  return {
    paths: products.filter(p => p.slug).map(p => ({ params: { slug: p.slug } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  const initialProduct = await getProductByHandle(slug).catch(() => null)

  let initialRelated: Product[] = []
  if (initialProduct) {
    const all = await getProductsByParentCategory('bambole').catch(() => [])
    initialRelated = all.filter(p => p.id !== initialProduct.id).slice(0, 6)
  }

  return { props: { initialProduct, initialRelated }, revalidate: 60 }
}
