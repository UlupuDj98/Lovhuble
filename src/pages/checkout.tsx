import { SEOHead } from '@/components/SEOHead'
import { Checkout } from '@/views/Checkout'

export default function CheckoutPage() {
  return (
    <>
      <SEOHead title="Checkout — Lovehuble" noIndex />
      <Checkout />
    </>
  )
}
