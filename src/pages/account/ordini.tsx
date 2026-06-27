import { SEOHead } from '@/components/SEOHead'
import { AccountOrdini } from '@/views/AccountOrdini'

export default function OrdiniPage() {
  return (
    <>
      <SEOHead title="I tuoi ordini — Lovehuble" noIndex />
      <AccountOrdini />
    </>
  )
}
