import { SEOHead } from '@/components/SEOHead'
import { NotFound } from '@/views/NotFound';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="Pagina non trovata — Lovehuble" noIndex />
      <NotFound />
    </>
  )
}
