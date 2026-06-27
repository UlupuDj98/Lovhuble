import { SEOHead } from '@/components/SEOHead'
import { Cart } from '@/views/Cart'

export default function CartPage() {
  return (
    <>
      <SEOHead title="Carrello — Lovehuble" noIndex />
      <Cart />
    </>
  )
}
