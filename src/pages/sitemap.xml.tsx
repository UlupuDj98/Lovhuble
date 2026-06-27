import { GetServerSideProps } from 'next'
import {
  getTopLevelCategoryHandles,
  getAllSubcategoryPaths,
  getAllProductPaths,
  getProductsByParentCategory,
} from '@/lib/medusa-data'
import { client } from '@/lib/sanity/client'
import { blogPostsQuery } from '@/lib/sanity/queries'
import type { BlogPost } from '@/lib/sanity/types'

const BASE_URL = 'https://lovehuble.com'

const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/guide', priority: '0.7', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/termini-e-condizioni', priority: '0.3', changefreq: 'yearly' },
]

function toEntry(url: string, priority: string, changefreq: string) {
  return `  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function buildSitemap(entries: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [categoryHandles, subcategoryPaths, productPaths, bambolePaths, blogPosts] =
    await Promise.all([
      getTopLevelCategoryHandles().catch(() => [] as string[]),
      getAllSubcategoryPaths().catch(() => [] as { categoria: string; subcategoria: string }[]),
      getAllProductPaths().catch(
        () => [] as { categoria: string; subcategoria: string; slug: string }[]
      ),
      getProductsByParentCategory('bambole').catch(() => []),
      client.fetch<BlogPost[]>(blogPostsQuery).catch(() => [] as BlogPost[]),
    ])

  const entries: string[] = [
    ...STATIC_PAGES.map(p => toEntry(p.url, p.priority, p.changefreq)),
    ...categoryHandles.map(h => toEntry(`/prodotti/${h}`, '0.8', 'daily')),
    ...subcategoryPaths.map(p =>
      toEntry(`/prodotti/${p.categoria}/${p.subcategoria}`, '0.8', 'daily')
    ),
    ...productPaths.map(p =>
      toEntry(`/prodotti/${p.categoria}/${p.subcategoria}/${p.slug}`, '0.9', 'weekly')
    ),
    ...bambolePaths
      .filter(p => p.slug)
      .map(p => toEntry(`/prodotti/bambole/${p.slug}`, '0.9', 'weekly')),
    ...blogPosts.map(p => toEntry(`/blog/${p.id}`, '0.7', 'weekly')),
  ]

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600')
  res.write(buildSitemap(entries))
  res.end()

  return { props: {} }
}

export default function SitemapPage() {
  return null
}
