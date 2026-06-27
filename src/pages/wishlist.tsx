import { SEOHead } from '@/components/SEOHead'
import { Wishlist } from '@/views/Wishlist';

export default function WishlistPage() {
  return (
    <>
      <SEOHead title="Lista desideri — Lovehuble" noIndex />
      <Wishlist />
    </>
  )
}
